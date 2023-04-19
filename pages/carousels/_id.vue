<template>
  <div
    class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden"
  >
    <app-header title="Carusel" label="Editar Carusel" />
    <div class="w-full h-min">
      <app-nav class="mb-5" label-button="Editar Carusel"  />
      <!-- <app-edit-carousel-form
      /> -->
      <button @click="fetchProduct">click</button>
      {{ product }} Aqui viene la data
      <!-- v-if="!isLoading && product"
        v-model="product"
        :is-editing="isEdit"
        :is-mutating="isMutating"
        @onSubmit="onUpdateProduct"
        @onDelete="onDeleting"
        @onCancel="onCancel"
        @onLoadPictures="onLoadPictures"
        @update:product="fetchProduct" -->
    </div>
    <app-spinner :loading="isLoading" />
  </div>
</template>

<script>
import AppNav from "@/components/sections/AppNav.vue";
import AppSpinner from "@/components/spinner/AppSpinner.vue";
import AppHeader from "@/components/sections/AppHeader.vue";

export default {
  name: "EditCarousel",
  components: {  AppHeader, AppSpinner, AppNav },
  data: () => ({
    product: {},
    isLoading: false,
  }),
  async mounted() {
    this.isLoading = true;
    await this.fetchProduct();
    this.isLoading = false;
  },
  methods: {
    async fetchProduct() {
      const id = {id: this.$route.params.id}
      await this.$axios
        .get(`api/v1/carousel/findOne/`,id)
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
}
</script>
