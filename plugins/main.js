// Import vue
import Vue from "vue";
// Import vue-carousel
import VueCarousel from "vue-carousel";
// Import vue-notification
import Notifications from "vue-notification";
// Import vue-apexcharts
import VueApexCharts from "vue-apexcharts";
// Import vue-tailwind
import VueTailwind from "vue-tailwind";
// Import tailwind config
import { TPagination } from "vue-tailwind/dist/components";
// Import flowbite
import "flowbite";

const settings = {
  "t-pagination": {
    component: TPagination,
    props: {
      classes: {
        wrapper: "flex justify-center self-center text-sm",
        element: "w-5 hover:bg-gray-200",
        activeElement: "w-5 bg-black text-white font-bold hover:bg-gray-300",
        disabledElement: "w-5 bg-gray-100 hover:bg-gray-200 opacity-50",
        ellipsisElement: "w-5 bg-gray-100 hover:bg-gray-200",
        activeButton: "w-5 bg-black text-white font-bold hover:bg-neutral-700",
        disabledButton: "w-5 bg-gray-100 hover:bg-gray-200 opacity-50",
        button: "w-5 bg-white hover:bg-gray-100",
        disabledIcon: "text-gray-300",
        icon: "text-gray-600",
      },
    },
  },
};

Vue.use(VueCarousel)
  .use(Notifications)
  .use(VueApexCharts)
  .use(VueTailwind, settings)
  .component("apexchart", VueApexCharts);
