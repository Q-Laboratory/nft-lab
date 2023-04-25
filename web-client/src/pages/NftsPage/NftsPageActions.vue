<template>
  <div class="nfts-page-actions">
    <div class="nfts-page-actions__search">
      <input-field
        v-model="searchedAddress"
        class="nfts-page-actions__search-input"
        :icon-left="$icons.search"
        :placeholder="$t('nfts-page-actions.search-placeholder')"
      />

      <app-button
        class="nfts-page-actions__search-button"
        :text="$t('nfts-page-actions.search-btn')"
        @click="filterNftList"
      />
    </div>

    <app-button
      v-if="provider.selectedAddress === props.owner"
      class="nfts-page-actions__mint-button"
      :text="$t('nfts-page-actions.mint-btn')"
      @click="toggleMintModal"
    />

    <nfts-page-mint-modal
      v-if="isMintModalOpened"
      @close="toggleMintModal"
      @save="reloadNftList"
    />
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '@/common'
import { InputField } from '@/fields'
import { ref } from 'vue'
import { useWeb3ProvidersStore } from '@/store'
import NftsPageMintModal from '@/pages/NftsPage/NftsPageMintModal.vue'

const emit = defineEmits<{
  (e: 'save'): void
  (e: 'filter', payload: string): void
}>()

const props = defineProps<{
  owner?: string
}>()

const { provider } = useWeb3ProvidersStore()
const isMintModalOpened = ref(false)
const searchedAddress = ref('')

const toggleMintModal = () => {
  isMintModalOpened.value = !isMintModalOpened.value
}

const reloadNftList = () => {
  emit('save')
  isMintModalOpened.value = false
}

const filterNftList = () => {
  emit('filter', searchedAddress.value)
}
</script>

<style lang="scss" scoped>
.nfts-page-actions {
  display: flex;
  justify-content: space-between;
  gap: toRem(10);

  @include respond-to(tablet) {
    flex-direction: column;
  }
}

.nfts-page-actions__search {
  display: flex;
  gap: toRem(12);
}

.nfts-page-actions__search-input {
  min-width: toRem(350);

  @include respond-to(tablet) {
    min-width: 0;
  }
}

.nfts-page-actions__mint-button {
  min-width: toRem(150);

  @include respond-to(tablet) {
    min-width: 0;
    width: 100%;
  }
}
</style>
