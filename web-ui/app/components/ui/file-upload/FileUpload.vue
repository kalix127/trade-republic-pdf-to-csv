<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Motion } from "motion-v";
import { ref } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<FileUploadProps>();

const emit = defineEmits<{
  (e: "onChange", files: File[]): void;
}>();

const { t } = useI18n();

interface FileUploadProps {
  class?: HTMLAttributes["class"];
  disabled?: boolean;
}

const fileInputRef = ref<HTMLInputElement | null>(null);
const files = ref<File[]>([]);
const isActive = ref<boolean>(false);

function handleFileChange(newFiles: File[]) {
  files.value = newFiles; // Replace files instead of accumulating
  emit("onChange", files.value);
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!input.files)
    return;
  handleFileChange(Array.from(input.files));
}

function handleClick() {
  if (props.disabled)
    return;
  fileInputRef.value?.click();
}

function handleEnter() {
  if (props.disabled)
    return;
  isActive.value = true;
}
function handleLeave() {
  if (props.disabled)
    return;
  isActive.value = false;
}
function handleDrop(e: DragEvent) {
  if (props.disabled)
    return;
  isActive.value = false;
  const droppedFiles = e.dataTransfer?.files ? Array.from(e.dataTransfer.files) : [];
  if (droppedFiles.length)
    handleFileChange(droppedFiles);
}

// Clear files function
function clearFiles() {
  files.value = [];
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
}

// Expose methods to parent component
defineExpose({
  clearFiles,
});
</script>

<template>
  <div
    :class="cn('w-full', $props.class)"
    @dragover.prevent="handleEnter"
    @dragleave="handleLeave"
    @drop.prevent="handleDrop"
    @mouseover="handleEnter"
    @mouseleave="handleLeave"
  >
    <div
      :class="cn('group/file relative block w-full overflow-hidden rounded-lg p-6')"
      @click="handleClick"
    >
      <input
        ref="fileInputRef"
        type="file"
        class="hidden"
        :disabled="props.disabled"
        @change="onFileChange"
      >

      <!-- Grid pattern -->
      <div
        class="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
      >
        <slot />
      </div>

      <!-- Content -->
      <div class="flex flex-col items-center justify-center text-center">
        <p
          class="relative z-20 font-sans text-base font-bold text-foreground"
        >
          {{ props.disabled ? t('fileUpload.uploadDisabled') : t('fileUpload.uploadFile') }}
        </p>
        <p
          class="relative z-20 mt-2 font-sans text-base font-normal text-muted-foreground"
        >
          {{ props.disabled ? t('fileUpload.fileAlreadySelected') : t('fileUpload.dragDropText') }}
        </p>

        <div class="relative mx-auto mt-6 w-full max-w-xl space-y-4">
          <Motion
            v-for="(file, idx) in files"
            :key="`file-${idx}`"
            :initial="{ opacity: 0, scaleX: 0 }"
            :animate="{ opacity: 1, scaleX: 1 }"
            class="relative z-40 mx-auto flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-card p-4 shadow-sm md:h-24 border border-border"
          >
            <div class="flex w-full items-center justify-between gap-4">
              <Motion
                as="p"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                class="max-w-xs truncate text-base text-foreground"
              >
                {{ file.name }}
              </Motion>
              <Motion
                as="p"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                class="w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-foreground bg-muted"
              >
                {{ (file.size / (1024 * 1024)).toFixed(2) }} MB
              </Motion>
            </div>

            <div
              class="mt-2 flex w-full flex-col items-start justify-between text-sm text-muted-foreground md:flex-row md:items-center"
            >
              <Motion
                as="p"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                class="rounded-md bg-muted px-1.5 py-1 text-sm"
              >
                {{ file.type || t('fileUpload.unknownType') }}
              </Motion>
              <Motion
                as="p"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
              >
                {{ t('fileUpload.modified') }} {{ new Date(file.lastModified).toLocaleDateString() }}
              </Motion>
            </div>
          </Motion>

          <template v-if="!files.length">
            <Motion
              as="div"
              class="relative z-40 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md bg-card border cursor-pointer"
              :initial="{
                x: 0,
                y: 0,
                opacity: 1,
              }"
              :transition="{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }"
              :animate="
                isActive
                  ? {
                    x: 20,
                    y: -20,
                    opacity: 0.9,
                  }
                  : {}
              "
            >
              <Icon
                name="heroicons:arrow-up-tray-20-solid"
                class="text-muted-foreground"
                size="20"
              />
            </Motion>

            <div
              class="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md border border-dashed border-primary bg-transparent transition-opacity cursor-pointer"
              :class="{ 'opacity-100': isActive, 'opacity-0': !isActive }"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-hover\/file\:shadow-2xl:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
}

.transition-opacity {
  transition: opacity 0.3s ease;
}
</style>
