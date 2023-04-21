<template>
  <transition
    name="collapse__body-transition"
    @enter="setHeightCSSVar"
    @before-leave="setHeightCSSVar"
  >
    <div v-show="isShown" class="collapse__body">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    isShown: boolean
    isOpenedByDefault?: boolean
    isCloseByClickOutside?: boolean
  }>(),
  {
    isOpenedByDefault: false,
    isCloseByClickOutside: true,
  },
)

const setHeightCSSVar = (element: HTMLElement) => {
  element.style.setProperty(
    '--collapse-body-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<style lang="scss" scoped>
.collapse__body-transition-enter-active {
  animation: collapse-frame-keyframes 0.25s ease-in-out;
  overflow: hidden;
}

.collapse__body-transition-leave-active {
  animation: collapse-frame-keyframes 0.25s ease-in-out reverse;
  overflow: hidden;
}

@keyframes collapse-frame-keyframes {
  from {
    height: 0;
  }

  to {
    height: var(--collapse-body-height);
  }
}
</style>
