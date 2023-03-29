<template>
  <div id="recover-container" class="h-full w-full">
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
          <app-recover-password-form />
        </article>
      </section>
    </article>
  </div>
</template>

<script>
import AppRecoverPasswordForm from "@/components/forms/AppRecoverPasswordForm.vue";

export default {
  name: "ForgotPasswordPage",
  components: { AppRecoverPasswordForm },
  layout: "blank",
  auth: "guest",
};
</script>

<style scoped>
#recover-container {
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
