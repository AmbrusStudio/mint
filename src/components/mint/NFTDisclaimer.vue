<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'

interface Props {
  images: string | string[]
  content: string
}

const props = defineProps<Props>()
const images = computed(() => {
  if (Array.isArray(props.images)) return props.images
  return [props.images]
})
const swiperModules = [Autoplay, Pagination]
</script>

<template>
  <div class="flex flex-col w-full md:w-652px">
    <Swiper
      class="disclaimer-swiper"
      :loop="true"
      :slides-per-view="1"
      :modules="swiperModules"
      :autoplay="{ delay: 5000 }"
      :pagination="{ enabled: true, clickable: true }"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index" :virtual-index="index">
        <img class="w-full h-auto select-none" :src="image" alt="Disclaimer Image" />
      </SwiperSlide>
    </Swiper>
    <div class="p-24px bg-white/10 text-12px leading-20px text-grey-medium">
      <h4 class="mb-4px font-semibold uppercase">Disclaimer</h4>
      <p class="font-normal">{{ content }}</p>
    </div>
  </div>
</template>

<style>
.disclaimer-swiper {
  @apply m-0 w-full h-auto;
}
.disclaimer-swiper > .swiper-pagination {
  @apply left-24px bottom-24px w-auto text-left;
}
.disclaimer-swiper > .swiper-pagination > .swiper-pagination-bullet {
  @apply w-30px md:w-60px h-2px bg-none bg-white opacity-50 rounded-none;
}
.disclaimer-swiper
  > .swiper-pagination
  > .swiper-pagination-bullet.swiper-pagination-bullet-active {
  @apply opacity-100;
}
</style>