<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      isLocal ? 'text-white bg-black hover:bg-opacity-80' : '',
      isFacebook ? 'text-white bg-[#1877F2] hover:bg-opacity-90' : '',
      isGoogle ? 'text-black border-[3px] hover:bg-gray-50' : '',
    ]"
    class="p-5 disabled:bg-gray-200 disabled:text-gray-300 ease-in-out duration-200 disabled:bg-neutral-200 disabled:text-neutral-700 disabled:cursor-not-allowed"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    target: {
      type: String,
      default: "local",
    },
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isLocal() {
      return this.target === "local";
    },
    isFacebook() {
      return this.target === "facebook";
    },
    isGoogle() {
      return this.target === "google";
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style scoped></style>
