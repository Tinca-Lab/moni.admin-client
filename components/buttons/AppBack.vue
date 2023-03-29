<template>
  <button
    title="Ir atras"
    class="flex items-center cursor-pointer w-min"
    @click="onClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-chevron-left"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
    <span class="ml-2 my-0 text-lg text-neutral-900 cursor-pointer">ATRAS</span>
  </button>
</template>

<script>
export default {
  name: "AppBack",
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style scoped></style>
