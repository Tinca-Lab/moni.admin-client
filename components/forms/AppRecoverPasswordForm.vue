<template>
  <form class="w-full" @submit.prevent="onSubmit">
    <h1 class="block mx-auto font-bold text-2xl mb-2.5 tracking-wide">
      <span v-if="step === 0">
        Necesitamos comprobar tu <br />
        identidad.
      </span>
      <span v-if="step === 1"> Verificando código. </span>
      <span v-if="step === 2"> Restablecer contraseña. </span>
    </h1>
    <article class="bg-neutral-200 p-2 w-max mb-2.5">
      <span v-if="step === 0" class="font-bold text-sm w-8/12 tracking-wide">
        Te enviaremos un correo con un código de seguridad.
      </span>
      <span v-if="step === 1" class="font-bold text-sm w-8/12 tracking-wide">
        Porfavor ingrese el código que le enviamos a su correo.
      </span>
      <span v-if="step === 2" class="font-bold text-sm w-8/12 tracking-wide">
        Ingresa tu nueva contraseña y la confirmación.
      </span>
    </article>
    <template v-if="step === 0">
      <section v-if="existEmail === null" class="w-full mb-5">
        <app-input
          v-model="email"
          title="Ingrese su correo electronico"
          class="w-full"
          type="email"
          autocomplete="email"
          placeholder="Ingresa tu correo electronico*"
          required
        />
      </section>
      <section v-if="existEmail !== null">
        <article class="flex items-center gap-2.5">
          <input
            id="email"
            v-model="checkExistEmail"
            required
            type="checkbox"
            class="rounded-0 w-3 h-3"
          />
          <label type="email" for="email">{{ existEmail }}</label>
        </article>
        <button
          class="underline mt-2.5 ease-in-out duration-150 hover:font-semibold"
          @click="existEmail = null"
        >
          Usar otro correo
        </button>
      </section>
    </template>
    <template v-if="step === 1">
      <div class="w-full mb-5">
        <app-input
          v-model="code"
          title="Ingrese su codigo"
          class="w-full"
          type="text"
          placeholder="Ingresa tu codigo*"
          required
        />
      </div>
      <button
        type="button"
        :disabled="counter !== 0"
        class="underline disabled:cursor-not-allowed"
        title="Reenviar código"
        @click="onResendCode"
      >
        Reenviar código
      </button>
    </template>
    <template v-if="step === 2">
      <div class="w-full mt-5">
        <app-input
          v-model="password"
          title="Ingrese su contraseña"
          class="w-full"
          type="password"
          required
          placeholder="Nueva contraseña*"
        />
      </div>
      <div class="w-full mt-5">
        <app-input
          v-model="confirmPasword"
          title="Ingrese su contraseña"
          class="w-full"
          type="password"
          required
          placeholder="Confirma tu contraseña*"
        />
      </div>
    </template>
    <div class="flex items-center w-full mt-5 gap-4">
      <app-button
        title="Cancelar"
        class="lg:whitespace-nowrap px-2 py-2 w-full bg-white text-black border border-black hover:bg-neutral-100"
        @onClick="$router.push('/login')"
      >
        <span class="text-sm md:text-lg uppercase font-medium"> Cancelar </span>
      </app-button>
      <app-button
        :title="step === 0 ? 'Validar' : 'Enviar'"
        class="lg:whitespace-nowrap px-2 py-2 w-full"
        :type="'submit'"
        :disabled="isLoading"
      >
        <span
          v-if="step === 0"
          class="text-sm md:text-lg uppercase font-medium"
        >
          {{ !isLoading ? "validar" : "cargando..." }}
        </span>
        <span
          v-if="step === 1"
          class="text-sm md:text-lg uppercase font-medium"
        >
          {{ !isLoading ? "enviar" : "cargando..." }}
        </span>
        <span
          v-if="step === 2"
          class="text-sm md:text-lg uppercase font-medium"
        >
          {{ !isLoading ? "actualizar" : "cargando..." }}
        </span>
      </app-button>
    </div>
    <p v-if="step === 1 && counter !== 0" class="text-red-700 block mt-2.5">
      Debes esperar {{ counter }} segundos para reenviar el codigo
    </p>
  </form>
</template>

<script>
import AppInput from "@/components/input/AppInput.vue";
import AppButton from "@/components/buttons/AppButton.vue";

export default {
  name: "AppRecoverPasswordForm",
  components: { AppButton, AppInput },
  data: () => ({
    email: "",
    existEmail: null,
    password: "",
    confirmPasword: "",
    code: "",
    isLoading: false,
    checkExistEmail: false,
    step: 0,
    counter: 0,
    interval: null,
  }),
  mounted() {
    this.existEmail = localStorage.getItem("exist_email");
    if (this.existEmail === "") this.existEmail = null;
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true;
        if (this.step === 0) {
          if (this.checkExistEmail) this.email = this.existEmail;
          await this.$axios.post(`/api/v1/auth/forgot-password`, {
            email: this.email,
          });
          this.onCounter();
          this.step = 1;
          this.isLoading = false;
        } else if (this.step === 1) {
          clearInterval(this.interval);
          this.counter = 0;
          await this.$axios.post(`/api/v1/auth/verify-code`, {
            email: this.email,
            code: this.code,
          });
          this.code = "";
          this.step = 2;
          this.isLoading = false;
        } else if (this.step === 2) {
          this.isLoading = true;
          await this.$axios.post(`/api/v1/auth/reset-password`, {
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPasword,
          });
          this.$notify({
            type: "success",
            title: "Éxito",
            text: "Hemos actualizado tu contraseña",
          });
          await this.$router.push("/login");
        } else {
          this.isLoading = false;
          this.$notify({
            type: "error",
            title: "¡Algo salió mal!",
            text: "Ha ocurrido un error",
          });
        }
      } catch (error) {
        this.isLoading = false;
        clearInterval(this.interval);
        this.counter = 0;
        this.$notify({
          type: "error",
          title: "¡Algo salió mal!",
          text: error?.response?.data?.message || "Ha ocurrido un error",
        });
      }
    },
    async onResendCode() {
      this.onCounter();
      this.isLoading = true;
      await this.$axios.post(`/api/v1/auth/forgot-password`, {
        email: this.email,
      });
      this.isLoading = false;
    },
    onCounter() {
      this.counter = 60;
      this.interval = setInterval(() => {
        this.counter--;
        if (this.counter === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
::placeholder {
  font-size: 1rem;
}
</style>
