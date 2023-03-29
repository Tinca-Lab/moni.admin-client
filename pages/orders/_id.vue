<template>
  <div class="w-full h-min lg:h-full p-5 xl:px-20 xl:py-10 md:overflow-x-auto">
    <app-title title="Ordenes" />
    <app-label label="Ver orden" />
    <app-back class="mb-2.5" @onClick="$router.go(-1)" />
    <div class="w-full flex flex-col items-center justify-center">
      <section
        class="w-full flex flex-col items-start md:w-4/6 self-start xl:pr-8"
      >
        <div class="flex items-center">
          <label class="text-lg">ESTADO</label>
          <button
            v-if="order?.shippingStatus"
            class="mx-5 px-5 py-2"
            :class="[
              order?.shippingStatus === 'PENDING'
                ? 'text-neutral-800 bg-neutral-300'
                : 'bg-green-100 text-green-800',
            ]"
            @click="onUpdateStatus"
          >
            {{
              order?.shippingStatus === "PENDING"
                ? "PENDIENTE"
                : order?.shippingStatus === "SHIPPED"
                ? "ENVIADO"
                : order?.shippingStatus === "CANCELLED"
                ? "CANCELADO"
                : "ENTREGADO"
            }}
          </button>
        </div>
        <section class="flex items-center justify-between w-full my-5">
          <span class="font-bold text-xl"> Detalles de compra </span>
          <span class="text-md"> Número de orden: {{ order?.reference }} </span>
        </section>
      </section>
      <div class="flex flex-col lg:flex-row w-full gap-12">
        <div class="lg:w-4/6 w-full">
          <div
            class="overflow-x-auto relative lg:max-w-full border border-neutral-500"
          >
            <table
              class="text-sm text-left text-neutral-500 dark:text-neutral-400 w-full"
            >
              <thead
                class="text-xs text-neutral-700 uppercase bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Producto</th>
                  <th scope="col" class="px-6 py-3">SKU</th>
                  <th scope="col" class="px-6 py-3">Cantidad</th>
                  <th scope="col" class="px-6 py-3">Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in order?.items"
                  :key="item.id"
                  class="bg-white border-b dark:bg-neutral-800 border-neutral-400 hover:bg-neutral-200 cursor-pointer"
                >
                  <th scope="row" class="items-center whitespace-nowrap">
                    {{ item.product?.name }}
                  </th>
                  <th
                    scope="row"
                    class="p-2 font-medium text-neutral-900 dark:text-white"
                  >
                    {{ item.product?.reference }}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-neutral-900 dark:text-white"
                  >
                    {{ item.quantity }}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-neutral-900 dark:text-white whitespace-nowrap"
                  >
                    {{ item.product?.price }}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <section
            class="pt-10 px-5 flex flex-col border-b border-l border-r border-neutral-500 items-end w-full"
          >
            <span class="font-bold text-lg">
              Subtotal:
              <span class="font-normal">{{
                onFormatCurrency(order?.total)
              }}</span>
            </span>
            <span class="font-bold text-lg">
              IVA:
              <span class="font-normal">{{
                onFormatCurrency(order?.total * 0.19)
              }}</span>
            </span>
            <span class="font-bold">
              Envio:
              <span class="font-normal">{{
                onFormatCurrency(order?.total)
              }}</span>
            </span>
            <span class="font-bold mt-10 mb-5">
              Total:
              <span class="font-normal">{{
                onFormatCurrency(order?.total)
              }}</span>
            </span>
          </section>
        </div>
        <div class="lg:w-2/6 w-full">
          <section class="mb-5">
            <span class="font-bold text-xl"> Historial de pedido </span>
            <aside
              class="border border-neutral-500 p-5 flex flex-col mt-5 overflow-x-auto"
            >
              <div class="w-full flex justify-between">
                <span class="text-lg"> Venta recibida </span>
                <span class="text-lg ml-2">
                  {{ onFormatDate(order?.createdAt) }}
                </span>
              </div>
            </aside>
          </section>
          <section class="mb-5">
            <span class="font-bold text-xl"> Detalles de facturacion </span>
            <aside
              class="border border-neutral-500 p-5 flex flex-col mt-5 overflow-x-auto"
            >
              <div class="w-full flex justify-between">
                <span class="text-lg"> Nombre </span>
                <span class="text-lg">
                  {{ order?.user?.profile?.firstname }}
                  {{ order?.user?.profile?.lastname }}
                </span>
              </div>
              <div class="w-full flex justify-between">
                <span class="text-lg"> Correo electronico </span>
                <span class="text-lg">
                  {{ order?.user?.email }}
                </span>
              </div>
              <div class="w-full flex justify-between">
                <span class="text-lg"> Pago </span>
                <span
                  class="text-lg uppercase"
                  :class="[
                    order?.transactionStatus === 'SUCCESS'
                      ? ''
                      : 'text-red-500 font-bold',
                  ]"
                >
                  {{
                    order?.transactionStatus === "SUCCESS"
                      ? "Pagado"
                      : "Pendiente"
                  }}
                </span>
              </div>
            </aside>
          </section>
          <section class="mb-5">
            <span class="font-bold text-xl"> Detalles de envio </span>
            <aside
              class="border border-neutral-500 p-5 flex flex-col mt-5 overflow-x-auto"
            >
              <div class="w-full flex justify-between">
                <span class="text-lg"> Nombre </span>
                <span class="text-lg">
                  {{ order?.address?.name }}
                </span>
              </div>
              <div class="w-full flex justify-between items-center">
                <span class="text-lg"> Dirección </span>
                <span class="text-sm whitespace-nowrap">
                  {{ order?.address?.address }}
                  {{ order?.address?.city?.name }},
                  {{ order?.address?.city?.state?.name }}
                </span>
              </div>
              <div class="w-full flex justify-between">
                <span class="text-lg"> Correo electronico </span>
                <span class="text-lg">
                  {{ order?.user?.email }}
                </span>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatCurrency, formatDate } from "@/plugins/libs";
import AppTitle from "@/components/texts/AppTitle.vue";
import AppLabel from "@/components/texts/AppLabel.vue";
import AppBack from "@/components/buttons/AppBack.vue";

export default {
  name: "OrderPage",
  components: { AppBack, AppLabel, AppTitle },
  layout: "AdminLayout",
  data: () => ({
    isSend: false,
    order: {},
  }),
  head() {
    return {
      title: "Orden " + this.order?.reference,
    };
  },
  async mounted() {
    try {
      this.order = await this.$axios.$get(
        `/api/v1/orders/${this.$route.params.id}`
      );
    } catch (error) {
      this.$notify({
        type: "error",
        title: "Error",
        text: "No se pudo cargar la orden",
      });
    }
  },
  methods: {
    async onUpdateStatus() {
      try {
        if (this.order?.sendStatus === "PENDING") {
          await this.$axios.put(`/api/v1/orders/${this.$route.params.id}`, {
            shippingStatus: "COMPLETED",
          });
        } else {
          await this.$axios.put(`/api/v1/orders/${this.$route.params.id}`, {
            shippingStatus: "PENDING",
          });
        }
        this.order = await this.$axios.get(
          `/api/v1/orders/${this.$route.params.id}`
        );
      } catch {
        this.$notify({
          type: "error",
          title: "Error",
          text: "No se pudo actualizar el estado",
        });
      }
    },
    onFormatCurrency(value) {
      return formatCurrency(value);
    },
    onFormatDate(date) {
      return formatDate(date);
    },
  },
};
</script>

<style scoped></style>
