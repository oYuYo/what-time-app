<script setup lang="ts">
import { computed } from 'vue'
import type { Timezone } from '@/interfaces'
import { useTimezoneStore } from '@/stores/timezone'

const timezoneStore = useTimezoneStore()
timezoneStore.prepareTImezoneList()
const isLoading = computed((): boolean => {
  return timezoneStore.isLoading
})
const timezoneList = computed((): Map<string, Timezone> => {
  return timezoneStore.timezoneList
})
setInterval(
  (): void => {
    timezoneStore.updateTime()
  },
  2000 //頻繁にupdateしなくてもいいので2s interval
)
</script>

<template>
  <p v-if="isLoading">一覧を表示中...</p>
  <table v-else data-testid="tz-table">
    <tr>
      <th>Country/Region</th>
      <th>ISO3166</th>
      <th>Timezone</th>
      <th>UTC</th>
      <th>Current Time</th>
    </tr>
    <tr v-for="[code, timezone] in timezoneList" v-bind:key="code">
      <td class="region">{{ timezone.region }}</td>
      <td>{{ code }}</td>
      <td>{{ timezone.timezone }}</td>
      <td>{{ timezone.utc }}</td>
      <td>{{ timezone.now }}</td>
    </tr>
  </table>
</template>

<style scoped>
table {
  text-align: left;
  border-collapse: collapse;
  width: 95%;
}
th {
  font-weight: bold;
}
th,
td {
  padding: 0 0 0 1rem;
}
.region {
  /*border-left: solid 1rem #80CAFF;*/
}
tr:hover td {
  background-color: #80caff;
}
</style>
