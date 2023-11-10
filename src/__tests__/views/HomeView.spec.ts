import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/HomeView.vue'

describe('HomeView.vueのテスト', () => {
  test('HomeView内の必須要素が存在するか？', () => {
    const wrapper = shallowMount(Home)
    const actual = wrapper.find(`[data-testid="home"]`).exists()
    const expected = true
    expect(actual).toBe(expected)
  })
  test('[tz-radio]ラジオボタンの初期状態における非表示テキスト', () => {
    const wrapper = shallowMount(Home)
    const actual = wrapper.find(`[data-testid="InitialInvisibleText"]`).exists()
    const expected = false
    expect(actual).toBe(expected)
  })
  test('ラジオボタンの選択おける表示されるテキスト', async () => {
    const wrapper = shallowMount(Home)
    await wrapper.get(`[data-testid="rdCustomTest"]`).trigger('change')
    const actual = wrapper.find(`[data-testid="InitialInvisibleText"]`).exists()
    const expected = true
    expect(actual).toBe(expected)
  })
})
