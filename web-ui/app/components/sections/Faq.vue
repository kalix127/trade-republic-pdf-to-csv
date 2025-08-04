<script setup lang="ts">
const questions = [
  {
    id: "q1",
    question: "faq.q1.question",
    answer: "faq.q1.answer",
  },
  {
    id: "q2",
    question: "faq.q2.question",
    answer: "faq.q2.answer",
  },
  {
    id: "q3",
    question: "faq.q3.question",
    answer: "faq.q3.answer",
  },
  {
    id: "q4",
    question: "faq.q4.question",
    answer: "faq.q4.answer",
  },
  {
    id: "q5",
    question: "faq.q5.question",
    answer: "faq.q5.answer",
  },
  {
    id: "q6",
    question: "faq.q6.question",
    answer: "faq.q6.answer",
  },
];
</script>

<template>
  <section id="faq" class="py-12 sm:py-20 bg-gradient-to-t from-primary/5 to-background rounded-b-lg">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <h2 class="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {{ $t('faq.title') }}
        </h2>
      </div>

      <div class="max-w-3xl mx-auto">
        <UiAccordion type="single" collapsible class="space-y-2">
          <UiAccordionItem v-for="item in questions" :key="item.id" :value="item.id">
            <UiAccordionTrigger class="text-left hover:no-underline py-3">
              <span class="text-lg font-semibold text-foreground">
                {{ $t(item.question) }}
              </span>
            </UiAccordionTrigger>
            <UiAccordionContent class="pb-3 text-muted-foreground leading-relaxed">
              {{ $t(item.answer) }}
            </UiAccordionContent>
          </UiAccordionItem>
        </UiAccordion>
      </div>
    </div>
  </section>
</template>
