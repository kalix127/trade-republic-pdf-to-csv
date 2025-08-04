<script setup>
const { githubRepositoryUrl, projectName } = useAppConfig();
</script>

<template>
  <header>
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-full">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <span class="text-lg font-semibold text-foreground tracking-tight">{{ projectName }}</span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <LanguageSwitcher />

          <ThemeToggle />

          <NuxtLink :href="githubRepositoryUrl" target="_blank" rel="noopener noreferrer">
            <UiButton variant="outline" size="icon" class="cursor-pointer">
              <Icon name="mdi:github" size="18" />
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
