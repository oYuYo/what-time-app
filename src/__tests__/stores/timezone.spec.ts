import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import type { Timezone } from '@/interfaces'
import { useTimezoneStore } from '@/stores/timezone'

describe('timezone.tsのテスト', () => {
  let store: any = null
  //beforeEach：各単体テスト関数の前に1度実行される
  //beforeEach：各単体テスト関数の前に都度実行される
  //ref : https://testdriven.io/blog/vue-pinia-testing/
  beforeAll(() => {
    //pinia instanceの作成とアクティブ化
    setActivePinia(createPinia())
    store = useTimezoneStore()
  })
  afterAll(() => {
    localStorage.clear()
  })
  test('初期化テスト', () => {
    const expected = {
      code: '',
      region: '',
      timezone: '',
      utc: '',
      offset: 0,
      description: '',
      now: ''
    }
    expect(store.timezoneList.size).toBe(0)
    expect(store.compareTimezoneList.size).toBe(0)
    expect(store.selectedTimezone).toEqual(expected)
    expect(store.isLoading).toEqual(true) //初期はローディング状態である
  })
  test('timezone.jsonの読み込みが成功したか', () => {
    store.prepareTImezoneList()
    const expected = {
      code: 'AF',
      region: 'Afghanistan',
      timezone: 'Afghanistan Standard Time',
      utc: '(UTC+04:30)',
      offset: 4.5,
      description: 'Kabul'
    }
    expect(store.timezoneList.get('AF')).toEqual(expected)
    expect(store.timezoneList.size).toBe(250)
  })
  test('updateTime()のテスト(timezoneList.nowをテストし, offsetが反映されていることを確認する)', () => {
    store.updateTime()
    const t1 = store.timezoneList.get('JP') as Timezone
    const t2 = store.timezoneList.get('JE') as Timezone
    const actual = (new Date(t1.now).getTime() - new Date(t2.now).getTime()) / 60 / 60 / 1000
    const expected = 9
    expect(actual).toBe(expected)
    expect(store.isLoading).toEqual(false)
  })
  test('store.selectedTimezoneにTimezoneを格納し取り出せるかテストする', () => {
    store.setSelectedTimezone(store.timezoneList.get('JP') as Timezone)
    store.getSelectedTimezone()
    expect(store.selectedTimezone).toEqual(store.timezoneList.get('JP') as Timezone)
  })
  test('store.compareTimezoneListにTimezoneを格納し取り出せるか, keyによる削除ができるかテストする', () => {
    const expected = new Map<string, Timezone>()
    expected.set('JP', store.timezoneList.get('JP') as Timezone)
    expected.set('JE', store.timezoneList.get('JE') as Timezone)
    store.setCompareTimezoneList('JP', true, store.timezoneList.get('JP') as Timezone)
    store.setCompareTimezoneList('JE', true, store.timezoneList.get('JE') as Timezone)
    expect(store.compareTimezoneList).toEqual(expected)

    expected.delete('JP')
    store.setCompareTimezoneList('JP', false, store.timezoneList.get('JP') as Timezone)
    expect(store.compareTimezoneList).toEqual(expected)
  })
  test('store.updateCompareTimezoneTime()のテスト', () => {
    const timeStr = '2023-11-09T22:53'
    store.setSelectedTimezone(store.timezoneList.get('JP') as Timezone)
    store.setCompareTimezoneList('JP', true, store.timezoneList.get('JP') as Timezone)
    store.setCompareTimezoneList('JE', true, store.timezoneList.get('JE') as Timezone)
    store.updateCompareTimezoneTime(timeStr)
    let t1 = store.compareTimezoneList.get('JP') as Timezone
    let actual = (new Date(t1.now).getTime() - new Date(timeStr).getTime()) / 60 / 60 / 1000
    const expected = 0
    expect(actual).toBe(expected)

    store.setSelectedTimezone(store.timezoneList.get('JE') as Timezone)
    store.updateCompareTimezoneTime(timeStr)
    t1 = store.compareTimezoneList.get('JE') as Timezone
    actual = (new Date(t1.now).getTime() - new Date(timeStr).getTime()) / 60 / 60 / 1000
    expect(actual).toBe(expected)
  })
})
