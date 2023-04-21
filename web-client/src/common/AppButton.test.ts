import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from './AppButton.vue'

describe('AppButton tests', () => {
  it('Schemes test', () => {
    const wrapper = mount(AppButton)

    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.classes()).toStrictEqual([
      'app-button',
      'app-button--filled',
      'app-button--border-rounded',
      'app-button--primary',
      'app-button--medium',
    ])
  })
})
