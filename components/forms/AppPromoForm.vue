<template>
  <form
    class="container sm:px-10 md:px-10 lg:px-20 xl:px-20 2xl:px-48 md:py-10 xl:text-xl"
    @submit.prevent="onSubmit"
  >
    <div class="flex flex-col mb-3">
      <label for="code">Codigo de descuento</label>
      <app-input
        id="code"
        v-model="promo.code"
        class="px-5 py-1 border"
        :placeholder="'Codigo de descuento'"
        :type="'text'"
        required
        :disabled="!isEdit"
      />
    </div>
    <div class="flex flex-col mb-3">
      <label for="percent">Porcentaje de descuento</label>
      <app-input
        id="percent"
        v-model="promo.discount"
        class="px-5 py-1 border"
        :placeholder="'Porcentaje de descuento'"
        :type="'number'"
        min="1"
        max="100"
        required
        :disabled="!isEdit"
      />
    </div>
    <div class="flex flex-col mb-3">
      <label for="start_date">Fecha de inicio</label>
      <app-input
        v-if="
          promo.startDate !== null ||
          promo.startDate !== '' ||
          promo.startDate !== undefined
        "
        id="start_date"
        v-model="promo.startDate"
        class="px-5 py-1 border"
        :placeholder="'Fecha de inicio'"
        :required="!$route.params.id"
        :disabled="!isEdit"
        :type="'date'"
      />
    </div>
    <div class="flex flex-col mb-3">
      <label for="end_date">Fecha de expiracion</label>
      <app-input
        id="end_date"
        v-model="promo.endDate"
        class="px-5 py-1 border"
        :placeholder="'Fecha de expiracion'"
        :required="!$route.params.id"
        :disabled="!isEdit"
        :type="'date'"
      />
    </div>
    <div class="mt-3">
      <label class="block">Publicar</label>
      <div class="flex items-center">
        <label
          for="active"
          class="inline-flex relative items-center"
          :class="[!isEdit ? 'cursor-not-allowed' : 'cursor-pointer']"
        >
          <input
            id="active"
            v-model="promo.active"
            type="checkbox"
            :disabled="!isEdit"
            :checked="promo.active"
            class="sr-only peer"
          />
          <span
            class="w-9 h-5 peer-focus:outline-none bg-neutral-200 peer-focus:ring-4 peer-focus:ring-neutral-300 dark:peer-focus:ring-neutral-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-neutral-600 peer-checked:bg-neutral-700"
          />
        </label>
        <span class="ml-2" :class="promo.active ? 'text-green-800' : ''">
          {{ promo.active ? "Publicado" : "No publicado" }}
        </span>
      </div>
    </div>
    <div class="w-full flex items-center gap-4">
      <app-button
        title="Guardar los cambios"
        class="mt-3 px-5 py-2 uppercase w-1/2"
        type="submit"
        :disabled="!isMutating"
      >
        Guardar
      </app-button>
      <app-button
        title="Cancelar los cambios"
        class="mt-3 px-5 py-2 uppercase w-1/2"
        :disabled="!isMutating && !isEdit"
        @onClick="onCancel"
      >
        Cancelar
      </app-button>
    </div>
    <app-button
      v-if="$route.params.id"
      title="Eliminar descuento"
      class="bg-red-700 uppercase py-2 mt-5 w-full"
      @onClick="onDelete"
    >
      Eliminar descuento
    </app-button>
  </form>
</template>

<script>
import AppButton from "@/components/buttons/AppButton.vue";
import AppInput from "@/components/input/AppInput.vue";

export default {
  name: "AppPromoForm",
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
  computed: {
    promo: {
      get() {
        return this.value;
      },
    },
  },
  watch: {
    promo: {
      handler(current, old) {
        this.$emit("change", { current, old });
        if (current?.startDate && current?.endDate) {
          const startDateInput = document.querySelector("#start_date");
          const endDateInput = document.querySelector("#end_date");
          startDateInput.value = this.promo.startDate.split("T")[0];
          endDateInput.value = this.promo.endDate.split("T")[0];
        }
      },
      deep: true,
    },
  },

  methods: {
    onSubmit() {
      this.$emit("onSubmit");
    },
    onDelete() {
      this.$emit("onDelete");
    },
    onCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>

<style scoped></style>
