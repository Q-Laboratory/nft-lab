<template>
  <div v-if="isAppInitialized" class="app__container">
    <router-view v-slot="{ Component }">
      <app-navbar v-if="isValidChain && provider.isConnected" />
      <transition name="fade" mode="out-in">
        <component
          v-if="isValidChain && provider.isConnected"
          class="app__main"
          :is="Component"
        />
        <connect-page v-else class="app__main" />
      </transition>
    </router-view>
  </div>
  <loader v-else class="app__loader" />
</template>

<script lang="ts" setup>
import { Loader, AppNavbar } from '@/common'
import { ErrorHandler } from '@/helpers/error-handler'
import { ref } from 'vue'
import { useNotifications } from '@/composables'
import { useWeb3ProvidersStore, useErc721Store } from '@/store'
import { config } from '@config'
import { storeToRefs } from 'pinia'
import ConnectPage from '@/pages/ConnectPage/ConnectPage.vue'

const isAppInitialized = ref(false)
const web3ProvidersStore = useWeb3ProvidersStore()

const { erc721 } = useErc721Store()

const { provider, isValidChain } = storeToRefs(useWeb3ProvidersStore())

const init = async () => {
  isAppInitialized.value = false
  try {
    useNotifications()
    document.title = config.APP_NAME
    await web3ProvidersStore.init()
    await erc721.loadDetails()
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
  isAppInitialized.value = true
}

init()
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.app__container {
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-rows: toRem(85) 1fr max-content;
  flex: 1;
  background: var(--app-bg);

  @include respond-to(small) {
    grid-template-rows: 1fr max-content;
    grid-template-rows: max-content 1fr max-content;
  }
}

.app__main {
  padding: var(--app-padding-top) var(--app-padding-right)
    var(--app-padding-bottom) var(--app-padding-left);
}

.fade-enter-active {
  animation: fade-in 0.25s;
}

.fade-leave-active {
  animation: fade-in 0.25s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.app__loader {
  width: 100%;
  height: 100%;
  flex: 1;
}
</style>
