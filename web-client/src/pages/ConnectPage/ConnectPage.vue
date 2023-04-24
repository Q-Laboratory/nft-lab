<template>
  <div class="connect-page">
    <div class="connect-page__title-wrapper">
      <h1 class="connect-page__title">
        {{ $t('connect-page.title') }}
      </h1>
      <h3 class="connect-page__subtitle">
        {{ $t('connect-page.subtitle') }}
      </h3>
    </div>

    <div class="connect-page__info">
      <div class="connect-page__info-title-wrapper">
        <h4 class="connect-page__info-title">
          {{ $t('connect-page.connect-modal-title') }}
        </h4>
        <span class="connect-page__info-subtitle">
          {{ $t('connect-page.connect-modal-subtitle') }}
        </span>
      </div>

      <app-button
        v-if="!isMetamaskExtension() && !provider.isConnected"
        target="_blank"
        :icon-left="$icons.metamask"
        :href="METAMASK_DOWNLOAD_LINK"
        :text="$t('connect-page.install-metamask-btn')"
      />
      <app-button
        v-else-if="!provider.isConnected"
        :text="$t('connect-page.connect-btn')"
        :icon-left="$icons.metamask"
        @click="provider.connect"
      />
      <app-button
        v-else
        :icon-left="$icons.metamask"
        :text="$t('connect-page.switch-network-btn')"
        @click="
          provider.switchNetwork(config.SUPPORTED_CHAIN_ID, DEFAULT_CHAIN)
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '@/common'
import { useWeb3ProvidersStore } from '@/store'
import { DEFAULT_CHAIN, config } from '@/config'
import { isMetamaskExtension } from '@/helpers'

const METAMASK_DOWNLOAD_LINK = 'https://metamask.io/download'
const { provider } = useWeb3ProvidersStore()
</script>

<style lang="scss" scoped>
.connect-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: toRem(50);
  width: 100%;
}

.connect-page__info-title-wrapper,
.connect-page__title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: toRem(12);
}

.connect-page__title {
  font-size: toRem(48);
  color: var(--text-primary-main);
}

.connect-page__subtitle {
  font-size: toRem(16);
  font-weight: 400;
  color: var(--text-secondary-main);
  max-width: toRem(700);
  text-align: center;
}

.connect-page__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: toRem(24);
  background: var(--white);
  padding: toRem(32);
  box-shadow: 0 toRem(4) toRem(40) var(--shadow-primary);
  border-radius: toRem(16);
  min-width: toRem(600);
}

.connect-page__info-title {
  font-weight: 500;
  font-size: toRem(40);
}

.connect-page__info-subtitle {
  color: var(--text-secondary-main);
  font-size: toRem(16);
}
</style>
