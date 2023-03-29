<template>
  <form class="w-full" @submit.prevent="onSubmit">
    <div class="w-full mb-5">
      <app-input
        v-model="email"
        title="Ingrese su correo electronico"
        class="w-full"
        type="email"
        autocomplete="email"
        placeholder="Correo electronico*"
        required
      />
    </div>
    <div class="w-full mt-5">
      <app-input
        v-model="password"
        title="Ingrese su contraseña"
        class="w-full"
        type="password"
        required
        placeholder="Contraseña*"
      />
    </div>
    <article class="flex items-center mt-2.5">
      <input id="remember" v-model="remember" type="checkbox" />
      <label for="remember">
        <span class="ml-2 text-sm">Recordarme</span>
      </label>
    </article>
    <div class="flex items-center w-full mt-10 gap-4">
      <span
        class="lg:whitespace-nowrap text-md cursor-pointer w-full hover:underline ease-in-out duration-200"
        @click="setEmail"
      >
        ¿Olvidaste tu contraseña?
      </span>
      <app-button
        class="lg:whitespace-nowrap px-2 py-2 w-full"
        :type="'submit'"
        :disabled="is_loading"
      >
        <span class="text-sm md:text-lg uppercase font-medium">
          {{ is_loading ? "Cargando..." : "Ingresar" }}</span
        >
      </app-button>
    </div>
    <div>
      <span
        class="text-md mt-10 block text-center text-black p-3 border border-neutral-900"
      >
        ¿No tienes una cuenta o producto?
        <a href="https://moni.tincalab.com" target="_blank" class="underline"
          >Compra aquí</a
        >
      </span>
    </div>
  </form>
</template>

<script>
import AppButton from "@/components/buttons/AppButton.vue";
import AppInput from "@/components/input/AppInput.vue";

export default {
  name: "AppLoginForm",
  components: { AppInput, AppButton },
  data: () => ({
    email: "",
    password: "",
    remember: false,
    is_loading: false,
  }),
  methods: {
    async onSubmit() {
      try {
        this.is_loading = true;
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
            isAdmin: true,
          },
        });
        this.$notify({
          type: "success",
          title: "Bienvenid@",
          text: "¡Has iniciado sesión correctamente!",
        });
        await this.$router.push("/");
      } catch (error) {
        this.is_loading = false;
        this.$notify({
          type: "error",
          title: "¡Algo salió mal!",
          text:
            error?.response?.data?.message ||
            "Ha ocurrido un error al iniciar sesión",
        });
      }
    },
    setEmail() {
      localStorage.setItem("exist_email", this.email);
      this.$router.push("/forgot-password");
    },
  },
};
</script>

<style scoped></style>
