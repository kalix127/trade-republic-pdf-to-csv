<script setup lang="ts">
const colorMode = useColorMode();

function toggleDark() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <UiButton
    variant="outline"
    size="icon"
    class="cursor-pointer"
    @click="toggleDark"
  >
    <Icon
      v-if="colorMode.value === 'dark'"
      name="solar:sun-bold"
      size="18"
    />
    <Icon
      v-else
      name="solar:moon-bold"
      size="18"
    />
  </UiButton>
</template>
