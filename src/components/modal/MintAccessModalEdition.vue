<script setup lang="ts">
interface Props {
  labelClass?: string
  name: string
  time: string
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-[1fr_auto] gap-12px items-center">
    <label
      class="font-bold text-12px leading-12px text-white uppercase p-4px ml-auto"
      :class="[labelClass]"
    >
      {{ name }}
    </label>
    <p class="font-normal text-16px leading-20px text-black-bg">
      {{ time }}
    </p>
  </div>
</template>
