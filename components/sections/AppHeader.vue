<template>
  <section class="flex flex-col">
    <app-title :title="title" />
    <app-label :label="label" />
  </section>
</template>

<script>
import AppTitle from "@/components/texts/AppTitle.vue";
import AppLabel from "@/components/texts/AppLabel.vue";

export default {
  name: "AppHeader",
  components: { AppLabel, AppTitle },
  props: {
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
