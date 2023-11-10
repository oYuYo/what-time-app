<script setup lang="ts">
import { ref } from 'vue'
import TImezoneListView from '@/views/TimezoneList.vue'
import CustomTimezoneListView from '@/views/CustomTimezoneList.vue'

const selectedTZRadio = ref('default')
const onChange = (event: any): void => {
  selectedTZRadio.value = event.target.value
}
</script>

<template>
  <section data-testid="home">
    <div class="desc">
      <span v-if="selectedTZRadio === 'default'"> 現在時刻のTimezoneの一覧を表示しています </span>
      <span v-if="selectedTZRadio === 'custom'" data-testid="InitialInvisibleText">
        選択されたTimezoneの日時に基づき、時差を計算します
      </span>
      <div>
        <input
          type="radio"
          id="rd-default"
          v-on:change="onChange"
          name="tz-radio"
          value="default"
          checked
        />
        <label for="rd-default"> Default</label>
        <input
          type="radio"
          id="rd-custom"
          v-on:change="onChange"
          name="tz-radio"
          value="custom"
          data-testid="rdCustomTest"
        />
        <label for="rd-custom"> Custom</label>
      </div>
    </div>
    <hr class="desc2" color="#BDE3FF" />
    <TImezoneListView v-if="selectedTZRadio === 'default'" />
    <CustomTimezoneListView v-if="selectedTZRadio === 'custom'" />
  </section>
</template>

<style scoped>
.desc {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.desc2 {
  margin-bottom: 20px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
}
label {
  padding: 0 10px 0 0;
}
</style>
