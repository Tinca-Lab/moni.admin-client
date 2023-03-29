<template>
  <h1
    class="flex w-full justify-center uppercase text-2xl xl:text-3xl 2xl:text-4xl text-center"
  >
    <strong>{{ title }}</strong>
  </h1>
</template>

<script>
export default {
  name: "AppTitle",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
