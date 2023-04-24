<template>
  <div class="nft-details-page-description">
    <img
      class="nft-details-page-description__img"
      alt="Nft image"
      :src="props.nft?.link"
    />
    <div class="nft-details-page-description__info">
      <h1 class="nft-details-page-description__info-title">
        {{ props.nft?.name }}
      </h1>

      <div class="nft-details-page-description__info-item-wrapper">
        <div class="nft-details-page-description__info-item">
          <icon
            class="nft-details-page-description__info-item-icon"
            :name="$icons.creditCard"
          />
          <div class="nft-details-page-description__info-item-text">
            <span class="nft-details-page-description__info-item-text-title">
              {{ $t('nft-details-page-description.token-id') }}
            </span>
            <span
              class="nft-details-page-description__info-item-text-value"
              :title="props.nft?.id"
            >
              {{ props.nft?.id }}
            </span>
          </div>
        </div>
        <div class="nft-details-page-description__info-item">
          <icon
            class="nft-details-page-description__info-item-icon"
            :name="$icons.documentAdd"
          />
          <div class="nft-details-page-description__info-item-text">
            <span class="nft-details-page-description__info-item-text-title">
              {{ $t('nft-details-page-description.contract-address') }}
            </span>
            <span
              class="nft-details-page-description__info-item-text-value"
              :title="props.nft?.address"
            >
              {{ props.nft?.address }}
            </span>
          </div>
        </div>
        <div class="nft-details-page-description__info-item">
          <icon
            class="nft-details-page-description__info-item-icon"
            :name="$icons.user"
          />
          <div class="nft-details-page-description__info-item-text">
            <span class="nft-details-page-description__info-item-text-title">
              {{ $t('nft-details-page-description.owner') }}
            </span>
            <span
              class="nft-details-page-description__info-item-text-value"
              :title="props.nft?.owner"
            >
              {{ props.nft?.owner }}
            </span>
          </div>
        </div>
      </div>

      <app-button
        v-if="provider.selectedAddress === props.nft?.owner"
        size="large"
        :text="$t('nft-details-page-description.transfer-btn')"
        @click="toggleMintModal"
      />

      <nft-details-page-transfer-modal
        v-if="isTransferModalOpened"
        :nft-id="props.nft?.id"
        @close="toggleMintModal"
        @save="reloadNftList"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NftDetails } from '@/types'
import { Icon, AppButton } from '@/common'
import { ref } from 'vue'
import { useWeb3ProvidersStore } from '@/store'
import NftDetailsPageTransferModal from './NftDetailsPageTransferModal.vue'

const emit = defineEmits<{
  (e: 'save'): void
}>()

const props = defineProps<{
  nft?: NftDetails
}>()

const { provider } = useWeb3ProvidersStore()
const isTransferModalOpened = ref(false)

const toggleMintModal = () => {
  isTransferModalOpened.value = !isTransferModalOpened.value
}

const reloadNftList = () => {
  emit('save')
  isTransferModalOpened.value = false
}
</script>

<style lang="scss" scoped>
.nft-details-page-description {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: toRem(50);
  padding-bottom: toRem(200);
}

.nft-details-page-description__img {
  width: 100%;
  height: 100%;
}

.nft-details-page-description__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nft-details-page-description__info-title {
  display: flex;
  font-weight: 600;
  font-size: toRem(32);
  margin-bottom: toRem(24);
}

.nft-details-page-description__info-item-wrapper {
  display: flex;
  flex-direction: column;
  gap: toRem(20);
  margin-bottom: toRem(60);
}

.nft-details-page-description__info-item {
  display: flex;
  padding: toRem(20);
  background: var(--white);
  gap: toRem(10);
  border-radius: toRem(8);
}

.nft-details-page-description__info-item-icon {
  width: 1.4em;
  height: 1.4em;
  color: var(--primary-main);
}

.nft-details-page-description__info-item-text {
  display: flex;
  flex-direction: column;
  gap: toRem(10);
}

.nft-details-page-description__info-item-text-title,
.nft-details-page-description__info-item-text-value {
  font-size: toRem(18);
}

.nft-details-page-description__info-item-text-value {
  font-weight: 500;
  max-width: toRem(300);

  @include text-ellipsis;
}
</style>
