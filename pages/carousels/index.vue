<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-title title="Carruseles" />
    <nav v-if="!isLoading" class="flex items-center justify-end w-full">
      <nuxt-link
        title="Crear carrusel"
        to="/carousels/create"
        class="bg-black hover:bg-neutral-800 ease-in-out duration-150 px-10 py-2"
      >
        <span class="text-white uppercase">Crear carrusel</span>
      </nuxt-link>
    </nav>
    <template v-if="!carousels && isLoading === false">
      <app-not-found />
    </template>
    <template v-else-if="isLoading">
      <app-spinner :loading="isLoading" />
    </template>
    <app-data-table
      v-else
      v-model="currentPage"
      :prefix="'carousel'"
      :headers="headers"
      :data="metadata"
      :metadata="metadata"
      @onPageChange="onPageChange"
    />
  </div>
</template>


<script>
import { formatDate } from "@/plugins/libs";
import AppTitle from "@/components/texts/AppTitle.vue";
import AppDataTable from "@/components/data/AppDataTable.vue";
import AppNotFound from "@/components/spinner/AppNotFound.vue";
import AppSpinner from "@/components/spinner/AppSpinner.vue";

export default {
  name: "CarouselsPage",
  components: { AppSpinner, AppNotFound, AppDataTable, AppTitle },
  layout: "AdminLayout",
  data: () => ({
    isLoading: true,
    currentPage: 1,
    headers: [
      {
        text: "Imagen",
        value: "image"
      },
      {
        text: "Fecha de creación",
        value: "createdAt"
      },
      {
        text: "Fecha de actualización",
        value: "updatedAt"
      },
      {
        text: "Estado",
        value: "state"
      }
    ]
  }),
  computed: {
    carousels() {
      return this.$store.state.carousels.metadata;
    },
    metadata() {
      return this.$store.state.carousels.metadata;
    }
  },
  async mounted() {

    await this.$store.dispatch("carousels/fetchCarousels");
    this.isLoading = false;

  },
  methods: {
    onFormatDate(date) {
      return formatDate(date);
    },
    onPageChange() {
      console.log("");
    }
  }
};
</script>
