<template>
  <div
    class="h-[500px] xl:h-full w-full mb-2.5 flex flex-col justify-center items-center"
  >
    <div v-if="images.length > 0" class="w-full h-full bg-white my-5">
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
            class="w-[500px] h-[500px] object-contain z-50"
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
          <article
            class="absolute top-5 right-0 z-50 text-xs flex items-center gap-1.5 bg-white rounded p-1.5 backdrop-blur-2xl bg-opacity-50"
          >
            <input
              id="main_picture"
              type="checkbox"
              @change="onMainPicture(index)"
            />
            <label ref="main_picture" for="main_picture" class="w-1/2"
              >Seleccionar como imagen principal</label
            >
          </article>
        </slide>
      </carousel>
    </div>
    <div v-else class="w-full h-full bg-neutral-200 my-5" />
    <article class="w-full flex justify-start">
      <input
        id="pictures"
        ref="pictures"
        type="file"
        class="hidden"
        :disabled="disabled"
        multiple
        @change="onPictures"
      />
      <label
        for="pictures"
        class="uppercase bg-black py-2 hover:bg-opacity-80 text-white px-10 cursor-pointer"
        :class="[
          disabled
            ? 'bg-gray-200 ease-in-out duration-200 bg-neutral-200 text-neutral-700 cursor-not-allowed'
            : '',
        ]"
      >
        <span>Agregar Imágenes</span>
      </label>
    </article>
  </div>
</template>

<script>
import AppIconTrash from "@/components/icons/AppIconTrash.vue";

export default {
  name: "AppProductImages",
  components: { AppIconTrash },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$forceUpdate();
  },
  methods: {
    onDeleteImage(index) {
      this.$emit("onDeleteImage", index);
    },
    onPictures() {
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
          this.$emit("onAddImage", image);
        };
        reader.readAsDataURL(file);
      }
    },
    onMainPicture(index) {
      this.$emit("onMainPicture", index);
    },
  },
};
</script>
