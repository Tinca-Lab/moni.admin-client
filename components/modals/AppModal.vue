<template>
  <div
    class="bg-neutral-300 bg-opacity-30 backdrop-blur-sm h-screen w-screen z-40 fixed top-0 left-0 flex justify-center items-center"
  >
    <app-modal-card
      class="block mx-auto my-auto w-96 shadow"
      :title="title"
      :message="message"
      :type="type"
      :disabled="disabled"
      @onCancel="onCancel"
      @onAccept="onAccept"
    />
  </div>
</template>

<script>
import AppModalCard from "@/components/modals/AppModalCard.vue";

export default {
  name: "AppModal",
  components: { AppModalCard },
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "warning",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onCancel() {
      this.$emit("onCancel");
    },
    onAccept() {
      this.$emit("onAccept");
    },
  },
};
</script>

<style scoped></style>
