import { describe, test, expect, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { RouteNames } from '@/router/index'
import App from '@/App.vue'
import Home from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'

vi.mock('vue-router')

describe('App.vueのテスト', () => {
  test('アプリタイトルのテスト', () => {
    const wrapper = mount(App)
    const actual = wrapper.get(`[data-testid="title"]`).text()
    const expected = 'What Time'
    expect(actual).toBe(expected)
  })
  test(`${RouteNames.Home}ページのRouting Test`, () => {
    const wrapper = shallowMount(Home)
    const actual = wrapper.find(`[data-testid="home"]`).exists() //要素が存在するか？
    const expected = true
    expect(actual).toBe(expected)
  })
  test(`${RouteNames.About}ページのRouting Test`, () => {
    const wrapper = shallowMount(About)
    const actual = wrapper.find(`[data-testid="about"]`).exists()
    const expected = true
    expect(actual).toBe(expected)
  })
})
