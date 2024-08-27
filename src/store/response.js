import { defineStore } from 'pinia';

export const useResponseStore = defineStore('response', {
  state: () => ({
    datas: [], // 초기값을 빈 배열로 설정
    member: '', // 일반, 사업자, 가맹점 여부 확인
    user_id: '', // 각 회원 아이디
    user_index : '', // 로그인시 user_index
    cm_amount : '' // 회원별 CM 보유량
  }),
  actions: {
    setResponseData(jsonArr) {
      this.datas = jsonArr;
    },
  },
});