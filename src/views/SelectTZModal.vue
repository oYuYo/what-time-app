<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'
import type { Timezone } from '@/interfaces'
import { useTimezoneStore } from '@/stores/timezone'

const timezoneStore = useTimezoneStore()
timezoneStore.prepareTImezoneList()
const timezoneList = computed((): Map<string, Timezone> => {
  return timezoneStore.timezoneList
})

timezoneStore.getCompareTimezoneList()
const compareTimezoneList = computed((): Map<string, Timezone> => {
  return timezoneStore.compareTimezoneList
})

const onCheckedChange = (event: Event): void => {
  if (!(event.target instanceof HTMLInputElement)) {
    return
  }
  const timezoneItem = timezoneList.value.get(event.target.name)
  if (timezoneItem === undefined) return

  timezoneStore.setCompareTimezoneList(
    event.target.name as string,
    event.target.checked as boolean,
    timezoneItem
  )
}

const open = ref(false)
</script>

<template>
  <button class="modal-button" @click="open = true" data-testid="modal-button">
    対象地域の選択
  </button>
  <Teleport to="#app">
    <div v-if="open" class="modal">
      <div class="modal-header" data-testid="modal-header">
        <p style="font-weight: bold">Timezoneを選択してください</p>
        <button class="close-button" @click="open = false" data-testid="modal-close-button">
          Close&nbsp;
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M7.5 9C5.186 9 3.561 7.848 2.497 6.666a9.368 9.368 0 01-1.449-2.164 5.065 5.065 0 01-.08-.18l-.004-.007v-.001L.5 4.5l-.464.186v.002l.003.004a2.107 2.107 0 00.026.063l.078.173a10.367 10.367 0 001.61 2.406C2.94 8.652 4.814 10 7.5 10V9zm7-4.5a68.887 68.887 0 01-.464-.186l-.003.008-.015.035-.066.145a9.37 9.37 0 01-1.449 2.164C11.44 7.848 9.814 9 7.5 9v1c2.686 0 4.561-1.348 5.747-2.666a10.365 10.365 0 001.61-2.406 6.164 6.164 0 00.104-.236l.002-.004v-.001h.001L14.5 4.5zM8 12V9.5H7V12h1zm-6.646-1.646l2-2-.708-.708-2 2 .708.708zm10.292-2l2 2 .708-.708-2-2-.708.708z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div v-for="[code, timezone] in timezoneList" v-bind:key="code">
          <input
            type="checkbox"
            v-bind:id="`inner-modal-${code}`"
            v-bind:name="code"
            v-bind:checked="compareTimezoneList.get(code) as unknown as boolean"
            v-on:change="onCheckedChange"
          />
          <label v-bind:for="`inner-modal-${code}`">{{ timezone.region }}</label>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 500px;
  margin-left: -250px;
  border: 7px solid;
  background-color: #bde3ff;
  overflow-y: auto;
  max-height: 50vh;
  line-height: 1.7;
}
.modal-header,
.modal-body {
  padding-left: 5px;
}
.modal-header {
  position: fixed;
  width: 470px;
  height: 40px;
  background-color: #bde3ff;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.modal-body {
  margin-top: 40px;
}
.modal-button {
  width: 150px;
  height: 40px;
  background-color: #80caff;
  color: #fff;
  border: none;
  transition: 0.5s;
  cursor: pointer;
}
.modal-button:hover {
  opacity: 0.5;
}
.close-button {
  margin-right: 30px;
  border: none;
  color: #12477d;
  font-weight: bold;
  background-color: #bde3ff;
  border-bottom-style: solid;
  cursor: pointer;
}
</style>
