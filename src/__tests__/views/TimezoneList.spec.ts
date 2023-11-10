import { describe, test, expect, beforeAll, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { shallowMount } from '@vue/test-utils'
import TimezoneList from '@/views/TimezoneList.vue'
import { useTimezoneStore } from '@/stores/timezone'

describe('TimezoneList.vueのテスト', () => {
  let store: any = null
  beforeAll(() => {
    setActivePinia(createPinia())
    store = useTimezoneStore()
    store.prepareTImezoneList()
  })
  test('初期状態の確認', () => {
    const wrapper = shallowMount(TimezoneList)
    const actual = wrapper.get('p').text()
    const expected = '一覧を表示中...'
    expect(actual).toBe(expected)
  })
  test('ローディング完了時の確認', () => {
    vi.useFakeTimers()
    const wrapper = shallowMount(TimezoneList)
    vi.advanceTimersByTime(3000)

    const actual = wrapper.find(`[data-testid="tz-table"]`).exists()
    const expected = false
    expect(actual).toBe(expected)
  })
})
