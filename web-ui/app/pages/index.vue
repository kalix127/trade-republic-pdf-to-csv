<script setup>
const { t } = useI18n();

useSeoMeta({
  title: t("seo.default.title"),
  description: t("seo.default.description"),
});
</script>

<template>
  <div class="px-4 w-full">
    <SectionsHero />

    <SectionsFaq />
  </div>
</template>
