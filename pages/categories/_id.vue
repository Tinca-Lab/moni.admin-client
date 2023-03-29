<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-header title="Categorias" label="Actualizar categoria" />
    <app-nav label-button="Editar categoria" @onEdit="onEdit" />
    <div class="w-full">
      <app-category-form
        v-model="category"
        :is-edit="isEditing"
        :is-mutating="isMutating"
        @onDelete="isDeleting = true"
        @change="onChange"
        @onCancel="onCancelChanges"
        @onLoadPicture="onPicture"
        @onSubmit="onUpdateCategory"
        @onDeleteSubcategory="onDeleteSubcategory"
      />
    </div>
    <!-- Modal for cancel -->
    <app-modal
      v-if="isCanceling"
      :title="'Cancelar'"
      :message="'¿Estás seguro que deseas cancelar? Los cambios no se guardarán.'"
      :type="'warning'"
      @onCancel="onCancelChanges"
      @onAccept="$router.go(-1)"
    />
    <!-- Modal for delete -->
    <app-modal
      v-if="isDeleting"
      :title="'Eliminar'"
      :message="'¿Estás seguro que deseas eliminar la cateogria?'"
      :type="'warning'"
      @onCancel="onCancelDelete"
      @onAccept="onDeleteCategory"
    />
  </div>
</template>

<script>
import AppHeader from "@/components/sections/AppHeader.vue";
import AppNav from "@/components/sections/AppNav.vue";
import AppCategoryForm from "@/components/forms/AppCategoryForm.vue";
import AppModal from "@/components/modals/AppModal.vue";

export default {
  name: "CategoryPage",
  components: { AppModal, AppNav, AppHeader, AppCategoryForm },
  layout: "AdminLayout",
  data: () => ({
    category: {},
    isEditing: false,
    isCanceling: false,
    isMutating: false,
    isDeleting: false,
    image: null,
  }),
  head() {
    return {
      title: this.category?.name
        ? `Editar Categoría ${this.category?.name.toUpperCase()} | MONI`
        : "Editar Categoría | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Actualiza y edita la información de tu categoría y sus subcategorías en MONI.
          Mantén actualizado el catálogo de tu tienda en línea para mejorar la experiencia de tus clientes.`,
        },
      ],
    };
  },
  async mounted() {
    await this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      this.category = await this.$axios.$get(
        `api/v1/categories/${this.$route.params.id}`
      );
    },
    async onUpdateCategory(category) {
      try {
        if (!this.isMutating && !this.image) {
          this.$notify({
            type: "warn",
            title: "¡Advertencia!",
            text: "No se han realizado cambios, por favor, realice cambios para guardar",
          });
          return;
        }
        await this.$axios.put("/api/v1/categories/" + this.$route.params.id, {
          name: category.name,
          active: category.active || false,
          featured: category.featured || false,
          image: this.image,
        });
        const requests = category.subcategories.map((subcategory) => {
          return subcategory.id
            ? this.$axios.put("/api/v1/subcategories/" + subcategory.id, {
                name: subcategory.name,
              })
            : this.$axios.post("/api/v1/subcategories", {
                name: subcategory.name,
                categoryId: category.id,
              });
        });
        await Promise.all(requests);
        await this.$router.push("/categories");
        this.$notify({
          title: "¡Exito!",
          text: "Hemos actualizado la categoria correctamente",
          type: "success",
        });
      } catch (error) {
        this.$notify({
          type: "error",
          title: "¡Algo salió mal!",
          text:
            error?.response?.data?.message ||
            "Error al actualizar la categoria",
        });
      }
    },
    async onDeleteCategory() {
      try {
        await this.$axios.delete("/api/v1/categories/" + this.category.id);
        this.$notify({
          type: "success",
          title: "¡Exito!",
          text: "Hemos eliminada la categoria correctamente",
        });
        await this.$router.push("/categories");
      } catch (error) {
        this.$notify({
          title: "¡Algo salió mal!",
          text: error.response.data.message || "Error al eliminar la categoria",
          type: "error",
        });
      }
    },
    async onDeleteSubcategory(id) {
      try {
        await this.$axios.delete("/api/v1/subcategories/" + id);
        await this.fetchCategory();
        this.$notify({
          type: "success",
          title: "¡Exito!",
          text: "Hemos eliminada la subcategoria correctamente",
        });
      } catch (error) {
        this.$notify({
          title: "¡Algo salió mal!",
          text:
            error?.response?.data?.message ||
            "Error al eliminar la subcategoria",
          type: "error",
        });
      }
    },
    onChange({ current, old }) {
      old.id ? (this.isMutating = true) : (this.isMutating = false);
    },
    onEdit() {
      this.isMutating ? this.onClose() : (this.isEditing = !this.isEditing);
    },
    onCancelDelete() {
      this.isCanceling = false;
      this.isDeleting = false;
    },
    onCancelChanges() {
      this.isCanceling = !this.isCanceling;
    },
    onPicture(image) {
      if (!image) return;
      this.isMutating = true;
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
