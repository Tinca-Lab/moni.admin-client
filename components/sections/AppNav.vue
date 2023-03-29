<template>
  <nav class="flex w-full justify-between">
    <app-back @onClick="onBack" />
    <app-button v-if="labelButton" class="uppercase py-2" @onClick="onEdit">
      {{ labelButton }}
    </app-button>
  </nav>
</template>

<script>
import AppBack from "@/components/buttons/AppBack.vue";
import AppButton from "@/components/buttons/AppButton.vue";

export default {
  name: "AppNav",
  components: { AppButton, AppBack },
  props: {
    labelButton: {
      type: String,
      default: null,
    },
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onEdit() {
      this.$emit("onEdit");
    },
  },
};
</script>

<style scoped></style>
