<template>
  <form
    class="grid grid-cols-1 xl:grid-cols-2 xl:text-xl h-min gap-12"
    @submit.prevent="onSubmit"
  >
    <div class="w-full h-max xl:pr-2 relative block">
      <app-product-images
        :disabled="!isEditing"
        :images="images"
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
        <label for="textButton"> Texto del boton </label>
        <app-input
          id="textButton"
          v-model="product.name"
          class="px-5 py-1 border"
          :placeholder="'Que texto desea que aparezca en el boton'"
          :type="'text'"
          required
          :disabled="!isEditing"
        />
      </div>
      <div class="flex flex-col my-3">
        <label for="url"> Url del boton </label>
        <app-input
          id="url"
          v-model="product.name"
          class="px-5 py-1 border"
          :placeholder="'Que texto desea que aparezca en el boton'"
          :type="'text'"
          required
          :disabled="!isEditing"
        />
      </div>
      <div class="flex flex-col my-3">
        <label for="descrip"> Texto abajo de la imagen </label>
        <app-input
          id="descrip"
          v-model="product.name"
          class="px-5 py-1 border"
          :placeholder="'Que texto desea que aparezca en el boton'"
          :type="'text'"
          required
          :disabled="!isEditing"
        />
      </div>
      <div class="flex flex-col my-3">
        <label for="aliV"> Alineacion Vertical </label>
        <select
          id="aliV"
          v-model="product.subcategoryId"
          class="bg-white border border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
          required
          :disabled="!isEditing"
        >
          <option selected disabled>Seleccione una alineacion Vertical</option>
          <option
            v-for="(item, index) in alienacionV"
            :key="index"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col my-3">
        <label for="aliH"> Alineacion Horizontal </label>
        <select
          id="aliH"
          v-model="product.subcategoryId"
          class="bg-white border border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
          required
          :disabled="!isEditing"
        >
          <option selected disabled>Seleccione una alineacion Horizontal</option>
          <option
            v-for="(item, index) in AlineacionH"
            :key="index"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
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
    images: [
      {
        id: 0,
        url:'https://cdn.tincalab.com/82624ed5-72c5-42b5-bebf-698ece39f4fc/data/carousel/29f4ffbe-191a-47ab-867c-fdc3e14f27fe'
      }
      ,
      {
        id:1,
        url:'https://cdn.tincalab.com/82624ed5-72c5-42b5-bebf-698ece39f4fc/data/carousel/eb4635da-0abc-4744-a445-807dcfcc7572'
      }
    ],
    alienacionV: [
      { name: "Izquierda", value: "left" },
      { name: "Centro", value: "center" },
      { name: "Derecha", value: "right" },
    ],
    AlineacionH: [
      { name: "Arriba", value: "top" },
      { name: "Centro", value: "center" },
      { name: "Abajo", value: "bottom" },
    ],
    categories: [],
    subcategories: [],
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
      const image = this.images[index];
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
      this.images.push(image);
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
