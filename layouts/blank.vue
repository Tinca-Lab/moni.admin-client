<template>
  <main class="h-screen overflow-y-hidden">
    <Nuxt class="h-full" />
    <client-only>
      <notifications />
    </client-only>
  </main>
</template>

<script>
export default {
  name: "BlankLayout",
};
</script>
