import { defineStore } from 'pinia';

export const useResponseStore = defineStore('response', {
  state: () => ({
    datas: [], // 초기값을 빈 배열로 설정
    member: '', // 일반, 사업자, 가맹점 여부 확인
    user_id: '' // 각 회원 아이디
  }),
  actions: {
    setResponseData(jsonArr) {
      this.datas = jsonArr;
    },
  },
});