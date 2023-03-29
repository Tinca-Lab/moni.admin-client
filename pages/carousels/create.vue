<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-title title="Carruseles" />
    <app-label label="Crear carrusel" />
    <nav class="flex w-full">
      <app-back @onBackTo="$router.go(-1)" />
    </nav>
    <div class="w-full">
      <app-carousel-form
        v-model="carousel"
        :is-mutating="true"
        @onSubmit="onSubmit"
        @onCancel="onCancel"
        @onLoadPictures="onLoadPictures"
      />
    </div>
    <!-- Modal for cancel -->
    <app-modal
      v-if="isCancel"
      class="block mx-auto my-auto w-96 shadow"
      :title="'Cancelar'"
      :message="'¿Estás seguro que deseas cancelar? Los cambios no se guardarán.'"
      :type="'warning'"
      @onCancel="onClose"
      @onSubmit="$router.go(-1)"
    />
  </div>
</template>

<script>
import AppCarouselForm from "@/components/forms/AppCarouselForm.vue";
import AppBack from "@/components/buttons/AppBack.vue";
import AppModal from "@/components/modals/AppModal.vue";
import AppLabel from "@/components/texts/AppLabel.vue";
import AppTitle from "@/components/texts/AppTitle.vue";

export default {
  name: "CarouselsCreatePage",
  components: { AppTitle, AppLabel, AppModal, AppBack, AppCarouselForm },
  layout: "AdminLayout",
  data: () => ({
    carousel: {},
    isCancel: false,
    images: [],
  }),
  head() {
    return {
      title: "Crear Carousel",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Crea un nuevo carousel",
        },
      ],
    };
  },
  methods: {
    onClose() {
      this.isCancel = false;
    },
    onCancel() {
      if (Object.keys(this.carousel).length > 0) {
        this.isCancel = true;
      } else {
        this.$router.go(-1);
      }
    },
    onLoadPictures(image) {
      this.images.push(image);
    },
    async onSubmit() {
      try {
        await this.$axios.post(
          `/api/v1/s3/banner/${this.carousel.tag}`,{
            images: this.images
          }
        );
        this.$notify({
          title: "¡Exito!",
          text: "Hemos guardado el carrusel",
          type: "success",
        });
      } catch (e) {
        this.$notify({
          title: "¡Algo salió mal!",
          message: e.response.data.message,
          type: "error",
        });
      }
    },
  },
};
</script>
