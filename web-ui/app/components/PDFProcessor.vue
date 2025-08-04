<script setup lang="ts">
interface CSVContent {
  transactions: string;
  trades: string;
}

interface APIResponse {
  success: boolean;
  csvContent?: CSVContent;
  message?: string;
}

interface ParsedResults {
  transactions: Record<string, string>[];
  trades: Record<string, string>[];
  csvContent: CSVContent;
}

interface FileUploadRef {
  clearFiles?: () => void;
}

const { t } = useI18n();
const { setPrivacyConsent, hasPrivacyConsent, isPrivacyAccepted } = usePrivacyConsent();

const selectedFile = ref<File | null>(null);
const processing = ref(false);
const processed = ref(false);
const processingStatus = ref("");
const error = ref("");
const results = ref<ParsedResults | null>(null);
const fileUploadRef = ref<FileUploadRef | null>(null);
const showPrivacyModal = ref(false);
const pendingProcessing = ref(false);

function downloadTransactions() {
  if (!results.value || !results.value.csvContent)
    return;
  downloadCSV(results.value.csvContent.transactions, "transactions.csv");
}

function downloadTrades() {
  if (!results.value || !results.value.csvContent)
    return;
  downloadCSV(results.value.csvContent.trades, "trades.csv");
}

const downloadOptions = [
  {
    type: "transactions",
    title: "pdfProcessor.downloadTransactions",
    description: "pdfProcessor.transactionsDesc",
    action: downloadTransactions,
  },
  {
    type: "trades",
    title: "pdfProcessor.downloadTrades",
    description: "pdfProcessor.tradesDesc",
    action: downloadTrades,
  },
];

function handleFileSelect(files: File[]) {
  if (files && files.length > 0) {
    const file = files[0];
    if (!file)
      return;

    if (selectedFile.value && selectedFile.value.name === file.name && selectedFile.value.size === file.size) {
      return;
    }

    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      selectedFile.value = file;
      error.value = "";
      processed.value = false;
      results.value = null;
    } else {
      error.value = t("pdfProcessor.invalidFile");
      selectedFile.value = null;
    }
  }
}

function processPDFFile() {
  if (!selectedFile.value)
    return;

  // Prevent multiple simultaneous processing attempts
  if (processing.value || pendingProcessing.value)
    return;

  if (hasPrivacyConsent() && isPrivacyAccepted()) {
    executeProcessing();
  } else {
    pendingProcessing.value = true;
    showPrivacyModal.value = true;
  }
}

async function executeProcessing() {
  if (!selectedFile.value)
    return;

  processing.value = true;
  processingStatus.value = t("pdfProcessor.uploading");
  error.value = "";

  try {
    const formData = new FormData();
    formData.append("pdf", selectedFile.value);

    processingStatus.value = t("pdfProcessor.processingServer");

    const response = await $fetch<APIResponse>("/api/process-pdf", {
      method: "POST",
      body: formData,
    });

    if (response.success && response.csvContent) {
      results.value = {
        transactions: parseCSVToObjects(response.csvContent.transactions),
        trades: parseCSVToObjects(response.csvContent.trades),
        csvContent: response.csvContent,
      };

      processingStatus.value = t("pdfProcessor.processingComplete");
      processed.value = true;
    } else {
      throw new Error(response.message || "Processing failed");
    }
  } catch (err: unknown) {
    console.error("Error processing PDF:", err);
    const errorMessage = err && typeof err === "object" && "data" in err
      ? (err as any).data?.statusMessage
      : err && typeof err === "object" && "message" in err
        ? (err as any).message
        : t("pdfProcessor.processingFailed");
    error.value = errorMessage;
  } finally {
    processing.value = false;
    processingStatus.value = "";
    pendingProcessing.value = false;
  }
}

function handlePrivacyAccept() {
  setPrivacyConsent(true);
  showPrivacyModal.value = false;
  if (pendingProcessing.value) {
    executeProcessing();
  }
}

function handlePrivacyReject() {
  setPrivacyConsent(false);
  showPrivacyModal.value = false;
  pendingProcessing.value = false;
}

function parseCSVToObjects(csvString: string): Record<string, string>[] {
  const lines = csvString.trim().split("\n");
  if (lines.length < 2)
    return [];

  const headers = lines[0]?.split(",").map((h: string) => h.trim()) || [];
  const objects: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i]?.split(",").map((v: string) => v.trim().replace(/^"|"$/g, "")) || [];
    const obj: Record<string, string> = {};
    headers.forEach((header: string, index: number) => {
      obj[header] = values[index] || "";
    });
    objects.push(obj);
  }

  return objects;
}

function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function reset() {
  selectedFile.value = null;
  processing.value = false;
  processed.value = false;
  processingStatus.value = "";
  error.value = "";
  results.value = null;
  if (fileUploadRef.value) {
    fileUploadRef.value.clearFiles?.();
  }
}
</script>

<template>
  <div id="converter" class="w-full max-w-4xl mx-auto p-6">
    <div class="space-y-6">
      <div class="bg-card rounded-lg shadow-lg p-6 border border-dashed border-primary/50">
        <div class="space-y-4">
          <UiFileUpload
            ref="fileUploadRef"
            :disabled="!!selectedFile"
            class="w-full"
            @on-change="handleFileSelect"
          />
        </div>
      </div>

      <div v-if="selectedFile && !processing && !processed && !pendingProcessing" class="flex justify-center">
        <UiButton
          size="lg"
          class="px-8 py-3 shadow-md flex items-center gap-2"
          @click="processPDFFile"
        >
          <Icon name="solar:play-bold" size="24" />
          <span>{{ $t('pdfProcessor.processPdf') }}</span>
        </UiButton>
      </div>

      <div v-if="pendingProcessing && showPrivacyModal" class="border border-border rounded-lg p-6">
        <div class="flex items-center gap-4">
          <div class="animate-spin">
            <Icon name="solar:refresh-bold" class="text-primary" size="24" />
          </div>
          <div>
            <h3 class="text-lg font-medium text-foreground">
              {{ $t('pdfProcessor.waitingConsent') }}
            </h3>
            <p class="text-sm text-muted-foreground">
              {{ $t('pdfProcessor.pleaseAcceptPrivacy') }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="processing" class="border border-border rounded-lg p-6">
        <div class="flex items-center gap-4">
          <div class="animate-spin">
            <Icon name="solar:refresh-bold" class="text-primary" size="24" />
          </div>
          <div>
            <h3 class="text-lg font-medium text-foreground">
              {{ $t('pdfProcessor.processing') }}
            </h3>
            <p class="text-sm text-muted-foreground">
              {{ processingStatus }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="error" class="bg-destructive/10 rounded-lg p-6">
        <div class="flex items-center gap-4">
          <Icon name="solar:danger-triangle-bold" class="text-destructive" size="24" />
          <div>
            <h3 class="text-lg font-medium text-destructive">
              {{ $t('pdfProcessor.errorProcessing') }}
            </h3>
            <p class="text-sm text-destructive/80 mt-1">
              {{ error }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="processed && results" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            v-for="download in downloadOptions"
            :key="download.type"
            v-umami="download.type"
            class="p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border cursor-pointer"
            @click="download.action"
          >
            <Icon name="solar:download-bold" size="24" class="text-primary" />
            <h4 class="font-medium text-foreground">
              {{ $t(download.title) }}
            </h4>
            <p class="text-sm text-muted-foreground">
              {{ $t(download.description) }}
            </p>
          </button>
        </div>

        <div class="flex justify-center">
          <UiButton
            class="cursor-pointer"
            size="lg"
            @click="reset"
          >
            {{ $t('pdfProcessor.processAnother') }}
          </UiButton>
        </div>
      </div>
    </div>
    <PrivacyConsentModal
      :open="showPrivacyModal"
      @accept="handlePrivacyAccept"
      @reject="handlePrivacyReject"
      @update:open="showPrivacyModal = $event"
    />
  </div>
</template>
