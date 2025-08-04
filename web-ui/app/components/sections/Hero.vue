<template>
  <section
    id="features"
    class="relative py-10 sm:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-primary/5 to-background rounded-t-lg"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <div class="space-y-4 mb-5 sm:mb-10">
          <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground">
            {{ $t("hero.title") }}
          </h1>
          <p
            class="text-sm sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {{ $t("hero.description") }}
          </p>
        </div>
      </div>
    </div>
    <PDFProcessor />
  </section>
</template>
