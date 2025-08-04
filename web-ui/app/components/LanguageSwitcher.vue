<script setup>
const { locale, setLocale } = useI18n();

const options = [
  {
    value: "en",
    label: "🇺🇸 English",
  },
  {
    value: "it",
    label: "🇮🇹 Italiano",
  },
];
</script>

<template>
  <UiSelect v-model="locale" @update:model-value="setLocale">
    <UiSelectTrigger class="w-fit border bg-transparent p-2 h-auto cursor-pointer" aria-label="Change language">
      <div class="flex items-center gap-1">
        <span class="text-xs">{{ locale === 'en' ? '🇺🇸' : '🇮🇹' }}</span>
      </div>
    </UiSelectTrigger>
    <UiSelectContent align="end" class="w-32">
      <UiSelectItem v-for="option in options" :key="option.value" :value="option.value">
        <div class="flex items-center gap-2">
          <span class="text-sm">{{ option.label }}</span>
        </div>
      </UiSelectItem>
    </UiSelectContent>
  </UiSelect>
</template>
