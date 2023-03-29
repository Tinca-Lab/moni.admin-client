<template>
  <client-only>
    <apexchart
      type="radialBar"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </client-only>
</template>

<script>
export default {
  name: "AppRadial",
  data: () => ({
    series: [44, 55, 67, 83],
    chartOptions: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter(w) {
                // By default, this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249;
              },
            },
          },
        },
      },
      labels: ["Apples", "Oranges", "Bananas", "Berries"],
    },
  }),
};
</script>

<style scoped></style>
