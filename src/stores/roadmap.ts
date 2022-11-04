import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoadmapStore = defineStore('counter', () => {
  const visible = ref<boolean>(false)

  /**
   * Toggle visible
   * @param value
   */
  function toggleVisible(value: boolean): void {
    visible.value = value
  }

  return { visible, toggleVisible }
})
