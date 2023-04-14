<template>
  <form class="container px-5 xl:text-xl flex flex-col" @submit.prevent="onSubmit">

    <!-- <div v-for="(itemList,index) in itemLists" :key="index">
      <div class="flex flex-col">
        <div v-if="typeof(images[index]) === 'object'" class="w-full h-96 bg-white my-5">
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
              class="w-full flex justify-center items-center relative"
            >
              <img
                :id="index"
                class="w-full h-96 object-cover z-40"
                :src="images[index].url || images[index].preview"
                alt="product image"
              />
              <article class="absolute top-10 left-10 z-50">
                <button
                  type="button"

                  class="w-full h-12 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed rounded-xl	p-3"
                  @click="onDeleteImage(index)"
                >
                  prueba de boton hpta
                </button>
              </article>
              <article class="absolute top-20 left-10 z-50">
                <p>
                  Este es la pequeña descripcion del producto
                </p>
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

        <div v-if="typeof(images[index]) === 'object'" class="w-full mt-2.5">
          <input
            :id="'picturesEditing'+index"
            ref="pictures"
            multiple
            type="file"
            class="hidden editimage"
            @change='editingImages'
          />
          <label
            :for="'picturesEditing'+index"
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
    </div> -->



    <app-button
    v-if="$route.params.id"
    class="bg-red-700 uppercase py-2 mt-5 w-full"
    @onClick="onDelete"
    >
    Eliminar carrusel
    </app-button>
    <carousel
            class="w-full h-full items-center justify-center mt-3"
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
            <slide v-for="(item, index) in images" :key="index"
              class="w-full flex justify-center items-center relative"
            >
            <div v-if="typeof(images[index]) === 'object'">
              <img
                class="w-full h-96 object-cover z-40"
                :src="images[index].url || images[index].preview"
                alt="product image"
                :id="'image'+index"
              />
<!--
Y = TOP - X = LEFT
  top-10 left-10
  top-20 left-10
Y = TOP - X = RIGHT
  top-10 right-14
  top-20 right-14
Y = BOTTOM - X = LEFT
  bottom-10 left-10
  bottom-20 left-10
Y = BOTTOM - X = right
  bottom-10 right-14
  bottom-20 right-14
Y CENTER - X CENTER
  bottom-[50%] left-[50%]
  bottom-[43%] right-[43%]
Y center - X left
  bottom-[50%] left-10
  bottom-[43%] left-10
Y center - X right
  bottom-[50%] right-14
  bottom-[43%] right-14
Y Top - X center
  top-10 left-[50%]
  top-[85px] left-[50%]
Y Bottom - X center
  bottom-10 left-[50%]
  bottom-[85px] left-[50%]
-->
<!-- fixed inset-0 flex items-center justify-center -->
                <article class="absolute top-0 right-1">
                  <button
                    type="button"
                    class="w-10 h-10 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed flex items-center justify-center"
                    @click="configImage"
                    >
                    <App-Icon-Config />
                  </button>
                </article>
                <div :class="getBotonClass" class="flex-grow">
                  <article class="flex-grow">
                    <button
                      type="button"
                      class="flex-shrink-0 h-12 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed rounded-xl	p-3"
                    >
                      {{textButton}}
                    </button>
                  </article>
                  <article class="supersm:w-28 sm:w-36 md:W-72 lg:w-96 overflow-y-auto">
                    <p class="break-words">
                      {{descrp}}
                    </p>
                  </article>
                </div>
            </div>
            </slide>
    </carousel>

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

    <!-- <div v-if="editing == true" class="bg-green-500 w-96 h-96 justify-center flex items-center z-50 m-auto fixed inset-0 items-center justify-center">
      <p class="absolute"> formulario del carrusel </p>
    </div> -->

    <transition name="fade">
    <div v-if="editing == true" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg w-[90%]">
        <!-- Contenido del modal -->
        <h2 class="text-xl md:text-2xl md:text-center font-bold mb-4">Configura tu imagen</h2>
        <div class="w-full flex items-center gap-4 mt-2.5">
        <div class="flex w-full flex-col gap-2">
          <label for="cta">
            Texto del botón
          </label>
          <app-input v-model="textButton" class="w-full"/>
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
          <app-input v-model="descrp" length="50" class="w-full"/>
        </div>
      </div>

      <div class="w-full flex place-content-between flex-col gap-4 mt-2.5 mb-5">
        <div class="w-full flex items-center gap-4 mt-2.5" >
          <div class="w-full text-center">
            <label for="">
              Alineacion Horizontal
            </label>
            <select
              id="positionX"
              v-model="selectedX"
              class="bg-white w-[90%] border border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
              required
            >
              <option selected disabled>Elija una Posicion horizontal</option>
              <option value="left">
                Izquierda
              </option>
              <option value="center">
                Centro
              </option>
              <option value="right">
                Derecha
              </option>
            </select>
          </div>
        </div>
        {{ selectedY }}
        <div class="w-full flex items-center gap-4 mt-2.5">
          <div class="w-full text-center">
            <label for="">
              Alineacion Vertical
            </label>
            <select
              id="positionY"
              v-model="selectedY"
              class="bg-white border w-[90%] border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
              required
            >
              <option selected disabled>Elija una Posicion vertical</option>
              <option value="top">
                Arriba
              </option>
              <option value="center">
                Centro
              </option>
              <option value="bottom">
                abajo
              </option>
            </select>
          </div>
        </div>
      </div>
        <!-- <p class="mb-4">Contenido del modal</p> -->
        <div class="m-auto flex justify-center">
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"  type="button" @click="closeModal">Cerrar</button>
        </div>
        </div>
    </div>
  </transition>
    <!-- <div  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-8 rounded-lg w-96">
      <h2 class="text-2xl font-bold mb-4">Título del Modal</h2>
      <p class="mb-4">Contenido del modal</p>
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" @click="configImage">Cerrar</button>
    </div>
  </div> -->
  </form>


</template>

<script>
import AppButton from "@/components/buttons/AppButton.vue";
import AppInput from "@/components/input/AppInput.vue";
import AppIconConfig from "@/components/icons/AppIconConfig.vue";

export default {
  name: "AppCarouselForm",
  components: { AppButton,AppIconConfig,AppInput  },
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
    descrp: "",
    textButton: "",
    selectedX: "center",
    selectedY: "center",
    images: [],
    idImageConfig:0,
    editing: false, // Valor inicial del booleano
    counter:0, // Contador hacer que el boton de editar imagen aparezca cuando se cargue una imagen
    itemLists:[{}], // Lista de elementos
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
    },
    getBotonClass() {
      // Lógica para determinar las clases CSS basadas en las opciones seleccionadas
      return [
        'absolute',
        {
          // Corners
          'top-10 left-10': this.selectedX === 'left' && this.selectedY === 'top',
          'top-10 right-14': this.selectedX === 'right' && this.selectedY === 'top',
          'bottom-10 left-10': this.selectedX === 'left' && this.selectedY === 'bottom',
          'bottom-20 right-14': this.selectedX === 'right' && this.selectedY === 'bottom',
          // Centers
          'bottom-[43%] right-14': this.selectedX === 'right' && this.selectedY === 'center',
          'bottom-[43%] left-10': this.selectedX === 'left' && this.selectedY === 'center',
          'bottom-[43%] supersm:left-[35%] md:left-[38%] lg:left-[50%]': this.selectedX === 'center' && this.selectedY === 'center',
          // Laterals
          'top-10 md:left-[38%] lg:left-[50%]': this.selectedX === 'center' && this.selectedY === 'top',
          'bottom-10 md:left-[38%] lg:left-[50%]': this.selectedX === 'center' && this.selectedY === 'bottom',
        },
      ];
    },
    getDescripClass() {
      // Lógica para determinar las clases CSS basadas en las opciones seleccionadas
      return [
        'absolute',
        {
          // Corners
          'top-10 supersm:left-5 md:left-20': this.selectedX === 'left' && this.selectedY === 'top',
          'top-20 supersm:right-10 md:right-14': this.selectedX === 'right' && this.selectedY === 'top',
          'bottom-20 supersm:left-5 md:left-10': this.selectedX === 'left' && this.selectedY === 'bottom',
          'bottom-20 supersm:right-10 md:right-14': this.selectedX === 'right' && this.selectedY === 'bottom',
          // Centers
          'bottom-[43%] supersm:right-10 md:right-14': this.selectedX === 'right' && this.selectedY === 'center',
          'bottom-[43%] supersm:left-5 md:left-10': this.selectedX === 'left' && this.selectedY === 'center',
          'bottom-[43%] supersm:right-[15%] md:right-[30%]': this.selectedX === 'center' && this.selectedY === 'center',
          // Laterals
          'top-[85px] supersm:left-[15%] md:left-[50%]': this.selectedX === 'center' && this.selectedY === 'top',
          'bottom-[85px] supersm:left-[15%] md:left-[30%]': this.selectedX === 'center' && this.selectedY === 'bottom',
        },
      ];
    },
  },
  methods: {
    configImage(){
      this.editing = !this.editing;
    },
    closeModal(){
      this.editing = !this.editing;
      document.querySelector('.idImageConfig');
    },
     agregarNuevoItem(){
      this.itemLists.push({ id: this.generadorId++, texto: `Elemento ${this.generadorId}` });
    },
    editingImages(e){
      const imgUrl = e.target.parentElement.parentElement.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild;
      const files = e.target.files;
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
          this.images[imgUrl.id] = image;
          imgUrl.src = this.images[imgUrl.id].preview;
          this.$emit("onLoadPictures", image);
        }
        reader.readAsDataURL(file);
      }
    },
    onLoadPictures(e) {
      if (this.counter === 0) {
        this.myBoolean = !this.myBoolean; // Cambiar el valor del booleano al contrario
        this.counter++;
      }
      // const button = e.target.classList[1];
      const files = e.target.files;
      // const files = this.$refs.pictures.files;
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
          this.images.unshift(image);
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

<style scoped>
/* Estilos del modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>


<!--El dia de hoy se arreglo parte del carrusel, que ocurre, se añade a un array y no tiene porque, toca mirar eso bien -->


<!-- <carousel
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
              class="w-full flex justify-center items-center relative"
            >
              <div v-if="typeof(images[index]) === 'object'">
                  <img
                    :id="index"
                    class="w-full h-96 object-cover z-40"
                    :src="images[index].url || images[index].preview"
                    alt="product image"
                  />
                  <article class="absolute top-10 left-10 z-50">
                    <button
                      type="button"

                      class="w-full h-12 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed rounded-xl	p-3"
                      @click="onDeleteImage(index)"
                    >
                      prueba de boton hpta
                    </button>
                  </article>
                  <article class="absolute top-20 left-10 z-50">
                    <p>
                      Este es la pequeña descripcion del producto
                    </p>
                  </article>
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
            </slide>
          </carousel> -->
