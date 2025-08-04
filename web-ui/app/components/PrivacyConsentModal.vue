<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

const emit = defineEmits(["accept", "reject", "update:open"]);

const { githubRepositoryUrl } = useAppConfig();

function handleAccept() {
  emit("accept");
  emit("update:open", false);
}

function handleReject() {
  emit("reject");
  emit("update:open", false);
}
</script>

<template>
  <UiAlertDialog :open="open" @update:open="$emit('update:open', $event)">
    <UiAlertDialogContent class="max-w-lg">
      <UiAlertDialogHeader>
        <UiAlertDialogTitle class="text-foreground">
          {{ $t('privacy.consentTitle') }}
        </UiAlertDialogTitle>
        <UiAlertDialogDescription class="text-muted-foreground">
          {{ $t('privacy.consentMessage') }}
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>

      <div class="py-4">
        <p class="text-sm text-muted-foreground mb-4">
          {{ $t('privacy.dataProcessingInfo') }}
        </p>
        <p class="text-sm text-muted-foreground mb-4">
          {{ $t('privacy.acceptanceRequired') }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ $t('privacy.codeTransparency') }}
          <NuxtLink :to="githubRepositoryUrl" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline transition-colors">
            {{ $t('privacy.repositoryLink') }}
          </NuxtLink>
        </p>

        <p class="text-sm text-muted-foreground">
          {{ $t('privacy.consultPolicy') }}
          <NuxtLink to="/privacy" class="text-primary hover:text-primary/80 underline transition-colors">
            {{ $t('footer.privacy') }}
          </NuxtLink>
        </p>
      </div>

      <UiAlertDialogFooter class="gap-2">
        <UiAlertDialogCancel @click="handleReject">
          {{ $t('privacy.reject') }}
        </UiAlertDialogCancel>
        <UiAlertDialogAction @click="handleAccept">
          {{ $t('privacy.accept') }}
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
