<template>
  <teleport-modal is-shown>
    <div class="nft-page-mint-modal__form">
      <div class="nft-page-mint-modal__title-wrapper">
        <h4 class="nft-page-mint-modal__title">
          {{ $t('nft-page-mint-modal.edit-title') }}
        </h4>
        <app-button
          scheme="filled"
          size="x-small"
          :icon-left="$icons.x"
          :disabled="isFormDisabled"
          @click="closeModal"
        />
      </div>

      <div class="nft-page-mint-modal__inputs">
        <div class="nft-page-mint-modal__input-wrapper">
          <span class="nft-page-mint-modal__input-title">
            {{ $t('nft-page-mint-modal.name-title') }}
          </span>
          <input-field
            v-model="form.name"
            size="small"
            class="nft-page-mint-modal__input"
            :disabled="isFormDisabled"
            @blur="touchField('name')"
          />
        </div>
        <div class="nft-page-mint-modal__input-wrapper">
          <span class="nft-page-mint-modal__input-title">
            {{ $t('nft-page-mint-modal.amount-title') }}
          </span>
          <input-field
            v-model="form.link"
            size="small"
            class="nft-page-mint-modal__input"
            :disabled="isFormDisabled"
            @blur="touchField('link')"
          />
        </div>
      </div>
    </div>

    <div class="nft-page-mint-modal__actions">
      <app-button
        class="nft-page-mint-modal__actions-btn"
        scheme="default"
        size="default"
        :text="$t('nft-page-mint-modal.save-btn')"
        :disabled="isFormDisabled"
        @click="saveApy"
      />
    </div>
  </teleport-modal>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { AppButton, TeleportModal } from '@/common'
import { InputField } from '@/fields'
import { useForm, useFormValidation } from '@/composables'
import { required } from '@/validators'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

const form = reactive({
  name: '',
  link: '',
})

const { isFormDisabled, disableForm, enableForm } = useForm()

const { isFormValid, touchField } = useFormValidation(form, {
  name: { required },
  link: { required },
})

const saveApy = () => {
  if (!isFormValid()) return
  disableForm()
  emit('save')
  enableForm()
}

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.nft-page-mint-modal__form {
  border-radius: toRem(15);
  box-shadow: var(--shadow-primary);
  background: var(--app-bg-tertiary);
}

.nft-page-mint-modal__title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: toRem(15);
  padding-bottom: 0;
  font-weight: 300;
}

.nft-page-mint-modal__title {
  font-size: toRem(18);
  font-weight: 400;
}

.nft-page-mint-modal__inputs {
  padding: toRem(15);
}

.nft-page-mint-modal__input-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: toRem(10);
  gap: toRem(10);

  &:first-child {
    border-bottom: toRem(1) solid var(--border-primary-main);
    padding-bottom: toRem(14);
    margin-bottom: toRem(14);
  }
}

.nft-page-mint-modal__input-title {
  font-size: toRem(12);
  max-width: toRem(100);
  width: 100%;
}

.nft-page-mint-modal__input {
  width: toRem(300);
}

.nft-page-mint-modal__actions {
  display: flex;
}

.nft-page-mint-modal__actions-btn {
  width: 100%;
  border-radius: 0;
  border-top: toRem(1) solid var(--border-primary-main);
  padding: toRem(14);
  font-weight: 300;

  &:first-child {
    border-right: toRem(1) solid var(--border-primary-main);
  }
}
</style>
