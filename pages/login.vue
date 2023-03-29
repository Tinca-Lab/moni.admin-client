<template>
  <div id="login-container" class="h-full w-full">
    <article
      class="flex flex-col items-center justify-center h-screen w-full backdrop-blur-2xl z-30 px-5"
    >
      <section
        class="flex flex-col items-center w-full min-w-fit sm:w-96 md:w-96 lg:w-96 xl:w-max"
      >
        <article
          class="w-full flex flex-col items-center justify-center text-white bg-white bg-opacity-30 py-5"
        >
          <h1 class="uppercase text-4xl xl:text-7xl">
            <strong> MONI </strong>
          </h1>
          <span class="text-2xl tracking-wider">Administrador</span>
        </article>
        <article
          class="w-full h-auto p-10 flex flex-col justify-start items-center bg-gray-100"
        >
          <app-login-form />
        </article>
      </section>
    </article>
  </div>
</template>

<script>
import AppLoginForm from "@/components/forms/AppLoginForm.vue";

export default {
  name: "LoginPage",
  components: { AppLoginForm },
  layout: "blank",
  head() {
    return {
      title: "Iniciar sesión | MONI",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Acceda al panel de control de su tienda en línea con solo iniciar sesión en nuestro ecommerce.
          Gestione fácilmente sus productos, pedidos, inventario y más desde un solo lugar. ¡Inicie sesión ahora y haga crecer su negocio en línea!`,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "moni, ecommerce, marketing, tienda en línea, administrador",
        },
      ],
    };
  },
};
</script>

<style scoped>
#login-container {
  background: url("@/assets/images/app-bg.gif") no-repeat fixed center;
  background-size: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
