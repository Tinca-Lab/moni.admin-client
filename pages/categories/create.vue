<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-header title="Categorias" label="Agregar categoria" />
    <app-nav />
    <div class="w-full">
      <app-category-form
        v-model="category"
        :is-mutating="true"
        @onCancel="isCancel = !isCancel"
        @onSubmit="onSubmit"
        @onLoadPicture="onPicture"
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
import AppCategoryForm from "@/components/forms/AppCategoryForm.vue";
import AppModal from "@/components/modals/AppModal.vue";

export default {
  name: "CategoriesCreatePage",
  components: { AppModal, AppNav, AppHeader, AppCategoryForm },
  layout: "AdminLayout",
  data: () => ({
    category: {
      subcategories: [],
    },
    image: null,
    isCancel: false,
  }),
  head() {
    return {
      title: "Crear Categoría | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Crea nuevas categorías y subcategorías para tu tienda en línea.
           Mejora la organización de tus productos y permite a tus clientes encontrar fácilmente lo que están buscando. ¡Comienza a crear tu catálogo de productos hoy mismo!`,
        },
      ],
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await this.$axios.post("/api/v1/categories", {
          name: this.category.name,
          active: this.category.active,
          featured: this.category.featured,
          image: this.image,
        });
        if (!this.category.subcategories) return;
        const subcategories = this.category?.subcategories?.map(
          (subcategory) => {
            return this.$axios.post("/api/v1/subcategories", {
              name: subcategory.name,
              categoryId: data.id,
            });
          }
        );
        await Promise.all(subcategories);
        await this.$router.push("/categories");
        this.$notify({
          title: "¡Exito!",
          text: "Hemos guardado la categoria",
          type: "success",
        });
      } catch (error) {
        this.$notify({
          type: "error",
          title: "¡Algo salió mal!",
          text:
            error?.response?.data?.message ||
            "No hemos podido crear la categoria",
        });
      }
    },
    onPicture(image) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.replace(/^data:(.*;base64,)?/, "");
        this.image = {
          filename: image.name,
          filetype: image.type,
          data: base64String,
        };
      };
      reader.readAsDataURL(image);
    },
  },
};
</script>

<style scoped></style>
