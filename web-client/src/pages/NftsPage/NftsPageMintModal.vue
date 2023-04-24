<template>
  <teleport-modal is-shown @click-outside="closeModal">
    <div class="nfts-page-mint-modal__form">
      <h4 class="nfts-page-mint-modal__title">
        {{ $t('nfts-page-mint-modal.mint-title') }}
      </h4>

      <div class="nfts-page-mint-modal__inputs">
        <div class="nfts-page-mint-modal__input-wrapper">
          <span class="nfts-page-mint-modal__input-title">
            {{ $t('nfts-page-mint-modal.nft-link-title') }}
          </span>
          <input-field
            v-model="form.link"
            class="nfts-page-mint-modal__input"
            :placeholder="$t('nfts-page-mint-modal.nft-link-placeholder')"
            :disabled="isFormDisabled"
            @blur="touchField('link')"
          />
        </div>
      </div>
      <div class="nfts-page-mint-modal__actions">
        <app-button
          class="nfts-page-mint-modal__actions-btn"
          size="large"
          :text="$t('nfts-page-mint-modal.mint-btn')"
          :disabled="isFormDisabled"
          @click="saveApy"
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
import { required, url } from '@/validators'
import { useErc721Store, useWeb3ProvidersStore } from '@/store'
import { ErrorHandler } from '@/helpers'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const form = reactive({
  name: '',
  link: '',
})

const { isFormDisabled, disableForm, enableForm } = useForm()
const { erc721 } = useErc721Store()
const { provider } = useWeb3ProvidersStore()

const { isFormValid, touchField } = useFormValidation(form, {
  link: { required, url },
})

const saveApy = async () => {
  if (!isFormValid() || !provider.selectedAddress) return
  disableForm()
  try {
    const tx = await erc721.mint(
      provider.selectedAddress,
      Date.now(),
      form.link,
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
.nfts-page-mint-modal__form {
  padding: toRem(32) toRem(130);
  border-radius: toRem(15);
  box-shadow: var(--shadow-primary);
  background: var(--app-bg-tertiary);
}

.nfts-page-mint-modal__title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: toRem(24);
  font-size: toRem(40);
  font-weight: 500;
}

.nfts-page-mint-modal__input-wrapper {
  display: flex;
  flex-direction: column;
  gap: toRem(10);
  width: toRem(400);
  margin-bottom: toRem(24);
}

.nfts-page-mint-modal__input-title {
  font-size: toRem(16);
}

.nfts-page-mint-modal__actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nfts-page-mint-modal__actions-btn {
  width: toRem(150);
}
</style>
