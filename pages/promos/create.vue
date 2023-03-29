<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-title title="Descuentos" />
    <app-label label="Crear descuento" />
    <app-back @onBackTo="$router.go(-1)" />
    <div class="w-full">
      <app-promo-form
        :value="promo"
        :is-mutating="true"
        @onCancel="onCancel"
        @onSubmit="onCreatePromo"
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
import AppPromoForm from "@/components/forms/AppPromoForm.vue";
import AppBack from "@/components/buttons/AppBack.vue";
import AppLabel from "@/components/texts/AppLabel.vue";
import AppTitle from "@/components/texts/AppTitle.vue";
import AppModal from "@/components/modals/AppModal.vue";

export default {
  name: "CreatePromoPage",
  components: { AppModal, AppTitle, AppLabel, AppBack, AppPromoForm },
  layout: "AdminLayout",
  data: () => ({
    promo: {},
    isCancel: false,
  }),
  head() {
    return {
      title: "Crear Código Promocional | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Crea códigos promocionales y descuentos exclusivos para tus clientes en la tienda en línea.
          Atrae a nuevos clientes y fideliza a los que ya tienes con nuestras promociones especiales. ¡Comienza a crear tus códigos promocionales hoy mismo y aumenta tus ventas!`,
        },
      ],
    };
  },
  methods: {
    async onCreatePromo() {
      try {
        await this.$axios.post("/api/v1/promo", {
          code: this.promo.code,
          discount: parseFloat(this.promo.discount),
          active: this.promo.active || false,
          startDate: this.promo.startDate,
          endDate: this.promo.endDate,
        });
        this.$notify({
          title: "Éxito",
          text: "Descuento creado correctamente",
          type: "success",
        });
        await this.$router.push("/promos");
      } catch (error) {
        this.$notify({
          title: "Error",
          text: error.response.data.message || "Error al crear el descuento",
          type: "error",
        });
      }
    },
    onCancel() {
      if (Object.keys(this.promo).length > 0) {
        this.isCancel = true;
      } else {
        this.$router.go(-1);
      }
    },
    onClose() {
      this.isCancel = false;
    },
  },
};
</script>

<style scoped></style>
