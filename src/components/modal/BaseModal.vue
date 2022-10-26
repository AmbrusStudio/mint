<script setup lang="ts">
interface Props {
  modalOverlayClass?: string
  modalMainClass?: string
  modalContentClass?: string
  open: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="modal-overlay fixed top-0 left-0 z-20 invisible opacity-0 w-full h-full transition-all overflow-auto"
    :class="[{ 'modal-show': open }, modalOverlayClass]"
  >
    <div class="modal-main z-30 invisible xl:top-1/2 xl:-translate-y-1/2" :class="[modalMainClass]">
      <div class="modal-content opacity-0 scale-75 transition-all" :class="[modalContentClass]">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-show.modal-overlay {
  @apply visible opacity-100;
}
.modal-show .modal-main {
  @apply visible;
}
.modal-show .modal-content {
  @apply opacity-100 scale-100;
}
</style>
