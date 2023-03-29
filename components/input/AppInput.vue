<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :autofocus="autofocus"
    class="bg-white border-[3px] border-gray-500 outline-none p-1.5 text-lg focus:border-black disabled:text-neutral-500 disabled:border-gray-300 ease-in-out duration-200 checked:bg-black"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "AppInput",
  props: {
    id: {
      type: String,
      default: null,
    },
    data: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
::placeholder {
  font-size: 1.1rem;
}

input[type="checkbox"] {
  filter: saturate(0%) contrast(200%);
}
</style>
