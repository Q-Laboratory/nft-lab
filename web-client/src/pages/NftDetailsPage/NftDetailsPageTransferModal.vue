<template>
  <teleport-modal is-shown @click-outside="closeModal">
    <div class="nft-details-page-transfer-modal__form">
      <h4 class="nft-details-page-transfer-modal__title">
        {{ $t('nft-details-page-transfer-modal.transfer-title') }}
      </h4>

      <div
        v-if="!isFormDisabled"
        class="nft-details-page-transfer-modal__inputs"
      >
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

      <div
        v-if="isFormDisabled"
        class="nft-details-page-transfer-modal__loader-wrapper"
      >
        <loader />
        <span class="nft-details-page-transfer-modal__loader-text">
          {{ $t('nft-details-page-transfer-modal.loading-msg') }}
        </span>
      </div>

      <div class="nft-details-page-transfer-modal__actions">
        <app-button
          class="nft-details-page-transfer-modal__actions-btn"
          size="large"
          :text="
            !isFormDisabled
              ? $t('nft-details-page-transfer-modal.transfer-btn')
              : $t('nft-details-page-transfer-modal.loading-msg-btn')
          "
          :disabled="isFormDisabled"
          @click="transferNft"
        />
      </div>
    </div>
  </teleport-modal>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { AppButton, TeleportModal, Loader } from '@/common'
import { InputField } from '@/fields'
import { useForm, useFormValidation } from '@/composables'
import { required, ethAddress } from '@/validators'
import { useErc721Store, useWeb3ProvidersStore } from '@/store'
import { Bus, ErrorHandler } from '@/helpers'
import { useI18n } from 'vue-i18n'

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

const { t } = useI18n({ useScope: 'global' })
const { isFormDisabled, disableForm, enableForm } = useForm()
const { erc721 } = useErc721Store()
const { provider } = useWeb3ProvidersStore()

const { isFormValid, touchField } = useFormValidation(form, {
  address: { required, ethAddress },
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
    Bus.success(t('nft-details-page-transfer-modal.success-transfer'))
    emit('save')
  } catch (error) {
    ErrorHandler.process(error)
  }
  enableForm()
}

const closeModal = () => {
  if (isFormDisabled.value) return
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

.nft-details-page-transfer-modal__loader-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: toRem(24);
}

.nft-details-page-transfer-modal__loader-text {
  max-width: toRem(220);
  text-align: center;
  line-height: 1.4;
  font-weight: 600;
  color: var(--text-secondary-main);
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
