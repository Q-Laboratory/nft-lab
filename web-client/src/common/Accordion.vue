<template>
  <div class="accordion" ref="rootEl">
    <div class="accordion__head">
      <slot
        name="head"
        :accordion="{
          isOpen: isCollapseOpen,
          toggle: toggleCollapse,
          open: openCollapse,
          close: closeCollapse,
        }"
      />
    </div>
    <transition
      name="accordion__body-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <div v-show="isCollapseOpen" class="accordion__body">
        <slot
          :accordion="{
            isOpen: isCollapseOpen,
            toggle: toggleCollapse,
            open: openCollapse,
            close: closeCollapse,
          }"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from '@/router'

const props = withDefaults(
  defineProps<{
    isOpenedByDefault?: boolean
    isCloseByClickOutside?: boolean
  }>(),
  {
    isOpenedByDefault: false,
    isCloseByClickOutside: true,
  },
)

const rootEl = ref<HTMLElement | null>(null)
const isCollapseOpen = ref(props.isOpenedByDefault)
const router = useRouter()

router.afterEach(() => {
  closeCollapse()
})

onMounted(() => {
  if (rootEl.value) {
    if (props.isCloseByClickOutside) {
      onClickOutside(rootEl, () => {
        closeCollapse()
      })
    }
  }
})

const toggleCollapse = () => {
  isCollapseOpen.value ? closeCollapse() : openCollapse()
}
const closeCollapse = () => {
  isCollapseOpen.value = false
}
const openCollapse = () => {
  isCollapseOpen.value = true
}

const setHeightCSSVar = (element: HTMLElement) => {
  element.style.setProperty(
    '--accordion-body-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<style lang="scss" scoped>
.accordion__body {
  overflow: hidden;
}

.accordion__body-transition-enter-active {
  animation: accordion-frame-keyframes 0.25s ease-in-out;
}

.accordion__body-transition-leave-active {
  animation: accordion-frame-keyframes 0.25s ease-in-out reverse;
}

@keyframes accordion-frame-keyframes {
  from {
    height: 0;
  }

  to {
    height: var(--accordion-body-height);
  }
}
</style>
