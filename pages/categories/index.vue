<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-title title="Categorias" />
    <nav v-if="!isLoading" class="flex items-center justify-end w-full">
      <nuxt-link to="/categories/create" class="bg-black px-10 py-2">
        <span class="text-white uppercase">Crear categoria</span>
      </nuxt-link>
    </nav>
    <template v-if="!categories[0] && isLoading === false">
      <app-not-found />
    </template>
    <template v-else-if="isLoading">
      <app-spinner :loading="isLoading" />
    </template>
    <app-data-table
      v-else
      v-model="currentPage"
      :headers="headers"
      :data="categories"
      :prefix="'categories'"
      :metadata="metadata"
      @onPageChange="onPageChange"
    />
  </div>
</template>

<script>
import { formatDate } from "@/plugins/libs";
import AppDataTable from "@/components/data/AppDataTable.vue";
import AppTitle from "@/components/texts/AppTitle.vue";
import AppNotFound from "@/components/spinner/AppNotFound.vue";
import AppSpinner from "@/components/spinner/AppSpinner.vue";

export default {
  name: "CategoriesPage",
  components: { AppSpinner, AppNotFound, AppTitle, AppDataTable },
  layout: "AdminLayout",
  data: () => ({
    headers: [
      {
        text: "Imagen",
        value: "image",
      },
      {
        text: "Nombre",
        value: "name",
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
        text: "Estado",
        value: "active",
      },
    ],
    isLoading: true,
    currentPage: 1,
  }),
  head() {
    return {
      title: "Categorías | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Administra y gestiona todas las categorías de productos disponibles en la tienda en línea Nombre de la Tienda.
           Mantén actualizado y organizado el catálogo de tu tienda en línea para mejorar la experiencia de tus clientes. ¡Comienza a administrar tus categorías hoy mismo!`,
        },
      ],
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.data;
    },
    metadata() {
      return this.$store.state.categories.metadata;
    },
  },
  async mounted() {
    await this.$store.dispatch("categories/fetchCategories");
    this.isLoading = false;
  },
  methods: {
    onFormatDate(date) {
      return formatDate(date);
    },
    onPageChange(page) {
      if (page < 1 || page > this.metadata?.total) return;
      if (page === this.metadata?.current) return;
      this.$store.dispatch("categories/fetchCategories", page);
    },
  },
};
</script>

<style scoped></style>
