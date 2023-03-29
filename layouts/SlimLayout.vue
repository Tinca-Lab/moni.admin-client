<template>
  <div class="default relative">
    <div class="flex flex-col h-screen wrap relative">
      <header class="w-full relative"></header>
      <main class="flex-grow bg-white pb-32">
        <Nuxt class="relative" />
        <Nuxt />
        <client-only>
          <notifications />
        </client-only>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>
