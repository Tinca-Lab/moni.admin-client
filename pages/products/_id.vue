<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-header title="Productos" label="Editar producto" />
    <div class="w-full h-min">
      <app-nav class="mb-5" label-button="Editar producto" @onEdit="onEdit" />
      <p v-if="product?.reference">
        REF: <span class="italic"> {{ product.reference }}</span>
      </p>
      <app-product-form
        v-if="!isLoading && product"
        v-model="product"
        :is-editing="isEdit"
        :is-mutating="isMutating"
        @onSubmit="onUpdateProduct"
        @onDelete="onDeleting"
        @onCancel="onCancel"
        @onLoadPictures="onLoadPictures"
        @update:product="fetchProduct"
      />
    </div>
    <app-spinner :loading="isLoading" />
    <!-- Modal for cancel -->
    <app-modal
      v-if="isCancel"
      :title="'Cancelar'"
      :message="'¿Estás seguro que deseas cancelar? Los cambios no se guardarán.'"
      :type="'warning'"
      @onCancel="onClose"
      @onAccept="onConfirm"
    />
    <!-- Modal for delete -->
    <app-modal
      v-if="isDeleting"
      :title="'Eliminar'"
      :message="'¿Estás seguro que deseas eliminar el producto?'"
      :type="'warning'"
      :disabled="isLoading"
      @onCancel="onClose"
      @onAccept="onDelete"
    />
  </div>
</template>

<script>
import AppNav from "@/components/sections/AppNav.vue";
import AppSpinner from "@/components/spinner/AppSpinner.vue";
import AppHeader from "@/components/sections/AppHeader.vue";
import AppProductForm from "@/components/forms/AppProductForm.vue";
import AppModal from "@/components/modals/AppModal.vue";

export default {
  name: "EditProduct",
  components: { AppModal, AppProductForm, AppHeader, AppSpinner, AppNav },
  layout: "AdminLayout",
  data: () => ({
    subcategories: [],
    images: [],
    product: {},
    isEdit: false,
    isCancel: false,
    isMutating: false,
    isDeleting: false,
    isLoading: false,
  }),
  head() {
    return {
      title: this.category?.name
        ? `Editar Producto ${this.product?.name.toUpperCase()} | MONI`
        : "Editar Producto | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Controla y actualiza tus productos de manera fácil y rápida con nuestra herramienta.
           Actualiza detalles clave como stock, precios, categorías e imágenes para mantener tu negocio en constante crecimiento.
           ¡Comienza a aumentar tus ventas hoy mismo!`,
        },
      ],
    };
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchProduct();
    this.isLoading = false;
  },
  methods: {
    async onUpdateProduct() {
      try {
        this.isLoading = true;
        await this.$axios.put(`/api/v1/products/${this.product.id}`, {
          name: this.product.name,
          description: this.product.description,
          price: parseFloat(this.product.price),
          quantity: Number(this.product.quantity),
          active: this.product.active || false,
          featured: this.product.featured || false,
          categoryId: this.product.categoryId,
          subcategoryId: this.product.subcategoryId,
          images: this.product.images,
        });
        this.$notify({
          title: "Exito",
          text: "Hemos actualizado el producto correctamente",
          type: "success",
        });
        await this.$router.push("/products");
      } catch (error) {
        this.isLoading = true;
        this.$notify({
          title: "¡Algo salió mal!",
          text:
            error?.response?.data?.message ||
            "No hemos podido actualizar el producto",
          type: "error",
        });
      }
    },
    async onDelete() {
      try {
        this.isLoading = true;
        await this.$axios.delete("/api/v1/products/" + this.product.id);
        this.$notify({
          title: "Exito",
          text: "Hemos eliminado el producto correctamente",
          type: "success",
        });
        await this.$router.push("/products");
      } catch (error) {
        this.isLoading = true;
        this.$notify({
          title: "¡Algo salió mal!",
          text:
            error?.response?.data?.message || "No se pudo eliminar el producto",
          type: "error",
        });
      }
    },
    async fetchProduct() {
      this.product = await this.$store.dispatch(
        "products/fetchProduct",
        this.$route.params.id
      );
    },
    onEdit() {
      if (this.isMutating) {
        this.onClose();
      } else {
        this.isEdit = !this.isEdit;
      }
    },
    onConfirm() {
      this.isCancel = false;
      this.$router.go(-1);
    },
    onClose() {
      this.isCancel = false;
      this.isDeleting = false;
      this.isMutating = false;
      this.isEdit = false;
    },
    onCancel() {
      this.isCancel = true;
    },
    onDeleting() {
      this.isDeleting = true;
    },
    onLoadPictures(images) {
      this.images = images;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
