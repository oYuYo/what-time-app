<script setup lang="ts">
import {ref, computed} from "vue";
import type {Timezone} from "@/interfaces"
import {useTimezoneStore} from "@/stores/timezone";
import SelectTZModal from "@/views/SelectTZModal.vue";

const timezoneStore = useTimezoneStore();
timezoneStore.prepareTImezoneList();
const timezoneList = computed(
    (): Map<string, Timezone> => {
        return timezoneStore.timezoneList;
    }
);

timezoneStore.getSelectedTimezone();
const selectedTimezone = computed(
    (): Timezone => {
        return timezoneStore.selectedTimezone;
    }
);

timezoneStore.getCompareTimezoneList();
const compareTimezoneList = computed(
    (): Map<string, Timezone> => {
        return timezoneStore.compareTimezoneList;
    }
);

const onDDLChange = (event): void => {
    timezoneStore.setSelectedTimezone(timezoneList.value.get(event.target.value) as Timezone);
};

const selectedDatetime: string  = ref("");
const onDatetimeChange = (event): void => {
    selectedDatetime.value = event.target.value;
};

const OnCalClick = (): void => {
    if(!selectedDatetime.value || timezoneStore.compareTimezoneList.size == 0){
        alert("Timezoneおよび日付、対象地域を選択してください")
        return;
    }
    timezoneStore.updateCompareTimezoneTime(selectedDatetime.value);
};
</script>

<template>
    <section class="adj">
        <tr>
            <td style="width: 130px;"><label for="timezone-ddl">Timezoneの選択</label></td>
            <td>
                <select id="timezone-ddl" v-model="selectedTimezone.code" v-on:change="onDDLChange">
                    <option selected disabled value="">Timezone List</option>
                    <option v-for="[code, timezone] in timezoneList" 
                        v-bind:key="code"
                        v-bind:value="code">
                        {{timezone.region}}
                    </option>
                </select>
            </td>
        </tr>
    </section>
    <section class="adj">
        <tr>
            <td style="width: 130px;"><label for="datetime-local">日付の選択</label></td>
            <td><input id="datetime-local" type="datetime-local" v-on:change="onDatetimeChange"/></td>
        </tr>
    </section>
    <tr>
        <td><SelectTZModal /></td>
    </tr>
    <hr class="adj2"/>
    <div class="adj3 center">
        <button class="cal" v-on:click="OnCalClick">時差計算</button>
    </div>
    <table>
        <tr>
          <th>Country/Region</th>
          <th>ISO3166</th>
          <th>Timezone</th>
          <th>UTC</th>
          <th>Current Time</th>
        </tr>
        <tr v-for="[code, timezone] in compareTimezoneList" v-bind:key="code">
          <td class="region">{{timezone.region}}</td>
          <td>{{code}}</td>
          <td>{{timezone.timezone}}</td>
          <td>{{timezone.utc}}</td>
          <td>{{timezone.now}}</td>
        </tr>
    </table>
</template>

<style scoped>
button.cal{
  width: 150px;
  height: 40px;
  background-color: #9580ff;
  color: #fff;
  transition: .5s;
  cursor: pointer;
  border-radius:80px;
}
button.cal:hover {
  opacity: .5;
}
table{
  text-align:left;
  border-collapse: collapse;
  width: 95%;
}
table > tr > th{
  font-weight:bold;
}
th,td{
  padding: 0 0 0 1rem;
}
table > tr:hover td{
  background-color: #80CAFF;
}
.adj{
  margin-bottom: 5px;
}
.adj2{
  margin-top: 10px;
  margin-bottom: 20px;
}
.adj3{
  margin-bottom: 20px;
}
.center{
    text-align:center;
}
</style>