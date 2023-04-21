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
        v-if="provider.isConnected"
        :text="$t('connect-page.connect-btn')"
        @click="provider.connect"
      />
      <app-button
        v-else
        :text="$t('connect-page.connect-btn')"
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

const { provider } = useWeb3ProvidersStore()
</script>

<style lang="scss" scoped>
.connect-page {
  display: grid;
  grid-gap: toRem(50);
  padding-bottom: toRem(200);
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
