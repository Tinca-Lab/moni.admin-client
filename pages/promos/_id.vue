<template>
  <div class="h-full w-full p-5 xl:px-20 xl:py-10 overflow-x-hidden">
    <app-header title="Descuentos" label="Editar descuento" />
    <div class="w-full">
      <app-nav label-button="Editar descuento" @onEdit="onEdit" />
      <app-promo-form
        :value="promo"
        :is-edit="isEdit"
        :is-mutating="isMutating"
        @onSubmit="onUpdatePromo"
        @onDelete="onDelete"
        @change="onHandleChanges"
        @onCancel="onCancel"
      />
    </div>
    <!-- Modal for cancel -->
    <app-modal
      v-if="isCancel"
      :title="'Cancelar'"
      :message="'¿Estás seguro que deseas cancelar? Los cambios no se guardarán.'"
      :type="'warning'"
      @onCancel="onClose"
      @onSubmit="onConfirm"
    />
    <!-- Modal for delete -->
    <app-modal
      v-if="isDelete"
      :title="'Eliminar'"
      :message="'¿Estás seguro que deseas eliminar el descuento?'"
      :type="'error'"
      @onCancel="onClose"
      @onAccept="onDeletePromo"
    />
  </div>
</template>

<script>
import AppHeader from "@/components/sections/AppHeader.vue";
import AppPromoForm from "@/components/forms/AppPromoForm.vue";
import AppNav from "@/components/sections/AppNav.vue";
import AppModal from "@/components/modals/AppModal.vue";

export default {
  name: "PromoPage",
  components: { AppModal, AppNav, AppPromoForm, AppHeader },
  layout: "AdminLayout",
  data: () => ({
    promo: {},
    isEdit: false,
    isCancel: false,
    isMutating: false,
    isDelete: false,
  }),
  head() {
    return {
      title: this.promo?.code
        ? `Actualizar Código Promocional ${this.promo.code.toUpperCase()} | MONI`
        : "Actualizar Código Promocional",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Actualiza y gestiona todos los códigos promocionales de la tienda en línea Nombre de la Tienda.
          Mantén tus promociones y descuentos actualizados y atractivos para tus clientes. ¡Comienza a actualizar tus códigos promocionales hoy mismo y aumenta tus ventas!`,
        },
      ],
    };
  },
  mounted() {
    this.fetchPromo();
  },
  methods: {
    onHandleChanges({ current, old }) {
      if (old.id) {
        this.isMutating = true;
      }
    },
    async fetchPromo() {
      this.promo = await this.$axios.$get(
        `/api/v1/promo/${this.$route.params.id}`
      );
    },
    onEdit() {
      this.isMutating ? this.onClose() : (this.isEdit = !this.isEdit);
    },
    onCancel() {
      this.isCancel = true;
    },
    onClose() {
      this.isCancel = false;
      this.isDelete = false;
    },
    onDelete() {
      this.isDelete = true;
    },
    onConfirm() {
      this.isCancel = false;
      this.$router.go(-1);
    },
    async onUpdatePromo() {
      try {
        if (this.isMutating) {
          await this.$axios.put(`/api/v1/promo/${this.promo.id}`, {
            code: this.promo.code,
            discount: parseFloat(this.promo.discount),
            active: this.promo.active || false,
            startDate: new Date(this.promo.startDate),
            endDate: new Date(this.promo.endDate),
          });
          this.$notify({
            title: "Éxito",
            text: "Descuento actualizado correctamente",
            type: "success",
          });
          await this.$router.push("/promos");
        } else {
          this.isEdit = false;
        }
      } catch (error) {
        this.$notify({
          title: "Error",
          text:
            error?.response?.data?.message ||
            "No se pudo actualizar el descuento",
          type: "error",
        });
      }
    },
    async onDeletePromo() {
      try {
        await this.$axios.delete(`/api/v1/promo/${this.$route.params.id}`);
        this.$notify({
          title: "Éxito",
          text: "Se ha eliminado el descuento correctamente",
          type: "success",
        });
        await this.$router.push("/promos");
        await this.$forceUpdate();
      } catch (error) {
        this.$notify({
          title: "!Algo salió mal¡",
          text:
            error?.response?.data?.message ||
            "No hemos podido eliminar el descuento",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped></style>
