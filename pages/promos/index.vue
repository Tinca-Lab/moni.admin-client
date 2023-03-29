<template>
  <div class="w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-title title="Descuentos" />
    <nav v-if="!isLoading" class="flex items-center justify-end w-full">
      <nuxt-link to="/promos/create" class="bg-black px-10 py-2">
        <span class="text-white uppercase">Crear código</span>
      </nuxt-link>
    </nav>
    <div v-if="!promos[0] && isLoading === false">
      <app-not-found />
    </div>
    <div v-else-if="isLoading">
      <app-spinner :loading="isLoading" />
    </div>
    <app-data-table
      v-else
      :headers="headers"
      :data="promos"
      :prefix="'promos'"
    />
  </div>
</template>

<script>
import AppDataTable from "@/components/data/AppDataTable.vue";
import AppTitle from "@/components/texts/AppTitle.vue";
import AppNotFound from "@/components/spinner/AppNotFound.vue";
import AppSpinner from "@/components/spinner/AppSpinner.vue";

export default {
  name: "PromosPage",
  components: { AppSpinner, AppNotFound, AppTitle, AppDataTable },
  layout: "AdminLayout",
  data: () => ({
    headers: [
      {
        text: "Codigo",
        value: "code",
      },
      {
        text: "Descuento",
        value: "discount",
      },
      {
        text: "Fecha de creacion",
        value: "createdAt",
      },
      {
        text: "Fecha de modificacion",
        value: "updatedAt",
      },
      {
        text: "Fecha de inicio",
        value: "startDate",
      },
      {
        text: "Fecha de expiracion",
        value: "endDate",
      },
      {
        text: "Estado",
        value: "active",
      },
    ],
    isLoading: true,
  }),
  head() {
    return {
      title: "Códigos Promocionales | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Administra y gestiona todos los códigos promocionales de la tienda en línea.
          Descubre nuestras promociones y descuentos exclusivos y ofrécelos a tus clientes. ¡Comienza a crear y administrar tus códigos promocionales hoy mismo y aumenta tus ventas!`,
        },
      ],
    };
  },
  computed: {
    promos() {
      return this.$store.state.promos.data;
    },
    metadata() {
      return this.$store.state.promos.metadata;
    },
  },
  async mounted() {
    await this.$store.dispatch("promos/fetchPromos");
    this.isLoading = false;
  },
  methods: {
    onCreatePromo() {
      this.$router.push("/promos/create");
    },
  },
};
</script>
