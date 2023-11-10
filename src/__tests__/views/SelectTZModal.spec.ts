import { describe, test, expect, beforeAll, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount, shallowMount } from '@vue/test-utils'
import SelectTZModal from '@/views/SelectTZModal.vue'
import { useTimezoneStore } from '@/stores/timezone'

describe('TimezoneList.vueのテスト', () => {
  let store: any = null
  beforeAll(() => {
    setActivePinia(createPinia())
    store = useTimezoneStore()
    store.prepareTImezoneList()
  })
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div')
    el.id = 'app'
    document.body.appendChild(el)
  })
  afterEach(() => {
    document.body.outerHTML = ''
  })
  test('初期確認', () => {
    const wrapper = shallowMount(SelectTZModal)
    const actual = wrapper.find(`[data-testid="modal-header"]`).exists()
    const expected = false
    expect(actual).toBe(expected)
  })
  test('Modalの表示と非表示', async () => {
    /*
     * teleport先の#appを作成してもvirtual DOM上ではmodalの中身が拾えないのでdocumentを使用した
     * 他に良い方法があればそれを使用する
     * teleport内でcomponentを使用していればfindComponentなどから取得可能
     */
    const wrapper = mount(SelectTZModal)
    expect(document.getElementById('app')!.innerHTML).not.toContain('data-testid="modal-header"')
    await wrapper.find(`[data-testid="modal-button"]`).trigger('click')
    expect(document.getElementById('app')!.innerHTML).toContain('data-testid="modal-header"')
    await (
      document.querySelector('[data-testid="modal-close-button"]') as HTMLButtonElement
    ).click()
    expect(document.getElementById('app')!.innerHTML).not.toContain('data-testid="modal-header"')
  })
})
