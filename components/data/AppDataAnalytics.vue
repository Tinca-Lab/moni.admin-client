<template>
  <section class="mt-10 w-full flex flex-col">
    <article class="flex flex-col lg:flex-row gap-4">
      <div class="w-full border rounded-lg p-5">
        <span class="text-2xl"> Análisis de ordenes </span>
        <span class="text-sm italic">Últimos 12 meses</span>
        <app-area />
      </div>
      <!--      <div class="w-full lg:w-2/6 border rounded-lg p-5">-->
      <!--        <span class="text-2xl"> Ganancias </span>-->
      <!--        <app-radial />-->
      <!--      </div>-->
    </article>
  </section>
</template>

<script>
import AppArea from "@/components/apexchart/AppArea.vue";

export default {
  components: { AppArea },
};
</script>
