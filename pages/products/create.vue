<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-header title="Productos" label="Agregar producto" />
    <app-nav />
    <div class="w-full mt-5">
      <app-product-form
        v-model="product"
        :is-mutating="true"
        :is-saving="isSaving"
        @onSubmit="onCreateProduct"
        @onCancel="onCancel"
      />
    </div>
    <app-modal
      v-if="isCancel"
      :title="'Cancelar'"
      :message="'¿Estás seguro que deseas cancelar? Los cambios no se guardarán.'"
      :type="'warning'"
      @onCancel="isCancel = false"
      @onAccept="$router.go(-1)"
    />
  </div>
</template>

<script>
import AppHeader from "@/components/sections/AppHeader.vue";
import AppNav from "@/components/sections/AppNav.vue";
import AppModal from "@/components/modals/AppModal.vue";
import AppProductForm from "@/components/forms/AppProductForm.vue";

export default {
  name: "CreateProductPage",
  components: { AppProductForm, AppModal, AppNav, AppHeader },
  layout: "AdminLayout",
  data: () => ({
    isCancel: false,
    isSaving: false,
    subcategories: [],
    product: {
      images: [],
    },
  }),
  head() {
    return {
      title: "Crear producto | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Simplifica tu proceso de creación de productos con nuestra plataforma.
           Añade detalles clave como imágenes, precios, categorías y stock con facilidad. No pierdas más tiempo y aumenta tu rentabilidad con nosotros.`,
        },
      ],
    };
  },
  methods: {
    onCancel() {
      if (Object.keys(this.product).length === 1) {
        this.$router.go(-1);
        return;
      }
      this.isCancel = true;
    },
    onClose() {
      this.isCancel = false;
    },
    async onCreateProduct() {
      try {
        this.isSaving = true;
        const product = {
          name: this.product.name || null,
          description: this.product.description || null,
          price: Number(this.product.price) || 0,
          quantity: parseInt(this.product.quantity) || 0,
          active: this.product.active || false,
          featured: this.product.featured || false,
          images: this.product.images || null,
          categoryId: this.product.categoryId || null,
          subcategoryId: this.product.subcategoryId || null,
        };
        await this.$axios.post("/api/v1/products", product);
        this.$notify({
          title: "Exito",
          text: "Hemos creado el producto correctamente",
          type: "success",
        });
        await this.$router.push("/products");
      } catch (error) {
        this.isSaving = false;
        this.$notify({
          title: "¡Algo salió mal!",
          text:
            error?.response?.data?.message || "No pudimos crear el producto",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped></style>
