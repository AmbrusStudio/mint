<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { type HeaderGameInfo, type HeaderGameItem, getHeaderGameInfo } from '@/api'
import { getMainSiteLink } from '@/utils'

import GameNavButton from './GameNavButton.vue'
import GameNavImage from './GameNavImage.vue'
import GameNavTitle from './GameNavTitle.vue'

interface Props {
  open: boolean
}

defineProps<Props>()
const gameInfo = ref<HeaderGameInfo>()
const gameInfoActive = ref<HeaderGameItem>({ name: '', url: '', img: '' })
const handleButtonHover = (info: HeaderGameItem) => {
  gameInfoActive.value = info
}

watchEffect(async () => {
  const _gameInfo = await getHeaderGameInfo()
  gameInfo.value = _gameInfo
  gameInfoActive.value = _gameInfo.games[0]
})
</script>

<template>
  <div class="hidden w-full" :class="{ '!block': open }">
    <nav class="flex flex-col xl:flex-row gap-24px xl:px-88px xl:py-48px">
      <div class="flex flex-col gap-12px">
        <GameNavTitle className="pl-24px hidden xl:block">Games</GameNavTitle>
        <div class="flex-col gap-12px xl:min-w-360px hidden xl:flex">
          <GameNavButton
            v-for="(game, index) in gameInfo?.games"
            :key="`${game.url}-${index}`"
            :to="getMainSiteLink(game.url)"
            :name="game.name"
            :active="game.url === gameInfoActive?.url"
            @mouseover="handleButtonHover(game)"
          />
        </div>
        <div class="flex flex-col gap-24px mt-32px xl:hidden">
          <GameNavImage
            v-for="(game, index) in gameInfo?.games"
            :key="`${game.url}-${index}`"
            :to="getMainSiteLink(game.url)"
            :title="game.name"
            :img="game.img"
          />
        </div>
      </div>
      <div class="flex flex-col gap-12px">
        <GameNavTitle className="xl:pl-24px">Gaming Experience</GameNavTitle>
        <div class="flex flex-col gap-12px xl:min-w-300px">
          <GameNavButton
            v-for="(exp, index) in gameInfo?.exp"
            :key="`${exp.url}-${index}`"
            :to="getMainSiteLink(exp.url)"
            :name="exp.name"
            :active="exp.url === gameInfoActive?.url"
            @mouseover="handleButtonHover(exp)"
          />
        </div>
      </div>
      <div class="hidden xl:block pt-28px">
        <GameNavImage
          :to="getMainSiteLink(gameInfoActive?.url)"
          :title="gameInfoActive?.name"
          :img="gameInfoActive?.img"
        />
      </div>
    </nav>
  </div>
</template>
