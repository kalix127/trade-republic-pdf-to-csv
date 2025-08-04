<script setup lang="ts">
const { contactEmail } = useAppConfig();
const error = useError();
const { t } = useI18n();

useSeoMeta({
  title: t("seo.error.title"),
  description: t("seo.error.description"),
});

const message = computed(() => {
  switch (error.value?.statusCode) {
    case 404:
      return t("error.page_not_found");

    case 500:
      return t("error.internal_server_error");

    default:
      return t("error.something_went_wrong");
  }
});

function takeHome() {
  clearError({
    redirect: "/",
  });
}
</script>

<template>
  <NuxtLayout>
    <div class="container m-auto px-4">
      <div class="max-w-md mx-auto text-center">
        <h1 class="text-6xl font-bold text-foreground mb-4">
          {{ error?.statusCode }}
        </h1>

        <p class="text-muted-foreground">
          {{ message }}
        </p>

        <p class="text-muted-foreground mb-8">
          {{ t("error.if_error_persists") }}
          <NuxtLink :to="`mailto:${contactEmail}`" class="text-primary underline">
            {{ contactEmail }}
          </NuxtLink>
        </p>

        <UiButton
          class="w-full flex items-center gap-1 cursor-pointer"
          size="lg"
          @click="takeHome"
        >
          <Icon name="lucide:home" size="18" />
          {{ t("error.take_home") }}
        </UiButton>
      </div>
    </div>
  </NuxtLayout>
</template>
