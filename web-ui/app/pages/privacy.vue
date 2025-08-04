<script setup lang="ts">
const { t, tm } = useI18n();

// Get translated arrays using tm() instead of t()
const privacyData = {
  dataCollectionItems: tm("privacy.sections.dataCollection.items") as string[],
  dataRetentionItems: tm("privacy.sections.dataRetention.items") as string[],
  analyticsItems: tm("privacy.sections.thirdParty.analytics.items") as string[],
  dataSecurityItems: tm("privacy.sections.dataSecurity.items") as string[],
  cookiesItems: tm("privacy.sections.cookiesAndTracking.items") as string[],
  internationalTransferItems: tm("privacy.sections.internationalTransfers.items") as string[],
  gdprRightsItems: tm("privacy.sections.gdprRights.items") as string[],
  legalBasisItems: tm("privacy.sections.legalBasis.items") as string[],
};

useSeoMeta({
  title: t("seo.privacy.title"),
  description: t("seo.privacy.description"),
});
</script>

<template>
  <div class="container mx-auto px-4 py-16">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-2">
          {{ $t('privacy.title') }}
        </h1>
        <p class="text-muted-foreground italic">
          {{ $t('privacy.lastUpdated') }}
        </p>
      </div>

      <!-- Content -->
      <div class="space-y-8">
        <!-- Introduction -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.introduction.title') }}
          </h2>
          <p class="text-muted-foreground leading-relaxed">
            {{ $t('privacy.sections.introduction.content') }}
          </p>
        </section>

        <!-- Scope -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.scope.title') }}
          </h2>
          <p class="text-muted-foreground leading-relaxed">
            {{ $t('privacy.sections.scope.content') }}
          </p>
        </section>

        <!-- Information We Collect -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.dataCollection.title') }}
          </h2>
          <p class="text-muted-foreground mb-4">
            {{ $t('privacy.sections.dataCollection.content') }}
          </p>
          <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li v-for="item in privacyData.dataCollectionItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>

        <!-- PDF Processing -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.pdfProcessing.title') }}
          </h2>
          <div class="p-4 border rounded-lg bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-100">
            <strong>{{ $t('privacy.sections.pdfProcessing.important') }}</strong> {{ $t('privacy.sections.pdfProcessing.importantText') }}
          </div>
        </section>

        <!-- Data Retention -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.dataRetention.title') }}
          </h2>
          <p class="text-muted-foreground mb-4">
            {{ $t('privacy.sections.dataRetention.content') }}
          </p>
          <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li v-for="item in privacyData.dataRetentionItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>

        <!-- Third-Party Services -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.thirdParty.title') }}
          </h2>

          <!-- Cloudflare -->
          <div class="mb-6">
            <h3 class="text-xl font-medium text-foreground mb-3">
              {{ $t('privacy.sections.thirdParty.cloudflare.title') }}
            </h3>
            <p class="text-muted-foreground">
              {{ $t('privacy.sections.thirdParty.cloudflare.content') }}
            </p>
          </div>

          <!-- Analytics -->
          <div>
            <h3 class="text-xl font-medium text-foreground mb-3">
              {{ $t('privacy.sections.thirdParty.analytics.title') }}
            </h3>
            <p class="text-muted-foreground mb-4">
              {{ $t('privacy.sections.thirdParty.analytics.content') }}
            </p>
            <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li v-for="item in privacyData.analyticsItems" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </section>

        <!-- Data Security -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.dataSecurity.title') }}
          </h2>
          <p class="text-muted-foreground mb-4">
            {{ $t('privacy.sections.dataSecurity.content') }}
          </p>
          <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li v-for="item in privacyData.dataSecurityItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>

        <!-- Cookies and Tracking -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.cookiesAndTracking.title') }}
          </h2>
          <p class="text-muted-foreground mb-4">
            {{ $t('privacy.sections.cookiesAndTracking.content') }}
          </p>
          <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li v-for="item in privacyData.cookiesItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>

        <!-- International Data Transfers -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.internationalTransfers.title') }}
          </h2>
          <p class="text-muted-foreground mb-4">
            {{ $t('privacy.sections.internationalTransfers.content') }}
          </p>
          <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li v-for="item in privacyData.internationalTransferItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>

        <!-- GDPR Rights -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.gdprRights.title') }}
          </h2>
          <p class="text-muted-foreground mb-4">
            {{ $t('privacy.sections.gdprRights.content') }}
          </p>
          <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li v-for="item in privacyData.gdprRightsItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>

        <!-- Legal Basis for Processing -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.legalBasis.title') }}
          </h2>
          <p class="text-muted-foreground mb-4">
            {{ $t('privacy.sections.legalBasis.content') }}
          </p>
          <ul class="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li v-for="item in privacyData.legalBasisItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>

        <!-- Changes to Privacy Policy -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.changes.title') }}
          </h2>
          <p class="text-muted-foreground leading-relaxed">
            {{ $t('privacy.sections.changes.content') }}
          </p>
        </section>

        <!-- Contact -->
        <section>
          <h2 class="text-2xl font-semibold text-foreground mb-4">
            {{ $t('privacy.sections.contact.title') }}
          </h2>
          <p class="text-muted-foreground">
            {{ $t('privacy.sections.contact.content') }}
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
