import { defineStore } from 'pinia';

export const useResponseStore = defineStore('response', {
  state: () => ({
    datas: [], // 초기값을 빈 배열로 설정
  }),
  actions: {
    setResponseData(jsonArr) {
      this.datas = jsonArr;
    },
  },
});