<template>
  <form
    class="container xl:px-32 md:py-10 xl:text-xl"
    @submit.prevent="onSubmit"
  >
    <div class="flex">
      <div class="min-w-min">
        <div
          v-if="image !== null"
          class="details__pictures w-full mb-5 max-h-max relative"
          :class="[
            image !== null ? 'w-40 h-40' : 'w-40 h-40',
            'bg-neutral-200',
          ]"
        >
          <div v-if="image" class="flex w-40 h-40 mt-4 rounded-lg">
            <img
              id="image"
              class="object-cover h-full w-full"
              :src="`${image}`"
              :alt="image"
            />
          </div>
        </div>
        <div v-else class="details__pictures w-full mb-5 max-h-max relative">
          <div class="flex w-40 h-40 mt-4 rounded-lg">
            <img
              class="object-cover w-full h-full"
              :src="category?.image"
              :alt="category?.image"
            />
          </div>
        </div>
        <input
          id="pictures"
          ref="picture"
          type="file"
          class="hidden"
          :disabled="isEditing"
          @change="onLoadPicture"
        />
        <label
          for="pictures"
          :class="[
            isEditing ? 'cursor-not-allowed bg-opacity-80' : 'cursor-pointer',
          ]"
          class="uppercase bg-black text-white px-3 py-1 cursor-pointer"
        >
          <span> Subir Imagen </span>
        </label>
      </div>
      <div class="ml-5">
        <div class="my-2 ml-1">
          <label class="block">Destacado</label>
          <article class="flex items-center">
            <label
              for="featured"
              class="inline-flex relative items-center cursor-pointer"
            >
              <input
                id="featured"
                v-model="category.featured"
                type="checkbox"
                :disabled="isEditing"
                :checked="category.featured"
                class="sr-only peer"
              />
              <span
                :class="isEditing ? 'bg-opacity-80' : ''"
                class="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neutral-300 dark:peer-focus:ring-neutral-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-neutral-600 peer-checked:bg-neutral-700"
              />
            </label>
            <span
              class="ml-5"
              :class="category.featured ? 'text-green-800' : ''"
            >
              {{ category.featured ? "Destacado" : "No destacado" }}
            </span>
          </article>
        </div>
        <div class="mt-3 ml-1">
          <label class="block">Publicar</label>
          <article class="flex items-center">
            <label
              for="active"
              class="inline-flex relative items-center cursor-pointer"
            >
              <input
                id="active"
                v-model="category.active"
                type="checkbox"
                :disabled="isEditing"
                :checked="category.active"
                class="sr-only peer"
              />
              <span
                class="w-9 h-5 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neutral-300 dark:peer-focus:ring-neutral-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-neutral-600 peer-checked:bg-neutral-700"
              />
            </label>
            <span class="ml-5" :class="category.active ? 'text-green-800' : ''">
              {{ category.active ? "Publicado" : "No publicado" }}
            </span>
          </article>
        </div>
      </div>
    </div>
    <div class="flex flex-col my-3">
      <label for="name"> Nombre de la categoria </label>
      <app-input
        id="name"
        v-model="category.name"
        class="px-5 py-1 border"
        :placeholder="'Nombre de la categoria'"
        :type="'text'"
        required
        :disabled="isEditing"
      />
    </div>
    <section class="w-full pt-5">
      <div class="flex justify-between items-center">
        <label class="text-2xl uppercase"> Subcategorias </label>
        <app-button
          title="Agregar subcategoria"
          :disabled="isEditing"
          class="py-1 disabled:bg-neutral-700 disabled:text-white"
          :type="'button'"
          @onClick="onAddSubcategory"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </app-button>
      </div>
      <article
        v-for="(s, index) in category?.subcategories"
        :key="index"
        class="h-full mt-5"
        :class="category?.subcategories.length > 1 ? 'mb-2' : ''"
      >
        <div class="flex gap-8 items-center justify-between w-full h-full">
          <app-input
            v-model="s.name"
            :disabled="isEditing"
            class="w-full border-[1.5px] py-1"
            type="text"
          />
          <app-button
            v-if="s.id"
            :disabled="isEditing"
            class="disabled:bg-red-500 disabled:text-white bg-red-700 p-3"
            @onClick="onDeleteSubcategory(s.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
              />
            </svg>
          </app-button>
        </div>
      </article>
    </section>
    <div class="w-full flex items-center gap-4">
      <app-button
        title="Guardar cambios"
        class="mt-3 px-5 py-2 uppercase w-1/2"
        type="submit"
        :disabled="!isMutating"
      >
        Guardar
      </app-button>
      <app-button
        title="Cancelar"
        class="mt-3 px-5 py-2 uppercase w-1/2"
        :disabled="!isMutating && isEditing"
        @onClick="onCancel"
      >
        Cancelar
      </app-button>
    </div>
    <app-button
      v-if="$route.params.id"
      title="Eliminar categoria"
      class="bg-red-700 uppercase py-2 mt-5 w-full"
      @onClick="onDelete"
    >
      Eliminar categoria
    </app-button>
  </form>
</template>

<script>
import AppButton from "@/components/buttons/AppButton.vue";
import AppInput from "@/components/input/AppInput.vue";

export default {
  name: "AppCategoryForm",
  components: { AppInput, AppButton },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
    isMutating: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    image: null,
  }),
  computed: {
    isEditing() {
      return !this.isEdit;
    },
    category: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    category: {
      handler(current, old) {
        this.$emit("change", { current, old });
      },
      deep: true,
    },
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.category);
    },
    onCancel() {
      this.$emit("onCancel");
    },
    onDelete() {
      this.$emit("onDelete");
    },
    onAddSubcategory() {
      this.category.subcategories.push({});
    },
    onDeleteSubcategory(id) {
      this.$emit("onDeleteSubcategory", id);
    },
    onLoadPicture() {
      const file = this.$refs.picture.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("image").src = event.target.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
      this.$emit("onLoadPicture", this.image);
    },
  },
};
</script>

<style scoped></style>
