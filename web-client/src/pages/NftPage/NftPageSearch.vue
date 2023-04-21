<template>
  <div class="nft-page-search">
    <div class="nft-page-search__title-wrapper">
      <input-field v-model="nftId" />
      <app-button />
    </div>

    <app-button
      :text="$t('connect-page.connect-btn')"
      @click="toggleMintModal"
    />

    <nft-page-mint-modal v-if="isMintModalOpened" @close="toggleMintModal" />
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '@/common'
import { InputField } from '@/fields'
import { ref } from 'vue'
import NftPageMintModal from '@/pages/NftPage/NftPageMintModal.vue'

const isMintModalOpened = ref(false)
const nftId = ref('')

const toggleMintModal = () => {
  isMintModalOpened.value = !isMintModalOpened.value
}
</script>

<style lang="scss" scoped>
.nft-page-search {
  display: flex;
}

.connect-page__title {
  font-size: toRem(48);
  color: var(--text-primary-main);
}
</style>
