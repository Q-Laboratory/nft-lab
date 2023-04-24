<template>
  <teleport-modal is-shown @click-outside="closeModal">
    <div class="nft-details-page-transfer-modal__form">
      <h4 class="nft-details-page-transfer-modal__title">
        {{ $t('nft-details-page-transfer-modal.transfer-title') }}
      </h4>

      <div class="nft-details-page-transfer-modal__inputs">
        <div class="nft-details-page-transfer-modal__input-wrapper">
          <span class="nft-details-page-transfer-modal__input-title">
            {{ $t('nft-details-page-transfer-modal.address-title') }}
          </span>
          <input-field
            v-model="form.address"
            class="nft-details-page-transfer-modal__input"
            :placeholder="
              $t('nft-details-page-transfer-modal.address-placeholder')
            "
            :disabled="isFormDisabled"
            @blur="touchField('address')"
          />
        </div>
      </div>

      <div class="nft-details-page-transfer-modal__actions">
        <app-button
          class="nft-details-page-transfer-modal__actions-btn"
          size="large"
          :text="$t('nft-details-page-transfer-modal.transfer-btn')"
          :disabled="isFormDisabled"
          @click="transferNft"
        />
      </div>
    </div>
  </teleport-modal>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { AppButton, TeleportModal } from '@/common'
import { InputField } from '@/fields'
import { useForm, useFormValidation } from '@/composables'
import { required } from '@/validators'
import { useErc721Store, useWeb3ProvidersStore } from '@/store'
import { ErrorHandler } from '@/helpers'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const props = defineProps<{
  nftId?: string | number
}>()

const form = reactive({
  address: '',
})

const { isFormDisabled, disableForm, enableForm } = useForm()
const { erc721 } = useErc721Store()
const { provider } = useWeb3ProvidersStore()

const { isFormValid, touchField } = useFormValidation(form, {
  address: { required },
})

const transferNft = async () => {
  if (!isFormValid() || !provider.selectedAddress || !props.nftId) return
  disableForm()
  try {
    const tx = await erc721.transfer(
      provider.selectedAddress,
      form.address,
      props.nftId,
    )
    await tx?.wait()
    emit('save')
  } catch (error) {
    ErrorHandler.process(error)
  }
  enableForm()
}

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.nft-details-page-transfer-modal__form {
  padding: toRem(32) toRem(130);
  border-radius: toRem(15);
  box-shadow: var(--shadow-primary);
  background: var(--app-bg-tertiary);
}

.nft-details-page-transfer-modal__title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: toRem(24);
  font-size: toRem(40);
  font-weight: 500;
}

.nft-details-page-transfer-modal__input-wrapper {
  display: flex;
  flex-direction: column;
  gap: toRem(10);
  width: toRem(400);
  margin-bottom: toRem(24);
}

.nft-details-page-transfer-modal__input-title {
  font-size: toRem(16);
}

.nft-details-page-transfer-modal__actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nft-details-page-transfer-modal__actions-btn {
  width: toRem(150);
}
</style>
