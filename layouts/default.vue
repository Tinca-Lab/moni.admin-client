<template>
  <div class="default relative">
    <div class="flex flex-col h-screen wrap relative">
      <header class="w-full relative"></header>
      <main class="flex-grow bg-white pt-8 pb-32 px-10">
        <Nuxt class="relative" />
      </main>
      <client-only>
        <notifications />
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>
