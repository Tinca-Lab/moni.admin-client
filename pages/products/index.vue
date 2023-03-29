<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-title title="Productos" />
    <nav v-if="!isLoading" class="flex items-center justify-end w-full">
      <nuxt-link
        title="Crear producto"
        to="/products/create"
        class="bg-black hover:bg-neutral-800 ease-in-out duration-150 px-10 py-2"
      >
        <span class="text-white uppercase">Crear producto</span>
      </nuxt-link>
    </nav>
    <template v-if="!products[0] && isLoading === false">
      <app-not-found />
    </template>
    <template v-else-if="isLoading">
      <app-spinner :loading="isLoading" />
    </template>
    <app-data-table
      v-else
      v-model="currentPage"
      :prefix="'products'"
      :headers="headers"
      :data="products"
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
  name: "ProductsPage",
  components: {
    AppSpinner,
    AppNotFound,
    AppDataTable,
    AppTitle,
  },
  layout: "AdminLayout",
  data: () => ({
    query: "",
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
        text: "Categoria",
        value: "category",
      },
      {
        text: "Subcategoria",
        value: "subcategory",
      },
      {
        text: "Precio",
        value: "price",
      },
      {
        text: "Stock",
        value: "stock",
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
    currentPage: 1,
    isLoading: true,
  }),
  head() {
    return {
      title: "Productos | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Con nuestra herramienta, visualiza y administra todos los productos registrados en tu cuenta en una sola página.
           Ahorra tiempo y aumenta la eficiencia de tu negocio. ¡Comienza ahora!`,
        },
      ],
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories;
    },
    products() {
      return this.$store.state.products.data;
    },
    metadata() {
      return this.$store.state.products.metadata;
    },
  },
  async mounted() {
    await this.$store.dispatch("products/fetchProducts");
    this.isLoading = false;
  },
  methods: {
    onLoadPictures() {
      const files = this.$refs.pictures.files;
      const array = Array.from(files);
      array.forEach((element) => {
        this.images.push(element);
      });
      this.images.forEach((element, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          document.getElementById(`image-${index}`).src = event.target.result;
        };
        reader.readAsDataURL(element);
      });
    },
    onPageChange(page) {
      if (page < 1 || page > this.metadata?.total) return;
      if (page === this.metadata?.current) return;
      this.$store.dispatch("products/fetchProducts", page);
    },
    onFormatDate(date) {
      return formatDate(date);
    },
    onFormatCurrency(product) {
      return formatCurrency(product.price);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
