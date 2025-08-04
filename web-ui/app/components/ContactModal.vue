<script setup lang="ts">
const { contactEmail, githubRepositoryUrl } = useAppConfig();
</script>

<template>
  <UiAlertDialog>
    <UiAlertDialogTrigger as-child>
      <button class="underline text-muted-foreground hover:text-foreground transition-colors text-left">
        {{ $t('footer.contact') }}
      </button>
    </UiAlertDialogTrigger>
    <UiAlertDialogContent class="p-4">
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>{{ $t('footer.contact') }}</UiAlertDialogTitle>
        <UiAlertDialogDescription class="space-y-3">
          <p>{{ $t('footer.contactDescription') }}</p>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <Icon name="solar:letter-bold" class="w-4 h-4 text-primary" />
              <a :href="`mailto:${contactEmail}`" class="text-primary hover:text-primary/80 transition-colors underline">
                {{ contactEmail }}
              </a>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:github" class="w-4 h-4 text-muted-foreground" />
              <a :href="githubRepositoryUrl" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors underline">
                {{ $t('footer.githubRepository') }}
              </a>
            </div>
          </div>
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Close</UiAlertDialogCancel>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
