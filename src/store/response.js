import { defineStore } from 'pinia';

export const useResponseStore = defineStore('response', {
  state: () => ({
    datas: [], // 초기값을 빈 배열로 설정
    member: '', // 일반, 사업자, 가맹점 여부 확인
    user_id: '', // 각 회원 아이디
    user_index : '', // 로그인시 user_index
    store_main_user_index : '', // 서브계정
    cm_amount : '', // 회원별 CM 보유량
    cmp_amount : '', // 회원별 CMP 보유량
    cancel_price : '', // 결제취소 시 해당 금액
    user_cm_log_index : '', // 결제취소 시 log_index
  
  }),
  // state: () => {
  //   const savedData = localStorage.getItem('response');
  //   return savedData ? JSON.parse(savedData) : {
  //     datas: [],
  //     member: '',
  //     user_id: '',
  //     user_index: '',
  //     store_main_user_index: '',
  //     cm_amount: ''
  //   }
  // },
  actions: {
    setResponseData(jsonArr) {
      this.datas = jsonArr;

      // localStorage.setItem('response', JSON.stringify(this.datas));
    },
  },
  persist : {
    enabled : true,
    strategies : [
      {
        key : 'response',
        storage : localStorage
      }
    ]
  }
});