<template>
  <form class="container px-5 xl:text-xl flex flex-col" @submit.prevent="onSubmit">
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
            <slide v-for="(item, index) in dataImage" :key="index"
              class="w-full flex justify-center items-center relative"
            >
            <div v-if="typeof(item.images) === 'object'">
              <img
                class="w-full h-96 object-cover z-40"
                :src="item.images.url || item.images.preview"
                alt="product image"
                :id="'image'+index"
              />
                <article class="absolute top-0 right-1">
                  <button
                    :id="'image'+index"
                    type="button"
                    class="w-10 h-10 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed flex items-center justify-center"
                    @click="configImage"
                  >
                    <App-Icon-Config :id="'image'+index" />
                  </button>
                </article>
                <article class="absolute top-0 right-10">
                  <button
                    :id="'image'+index"
                    type="button"
                    class="w-10 h-10 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed flex items-center justify-center"
                    @click="configImage"
                  >
                    <App-Icon-Trash :id="'image'+index" />
                  </button>
                </article>
                <div :class="getBotonClass(dataImage[index].selectedX,dataImage[index].selectedY)" class="flex-grow">
                  <article class="flex-grow">
                    <button
                      type="button"
                      class="flex-shrink-0 h-12 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed rounded-xl	p-3"
                    >
                       {{item.textButton}}
                    </button>
                  </article>
                  <article class="supersm:w-28 sm:w-36 md:W-72 lg:w-96 overflow-y-auto">
                    <p class="break-words">
                      {{item.descrp}}
                    </p>
                  </article>
                </div>
            </div>
            </slide>
    </carousel>
    <!-- Add images -->
    <div class="w-full mt-2.5">
      <input
      id="pictures"
      ref="pictures"
      multiple
      type="file"
      class="hidden"
      accept="image/*"
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
    <!-- options buttons -->
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
    <!-- Modal -->
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
          <app-input v-model="textButton" class="w-full" placeholder="Contenido del boton" />
        </div>
        <div class="flex w-full flex-col gap-2">
          <label for="cta">
            URL del botón
          </label>
          <app-input v-model="ctaUrl" class="w-full" placeholder="Url a donde se redirecciona el boton"/>
        </div>
      </div>

      <div class="w-full flex items-center gap-4 mt-2.5">
        <div class="w-full">
          <label for="cta">
            Pequeña descripción
          </label>
          <app-input v-model="descrp" length="50" class="w-full" placeholder="Descripcion abajo del boton"/>
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
  </form>


</template>

<script>
import AppButton from "@/components/buttons/AppButton.vue";
import AppInput from "@/components/input/AppInput.vue";
import AppIconConfig from "@/components/icons/AppIconConfig.vue";
import AppIconTrash from "@/components/icons/AppIconTrash.vue";

export default {
  name: "AppCarouselForm",
  components: { AppButton,AppIconConfig,AppInput,AppIconTrash  },
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
    descrp: "", // description of the picture
    ctaUrl: "", // url of the button
    textButton: "", // text of the button
    selectedX: "", // position horizontal of the button
    selectedY: "", // position vertical of the button
    editing: false, // Valor inicial del booleano
    dataImage:[], // data save all the pictures with your information
    id:0, // id for save the id of the picture active in carousel
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
  },
  methods: {
    getBotonClass(positionX,positionY) {
      // Lógica para determinar las clases CSS basadas en las opciones seleccionadas
      return [
        'absolute',
        {
          // Corners
          'top-10 left-10': positionX === 'left' && positionY === 'top',
          'top-10 right-5 flex flex-col justify-end items-end text-right': positionX === 'right' && positionY === 'top',
          'bottom-10 left-10': positionX === 'left' && positionY === 'bottom',
          'bottom-20 right-5 flex flex-col justify-end items-end text-right': positionX === 'right' && positionY === 'bottom',
          // Centers
          'bottom-[43%] right-5 flex flex-col justify-end items-end text-right': positionX === 'right' && positionY === 'center',
          'bottom-[43%] left-10': positionX === 'left' && positionY === 'center',
          'bottom-[43%] supersm:left-[35%] md:left-[38%] lg:left-[50%]': positionX === 'center' && positionY === 'center',
          // Laterals
          'top-10 md:left-[38%] lg:left-[50%]': positionX === 'center' && positionY === 'top',
          'bottom-10 md:left-[38%] lg:left-[50%]': positionX === 'center' && positionY === 'bottom',
        },
      ];
    },
    // fuction for save de id of the picture active in carousel
    configImage(e){
      const id = e.target.id.substring(5);
      this.id = id
      this.editing = !this.editing;
    },
    // fuction for save the information of the picture active in carousel
    closeModal(){
      this.editing = !this.editing;
      this.dataImage[this.id].descrp = this.descrp;
      this.dataImage[this.id].textButton = this.textButton;
      this.dataImage[this.id].selectedX = this.selectedX;
      this.dataImage[this.id].selectedY = this.selectedY;
      this.dataImage[this.id].ctaUrl = this.ctaUrl;
    },
    // fuction for edit the information of the picture active in carousel
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
    // fuction for save a picture in carousel
    onLoadPictures(e) {
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
          this.dataImage.push({images:image});
          this.dataImage[this.dataImage.length-1].descrp = 'click to the setting for modify this text';
          this.dataImage[this.dataImage.length-1].textButton = 'example';
          this.dataImage[this.dataImage.length-1].selectedX = 'left';
          this.dataImage[this.dataImage.length-1].selectedY = 'bottom';
          this.dataImage[this.dataImage.length-1].ctaUrl = '';
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
