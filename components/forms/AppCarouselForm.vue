<template>
  <form class="container px-5 xl:text-xl" @submit.prevent="onSubmit">
    <div v-for="itemList in itemLists" :key="itemList.id">
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
        <div v-else class="w-full h-full bg-neutral-200 py-20 my-5" >

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
            class="uppercase text-black px-3 py-1 cursor-pointer hover:bg-opacity-80"
          >
          <p class="flex items-center justify-center">
            <img class="w-[50px]" src="@/assets/images/plus-icon-black-2.png" alt="">
            Cargar imagen
          </p>
          </label>
        </div>


        </div>

        <div v-if="myBoolean" class="w-full mt-2.5">
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
            <span> Editar Imagen </span>
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
        <div class="w-full">
          <label for="cta">
            Pequeña descripción
          </label>
          <app-input class="w-full"/>
        </div>
      </div>

      <div class="w-full flex place-content-between flex-col gap-4 mt-2.5">
        <div class="w-full flex items-center gap-4 mt-2.5" >
          <div class="w-full text-center">
            <label for="">
              Alineacion Horizontal
            </label>
            <select
              class="bg-white w-[90%] border border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
              required
            >
              <option selected disabled>Elija una Posicion horizontal</option>
              <option>
                Izquierda
              </option>
              <option value="">
                Centro
              </option>
              <option value="">
                Derecha
              </option>
            </select>
          </div>
        </div>

        <div class="w-full flex items-center gap-4 mt-2.5">
          <div class="w-full text-center">
            <label for="">
              Alineacion Vertical
            </label>
            <select
              class="bg-white border w-[90%] border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
              required
            >
              <option selected disabled>Eluja una Posicion vertical</option>
              <option>
                Arriba
              </option>
              <option value="">
                Centro
              </option>
              <option value="">
                abajo
              </option>
            </select>
          </div>
        </div>

      </div>

    </div>

    <div class="w-[90%] sm:w-[65%] mt-5 md:w-[45%] lg:w-20%">

          <p
          class="uppercase bg-black text-white px-3 py-1 cursor-pointer hover:bg-opacity-80 flex items-center"
          @click="agregarNuevoItem"
          >
              <img class="w-[25px]" src="@/assets/images/plus-icon-black-2.png" alt="">
              Agregar otra Imagen
        </p>
    </div>

    <!-- <div class="w-full mt-3 bg-neutral-200">
        <div class="w-full mt-2.5" >
          <label
          for=""
          :class="[
            isEditing ? 'cursor-not-allowed bg-opacity-80' : 'cursor-pointer',
          ]"
          class="uppercase text-black px-3 py-1 cursor-pointer hover:bg-opacity-80"
          >
            <p class="flex items-center justify-center">
              <img class="w-[50px]" src="@/assets/images/plus-icon-black-2.png" alt="">
              Agregar otra imagen al carrusel
            </p>
          </label>
        </div>
    </div> -->

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
    images: [],
    myBoolean: false, // Valor inicial del booleano
    counter:0, // Contador hacer que el boton de editar imagen aparezca cuando se cargue una imagen
    itemLists:[{id:0,texto:"hola"}], // Lista de elementos
    generadorId:0, // Contador para generar un id unico a cada elemento
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
    agregarNuevoItem(){
      this.itemLists.push({ id: this.generadorId++, texto: `Elemento ${this.generadorId}` });
    },
    onLoadPictures() {
      if (this.counter === 0) {
        this.myBoolean = !this.myBoolean; // Cambiar el valor del booleano al contrario
        this.counter++;
      }
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
          this.images.pop();
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


<!--El dia de hoy se arreglo parte del carrusel, que ocurre, se añade a un array y no tiene porque, toca mirar eso bien -->
