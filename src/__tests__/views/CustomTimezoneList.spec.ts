import { describe, test, expect, beforeAll } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { shallowMount } from '@vue/test-utils'
import CustomTimezoneList from '@/views/CustomTimezoneList.vue'
import { useTimezoneStore } from '@/stores/timezone'
import type { Timezone } from '@/interfaces'

describe('CustomTimezoneList.vueのテスト', () => {
  let store: any = null
  beforeAll(() => {
    //pinia instanceの作成とアクティブ化
    setActivePinia(createPinia())
    store = useTimezoneStore()
    store.prepareTImezoneList()
  })
  test('onDDLChangeイベントのテスト', async () => {
    const wrapper = shallowMount(CustomTimezoneList)
    const selectTag = wrapper.find(`[data-testid="test-timezone-ddl"]`) as any //Property 'element' does not exist on type 'HTMLElement'.というエラーを避けるため
    await selectTag.setValue('JP')
    expect(selectTag.element.value).toBe('JP')
    expect(store.selectedTimezone).toEqual(store.timezoneList.get('JP') as Timezone)
  })
  test('onDatetimeChangeイベントのテスト', async () => {
    const expected = '2023-11-10T14:00'
    const wrapper = shallowMount(CustomTimezoneList)
    await wrapper.get(`[data-testid="test-datetime-local"]`).setValue(expected)
    const actual = wrapper.get(`[data-testid="selected-datetime"]`).text()
    expect(actual).toBe(expected)
  })
})
