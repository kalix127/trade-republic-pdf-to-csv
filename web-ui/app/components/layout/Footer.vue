<script setup lang="ts">
const { projectName, githubUsername } = useAppConfig();

const links = [
  {
    label: $t("footer.privacy"),
    to: "/privacy",
  },
];
</script>

<template>
  <footer class="bg-background">
    <div class="px-4 py-6">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-0">
        <div class="flex flex-col gap-2 xs:flex-row text-muted-foreground text-sm text-center md:text-left">
          <span>
            {{ $t('footer.madeBy') }}
            <NuxtLink target="_blank" :to="`https://github.com/${githubUsername}`" class="text-muted-foreground hover:text-foreground transition-colors underline">
              @{{ githubUsername }}
            </NuxtLink>
            .
          </span>
          <span>
            &copy; {{ new Date().getFullYear() }}
            {{ $t('footer.copyright', { projectName }) }}
          </span>
        </div>

        <div class="flex flex-col items-center xs:flex-row gap-2 text-sm">
          <NuxtLink v-for="link in links" :key="link.label" :to="link.to" class="underline text-muted-foreground hover:text-foreground transition-colors">
            {{ link.label }}
          </NuxtLink>

          <ContactModal />
        </div>
      </div>
    </div>
  </footer>
</template>
