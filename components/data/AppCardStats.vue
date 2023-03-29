<template>
  <article class="bg-white p-5">
    <section class="w-full flex justify-between items-center">
      <span class="font-bold text-2xl text-neutral-800">
        {{ statistic.count }}
      </span>
      <span class="text-blue-400">
        <app-icon-users v-if="statistic.title === 'Usuarios'" />
        <app-icon-products v-else-if="statistic.title === 'Productos'" />
        <app-icon-orders v-else />
      </span>
    </section>
    <span class="text-lg">{{ statistic.title }}</span>
    <span class="text-sm italic">Esta semana</span>
    <section class="w-full flex justify-start items-center mt-5">
      <span
        :class="[
          statistic.growth > 0
            ? 'text-green-700'
            : statistic.growth < 0
            ? 'text-red-700'
            : 'text-neutral-900',
        ]"
        class="mr-2"
      >
        <svg
          v-if="statistic.growth > 0"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-arrow-up-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
          />
        </svg>
        <svg
          v-else-if="statistic.growth < 0"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-arrow-down-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </span>
      <span class="text-neutral-400 mr-5">
        {{ statistic.weekly }}
      </span>
      <span class="text-neutral-400"> {{ statistic.growth }}% </span>
    </section>
  </article>
</template>

<script>
import AppIconProducts from "@/components/icons/AppIconProducts.vue";
import AppIconUsers from "@/components/icons/AppIconUsers.vue";
import AppIconOrders from "@/components/icons/AppIconOrders.vue";

export default {
  name: "AppCardStats",
  components: { AppIconOrders, AppIconUsers, AppIconProducts },
  props: {
    statistic: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
