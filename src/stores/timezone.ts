import {defineStore} from "pinia";
import timezoneJson from '@/assets/timezone.json';
import type {Timezone} from "@/interfaces"

interface State {
    timezoneList: Map<string, Timezone>;  //key:code, value:Timezone
    selectedTimezone: Timezone;
    isLoading: boolean;
    compareTimezoneList: Map<string, Timezone>;
};

/*
 * state:データ本体
 * getters:データの加工
 * actions:データの変更
 */
export const useTimezoneStore = defineStore({
    id: "timezone",
    state: (): State => {
        return {
            timezoneList: new Map<string, Timezone>(),
            selectedTimezone: {
                code: "",
                region: "",
                timezone: "",
                utc: "",
                offset: 0,
                description: "",
                now: "",
            },
            isLoading: true,
            compareTimezoneList: new Map<string, Timezone>(),
        };
    },
    getters: {

    },
    actions: {
        prepareTImezoneList() {
            const timezoneList = timezoneJson.timezones.timezone;
            timezoneList.forEach(tz => {
                this.timezoneList.set(tz.code, tz);
            });
            this.isLoading = true;
        },
        updateTime(){
            const utcTImeList = new Map<string, Timezone>();
            
            this.timezoneList.forEach(tz => {
                const timeStr = new Date(new Date().getTime() + 60*60*1000*tz.offset).toJSON().slice(0, 16);

                const params:{
                    code: string,
                    region: string,
                    timezone: string,
                    utc: string,
                    offset: number,
                    description: string,
                    now: string,
                } =
                {
                    code: tz.code,
                    region: tz.region,
                    timezone: tz.timezone,
                    utc: tz.utc,
                    offset: tz.offset,
                    description: tz.description,
                    now: timeStr,
                }
                utcTImeList.set(tz.code, params);
            });
            this.timezoneList = utcTImeList;
            this.isLoading = false;
        },
        //localstorageから取得する
        getSelectedTimezone(): void {
            const selectedTimezoneJSON = localStorage.getItem("selectedTimezone");
            if(selectedTimezoneJSON != undefined){
                this.selectedTimezone = JSON.parse(selectedTimezoneJSON);
            }
        },
        //localstorageへセットする
        setSelectedTimezone(timezone: Timezone): void {
            this.selectedTimezone = timezone;
            const selectedTimezoneJSON = JSON.stringify(timezone);
            localStorage.setItem("selectedTimezone", selectedTimezoneJSON);
        },
        //localstorageから比較対象のtimezone listを取得する
        getCompareTimezoneList(): void {
            let compareTimezoneList = new Map<string, Timezone>();
            const compareTimezoneListJSONStr = localStorage.getItem("compareTimezoneList");
            
            if(compareTimezoneListJSONStr != undefined){
                const compareTimezoneListJSON = JSON.parse(compareTimezoneListJSONStr);
                compareTimezoneList = new Map<string, Timezone>(compareTimezoneListJSON);
            }
            this.compareTimezoneList = compareTimezoneList;
        },
        //localstorageへ比較対象のtimezone listをセットする
        setCompareTimezoneList(code: string, checked: boolean, timezone: Timezone): void {
            if (checked){
                this.compareTimezoneList.set(code, timezone);
            }else{
                this.compareTimezoneList.delete(code);
            }
            const compareTimezoneListJSONStr = JSON.stringify([...this.compareTimezoneList]);
            localStorage.setItem("compareTimezoneList", compareTimezoneListJSONStr);
        },
        updateCompareTimezoneTime(selectedDateTime: string){
            const utcTImeList = new Map<string, Timezone>();

            const t = new Date(selectedDateTime).getTime();
            const offset = this.selectedTimezone.offset;
            const diff = new Date().getTimezoneOffset() * 60 * 1000;
            this.compareTimezoneList.forEach(tz => {
                const timeStr = new Date(t + 60*60*1000*(tz.offset - offset) - diff).toJSON().slice(0, 16);

                const params:{
                    code: string,
                    region: string,
                    timezone: string,
                    utc: string,
                    offset: number,
                    description: string,
                    now: string,
                } =
                {
                    code: tz.code,
                    region: tz.region,
                    timezone: tz.timezone,
                    utc: tz.utc,
                    offset: tz.offset,
                    description: tz.description,
                    now: timeStr,
                }
                utcTImeList.set(tz.code, params);
            });
            this.compareTimezoneList = utcTImeList;
        },
    }
});