<script setup>
import IconRoadmapArrowMobile from '@components/icons/IconRoadmapArrowMobile.vue'
import IconRoadmapArrowPc from '@components/icons/IconRoadmapArrowPc.vue'
import { useEventListener, useIntervalFn, useThrottleFn } from '@vueuse/core'
import { onMounted } from 'vue'

import clover from '@/assets/svgs/clover.svg'
import coin from '@/assets/svgs/coin.svg'
import crown from '@/assets/svgs/crown.svg'
import diamond from '@/assets/svgs/diamond.svg'
import growth from '@/assets/svgs/growth.svg'
import hibicus from '@/assets/svgs/hibicus.svg'
import jigsaw from '@/assets/svgs/jigsaw.svg'
import loading from '@/assets/svgs/loading.svg'
import players from '@/assets/svgs/players.svg'
import remoteControl from '@/assets/svgs/remote-control.svg'
import rocket from '@/assets/svgs/rocket.svg'
import winner from '@/assets/svgs/winner.svg'
import { roadmapList } from '@/data/index'
import { drawLine } from '@/utils/svg'

const icons = {
  0: loading,
  1: rocket,
  2: jigsaw,
  3: players,
  4: clover,
  5: crown,
  6: winner,
  7: growth,
  8: hibicus,
  9: remoteControl,
  10: coin,
  11: diamond
}

// Draw background svg line
const draw = useThrottleFn(drawLine, 500)

// Handle window resize
useEventListener(window, 'resize', draw)

// Prevent DOM from not rendering
useIntervalFn(() => {
  const dom = document.querySelector('.wrapper')
  const domItem = document.querySelectorAll('.wrapper .item')

  if (dom && domItem && domItem.length >= roadmapList.length) {
    draw()
  }
}, 3000)

onMounted(() => {
  draw()
})
</script>

<template>
  <div class="roadmap-container">
    <div class="wrapper">
      <div v-for="(item, index) in roadmapList" :key="index" class="item">
        <div class="card">
          <p>{{ item.title }}</p>
          <ul>
            <li v-for="(text, indexJ) in item.list" :key="indexJ">
              {{ text }}
            </li>
          </ul>
          <img class="icon" :src="icons[index] || icons[0]" alt="icon" />
        </div>
      </div>
      <IconRoadmapArrowPc />
      <IconRoadmapArrowMobile />
    </div>
  </div>
</template>

<style lang="less" scoped src="./RoadmapWrapper.less"></style>
