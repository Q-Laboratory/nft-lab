<template>
  <div class="nft-details-page-description">
    <div class="nft-details-page-description__img-wrapper">
      <img
        class="nft-details-page-description__img"
        alt="Nft image"
        :src="props.nft?.link"
      />
    </div>
    <div class="nft-details-page-description__info">
      <div>
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
      </div>

      <app-button
        v-if="provider.selectedAddress === props.nft?.owner"
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
  display: flex;
  justify-content: space-between;
  gap: toRem(20);

  @include respond-to(tablet) {
    flex-direction: column;
  }
}

.nft-details-page-description__img-wrapper {
  display: flex;
  justify-content: center;
  flex: 1;
  min-width: toRem(350);
  max-width: toRem(750);
  width: 100%;
  background: var(--white);
  padding: toRem(24);
}

.nft-details-page-description__img {
  display: block;
  object-fit: contain;
  border-radius: inherit;
  max-width: 100%;
  max-height: 100%;
}

.nft-details-page-description__info {
  flex: 1;
  min-width: 0;
  max-width: 100rem;
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
  display: grid;
  grid-template-columns: toRem(24) 1fr;
  padding: toRem(20);
  background: var(--white);
  gap: toRem(10);
  border-radius: toRem(8);
}

.nft-details-page-description__info-item-icon {
  width: toRem(24);
  height: toRem(24);
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
  max-width: toRem(250);

  @include text-ellipsis;
}
</style>
