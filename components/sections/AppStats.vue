<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-12 border rounded-lg py-2">
    <app-card-stats
      v-for="(statistic, index) in stats"
      :key="index"
      :class="index === 1 ? 'border-l border-r' : ''"
      :statistic="statistic"
    />
  </div>
</template>

<script>
import AppCardStats from "@/components/data/AppCardStats.vue";

export default {
  name: "AppStats",
  components: { AppCardStats },
  data: () => ({
    stats: [
      {
        title: "Usuarios",
        count: 0,
        weekly: 0,
        growth: 0,
      },
      {
        title: "Productos",
        count: 0,
        weekly: 0,
        growth: 0,
      },
      {
        title: "Pedidos",
        count: 0,
        weekly: 0,
        growth: 0,
      },
    ],
    orders: [],
  }),
  mounted() {
    this.fetchUsersCount();
    this.fetchProductsCount();
    this.fetchOrdersCount();
  },
  methods: {
    async fetchUsersCount() {
      await this.fetchCount("users", "Usuarios");
    },
    async fetchProductsCount() {
      await this.fetchCount("products", "Productos");
    },
    async fetchOrdersCount() {
      await this.fetchCount("orders", "Pedidos");
    },
    async fetchCount(property, title) {
      const count = await this.$axios.$get(`/api/v1/${property}/count`);
      const metric = this.stats.find((stat) => stat.title === title);
      metric.count = count;
      const { week, growth } = await this.$axios.$get(
        `/api/v1/${property}/weeks`
      );
      metric.weekly = week;
      metric.growth = growth;
    },
  },
};
</script>

<style scoped></style>
