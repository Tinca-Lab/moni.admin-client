<template>
  <div>
    <client-only>
      <apexchart
        v-if="chartOptions && series"
        type="area"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  name: "AppArea",
  data() {
    return {
      chartOptions: null,
      series: null,
    };
  },
  mounted() {
    this.$axios.get("/api/v1/orders/stats").then((res) => {
      this.chartOptions = {
        chart: {
          id: "data-analytics",
        },
        xaxis: {
          categories: res.data.dates,
        },
      };
      this.series = [
        {
          name: "Ventas",
          data: res.data.metrics,
        },
      ];
    });
  },
};
</script>

<style scoped></style>
