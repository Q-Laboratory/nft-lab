<template>
  <div v-if="isAppInitialized" class="app__container">
    <router-view v-slot="{ Component }">
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
</template>

<script lang="ts" setup>
import { ErrorHandler } from '@/helpers/error-handler'
import { ref } from 'vue'
import { useNotifications } from '@/composables'
import { useWeb3ProvidersStore } from '@/store'
import { config } from '@config'
import { PROVIDERS } from '@/enums'
import { storeToRefs } from 'pinia'
import ConnectPage from '@/pages/ConnectPage/ConnectPage.vue'

const isAppInitialized = ref(false)
const { detectProviders } = useWeb3ProvidersStore()

const { providers, provider, isValidChain } = storeToRefs(
  useWeb3ProvidersStore(),
)

const init = async () => {
  try {
    useNotifications()
    document.title = config.APP_NAME
    await detectProviders()
    const designatedProvider = providers.value.find(
      el => el.name === PROVIDERS.metamask,
    )

    if (designatedProvider) {
      await provider.value.init(designatedProvider)
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }
  isAppInitialized.value = true
}

init()
</script>

<style lang="scss" scoped>
.app__container {
  display: grid;
  grid-template-rows: toRem(85) 1fr max-content;
  flex: 1;
  background: var(--app-bg);

  @include respond-to(small) {
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
</style>
