<template>
  <div class="wrapper">
    <LayoutHeader />
    <main class="w-full">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  min-height: 100svh;
  grid-template-rows: 64px 1fr 64px;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

header {
  display: grid;
  grid-area: header;
}

main {
  display: grid;
  grid-area: main;
}

footer {
  display: grid;
  grid-area: footer;
}
</style>
