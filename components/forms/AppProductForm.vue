<template>
  <form
    class="grid grid-cols-1 xl:grid-cols-2 xl:text-xl h-min gap-12"
    @submit.prevent="onSubmit"
  >
    <div class="w-full h-max xl:pr-2 relative block">
      <app-product-images
        :disabled="!isEditing"
        :images="product.images"
        @onAddImage="onAddImage"
        @onDeleteImage="onDeleteImage"
        @onMainPicture="onMainPicture"
      />
      <app-button
        v-if="$route.params.id"
        class="uppercase bg-red-700 py-2 mt-3 mb-3 md:mb-0 md:mt-12 min-w-fit md:w-1/2 whitespace-nowrap"
        @onClick="onDelete"
      >
        Eliminar producto
      </app-button>
    </div>
    <div class="flex h-full flex-col xl:pl-2 relative">
      <div class="flex flex-col mb-3">
        <label for="name"> Nombre del producto </label>
        <app-input
          id="name"
          v-model="product.name"
          class="px-5 py-1 border"
          :placeholder="'Nombre del producto'"
          :type="'text'"
          required
          :disabled="!isEditing"
        />
      </div>
      <div class="flex flex-col my-3">
        <label for="description"> Descripcion del producto </label>
        <textarea
          v-model="product.description"
          class="bg-white border border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
          placeholder="Descripcion corta"
          maxlength="512"
          :disabled="!isEditing"
          rows="3"
        />
      </div>
      <div class="flex flex-col my-3">
        <label for="category"> Categoria </label>
        <select
          id="category"
          v-model="product.categoryId"
          class="bg-white border border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
          required
          :disabled="!isEditing"
          @change="onSubcategories(product.categoryId)"
        >
          <option selected disabled>Seleccione una categoria</option>
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col my-3">
        <label for="subcategory"> Subcategoria </label>
        <select
          id="subcategory"
          v-model="product.subcategoryId"
          class="bg-white border border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
          required
          :disabled="!isEditing"
        >
          <option selected disabled>Seleccione una subcategoria</option>
          <option
            v-for="(subcategory, index) in subcategories"
            :key="index"
            :value="subcategory.id"
          >
            {{ subcategory.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col my-3">
        <label for="name"> Precio </label>
        <app-input
          :id="'price'"
          v-model="product.price"
          class="px-5 py-1 border"
          :type="'number'"
          :disabled="!isEditing"
          :placeholder="'Precio'"
          required
        />
      </div>
      <div class="flex flex-col my-3">
        <label for="quantity"> Cantidad </label>
        <app-input
          id="quantity"
          v-model="product.quantity"
          class="px-5 py-1 border"
          type="number"
          :disabled="!isEditing"
          placeholder="Cantidad"
          required
        />
      </div>
      <div class="my-2 ml-1">
        <label class="block">Destacado</label>
        <label
          for="featured"
          class="inline-flex relative items-center cursor-pointer"
        >
          <input
            id="featured"
            v-model="product.featured"
            type="checkbox"
            :disabled="!isEditing"
            :checked="product.featured"
            class="sr-only peer"
          />
          <span
            class="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neutral-300 dark:peer-focus:ring-neutral-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-neutral-600 peer-checked:bg-neutral-700"
          />
        </label>
        <span :class="product.featured ? 'text-green-800' : ''">
          {{ product.featured ? "Destacado" : "No destacado" }}
        </span>
      </div>
      <div class="mt-3 ml-1">
        <label class="block">Publicar</label>
        <label
          for="active"
          class="inline-flex relative items-center cursor-pointer"
        >
          <input
            id="active"
            v-model="product.active"
            type="checkbox"
            :disabled="!isEditing"
            :checked="product.active"
            class="sr-only peer"
          />
          <span
            class="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neutral-300 dark:peer-focus:ring-neutral-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-neutral-600 peer-checked:bg-neutral-700"
          />
        </label>
        <span :class="product.active ? 'text-green-800' : ''">
          {{ product.active ? "Publicado" : "No publicado" }}
        </span>
      </div>
      <div class="flex flex-col pt-2">
        <div class="flex w-full gap-4">
          <app-button
            :disabled="isSaving || !(isMutating && isEditing)"
            class="px-5 py-2 uppercase w-1/2 disabled:cursor-not-allowed"
            type="submit"
          >
            {{ isSaving ? "Cargando..." : "Guardar" }}
          </app-button>
          <app-button
            :disabled="isEditing === false && !isMutating"
            class="px-5 py-2 uppercase w-1/2"
            @onClick="onCancel"
          >
            Cancelar
          </app-button>
          'mutating' {{ isMutating }} 'editing' {{ isEditing }} 'disabled'
          {{ !(isMutating && isEditing) }}
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import AppProductImages from "@/components/forms/AppProductImages.vue";
import AppButton from "@/components/buttons/AppButton.vue";
import AppInput from "@/components/input/AppInput.vue";

export default {
  name: "AppProductForm",
  components: {
    AppInput,
    AppButton,
    AppProductImages,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    isEditing: {
      type: Boolean,
      default: true,
    },
    isMutating: {
      type: Boolean,
      default: false,
    },
    isSaving: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    categories: [],
    subcategories: [],
    // images: [],
    isPrincipal: false,
  }),
  computed: {
    product: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  async mounted() {
    this.$forceUpdate();
    await this.fetchCategories();
    if (this.product.images) {
      if (this.product.image) {
        this.product.images.push({
          url: this.product.image,
        });
      }
    }
    // this.images = this.product.images;
    if (this.product.categoryId)
      this.subcategories = this.categories.find(
        (category) => category.id === this.product.categoryId
      )?.subcategories;
  },
  methods: {
    async fetchCategories() {
      try {
        const { categories } = await this.$axios.$get("/api/v1/categories");
        this.categories = categories;
      } catch {
        this.categories = [];
      }
    },
    async onDeleteImage(index) {
      const image = this.product.images[index];
      if (image.id || image.url) {
        if (!image.id) {
          this.$notify({
            type: "warn",
            title: "Oops! No podemos hacer esto",
            text: "Cambia tu imagen principal antes de eliminarla",
          });
        } else {
          await this.$axios
            .delete(`/api/v1/products/${this.product.id}?url=${image.url}`)
            .then(() => {
              this.$notify({
                type: "success",
                title: "Exito",
                text: "Hemos eliminado la imagen correctamente",
              });
              this.$emit("update:product");
            });
        }
      } else {
        this.product.images.splice(index, 1);
      }
    },
    onAddImage(image) {
      // this.images.push(image);
      this.product.images.push(image);
    },
    onMainPicture(index) {
      this.product.images[index].isPrincipal = true;
    },
    onSubcategories(id) {
      this.subcategories = this.categories.find(
        (category) => category.id === id
      )?.subcategories;
    },
    onSubmit() {
      this.$emit("onSubmit");
    },
    onDelete() {
      this.$emit("onDelete");
    },
    onCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>

<style scoped></style>
