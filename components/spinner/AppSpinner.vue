<template>
  <div
    class="h-auto w-full bg-white bg-opacity-50 backdrop-blur-xl flex items-center justify-center"
  >
    <pulse-loader :loading="loading" :color="color" :size="'15px'" />
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "AppSpinner",
  components: {
    PulseLoader,
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    color: "#000",
    size: 15,
  }),
};
</script>
