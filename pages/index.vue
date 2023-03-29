<template>
  <div class="h-full w-full p-5 xl:px-36 xl:py-10 overflow-x-hidden">
    <app-title title="Inicio" class="mb-5" />
    <app-stats />
    <app-data-analytics />
  </div>
</template>

<script>
import AppTitle from "@/components/texts/AppTitle.vue";
import AppDataAnalytics from "@/components/data/AppDataAnalytics.vue";
import AppStats from "@/components/sections/AppStats.vue";

export default {
  name: "IndexPage",
  components: { AppStats, AppDataAnalytics, AppTitle },
  layout: "AdminLayout",
};
</script>
