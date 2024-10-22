import { defineStore } from 'pinia';

export const useResponseStore = defineStore('response', {
  state: () => ({
    //PIN 확인 
    inputPin:'',//입력한 PIN
    corretPin:'', //실제 PIN
    isPinVerified: false, // Pin 검증상태
    showModal: false, // 모달 상태

    datas: [], // 초기값을 빈 배열로 설정
    member: '', // 일반, 사업자, 가맹점 여부 확인
    user_id: '', // 각 회원 아이디
    user_index : '', // 로그인시 user_index
    store_main_user_index : '', // 서브계정
    cm_amount : '', // 회원별 CM 보유량
    cmp_amount : '', // 회원별 CMP 보유량
    cancel_price : '', // 결제취소 시 해당 금액
    user_cm_log_index : '', // 결제취소 시 log_index
    //쿠폰선물
    cate: '',
    limit: '',
    name: '',
    condition: '',
    selectedCustomers: [],
    length: '',
    need_user_cm: '',
    rest_user_cm: '',
    coupon_index : '', // 쿠폰선물시 coupon_index
    coupon_user_index : '', // 쿠폰선물시 user_index
    event_master_index : '',
    //CM선물
    send_cm: '', //선물할 CM
    user_name:'',//사용자 이름
    user_phone: '', // 사용자 전화번호
    give_user_index: '', // 선물하는 유저의 인덱스
    take_user_index: '', // 선물 받는 유저의 인덱스
    store_index : '', // 가맹점찾기


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
    setCouponData(coupondata) {
      this.cate = coupondata.cate || this.cate; // 기본값 사용
      this.limit = coupondata.limit || this.limit; 
      this.name = coupondata.name || this.name; 
      this.condition = coupondata.condition || this.condition; 
      this.selectedCustomers = coupondata.selectedCustomers || this.selectedCustomers; 
      this.length = coupondata.length || this.length; 
      this.need_user_cm = coupondata.need_user_cm || this.need_user_cm; 
      this.rest_user_cm = coupondata.rest_user_cm || this.rest_user_cm; 
    },

    setGiftData(giftData) {
      this.send_cm = giftData.send_cm || this.send_cm;
      this.user_name = giftData.user_name || this.user_name;
      this.user_phone = giftData.user_phone || this.user_phone;
      this.give_user_index = giftData.give_user_index || this.give_user_index;
      this.take_user_index = giftData.take_user_index || this.take_user_index;
    },

    //핀번호 확인 로직
    async verifyPin() {
      const formData = new FormData();
      formData.append('type', 'pin_check');
      formData.append('user_index', this.user_index); // 현재 사용자 정보
      formData.append('user_pin', Number(this.inputPin)); // 입력한 PIN번호
    
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const url = process.env.VUE_APP_API_URL;
    
      try {
        const response = await fetch(url + 'api/common/cm.php', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
    
        if (data.code === 200) {
          console.log('이거를 확인하라구');
          this.isPinVerified = true;
        } else {
          this.isPinVerified = false;
        }
    
        return this.isPinVerified; // 결과값 반환
      } catch (error) {
        console.error('PIN 검증 중 오류 발생:', error);
        this.isPinVerified = false;
        return false; // 오류 발생 시 false 반환
      }
    },
    clearPin(){
      this.inputPin = '';
      this.isPinVerified = false;
    }
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