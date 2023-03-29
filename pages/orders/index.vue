<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-title title="Ordenes" />
    <div v-if="!orders[0] && isLoading === false">
      <app-not-found />
    </div>
    <div v-else-if="isLoading">
      <app-spinner :loading="isLoading" />
    </div>
    <app-data-table
      v-else
      v-model="currentPage"
      :prefix="'orders'"
      :headers="headers"
      :data="orders"
      :metadata="metadata"
      @onPageChange="onPageChange"
    />
  </div>
</template>

<script>
import { formatCurrency, formatDate } from "@/plugins/libs";
import AppTitle from "@/components/texts/AppTitle.vue";
import AppDataTable from "@/components/data/AppDataTable.vue";
import AppNotFound from "@/components/spinner/AppNotFound.vue";
import AppSpinner from "@/components/spinner/AppSpinner.vue";

export default {
  name: "OrdersPage",
  components: { AppSpinner, AppNotFound, AppDataTable, AppTitle },
  layout: "AdminLayout",
  data: () => ({
    headers: [
      {
        text: "Referencia",
        value: "reference",
      },
      {
        text: "Cliente",
        value: "customer",
      },
      {
        text: "Descuento aplicado",
        value: "discount",
      },
      {
        text: "Total",
        value: "total",
      },
      {
        text: "Dirección",
        value: "address",
      },
      {
        text: "Fecha de venta",
        value: "createdAt",
      },
      {
        text: "Estado de transacción",
        value: "transactionStatus",
      },
      {
        text: "Estado de envío",
        value: "shippingStatus",
      },
    ],
    currentPage: 1,
    isLoading: true,
  }),
  head() {
    return {
      title: "Ventas | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Conóce el estado de tus ventas y haz seguimiento a los detalles de cada una de ellas.
          Mantente al día con tus ventas y maximiza tus ganancias con nuestra práctica y sencilla herramienta de tracking en órdenes.`,
        },
      ],
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders.data;
    },
    metadata() {
      return this.$store.state.orders.metadata;
    },
  },
  async mounted() {
    await this.$store.dispatch("orders/fetchOrders");
    this.isLoading = false;
  },
  methods: {
    onPageChange(page) {
      if (page < 1 || page > this.metadata?.total) return;
      if (page === this.metadata?.current) return;
      this.$store.dispatch("orders/fetchOrders", page);
    },
    onFormatDate(value) {
      return formatDate(value);
    },
    onFormatCurrency(value) {
      return formatCurrency(value);
    },
  },
};
</script>

<style scoped></style>
