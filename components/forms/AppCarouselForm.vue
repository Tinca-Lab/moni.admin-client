<template>
  <form class="container px-5 xl:text-xl" @submit.prevent="onSubmit">
    <div class="flex flex-col">
      <div v-if="images.length > 0" class="w-full h-96 bg-white my-5">
        <carousel
          class="w-full h-full items-center justify-center"
          :pagination-position="'bottom-overlay'"
          :pagination-color="'#8c8c8c'"
          :pagination-active-color="'#000'"
          :pagination-enabled="true"
          :navigation-enabled="true"
          :adjustable-height="false"
          :navigation-click-target-size="20"
          :center-mode="true"
          :per-page="1"
        >
          <slide
            v-for="(image, index) in images"
            :key="index"
            class="w-full flex justify-center items-center relative"
          >
            <img
              class="w-full h-96 object-cover z-50"
              :src="image.url || image.preview"
              alt="product image"
            />
            <article class="absolute top-5 left-5">
              <button
                type="button"
                :title="
                  disabled
                    ? 'No puedes eliminar la imagen, primero da clic en editar'
                    : 'Eliminar imagen'
                "
                :disabled="disabled"
                class="w-10 h-10 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed"
                @click="onDeleteImage(index)"
              >
                <app-icon-trash />
              </button>
            </article>
          </slide>
        </carousel>
      </div>
      <div v-else class="w-full h-full bg-neutral-200 py-20 my-5">
        <img class="block mx-auto w-[150px]" src="@/assets/images/app-loading-picture.png" alt="">
      </div>
      <div class="w-full mt-2.5">
        <input
          id="pictures"
          ref="pictures"
          multiple
          type="file"
          class="hidden"
          @change="onLoadPictures"
        />
        <label
          for="pictures"
          :class="[
            isEditing ? 'cursor-not-allowed bg-opacity-80' : 'cursor-pointer',
          ]"
          class="uppercase bg-black text-white px-3 py-1 cursor-pointer hover:bg-opacity-80"
        >
          <span> Agregar Imagen </span>
        </label>
      </div>
    </div>
    <div class="w-full flex items-center gap-4 mt-2.5">
      <div class="flex w-full flex-col gap-2">
        <label for="cta">
          Texto del botón
        </label>
        <app-input class="w-full"/>
      </div>
      <div class="flex w-full flex-col gap-2">
        <label for="cta">
          URL del botón
        </label>
        <app-input class="w-full"/>
      </div>
    </div>
    <div class="w-full flex items-center gap-4 mt-2.5">
      <app-button class="mt-3 px-5 py-2 uppercase w-1/2" type="submit">
        Guardar
      </app-button>
      <app-button
        class="mt-3 px-5 py-2 uppercase w-1/2"
        :disabled="!isMutating && isEditing"
        @onClick="onCancel"
      >
        Cancelar
      </app-button>
    </div>
    <app-button
      v-if="$route.params.id"
      class="bg-red-700 uppercase py-2 mt-5 w-full"
      @onClick="onDelete"
    >
      Eliminar carrusel
    </app-button>
  </form>
</template>

<script>
import AppButton from "@/components/buttons/AppButton.vue";
import AppInput from "@/components/input/AppInput.vue";
import AppIconTrash from "@/components/icons/AppIconTrash.vue";

export default {
  name: "AppCarouselForm",
  components: { AppButton, AppInput, AppIconTrash },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    isMutating: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    images: []
  }),
  computed: {
    isEditing() {
      return !this.isEdit;
    },
    carousel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    onLoadPictures() {
      const files = this.$refs.pictures.files;
      for (const element of files) {
        const file = element;
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = reader.result.replace(/^data:(.*;base64,)?/, "");
          const image = {
            filename: element.name,
            filetype: element.type,
            data: base64String,
            preview: e.target.result,
            extension: file.type.split("/")[1],
          };
          this.images.push(image);
          this.$emit("onLoadPictures", image);
        };
        reader.readAsDataURL(file);
      }
    },
    onSubmit() {
      this.$emit("onSubmit", this.carousel);
    },
    onCancel() {
      this.$emit("onCancel");
    },
    onDelete() {
      this.$emit("onDelete");
    }
  }
};
</script>

<style scoped></style>
