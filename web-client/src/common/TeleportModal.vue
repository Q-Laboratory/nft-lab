<template>
  <teleport to="#teleport-modal">
    <transition name="teleport-modal">
      <div v-show="isShown" class="teleport-modal">
        <div class="teleport-modal__pane" ref="teleportModalPane">
          <slot :modal="{ close: closeModal }" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

enum EVENTS {
  updateIsShown = 'update:isShown',
  clickOutside = 'click-outside',
}

const emit = defineEmits<{
  (e: EVENTS.updateIsShown, payload: boolean): void
  (e: EVENTS.clickOutside): void
}>()

const props = withDefaults(
  defineProps<{
    isShown?: boolean
    isCenter?: boolean
    isWithCancelBtn?: boolean
    closeByClickOutside?: boolean
  }>(),
  {
    isShown: false,
    withCancelBtn: false,
    isCenter: false,
    closeByClickOutside: false,
  },
)
const modalPane = ref<HTMLElement | undefined>()
onMounted(() => {
  if (modalPane.value) {
    onClickOutside(modalPane, () => {
      props.closeByClickOutside ? closeModal() : emitClickOutside()
    })
  }
})

const closeModal = () => {
  emit(EVENTS.updateIsShown, false)
}

const emitClickOutside = () => {
  emit(EVENTS.clickOutside)
}
</script>

<style lang="scss" scoped>
.teleport-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: vh(100);
  background: rgba(var(--black-rgb), 0.5);
}

.teleport-modal__pane {
  position: relative;
  background: var(--app-bg-tertiary);
  border-radius: toRem(14);
}

.teleport-modal-enter-active,
.teleport-modal-leave-active {
  transition: 0.25s ease;
  transition-property: opacity, transform;
}

.teleport-modal-enter-from,
.teleport-modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
