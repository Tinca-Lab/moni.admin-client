<template>
  <div class="flex flex-col md:flex-row items-center h-screen w-full">
    <aside class="w-80 h-full hidden md:block">
      <div class="overflow-y-auto py-4 px-5 bg-neutral-800 h-full">
        <div class="space-y-2 flex flex-col items-center justify-around h-full">
          <ul class="uppercase">
            <li>
              <h1 class="uppercase text-4xl mx-auto text-white">
                <strong>MONI</strong>
              </h1>
            </li>
          </ul>
          <ul class="uppercase">
            <li
              v-for="(item, i) in items"
              :key="i"
              class="my-5 xl:my-5 2xl:my-10"
            >
              <nuxt-link :to="item.to" class="text-white">
                <div class="flex hover:border-b-2 px-2 py-1">
                  <img
                    v-if="item.icon"
                    class="mr-4"
                    :src="item.icon"
                    alt="nav icon"
                  />
                  <span>{{ item.name }}</span>
                </div>
              </nuxt-link>
            </li>
          </ul>
          <ul class="uppercase">
            <li>
              <app-button
                class="bg-transparent py-2 px-5 hover:bg-gray-50 hover:bg-opacity-25 w-full border-2 border-white ease-in-out duration-200"
                @onClick="onLogout"
              >
                CERRAR SESIÓN
              </app-button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <header class="w-full h-20 md:hidden">
      <nav
        class="w-full h-full bg-white shadow-md relative flex items-center justify-center"
      >
        <h1 class="uppercase text-3xl mx-auto"><strong>MONI</strong></h1>
        <aside class="relative absolute right-7">
          <button class="h-10 w-10" @click="isLogout = !isLogout">
            <img
              class="w-full h-full"
              src="@/assets/icons/profile.svg"
              alt="Perfil"
            />
          </button>
          <Transition name="slide-down">
            <nav
              v-if="isLogout"
              class="bg-white absolute right-0 z-50 p-5 whitespace-nowrap shadow"
            >
              <button class="underline" @click="onLogout">CERRAR SESIÓN</button>
            </nav>
          </Transition>
        </aside>
      </nav>
    </header>
    <Nuxt class="w-full h-full" />
    <footer
      class="w-full h-24 md:hidden px-3 pb-5 ease-in-out duration-200 transition-all"
    >
      <div
        class="w-full h-full bg-neutral-900 flex items-center justify-around ease-in-out duration-200 transition-all rounded-xl"
      >
        <nuxt-link class="ease-in-out duration-200 transition-all" to="/">
          <img
            class="w-6 h-6 mx-auto"
            src="@/assets/icons/fill-home.svg"
            alt="Home"
          />
          <span v-if="$route.path === '/'" class="text-white"> Inicio </span>
        </nuxt-link>
        <nuxt-link
          class="ease-in-out duration-200 transition-all"
          to="/products"
        >
          <img
            class="w-6 h-6 mx-auto"
            src="@/assets/icons/fill-products.svg"
            alt="Products"
          />
          <span v-if="$route.path === '/products'" class="text-white">
            Products
          </span>
        </nuxt-link>
        <nuxt-link
          class="ease-in-out duration-200 transition-all"
          to="/categories"
        >
          <img
            class="w-6 w-6 mx-auto"
            src="@/assets/icons/fill-categories.svg"
            alt="Categories"
          />
          <span v-if="$route.path === '/categories'" class="text-white">
            Categories
          </span>
        </nuxt-link>
        <nuxt-link class="ease-in-out duration-200 transition-all" to="/promos">
          <img
            class="w-6 h-6 mx-auto"
            src="@/assets/icons/fill-discounts.svg"
            alt="Prom"
          />
          <span v-if="$route.path === '/promos'" class="text-white">
            Descuentos
          </span>
        </nuxt-link>
        <nuxt-link class="ease-in-out duration-200 transition-all" to="/orders">
          <img
            class="w-6 h-6 mx-auto"
            src="@/assets/icons/fill-orders.svg"
            alt="Home"
          />
          <span v-if="$route.path === '/orders'" class="text-white">
            Ordenes
          </span>
        </nuxt-link>
      </div>
    </footer>
    <client-only>
      <notifications />
    </client-only>
  </div>
</template>

<script>
import AppButton from "@/components/buttons/AppButton.vue";

export default {
  name: "AdminLayout",
  components: { AppButton },
  data: () => ({
    isLogout: false,
    items: [
      { name: "Inicio", to: "/", icon: "/icons/home.svg" },
      { name: "Productos", to: "/products", icon: "/icons/products.svg" },
      { name: "Categorias", to: "/categories", icon: "/icons/categories.svg" },
      { name: "Descuentos", to: "/promos", icon: "/icons/discount.svg" },
      { name: "Ordenes", to: "/orders", icon: "/icons/orders.svg" },
      { name: "Carruseles", to: "/carousels", icon: "/icons/carousels.svg" },
    ],
  }),
  computed: {
    configs() {
      return this.$store.state.configs;
    },
  },
  methods: {
    onLogout() {
      this.$auth.logout().then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
a.nuxt-link-exact-active div {
  background-color: #5d5d5d !important;
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}

.slide-enter {
  transform: translateY(-100%);
}

.slide-leave-to {
  transform: translateY(-100%);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.5s ease-in-out;
}

.slide-down-enter-to,
.slide-down-leave {
  overflow: hidden;
  max-height: 1000px;
}

.slide-down-enter,
.slide-down-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
