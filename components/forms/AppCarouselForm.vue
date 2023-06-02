<template>
  <!-- <form class="xl:text-xl w-full flex flex-col gap-4" @submit.prevent="onSubmit"> -->
  <section class=" xl:text-xl w-full flex flex-col gap-4">
    <header class="mt-5 flex flex-col gap-4">
        <p class="text-xl">Vista previa del carrusel</p>
        <article class="relative">
          <!-- <img v-if="dataImage.length === 0" class="block mx-auto w-full m-auto z-10 lg:h-[475px]" src="@/assets/images/app-Loading.png" alt=""> -->
          <!-- <div class="bg-red-500 fixed w-full h-[384px] z-10"></div> -->
          <carousel
              ref="carousel"
              class="w-full h-full items-center justify-center mt-3 border-2 border-[#E7E7E7] Z-20"
              :pagination-position="'bottom-overlay'"
              :easing="'ease-out'"
              :pagination-color="'#8c8c8c'"
              :pagination-active-color="'#000'"
              :pagination-enabled="!editing"
              :navigation-enabled="!editing"
              :autoplay="false"
              :adjustable-height="false"
              :navigation-click-target-size="20"
              :center-mode="true"
              :mouse-drag="!editing"
              :per-page="1"
              :scroll-per-page="false"
              :touchDrag="!editing"
              :mouseDrag="!editing"
              >
              <slide v-if="dataImage.length === 0" class="p-6">
                <img
                  class="w-96 m-auto z-40"
                  src="@/assets/images/app-Loading.png"
                  alt="Not carousel image"
                />
              </slide>
              <slide
                v-for="(item, index) in dataImage" :key="index"
                class="w-full flex justify-center items-center relative"
              >
              <div v-if="typeof(item.images) === 'object'">
                <img
                  :id="'image'+index"
                  class="w-full h-96 object-cover z-0"
                  :src="item.images.url || item.images.preview"
                  alt="carousel image"
                />
                <article :id="'image'+index" class="flex w-[127px] flex-row gap-3 bg-[#E7E7E7] p-4 rounded-lg m-auto md:absolute md:flex md:top-3 md:right-3 z-50">
                  <svg
                    :id="'image'+index" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg"
                    @click="deleteImage">
                  >
                    <path d="M7 9.5V15.5M11 9.5V15.5M1 5.5H17M16 5.5L15.133 17.642C15.0971 18.1466 14.8713 18.6188 14.5011 18.9636C14.1309 19.3083 13.6439 19.5 13.138 19.5H4.862C4.35614 19.5 3.86907 19.3083 3.49889 18.9636C3.1287 18.6188 2.90292 18.1466 2.867 17.642L2 5.5H16ZM12 5.5V2.5C12 2.23478 11.8946 1.98043 11.7071 1.79289C11.5196 1.60536 11.2652 1.5 11 1.5H7C6.73478 1.5 6.48043 1.60536 6.29289 1.79289C6.10536 1.98043 6 2.23478 6 2.5V5.5H12Z" stroke="#111928" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <input
                    :id="'images'+index"
                    ref="picturesReplace"
                    multiple
                    type="file"
                    class="hidden"
                    accept="image/*"
                    @change="editImage"
                  />
                  <label
                  :for="'images'+index" class="w-[21px] flex h-[23px]">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.3968 3.86486C20.9468 3.41493 20.3364 3.16217 19.7 3.16217C19.0636 3.16217 18.4533 3.41493 18.0032 3.86486L8.90002 12.9681V16.3617H12.2936L21.3968 7.25846C21.8468 6.80839 22.0995 6.19805 22.0995 5.56166C22.0995 4.92526 21.8468 4.31492 21.3968 3.86486Z" fill="#1B1F23"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.90002 7.96166C2.90002 7.32514 3.15288 6.71469 3.60297 6.2646C4.05306 5.81452 4.6635 5.56166 5.30002 5.56166H10.1C10.4183 5.56166 10.7235 5.68809 10.9486 5.91313C11.1736 6.13818 11.3 6.4434 11.3 6.76166C11.3 7.07992 11.1736 7.38514 10.9486 7.61019C10.7235 7.83523 10.4183 7.96166 10.1 7.96166H5.30002V19.9617H17.3V15.1617C17.3 14.8434 17.4265 14.5382 17.6515 14.3131C17.8765 14.0881 18.1818 13.9617 18.5 13.9617C18.8183 13.9617 19.1235 14.0881 19.3486 14.3131C19.5736 14.5382 19.7 14.8434 19.7 15.1617V19.9617C19.7 20.5982 19.4472 21.2086 18.9971 21.6587C18.547 22.1088 17.9365 22.3617 17.3 22.3617H5.30002C4.6635 22.3617 4.05306 22.1088 3.60297 21.6587C3.15288 21.2086 2.90002 20.5982 2.90002 19.9617V7.96166Z" fill="#1B1F23"/>
                    </svg>
                  </label>
                  <svg :id="'image'+index" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"  @click="edit">
                    <path :id="'image'+index" d="M12.5 7.89267C11.8606 7.89267 11.2274 8.01861 10.6367 8.2633C10.046 8.50799 9.50921 8.86664 9.05708 9.31877C8.60495 9.7709 8.2463 10.3076 8.00161 10.8984C7.75692 11.4891 7.63098 12.1223 7.63098 12.7617C7.63098 13.4011 7.75692 14.0342 8.00161 14.625C8.2463 15.2157 8.60495 15.7524 9.05708 16.2046C9.50921 16.6567 10.046 17.0153 10.6367 17.26C11.2274 17.5047 11.8606 17.6307 12.5 17.6307C13.7913 17.6307 15.0298 17.1177 15.9429 16.2046C16.856 15.2915 17.369 14.053 17.369 12.7617C17.369 11.4703 16.856 10.2319 15.9429 9.31877C15.0298 8.40565 13.7913 7.89267 12.5 7.89267ZM9.13098 12.7617C9.13098 11.8682 9.48593 11.0112 10.1177 10.3794C10.7495 9.74762 11.6065 9.39267 12.5 9.39267C13.3935 9.39267 14.2504 9.74762 14.8822 10.3794C15.514 11.0112 15.869 11.8682 15.869 12.7617C15.869 13.6552 15.514 14.5121 14.8822 15.1439C14.2504 15.7757 13.3935 16.1307 12.5 16.1307C11.6065 16.1307 10.7495 15.7757 10.1177 15.1439C9.48593 14.5121 9.13098 13.6552 9.13098 12.7617Z" fill="#1B1F23"/>
                    <path :id="'image'+index" d="M15.194 2.77617C14.4035 0.0911707 10.5965 0.0911707 9.80598 2.77617L9.66498 3.25467C9.60978 3.4421 9.51333 3.6148 9.38271 3.76011C9.25209 3.90542 9.0906 4.01966 8.91009 4.09445C8.72959 4.16924 8.53463 4.20269 8.33951 4.19235C8.1444 4.182 7.95407 4.12813 7.78248 4.03467L7.34448 3.79467C4.88448 2.45667 2.19498 5.14767 3.53448 7.60617L3.77298 8.04417C3.86644 8.21576 3.92032 8.40609 3.93066 8.6012C3.941 8.79632 3.90755 8.99127 3.83276 9.17178C3.75797 9.35229 3.64373 9.51377 3.49842 9.64439C3.35311 9.77502 3.18041 9.87146 2.99298 9.92667L2.51448 10.0677C-0.170518 10.8582 -0.170518 14.6652 2.51448 15.4557L2.99298 15.5967C3.18041 15.6519 3.35311 15.7483 3.49842 15.8789C3.64373 16.0096 3.75797 16.171 3.83276 16.3516C3.90755 16.5321 3.941 16.727 3.93066 16.9221C3.92032 17.1173 3.86644 17.3076 3.77298 17.4792L3.53298 17.9172C2.19498 20.3772 4.88448 23.0682 7.34448 21.7272L7.78248 21.4887C7.95407 21.3952 8.1444 21.3413 8.33951 21.331C8.53463 21.3206 8.72959 21.3541 8.91009 21.4289C9.0906 21.5037 9.25209 21.6179 9.38271 21.7632C9.51333 21.9085 9.60978 22.0812 9.66498 22.2687L9.80598 22.7472C10.5965 25.4322 14.4035 25.4322 15.194 22.7472L15.335 22.2687C15.3902 22.0812 15.4866 21.9085 15.6173 21.7632C15.7479 21.6179 15.9094 21.5037 16.0899 21.4289C16.2704 21.3541 16.4653 21.3206 16.6604 21.331C16.8556 21.3413 17.0459 21.3952 17.2175 21.4887L17.6555 21.7287C20.1155 23.0682 22.8065 20.3757 21.4655 17.9172L21.227 17.4792C21.1335 17.3076 21.0796 17.1173 21.0693 16.9221C21.059 16.727 21.0924 16.5321 21.1672 16.3516C21.242 16.171 21.3562 16.0096 21.5015 15.8789C21.6469 15.7483 21.8196 15.6519 22.007 15.5967L22.4855 15.4557C25.1705 14.6652 25.1705 10.8582 22.4855 10.0677L22.007 9.92667C21.8196 9.87146 21.6469 9.77502 21.5015 9.64439C21.3562 9.51377 21.242 9.35229 21.1672 9.17178C21.0924 8.99127 21.059 8.79632 21.0693 8.6012C21.0796 8.40609 21.1335 8.21576 21.227 8.04417L21.467 7.60617C22.8065 5.14617 20.114 2.45667 17.6555 3.79617L17.2175 4.03467C17.0459 4.12813 16.8556 4.182 16.6604 4.19235C16.4653 4.20269 16.2704 4.16924 16.0899 4.09445C15.9094 4.01966 15.7479 3.90542 15.6173 3.76011C15.4866 3.6148 15.3902 3.4421 15.335 3.25467L15.194 2.77617ZM11.2445 3.20067C11.6135 1.94817 13.3865 1.94817 13.7555 3.20067L13.8965 3.67917C14.015 4.0813 14.222 4.4518 14.5024 4.76352C14.7827 5.07524 15.1293 5.32026 15.5166 5.48064C15.9039 5.64101 16.3223 5.71267 16.7409 5.69035C17.1595 5.66804 17.5679 5.55232 17.936 5.35167L18.3725 5.11167C19.5185 4.48917 20.7725 5.74167 20.1485 6.88917L19.91 7.32717C19.7096 7.69531 19.5942 8.10361 19.5721 8.52215C19.55 8.94069 19.6219 9.35887 19.7824 9.74605C19.9429 10.1332 20.188 10.4796 20.4997 10.7597C20.8115 11.0399 21.1819 11.2468 21.584 11.3652L22.061 11.5062C23.3135 11.8752 23.3135 13.6482 22.061 14.0172L21.5825 14.1582C21.1804 14.2767 20.8098 14.4837 20.4981 14.7641C20.1864 15.0444 19.9414 15.3909 19.781 15.7783C19.6206 16.1656 19.549 16.584 19.5713 17.0026C19.5936 17.4212 19.7093 17.8296 19.91 18.1977L20.15 18.6342C20.7725 19.7802 19.52 21.0342 18.3725 20.4102L17.936 20.1717C17.5678 19.971 17.1593 19.8554 16.7406 19.8332C16.3219 19.8109 15.9035 19.8827 15.5162 20.0432C15.1288 20.2038 14.7823 20.449 14.502 20.7609C14.2217 21.0727 14.0148 21.4434 13.8965 21.8457L13.7555 22.3227C13.3865 23.5752 11.6135 23.5752 11.2445 22.3227L11.1035 21.8442C10.9849 21.4423 10.7779 21.0719 10.4977 20.7604C10.2174 20.4488 9.87107 20.2039 9.48392 20.0435C9.09676 19.8832 8.67864 19.8115 8.26018 19.8336C7.84172 19.8558 7.43352 19.9713 7.06548 20.1717L6.62748 20.4117C5.48148 21.0342 4.22748 19.7817 4.85148 18.6342L5.08998 18.1977C5.29091 17.8295 5.40686 17.421 5.42932 17.0022C5.45179 16.5834 5.38019 16.1649 5.2198 15.7773C5.0594 15.3898 4.81427 15.0431 4.5024 14.7626C4.19053 14.4822 3.81982 14.2751 3.41748 14.1567L2.93898 14.0157C1.68648 13.6467 1.68648 11.8737 2.93898 11.5047L3.41748 11.3637C3.81919 11.245 4.18929 11.0381 4.5007 10.758C4.8121 10.4778 5.05693 10.1316 5.21726 9.74465C5.3776 9.35769 5.44938 8.93978 5.42736 8.5215C5.40533 8.10322 5.29006 7.69515 5.08998 7.32717L4.84998 6.88917C4.22748 5.74317 5.47998 4.48917 6.62748 5.11317L7.06548 5.35167C7.43352 5.55203 7.84172 5.66753 8.26018 5.6897C8.67864 5.71187 9.09676 5.64015 9.48392 5.47979C9.87107 5.31944 10.2174 5.07451 10.4977 4.76295C10.7779 4.45139 10.9849 4.08109 11.1035 3.67917L11.2445 3.20067Z" fill="#1B1F23"/>
                  </svg>
                </article>

                  <div v-if="dataImage[index].textAndButton" :class="getBotonClass(dataImage[index].positionX,dataImage[index].positionY)" class="flex-grow">
                    <article class="flex-grow">
                      <button
                        v-if="item.titleCta"
                        type="button"
                        class="flex-shrink-0 h-12 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed rounded-xl	p-3"
                      >
                        {{item.titleCta}}
                      </button>
                    </article>
                    <article class="supersm:w-28 sm:w-36 md:W-72 lg:w-96 overflow-y-auto">
                      <p class="break-words">
                        {{item.descrption}}
                      </p>
                    </article>
                  </div>
              </div>
              </slide>
              <!-- <slide v-if="dataImage.length !== 0 && editing" class="p-6">
                <img
                  class="w-96 m-auto z-40"
                  src="@/assets/images/app-Loading.png"
                  alt="Not carousel image"
                />
              </slide> -->
          </carousel>
          <!-- md:absolute md:flex md:top-3 md:right-0 md:z-50 -->
          <article v-if="dataImage.length === 0" class="flex w-[55px] flex-row gap-3 bg-[#E7E7E7] p-4 rounded-lg m-auto md:absolute md:flex md:top-6 md:right-5 md:z-50">
            <input
              id="pictures"
              ref="pictures"
              multiple
              type="file"
              class="hidden"
              accept="image/*"
              @change="onLoadPictures"
            />
            <label
            for="pictures" class="w-[21px] flex h-[23px]">
              <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.49995 15.7617C4.51497 15.7628 3.56421 15.4004 2.82982 14.744C2.09544 14.0876 1.62907 13.1833 1.52006 12.2043C1.41106 11.2254 1.66708 10.2406 2.23909 9.43877C2.81109 8.63689 3.65885 8.07425 4.61995 7.85865C4.34187 6.56175 4.59038 5.20749 5.3108 4.0938C6.03122 2.98012 7.16454 2.19823 8.46145 1.92015C9.75836 1.64208 11.1126 1.89058 12.2263 2.611C13.34 3.33142 14.1219 4.46475 14.4 5.76165H14.5C15.7399 5.76041 16.9361 6.21994 17.8563 7.05103C18.7765 7.88212 19.3551 9.02548 19.4797 10.2592C19.6043 11.4928 19.266 12.7288 18.5306 13.7271C17.7952 14.7255 16.7151 15.4149 15.5 15.6617M13.5 12.7617L10.5 9.76165M10.5 9.76165L7.49995 12.7617M10.5 9.76165V21.7617" stroke="#1B1F23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </label>
            <!-- <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.3968 3.86486C20.9468 3.41493 20.3364 3.16217 19.7 3.16217C19.0636 3.16217 18.4533 3.41493 18.0032 3.86486L8.90002 12.9681V16.3617H12.2936L21.3968 7.25846C21.8468 6.80839 22.0995 6.19805 22.0995 5.56166C22.0995 4.92526 21.8468 4.31492 21.3968 3.86486Z" fill="#1B1F23"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.90002 7.96166C2.90002 7.32514 3.15288 6.71469 3.60297 6.2646C4.05306 5.81452 4.6635 5.56166 5.30002 5.56166H10.1C10.4183 5.56166 10.7235 5.68809 10.9486 5.91313C11.1736 6.13818 11.3 6.4434 11.3 6.76166C11.3 7.07992 11.1736 7.38514 10.9486 7.61019C10.7235 7.83523 10.4183 7.96166 10.1 7.96166H5.30002V19.9617H17.3V15.1617C17.3 14.8434 17.4265 14.5382 17.6515 14.3131C17.8765 14.0881 18.1818 13.9617 18.5 13.9617C18.8183 13.9617 19.1235 14.0881 19.3486 14.3131C19.5736 14.5382 19.7 14.8434 19.7 15.1617V19.9617C19.7 20.5982 19.4472 21.2086 18.9971 21.6587C18.547 22.1088 17.9365 22.3617 17.3 22.3617H5.30002C4.6635 22.3617 4.05306 22.1088 3.60297 21.6587C3.15288 21.2086 2.90002 20.5982 2.90002 19.9617V7.96166Z" fill="#1B1F23"/>
            </svg>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 7.89267C11.8606 7.89267 11.2274 8.01861 10.6367 8.2633C10.046 8.50799 9.50921 8.86664 9.05708 9.31877C8.60495 9.7709 8.2463 10.3076 8.00161 10.8984C7.75692 11.4891 7.63098 12.1223 7.63098 12.7617C7.63098 13.4011 7.75692 14.0342 8.00161 14.625C8.2463 15.2157 8.60495 15.7524 9.05708 16.2046C9.50921 16.6567 10.046 17.0153 10.6367 17.26C11.2274 17.5047 11.8606 17.6307 12.5 17.6307C13.7913 17.6307 15.0298 17.1177 15.9429 16.2046C16.856 15.2915 17.369 14.053 17.369 12.7617C17.369 11.4703 16.856 10.2319 15.9429 9.31877C15.0298 8.40565 13.7913 7.89267 12.5 7.89267ZM9.13098 12.7617C9.13098 11.8682 9.48593 11.0112 10.1177 10.3794C10.7495 9.74762 11.6065 9.39267 12.5 9.39267C13.3935 9.39267 14.2504 9.74762 14.8822 10.3794C15.514 11.0112 15.869 11.8682 15.869 12.7617C15.869 13.6552 15.514 14.5121 14.8822 15.1439C14.2504 15.7757 13.3935 16.1307 12.5 16.1307C11.6065 16.1307 10.7495 15.7757 10.1177 15.1439C9.48593 14.5121 9.13098 13.6552 9.13098 12.7617Z" fill="#1B1F23"/>
              <path d="M15.194 2.77617C14.4035 0.0911707 10.5965 0.0911707 9.80598 2.77617L9.66498 3.25467C9.60978 3.4421 9.51333 3.6148 9.38271 3.76011C9.25209 3.90542 9.0906 4.01966 8.91009 4.09445C8.72959 4.16924 8.53463 4.20269 8.33951 4.19235C8.1444 4.182 7.95407 4.12813 7.78248 4.03467L7.34448 3.79467C4.88448 2.45667 2.19498 5.14767 3.53448 7.60617L3.77298 8.04417C3.86644 8.21576 3.92032 8.40609 3.93066 8.6012C3.941 8.79632 3.90755 8.99127 3.83276 9.17178C3.75797 9.35229 3.64373 9.51377 3.49842 9.64439C3.35311 9.77502 3.18041 9.87146 2.99298 9.92667L2.51448 10.0677C-0.170518 10.8582 -0.170518 14.6652 2.51448 15.4557L2.99298 15.5967C3.18041 15.6519 3.35311 15.7483 3.49842 15.8789C3.64373 16.0096 3.75797 16.171 3.83276 16.3516C3.90755 16.5321 3.941 16.727 3.93066 16.9221C3.92032 17.1173 3.86644 17.3076 3.77298 17.4792L3.53298 17.9172C2.19498 20.3772 4.88448 23.0682 7.34448 21.7272L7.78248 21.4887C7.95407 21.3952 8.1444 21.3413 8.33951 21.331C8.53463 21.3206 8.72959 21.3541 8.91009 21.4289C9.0906 21.5037 9.25209 21.6179 9.38271 21.7632C9.51333 21.9085 9.60978 22.0812 9.66498 22.2687L9.80598 22.7472C10.5965 25.4322 14.4035 25.4322 15.194 22.7472L15.335 22.2687C15.3902 22.0812 15.4866 21.9085 15.6173 21.7632C15.7479 21.6179 15.9094 21.5037 16.0899 21.4289C16.2704 21.3541 16.4653 21.3206 16.6604 21.331C16.8556 21.3413 17.0459 21.3952 17.2175 21.4887L17.6555 21.7287C20.1155 23.0682 22.8065 20.3757 21.4655 17.9172L21.227 17.4792C21.1335 17.3076 21.0796 17.1173 21.0693 16.9221C21.059 16.727 21.0924 16.5321 21.1672 16.3516C21.242 16.171 21.3562 16.0096 21.5015 15.8789C21.6469 15.7483 21.8196 15.6519 22.007 15.5967L22.4855 15.4557C25.1705 14.6652 25.1705 10.8582 22.4855 10.0677L22.007 9.92667C21.8196 9.87146 21.6469 9.77502 21.5015 9.64439C21.3562 9.51377 21.242 9.35229 21.1672 9.17178C21.0924 8.99127 21.059 8.79632 21.0693 8.6012C21.0796 8.40609 21.1335 8.21576 21.227 8.04417L21.467 7.60617C22.8065 5.14617 20.114 2.45667 17.6555 3.79617L17.2175 4.03467C17.0459 4.12813 16.8556 4.182 16.6604 4.19235C16.4653 4.20269 16.2704 4.16924 16.0899 4.09445C15.9094 4.01966 15.7479 3.90542 15.6173 3.76011C15.4866 3.6148 15.3902 3.4421 15.335 3.25467L15.194 2.77617ZM11.2445 3.20067C11.6135 1.94817 13.3865 1.94817 13.7555 3.20067L13.8965 3.67917C14.015 4.0813 14.222 4.4518 14.5024 4.76352C14.7827 5.07524 15.1293 5.32026 15.5166 5.48064C15.9039 5.64101 16.3223 5.71267 16.7409 5.69035C17.1595 5.66804 17.5679 5.55232 17.936 5.35167L18.3725 5.11167C19.5185 4.48917 20.7725 5.74167 20.1485 6.88917L19.91 7.32717C19.7096 7.69531 19.5942 8.10361 19.5721 8.52215C19.55 8.94069 19.6219 9.35887 19.7824 9.74605C19.9429 10.1332 20.188 10.4796 20.4997 10.7597C20.8115 11.0399 21.1819 11.2468 21.584 11.3652L22.061 11.5062C23.3135 11.8752 23.3135 13.6482 22.061 14.0172L21.5825 14.1582C21.1804 14.2767 20.8098 14.4837 20.4981 14.7641C20.1864 15.0444 19.9414 15.3909 19.781 15.7783C19.6206 16.1656 19.549 16.584 19.5713 17.0026C19.5936 17.4212 19.7093 17.8296 19.91 18.1977L20.15 18.6342C20.7725 19.7802 19.52 21.0342 18.3725 20.4102L17.936 20.1717C17.5678 19.971 17.1593 19.8554 16.7406 19.8332C16.3219 19.8109 15.9035 19.8827 15.5162 20.0432C15.1288 20.2038 14.7823 20.449 14.502 20.7609C14.2217 21.0727 14.0148 21.4434 13.8965 21.8457L13.7555 22.3227C13.3865 23.5752 11.6135 23.5752 11.2445 22.3227L11.1035 21.8442C10.9849 21.4423 10.7779 21.0719 10.4977 20.7604C10.2174 20.4488 9.87107 20.2039 9.48392 20.0435C9.09676 19.8832 8.67864 19.8115 8.26018 19.8336C7.84172 19.8558 7.43352 19.9713 7.06548 20.1717L6.62748 20.4117C5.48148 21.0342 4.22748 19.7817 4.85148 18.6342L5.08998 18.1977C5.29091 17.8295 5.40686 17.421 5.42932 17.0022C5.45179 16.5834 5.38019 16.1649 5.2198 15.7773C5.0594 15.3898 4.81427 15.0431 4.5024 14.7626C4.19053 14.4822 3.81982 14.2751 3.41748 14.1567L2.93898 14.0157C1.68648 13.6467 1.68648 11.8737 2.93898 11.5047L3.41748 11.3637C3.81919 11.245 4.18929 11.0381 4.5007 10.758C4.8121 10.4778 5.05693 10.1316 5.21726 9.74465C5.3776 9.35769 5.44938 8.93978 5.42736 8.5215C5.40533 8.10322 5.29006 7.69515 5.08998 7.32717L4.84998 6.88917C4.22748 5.74317 5.47998 4.48917 6.62748 5.11317L7.06548 5.35167C7.43352 5.55203 7.84172 5.66753 8.26018 5.6897C8.67864 5.71187 9.09676 5.64015 9.48392 5.47979C9.87107 5.31944 10.2174 5.07451 10.4977 4.76295C10.7779 4.45139 10.9849 4.08109 11.1035 3.67917L11.2445 3.20067Z" fill="#1B1F23"/>
            </svg> -->
          </article>
        </article>
        <!-- <article class="flex flex-row gap-3 bg-[#E7E7E7] p-4 rounded-lg m-auto md:hidden">
          <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.49995 15.7617C4.51497 15.7628 3.56421 15.4004 2.82982 14.744C2.09544 14.0876 1.62907 13.1833 1.52006 12.2043C1.41106 11.2254 1.66708 10.2406 2.23909 9.43877C2.81109 8.63689 3.65885 8.07425 4.61995 7.85865C4.34187 6.56175 4.59038 5.20749 5.3108 4.0938C6.03122 2.98012 7.16454 2.19823 8.46145 1.92015C9.75836 1.64208 11.1126 1.89058 12.2263 2.611C13.34 3.33142 14.1219 4.46475 14.4 5.76165H14.5C15.7399 5.76041 16.9361 6.21994 17.8563 7.05103C18.7765 7.88212 19.3551 9.02548 19.4797 10.2592C19.6043 11.4928 19.266 12.7288 18.5306 13.7271C17.7952 14.7255 16.7151 15.4149 15.5 15.6617M13.5 12.7617L10.5 9.76165M10.5 9.76165L7.49995 12.7617M10.5 9.76165V21.7617" stroke="#1B1F23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.3968 3.86486C20.9468 3.41493 20.3364 3.16217 19.7 3.16217C19.0636 3.16217 18.4533 3.41493 18.0032 3.86486L8.90002 12.9681V16.3617H12.2936L21.3968 7.25846C21.8468 6.80839 22.0995 6.19805 22.0995 5.56166C22.0995 4.92526 21.8468 4.31492 21.3968 3.86486Z" fill="#1B1F23"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.90002 7.96166C2.90002 7.32514 3.15288 6.71469 3.60297 6.2646C4.05306 5.81452 4.6635 5.56166 5.30002 5.56166H10.1C10.4183 5.56166 10.7235 5.68809 10.9486 5.91313C11.1736 6.13818 11.3 6.4434 11.3 6.76166C11.3 7.07992 11.1736 7.38514 10.9486 7.61019C10.7235 7.83523 10.4183 7.96166 10.1 7.96166H5.30002V19.9617H17.3V15.1617C17.3 14.8434 17.4265 14.5382 17.6515 14.3131C17.8765 14.0881 18.1818 13.9617 18.5 13.9617C18.8183 13.9617 19.1235 14.0881 19.3486 14.3131C19.5736 14.5382 19.7 14.8434 19.7 15.1617V19.9617C19.7 20.5982 19.4472 21.2086 18.9971 21.6587C18.547 22.1088 17.9365 22.3617 17.3 22.3617H5.30002C4.6635 22.3617 4.05306 22.1088 3.60297 21.6587C3.15288 21.2086 2.90002 20.5982 2.90002 19.9617V7.96166Z" fill="#1B1F23"/>
          </svg>
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 7.89267C11.8606 7.89267 11.2274 8.01861 10.6367 8.2633C10.046 8.50799 9.50921 8.86664 9.05708 9.31877C8.60495 9.7709 8.2463 10.3076 8.00161 10.8984C7.75692 11.4891 7.63098 12.1223 7.63098 12.7617C7.63098 13.4011 7.75692 14.0342 8.00161 14.625C8.2463 15.2157 8.60495 15.7524 9.05708 16.2046C9.50921 16.6567 10.046 17.0153 10.6367 17.26C11.2274 17.5047 11.8606 17.6307 12.5 17.6307C13.7913 17.6307 15.0298 17.1177 15.9429 16.2046C16.856 15.2915 17.369 14.053 17.369 12.7617C17.369 11.4703 16.856 10.2319 15.9429 9.31877C15.0298 8.40565 13.7913 7.89267 12.5 7.89267ZM9.13098 12.7617C9.13098 11.8682 9.48593 11.0112 10.1177 10.3794C10.7495 9.74762 11.6065 9.39267 12.5 9.39267C13.3935 9.39267 14.2504 9.74762 14.8822 10.3794C15.514 11.0112 15.869 11.8682 15.869 12.7617C15.869 13.6552 15.514 14.5121 14.8822 15.1439C14.2504 15.7757 13.3935 16.1307 12.5 16.1307C11.6065 16.1307 10.7495 15.7757 10.1177 15.1439C9.48593 14.5121 9.13098 13.6552 9.13098 12.7617Z" fill="#1B1F23"/>
            <path d="M15.194 2.77617C14.4035 0.0911707 10.5965 0.0911707 9.80598 2.77617L9.66498 3.25467C9.60978 3.4421 9.51333 3.6148 9.38271 3.76011C9.25209 3.90542 9.0906 4.01966 8.91009 4.09445C8.72959 4.16924 8.53463 4.20269 8.33951 4.19235C8.1444 4.182 7.95407 4.12813 7.78248 4.03467L7.34448 3.79467C4.88448 2.45667 2.19498 5.14767 3.53448 7.60617L3.77298 8.04417C3.86644 8.21576 3.92032 8.40609 3.93066 8.6012C3.941 8.79632 3.90755 8.99127 3.83276 9.17178C3.75797 9.35229 3.64373 9.51377 3.49842 9.64439C3.35311 9.77502 3.18041 9.87146 2.99298 9.92667L2.51448 10.0677C-0.170518 10.8582 -0.170518 14.6652 2.51448 15.4557L2.99298 15.5967C3.18041 15.6519 3.35311 15.7483 3.49842 15.8789C3.64373 16.0096 3.75797 16.171 3.83276 16.3516C3.90755 16.5321 3.941 16.727 3.93066 16.9221C3.92032 17.1173 3.86644 17.3076 3.77298 17.4792L3.53298 17.9172C2.19498 20.3772 4.88448 23.0682 7.34448 21.7272L7.78248 21.4887C7.95407 21.3952 8.1444 21.3413 8.33951 21.331C8.53463 21.3206 8.72959 21.3541 8.91009 21.4289C9.0906 21.5037 9.25209 21.6179 9.38271 21.7632C9.51333 21.9085 9.60978 22.0812 9.66498 22.2687L9.80598 22.7472C10.5965 25.4322 14.4035 25.4322 15.194 22.7472L15.335 22.2687C15.3902 22.0812 15.4866 21.9085 15.6173 21.7632C15.7479 21.6179 15.9094 21.5037 16.0899 21.4289C16.2704 21.3541 16.4653 21.3206 16.6604 21.331C16.8556 21.3413 17.0459 21.3952 17.2175 21.4887L17.6555 21.7287C20.1155 23.0682 22.8065 20.3757 21.4655 17.9172L21.227 17.4792C21.1335 17.3076 21.0796 17.1173 21.0693 16.9221C21.059 16.727 21.0924 16.5321 21.1672 16.3516C21.242 16.171 21.3562 16.0096 21.5015 15.8789C21.6469 15.7483 21.8196 15.6519 22.007 15.5967L22.4855 15.4557C25.1705 14.6652 25.1705 10.8582 22.4855 10.0677L22.007 9.92667C21.8196 9.87146 21.6469 9.77502 21.5015 9.64439C21.3562 9.51377 21.242 9.35229 21.1672 9.17178C21.0924 8.99127 21.059 8.79632 21.0693 8.6012C21.0796 8.40609 21.1335 8.21576 21.227 8.04417L21.467 7.60617C22.8065 5.14617 20.114 2.45667 17.6555 3.79617L17.2175 4.03467C17.0459 4.12813 16.8556 4.182 16.6604 4.19235C16.4653 4.20269 16.2704 4.16924 16.0899 4.09445C15.9094 4.01966 15.7479 3.90542 15.6173 3.76011C15.4866 3.6148 15.3902 3.4421 15.335 3.25467L15.194 2.77617ZM11.2445 3.20067C11.6135 1.94817 13.3865 1.94817 13.7555 3.20067L13.8965 3.67917C14.015 4.0813 14.222 4.4518 14.5024 4.76352C14.7827 5.07524 15.1293 5.32026 15.5166 5.48064C15.9039 5.64101 16.3223 5.71267 16.7409 5.69035C17.1595 5.66804 17.5679 5.55232 17.936 5.35167L18.3725 5.11167C19.5185 4.48917 20.7725 5.74167 20.1485 6.88917L19.91 7.32717C19.7096 7.69531 19.5942 8.10361 19.5721 8.52215C19.55 8.94069 19.6219 9.35887 19.7824 9.74605C19.9429 10.1332 20.188 10.4796 20.4997 10.7597C20.8115 11.0399 21.1819 11.2468 21.584 11.3652L22.061 11.5062C23.3135 11.8752 23.3135 13.6482 22.061 14.0172L21.5825 14.1582C21.1804 14.2767 20.8098 14.4837 20.4981 14.7641C20.1864 15.0444 19.9414 15.3909 19.781 15.7783C19.6206 16.1656 19.549 16.584 19.5713 17.0026C19.5936 17.4212 19.7093 17.8296 19.91 18.1977L20.15 18.6342C20.7725 19.7802 19.52 21.0342 18.3725 20.4102L17.936 20.1717C17.5678 19.971 17.1593 19.8554 16.7406 19.8332C16.3219 19.8109 15.9035 19.8827 15.5162 20.0432C15.1288 20.2038 14.7823 20.449 14.502 20.7609C14.2217 21.0727 14.0148 21.4434 13.8965 21.8457L13.7555 22.3227C13.3865 23.5752 11.6135 23.5752 11.2445 22.3227L11.1035 21.8442C10.9849 21.4423 10.7779 21.0719 10.4977 20.7604C10.2174 20.4488 9.87107 20.2039 9.48392 20.0435C9.09676 19.8832 8.67864 19.8115 8.26018 19.8336C7.84172 19.8558 7.43352 19.9713 7.06548 20.1717L6.62748 20.4117C5.48148 21.0342 4.22748 19.7817 4.85148 18.6342L5.08998 18.1977C5.29091 17.8295 5.40686 17.421 5.42932 17.0022C5.45179 16.5834 5.38019 16.1649 5.2198 15.7773C5.0594 15.3898 4.81427 15.0431 4.5024 14.7626C4.19053 14.4822 3.81982 14.2751 3.41748 14.1567L2.93898 14.0157C1.68648 13.6467 1.68648 11.8737 2.93898 11.5047L3.41748 11.3637C3.81919 11.245 4.18929 11.0381 4.5007 10.758C4.8121 10.4778 5.05693 10.1316 5.21726 9.74465C5.3776 9.35769 5.44938 8.93978 5.42736 8.5215C5.40533 8.10322 5.29006 7.69515 5.08998 7.32717L4.84998 6.88917C4.22748 5.74317 5.47998 4.48917 6.62748 5.11317L7.06548 5.35167C7.43352 5.55203 7.84172 5.66753 8.26018 5.6897C8.67864 5.71187 9.09676 5.64015 9.48392 5.47979C9.87107 5.31944 10.2174 5.07451 10.4977 4.76295C10.7779 4.45139 10.9849 4.08109 11.1035 3.67917L11.2445 3.20067Z" fill="#1B1F23"/>
          </svg>
        </article> -->
    </header>
    <main>
      <section v-if="editing" class="flex xs:flex-col lg:flex-row w-full gap-5">
        <article class="md:w-[325px]">
          <p>Vista Mobile</p>
          <div class="mt-4 border-2 border-[#E7E7E7] p-5 md:w-[325px] h-[325px] relative overflow-hidden">
            <img
              class="m-auto z-40"
              :src="dataImage[id].images.url || dataImage[id].images.preview"
              alt="Not carousel image"
            />
            <article v-if="isChecked" :class="getBotonClass(dataImage[id].positionX,dataImage[id].positionY)" class="absolute">
              <article class="flex-grow">
                <button
                  v-if="dataImage[id].titleCta"
                  type="button"
                  class="flex-shrink-0 h-12 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed rounded-xl p-3 text-sm"
                >
                  {{dataImage[id].titleCta}}
                </button>
              </article>
              <article class="overflow-y-auto">
                <p class="break-words text-sm">
                  {{dataImage[id].descrption}}
                </p>
              </article>
            </article>
          </div>
        </article>
        <article class="w-full">
          <label class="relative inline-flex items-center mb-4 cursor-pointer">
            <input v-model="isChecked" type="checkbox" value="" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#007880]"></div>
            <span class="ml-3 text-sm font-medium text-black-600">Agregar texto y botón</span>
          </label>
          <div v-if="isChecked" class="mb-6">
            <label for="textImage" class="block mb-2 text-sm font-medium text-gray-900">Texto de la imagen</label>
            <input id="textImage" v-model="descrp" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Oferta de lanzamiento: 50% de descuento en todos los productos">

          </div>
          <p v-if="isChecked" class="mb-6">Posicionamiento del botón y texto</p>
          <div v-if="isChecked" class="mb-6 flex gap-5">
            <div class="w-full">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Vertical</label>
              <select id="countries" v-model="selectedY" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option selected>Seleciona Una pocision</option>
                <option value="top">Arriba</option>
                <option value="center">Centro</option>
                <option value="bottom">Abajo</option>
              </select>
            </div>

            <div class="w-full">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Horizontal</label>
              <select id="countries" v-model="selectedX" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option selected>Seleciona Una pocision</option>
                <option value="left">Izquierda</option>
                <option value="center">Centro</option>
                <option value="right">derecha</option>
              </select>
            </div>
          </div>
          <div v-if="isChecked" class="mb-6 flex gap-5">
            <div class="w-full">
              <label for="nameButton" class="block mb-2 text-sm font-medium text-gray-900">Nombre del botón</label>
              <input id="nameButton" v-model="textButton" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="button">
            </div>
            <div class="w-full">
              <label for="linkButton" class="block mb-2 text-sm font-medium text-gray-900">Link del botón</label>
              <input id="linkButton" v-model="ctaUrl" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="tincalab.co">
            </div>
          </div>
        </article>
      </section>
      <section class="flex flex-row items-center justify-center gap-4">
        <app-button
          v-if="IsSave"
          class="px-5 py-2 w-4/12 disabled:cursor-not-allowed border-[1px] border-black"
          type="button"
          @onClick="IsSave = false"
        >
          Guardar Cambios
        </app-button>
        <button
          v-if="IsSave"
          type="button"
          class="px-5 py-2 disabled:bg-gray-200 text-black border-[1px] border-black hover:bg-gray-200 ease-in-out duration-200 disabled:text-neutral-700 disabled:cursor-not-allowed"
          @click="deleteImage()"
        >
        Cancelar
        </button>
        <article v-if="!IsSave && dataImage.length !== 0 && !editing">
          <app-button
            class="px-5 py-2 disabled:cursor-not-allowed border-[1px] border-black"
            type="button"
          >
            <input
            id="picture"
            ref="picture"
            multiple
            type="file"
            class="hidden"
            accept="image/*"
            @change="onLoadPictures"
            />
            <label
              for="picture"
              class=""
              >
                Agregar Imagen de carrusel
            </label>
          </app-button>
        </article>
        <article v-if="!IsSave && dataImage.length !== 0 && editing" class="mt-3 w-full flex items-center justify-center gap-4">
          <app-button
          class="px-5 py-2 w-4/12 disabled:cursor-not-allowed border-[1px] border-black"
          type="button"
          @onClick="saveMetadata"
          >
            Guardar Cambios
          </app-button>
          <button
            type="button"
            class="px-5 py-2 disabled:bg-gray-200 text-black border-[1px] border-black hover:bg-gray-200 ease-in-out duration-200 disabled:text-neutral-700 disabled:cursor-not-allowed"
            @click="cancelSave"
          >
          Cancelar
          </button>
        </article>
      </section>
      <!-- <section v-if="dataImage.length !== 0" class="mt-12">
        <input
          id="pictures"
          ref="pictures"
          multiple
          type="file"
          class="hidden"
          accept="image/*"
          @change="onLoadPictures"
        />
        <label
        for="pictures">
          <app-button
            class="px-5 py-2 uppercase w-1/2 disabled:cursor-not-allowed"
            type="button"
          >
            Guardar Cambios
          </app-button>
        </label>
      </section> -->
    </main>

    <!-- <app-button
    v-if="$route.params.id"
    class="bg-red-700 uppercase py-2 mt-5 w-full"
    @onClick="onDelete"
    >
    Eliminar carrusel
    </app-button>

    <carousel
            class="w-full h-full items-center justify-center mt-3"
            :pagination-position="'bottom-overlay'"
            :pagination-color="'#8c8c8c'"
            :pagination-active-color="'#000'"
            :pagination-enabled="true"
            :navigation-enabled="true"
            :adjustable-height="false"
            :navigation-click-target-size="20"
            :center-mode="true"
            :per-page="1"
          >
            <slide v-for="(item, index) in dataImage" :key="index"
              class="w-full flex justify-center items-center relative"
            >
            <div v-if="typeof(item.images) === 'object'">
              <img
                :id="'image'+index"
                class="w-full h-96 object-cover z-40"
                :src="item.images.url || item.images.preview"
                alt="product image"
              />
                <article class="absolute top-0 right-1">
                  <button
                    :id="'image'+index"
                    type="button"
                    class="w-10 h-10 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed flex items-center justify-center"
                    @click="configImage"
                  >
                    <App-Icon-Config :id="'image'+index" />
                  </button>
                </article>
                <div :class="getBotonClass(dataImage[index].positionX,dataImage[index].positionY)" class="flex-grow">
                  <article class="flex-grow">
                    <button
                      type="button"
                      class="flex-shrink-0 h-12 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed rounded-xl	p-3"
                    >
                      {{item.titleCta}}
                    </button>
                  </article>
                  <article class="supersm:w-28 sm:w-36 md:W-72 lg:w-96 overflow-y-auto">
                    <p class="break-words">
                      {{item.descrption}}
                    </p>
                  </article>
                </div>
            </div>
            </slide>
    </carousel> -->
    <!-- Add images -->
    <!-- <div class="w-full mt-2.5">
      <input
      id="pictures"
      ref="pictures"
      multiple
      type="file"
      class="hidden"
      accept="image/*"
      @change="onLoadPictures"
    />
    <label
      for="pictures"
      :class="[
        isEditing ? 'cursor-not-allowed bg-opacity-80' : 'cursor-pointer',
      ]"
      class="uppercase bg-black text-white px-3 py-1 cursor-pointer hover:bg-opacity-80"
    >
      <span> Agregar Imagen </span>
    </label>
    </div> -->
    <!-- options buttons -->
    <!-- <div class="w-full flex items-center gap-4 mt-2.5">
      <app-button class="mt-3 px-5 py-2 uppercase w-1/2" type="submit">
        Guardar
      </app-button>
      <app-button
        class="mt-3 px-5 py-2 uppercase w-1/2"
        :disabled="!isMutating && isEditing"
        @onClick="onCancel"
      >
        Cancelar
      </app-button>
    </div> -->
    <!-- Modal -->
  <!-- </form> -->
  </section>

</template>

<script>
// `{/* <transition name="fade">
//       <!-- Contenido del modal -->

//   <div v-if="editing == true" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
//     <div class="flex bg-white p-8 rounded-lg w-[90%] supersm:flex-col md:flex-row">
//       <div class="flex relative items-center justify-center w-[50%] mr-5 supersm:w-full md:flex-row supersm:mt-16">
//         <!-- Icons trash and edit -->
//         <img
//         class="justify-center items-center h-96"
//         :src="dataImage[id].images.preview" alt=""
//         >
//         <article class="absolute top-1 right-1">
//           <button
//             :id="'delete'+this.id"
//             type="button"
//             class="w-10 h-10 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed flex items-center justify-center"
//             @click="deleteImage"
//             >
//             <App-Icon-Trash id="'image'+index" />
//           </button>
//         </article>
//         <article class="absolute top-1 right-14">

//           <input
//             id="editImage"
//             ref="pictures"
//             multiple
//             type="file"
//             class="hidden"
//             accept="image/*"
//             @change="editImage"
//           />
//           <label
//             for="editImage"
//             class="w-10 h-10 bg-red-700 hover:bg-red-600 ease-in-out duration-150 text-white disabled:cursor-not-allowed flex items-center justify-center"
//           >
//             <App-Icon-Edit id="'image'+index" />
//           </label>

//         </article>

//       </div>
//       <div class="">
//         <h2 class="text-xl md:text-2xl md:text-center supersm:text-lg font-bold mb-4">Configura tu imagen</h2>
//         <div class="w-full flex items-center gap-4 mt-2.5">
//         <div class="flex w-full flex-col gap-2">
//           <label for="cta">
//             Texto del botón
//           </label>
//           <app-input v-model="textButton" class="w-full" placeholder="Contenido del boton" />
//         </div>
//         <div class="flex w-full flex-col gap-2">
//           <label for="cta">
//             URL del botón
//           </label>
//           <app-input v-model="ctaUrl" class="w-full" placeholder="Url a donde se redirecciona el boton"/>
//         </div>
//       </div>

//       <div class="w-full flex items-center gap-4 mt-2.5">
//         <div class="w-full">
//           <label for="cta">
//             Pequeña descripción
//           </label>
//           <app-input v-model="descrp" length="50" class="w-full" placeholder="Descripcion abajo del boton"/>
//         </div>
//       </div>

//       <div class="w-full flex place-content-between flex-col gap-4 mt-2.5 mb-5">
//         <div class="w-full flex items-center gap-4 mt-2.5" >
//           <div class="w-full text-center">
//             <label for="">
//               Alineacion Horizontal
//             </label>
//             <select
//               id="positionX"
//               v-model="selectedX"
//               class="bg-white w-[90%] border border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
//               required
//             >
//               <option selected disabled>Elija una Posicion horizontal</option>
//               <option value="left">
//                 Izquierda
//               </option>
//               <option value="center">
//                 Centro
//               </option>
//               <option value="right">
//                 Derecha
//               </option>
//             </select>
//           </div>
//         </div>

//         <div class="w-full flex items-center gap-4 mt-2.5">
//           <div class="w-full text-center">
//             <label for="">
//               Alineacion Vertical
//             </label>
//             <select
//               id="positionY"
//               v-model="selectedY"
//               class="bg-white border w-[90%] border-neutral-400 outline-none px-5 text-neutral-700 py-2 text-lg focus:border-black disabled:border-neutral-300 ease-in-out duration-200 checked:bg-black"
//               required
//             >
//               <option selected disabled>Elija una Posicion vertical</option>
//               <option value="top">
//                 Arriba
//               </option>
//               <option value="center">
//                 Centro
//               </option>
//               <option value="bottom">
//                 abajo
//               </option>
//             </select>
//           </div>
//         </div>
//       </div>
//         <!-- <p class="mb-4">Contenido del modal</p> -->
//         <div class="m-auto flex justify-center">
//           <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"  type="button" @click="closeModal">Cerrar</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </transition> */}`
import AppButton from "@/components/buttons/AppButton.vue";
// import AppInput from "@/components/input/AppInput.vue";
// import AppIconConfig from "@/components/icons/AppIconConfig.vue";
// import AppIconTrash from "@/components/icons/AppIconTrash.vue";
// import AppIconEdit from "@/components/icons/AppIconEdit.vue";



export default {
  name: "AppCarouselForm",
  components: {
    AppButton,
    // AppIconConfig,
    // AppInput,
    // AppIconTrash,
    // AppIconEdit
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    dataImages: {
      type: Array,
      default: () => [] // Valor por defecto: un array vacío
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    isMutating: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    descrp: "", // description of the picture
    ctaUrl: "", // url of the button
    textButton: "", // text of the button
    selectedX: "", // position horizontal of the button
    selectedY: "", // position vertical of the button
    editing: false, // Valor inicial del booleano
    dataImage:[], // data save all the pictures with your information
    id:0, // id for save the id of the picture active in carousel
    urlActual:"", // url of the picture active in carousel
    IsSave:false, // boolean for save the changes
    currentPage:0, // page active in carousel
    isChecked: false,
  }),
  computed: {
    isEditing() {
      return !this.isEdit;
    },
    carousel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
  },
  methods: {

    getBotonClass(positionX,positionY) {
      // Lógica para determinar las clases CSS basadas en las opciones seleccionadas
      return [
        'absolute',
        {
          // Corners
          'top-10 left-10': positionX === 'left' && positionY === 'top',
          'top-10 right-5 flex flex-col justify-end items-end text-right': positionX === 'right' && positionY === 'top',
          'bottom-10 left-10': positionX === 'left' && positionY === 'bottom',
          'bottom-20 right-5 flex flex-col justify-end items-end text-right': positionX === 'right' && positionY === 'bottom',
          // Centers
          'bottom-[43%] right-5 flex flex-col justify-end items-end text-right': positionX === 'right' && positionY === 'center',
          'bottom-[43%] left-10': positionX === 'left' && positionY === 'center',
          'bottom-[43%] supersm:left-[35%] md:left-[38%] lg:left-[50%]': positionX === 'center' && positionY === 'center',
          // Laterals
          'top-10 md:left-[38%] lg:left-[50%]': positionX === 'center' && positionY === 'top',
          'bottom-10 md:left-[38%] lg:left-[50%]': positionX === 'center' && positionY === 'bottom',
        },
      ];
    },
    saveChanges(){
      this.IsSave = !this.IsSave;
    },
    cancelSave(){
      this.editing = false;
      this.clearData();
    },
    saveMetadata(){
      this.editing = !this.editing;
      this.dataImage[this.id].title = 'home'
      this.dataImage[this.id].textAndButton = this.isChecked;
      this.dataImage[this.id].descrption = this.descrp;
      this.dataImage[this.id].titleCta = this.textButton;
      this.dataImage[this.id].positionX = this.selectedX;
      this.dataImage[this.id].positionY = this.selectedY;
      this.dataImage[this.id].urlCta = this.ctaUrl;
      this.updateDataImage();
      this.clearData();
    },
    clearData(){
      this.descrp = "";
      this.ctaUrl = "";
      this.textButton = "";
      this.selectedX = "";
      this.selectedY = "";
      this.isChecked = false;
    },
    // fuction for save de id of the picture active in carousel
    configImage(e){
      const id = e.target.id.substring(5);
      this.id = id
      // this.urlActual = this.dataImage[id].images.preview;
      this.editing = !this.editing;
      this.updateDataImage();
    },
    edit(e){
      const id = e.target.id.substring(5);
      this.id = id
      this.editing = !this.editing;
      console.log(e.target);
      console.log(this.dataImage[id]);
      this.descrp = this.dataImage[id]?.descrption || '';
      this.ctaUrl = this.dataImage[id]?.urlCta || '';
      this.textButton = this.dataImage[id]?.titleCta || '';
      this.selectedX = this.dataImage[id]?.positionX || '';
      this.selectedY = this.dataImage[id]?.positionY || '';
      this.isChecked = this.dataImage[id]?.textAndButton || false;
    },
    // fuction for save the information of the picture active in carousel
    closeModal(){

      this.editing = !this.editing;
      this.dataImage[this.id].title = 'home'
      this.dataImage[this.id].descrption = this.descrp;
      this.dataImage[this.id].titleCta = this.textButton;
      this.dataImage[this.id].positionX = this.selectedX;
      this.dataImage[this.id].positionY = this.selectedY;
      this.dataImage[this.id].urlCta = this.ctaUrl;
      this.updateDataImage();
    },
    // fuction for edit the information of the picture active in carousel
    editImage(e){
      const id = e.target.id.substring(6);
      const files = e.target.files;
      for (const element of files) {
        const file = element;
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = reader.result.replace(/^data:(.*;base64,)?/, "");
          const image = {
            filename: element.name,
            filetype: element.type,
            data: base64String,
            preview: e.target.result,
            extension: file.type.split("/")[1],
          };
          this.dataImage[id].images = image;
          this.$emit("onLoadPictures", image);
        }
        reader.readAsDataURL(file);
      }
      this.updateDataImage();
    },
    deleteImage(e){
      const id = e.target.id.substring(5);
      this.dataImage.splice(id, 1);
      this.updateDataImage();
      this.editing = !this.editing;
      this.IsSave= false;
    },
    // fuction for save a picture in carousel
    onLoadPictures(e) {
      const files = e.target.files;
      for (const element of files) {
        const file = element;
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = reader.result.replace(/^data:(.*;base64,)?/, "");
          const image = {
            filename: element.name,
            filetype: element.type,
            data: base64String,
            preview: e.target.result,
            extension: file.type.split("/")[1],
          };
          this.dataImage.push({images:image});

          this.dataImage[this.dataImage.length-1].descrption = '';
          this.dataImage[this.dataImage.length-1].titleCta = '';
          this.dataImage[this.dataImage.length-1].positionX = '';
          this.dataImage[this.dataImage.length-1].positionY = '';
          this.dataImage[this.dataImage.length-1].textAndButton = false;
          this.dataImage[this.dataImage.length-1].urlCta = '';
          this.$emit("onLoadPictures", image);
        };
        reader.readAsDataURL(file);
      }
      this.saveChanges();
      this.updateDataImage();
      const carousel = this.$refs.carousel;
      this.currentPage = this.dataImage.length;
      carousel.goToPage(this.currentPage);

    },
    onSubmit() {
      this.$emit("onSubmit", this.carousel);
    },
    onCancel() {
      this.$emit("onCancel");
    },
    onDelete() {
      this.$emit("onDelete");
    },
    updateDataImage() {
      // Realizar cambios en la variable dataImage
      // Emitir el evento personalizado 'update-dataImage' con el nuevo valor
      this.$emit('update-dataImage', this.dataImage);
    }
  }
};
</script>

<style scoped>
/* Estilos del modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
