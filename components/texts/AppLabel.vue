<template>
  <span class="uppercase text-xl mt-3 text-neutral-900 text-center block">
    {{ label }}
  </span>
</template>

<script>
export default {
  name: "AppLabel",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
