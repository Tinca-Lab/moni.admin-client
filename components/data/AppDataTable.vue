<template>
  <div>
    <section class="mt-2.5">
      <article
        class="relative flex items-center xl:w-96 border-2 border-neutral-300 hover:border-neutral-500 outline-none focus:border-black ease-in-out duration-150"
      >
        <input
          v-model="search"
          class="w-full py-1 px-2 outline-none"
          type="text"
          placeholder="Buscar"
        />
        <button
          :disabled="search === ''"
          title="Borrar"
          class="mr-2 text-neutral-300 hover:text-neutral-500 focus:text-black ease-in-out duration-100 disabled:cursor-not-allowed"
          type="button"
          @click="search = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-eraser-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
            />
          </svg>
        </button>
        <ul
          v-if="search !== '' && filterItems.length > 0"
          class="w-full h-auto max-h-96 overflow-y-auto shadow bg-white absolute top-10 left-0 z-10 px-2.5"
        >
          <li
            v-for="(item, index) in filterItems"
            :key="index"
            class="border-b-2"
            :class="[index + 1 === filterItems.length ? 'mb-2.5' : '']"
          >
            <nuxt-link
              :title="item.name || item.reference"
              :to="`${prefix}/${item.id}`"
              class="block py-2"
            >
              {{ item.name || item.reference }}
            </nuxt-link>
          </li>
        </ul>
      </article>
      <article class="block overflow-x-auto relative lg:max-w-full">
        <table class="text-sm text-left text-neutral-500 mt-5 w-full">
          <thead class="text-xs text-neutral-700 uppercase bg-neutral-300">
            <tr class="text-center">
              <th
                v-for="(item, index) in headers"
                :key="index"
                scope="col"
                class="px-6 py-3"
              >
                {{ item.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in data"
              :key="index"
              class="bg-white border-b border-neutral-400 hover:bg-neutral-200 cursor-pointer text-center"
              @click="$router.push(`${prefix}/${item.id}`)"
            >
              <th
                v-if="item?.reference && $route.fullPath.includes('orders')"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ item.reference }}
              </th>
              <th
                v-if="item?.user?.profile"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ item.user.profile.firstname }}
                {{ item.user.profile.lastname }}
              </th>
              <th
                v-if="item?.code"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ item.code }}
              </th>
              <th
                v-if="item?.discount"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ item.discount }}%
              </th>
              <th
                v-if="item?.total"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ formatCurrency(item.total) }}
              </th>
              <th
                v-if="item?.address"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ item?.address?.city.name }} {{ item?.address?.address }}
              </th>
              <th
                v-if="item?.image"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                <img
                  class="w-20 h-20 object-contain"
                  :src="item?.image"
                  :alt="item?.image"
                />
              </th>
              <th
                v-if="item?.name"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ item?.name }}
              </th>
              <th
                v-if="item?.category"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ item?.category?.name }}
              </th>
              <th
                v-if="item?.subcategory"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ item?.subcategory?.name }}
              </th>
              <th
                v-if="item?.price"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ formatCurrency(item?.price) }}
              </th>
              <th
                v-if="item?.quantity"
                scope="row"
                class="p-2 font-medium text-neutral-900"
              >
                {{ item?.quantity }}
              </th>
              <th
                v-if="item?.createdAt"
                scope="row"
                class="px-6 py-4 font-medium text-neutral-900"
              >
                {{ onFormatDate(item.createdAt) || "N/A" }}
              </th>
              <th
                v-if="item?.updatedAt"
                scope="row"
                class="px-6 py-4 font-medium text-neutral-900"
              >
                {{ onFormatDate(item.updatedAt) || "N/A" }}
              </th>
              <th
                v-if="item?.startDate"
                scope="row"
                class="px-6 py-4 font-medium text-neutral-900"
              >
                {{ onFormatDate(item.startDate) || "N/A" }}
              </th>
              <th
                v-if="item?.endDate"
                scope="row"
                class="px-6 py-4 font-medium text-neutral-900"
              >
                {{ onFormatDate(item.endDate) || "N/A" }}
              </th>
              <th
                v-if="item?.active || item?.active === false"
                scope="row"
                class="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap"
              >
                <button
                  title="Estado"
                  disabled
                  :class="[
                    item.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-neutral-100 text-neutral-800',
                  ]"
                  class="px-2 py-3 w-full inline-flex text-lg leading-5 font-semibold justify-center"
                >
                  <template v-if="item.active"> PUBLICADO</template>
                  <template v-else> NO PUBLICADO</template>
                </button>
              </th>
              <th
                v-if="item?.transactionStatus"
                scope="row"
                class="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap"
              >
                <button
                  title="Transacción"
                  disabled
                  :class="[
                    item.transactionStatus === 'SUCCESS'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-neutral-100 text-neutral-800',
                  ]"
                  class="px-2 py-3 w-full inline-flex text-lg leading-5 font-semibold justify-center"
                >
                  <template v-if="item.transactionStatus === 'SUCCESS'">
                    PROCESADA
                  </template>
                  <template v-else> NO PROCESADA</template>
                </button>
              </th>
              <th
                v-if="item?.shippingStatus"
                scope="row"
                class="px-6 py-4 font-medium text-neutral-900 whitespace-nowrap"
              >
                <button
                  title="Transacción"
                  disabled
                  :class="[
                    item.shippingStatus === 'SUCCESS'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-neutral-100 text-neutral-800',
                  ]"
                  class="px-2 py-3 w-full inline-flex text-lg leading-5 font-semibold justify-center"
                >
                  <template v-if="item.shippingStatus === 'SUCCESS'">
                    ENVIADA
                  </template>
                  <template v-else> NO ENVIADA</template>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
    <t-pagination
      v-model="currentPage"
      class="mt-2.5"
      :total-items="metadata?.total"
      :per-page="10"
      :limit="4"
      :disabled="!metadata"
      @input="$emit('onPageChange', $event)"
    />
  </div>
</template>

<script>
import { formatCurrency, formatDate } from "@/plugins/libs";

export default {
  name: "AppDataTable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    prefix: {
      type: String,
      default: "",
    },
    metadata: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    search: "",
  }),
  computed: {
    currentPage: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    filterItems() {
      if (this.search.trim() === "") {
        return this.data;
      }
      const searchLower = this.search.toLowerCase();
      return this.data.filter(
        (item) =>
          item?.name?.toLowerCase().includes(searchLower) ||
          item?.reference?.toLowerCase().includes(searchLower)
      );
    },
  },
  methods: {
    formatCurrency(value) {
      return formatCurrency(value);
    },
    onFormatDate(date) {
      return formatDate(date);
    },
  },
};
</script>
