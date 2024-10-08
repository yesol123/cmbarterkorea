<!-- <template>
    <header class="confirm_pin_header_title">
     <RouterLink to="/couponGift">
          <img src="@/assets/icon_arrow_left.svg" alt="Back">
      </RouterLink>
      <h3>PIN 번호 확인</h3>
      <RouterLink to="/couponGift">
          <img src="@/assets/icon_close.svg" alt="Close">
      </RouterLink>
     </header>
 
     <section class="confirm_pin_section">
         <div>
             <form class="form_area" action="#">
                 <ul>
                     <li>PIN 번호 입력</li>
                     <li>PIN번호를 입력해주세요.</li>
                 </ul>
 
                 <div class="pinnumber">
                    <input v-for="(pin, index) in pinnums" :key="index" type="password" v-model="pinnums[index]" :class="{ active: pinnums[index] }">
                 </div>
             </form>
         </div>
 
         <div class="number_button_area">
 
             <ul class="pins">
                <li v-for="number in numbers" :key="number" @click="InsertPin(number)">{{ number }}</li>
                     <li @click="ResetPin()"><img src="@/assets/icon_menu_change_on.svg" alt=""></li>
                     <li @click="InsertPin(zero)">0</li>
                     <li @click="DeletePin()"><img src="@/assets/icon_clear.svg" alt=""></li>
             </ul>
         </div>
 
     </section>
 

     <div v-if="showModal" class="modal">
  <p class="caution"><img src="@/assets/accept.png" alt=""></p>
        문구를 sendType 값에 따라 동적으로 표시 -->
    <!-- <p >{{ sendType === 'Coupon' ? '쿠폰을 선물하였습니다.' : 'CM을 선물하였습니다.' }}</p>
      <button @click="confirmGift">확인</button>
  </div>

 </template>!--> 


 <template>
    <header class="confirm_pin_header_title">
      <RouterLink to="/couponGift">
        <img src="@/assets/icon_arrow_left.svg" alt="Back" />
      </RouterLink>
      <h3>PIN 번호 확인</h3>
      <RouterLink to="/couponGift">
        <img src="@/assets/icon_close.svg" alt="Close" />
      </RouterLink>
    </header>
  
    <section class="confirm_pin_section">
      <div>
        <form class="form_area" action="#">
          <ul>
            <li>PIN 번호 입력</li>
            <li>PIN 번호를 입력해주세요.</li>
          </ul>
  
          <div class="pinnumber">
            <input
              v-for="(pin, index) in pinnums"
              :key="index"
              type="password"
              v-model="pinnums[index]"
              :class="{ active: pinnums[index] }"
            />
          </div>
        </form>
      </div>
  
      <div class="number_button_area">
        <ul class="pins">
          <li v-for="number in numbers" :key="number" @click="InsertPin(number)">
            {{ number }}
          </li>
          <li @click="ResetPin()">
            <img src="@/assets/icon_menu_change_on.svg" alt="Reset" />
          </li>
          <li @click="InsertPin(0)">0</li>
          <li @click="DeletePin()">
            <img src="@/assets/icon_clear.svg" alt="Delete" />
          </li>
        </ul>
      </div>
    </section>
  
    <!-- PIN이 성공적으로 확인되었을 때 모달 표시 -->
    <div v-if="responseStore.showModal" class="modal">
      <p class="caution">
        <img src="@/assets/accept.png" alt="" />
      </p>
      <p>{{ responseStore.sendType === 'Coupon' ? '쿠폰을 선물하였습니다.' : 'CM을 선물하였습니다.' }}</p>
      <button @click="closeModal">확인</button>
    </div>
  </template>
  



 
 <script setup>
 import { ref } from 'vue';
 import { useResponseStore } from '@/store/response';
 
 const responseStore = useResponseStore();
 const pinnums = ref(['', '', '', '', '', '']); // 6자리 PIN 번호 배열
 const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]); // 숫자 키패드 배열
 const errorMessage = ref('');
 
 // PIN 번호 입력 로직
 const InsertPin = (number) => {
   const index = pinnums.value.findIndex((pin) => pin === ''); // 빈 칸 찾기
   if (index !== -1) {
     pinnums.value[index] = number;
   }
   if (!pinnums.value.includes('')) {
     submitPin(); // PIN 번호가 모두 입력되면 검증
   }
 };
 
 // PIN 번호 초기화
 const ResetPin = () => {
   pinnums.value = ['', '', '', '', '', ''];
 };
 
 // 마지막 입력 삭제
 const DeletePin = () => {
   const lastIndex = pinnums.value.lastIndexOf('');
   if (lastIndex > 0) {
     pinnums.value[lastIndex - 1] = '';
   } else {
     pinnums.value[pinnums.value.length - 1] = '';
   }
 };
 
 // PIN 제출 로직
 const submitPin = async () => {
   responseStore.inputPin = pinnums.value.join(''); // 입력한 PIN을 저장
   const isValid = await responseStore.verifyPin(); // PIN 검증
 
   if (!isValid) {
     errorMessage.value = 'PIN 번호가 일치하지 않습니다.';
     ResetPin();
   } else {
     errorMessage.value = ''; // 오류 메시지 제거
   }
 };
 
 // 모달 닫기
 const closeModal = () => {
   responseStore.showModal = false;
 };
 </script>
 


<!--  
 <script>
 //import { RouterLink } from 'vue-router'; 
 import router from '@/router/index.js';
 //import { useResponseStore } from '@/store/response.js'
import { useResponseStore } from '@/store/response.js'

 
 export default{
     name: 'confirmPin',
     props: {
    apiUrl: {
      type: String,
      required: true
    },
    apiData: {
      type: Object,
      required: true
    },
    sendType: {   // 이 부분을 추가
      type: String,
      required: true
    }
    },
     data(){
         return{
            pinnums: ['', '', '', '', '', ''],
             numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
             isActive: [false, false, false, false, false, false],
             showModal:false
         }
     },
     methods:{
        InsertPin(number) {
      // 첫 번째로 빈 자리('')를 찾아 그 위치에 숫자를 삽입합니다.
      const index = this.pinnums.findIndex(pin => pin === '');
      if (index !== -1) {
        this.pinnums[index] = number;
      }

      // 모든 PIN 번호가 입력되면 submitPin을 호출합니다.
      if (!this.pinnums.includes('')) {
        this.submitPin();
      }
    },

        ResetPin(){
            this.pinnums = ['', '', '', '', '', ''];
        },
        DeletePin() {
      // 마지막으로 입력된 숫자를 빈 문자열로 되돌립니다.
      const index = this.pinnums.lastIndexOf('');
      if (index === -1) {
        // 모든 칸이 채워진 경우, 마지막 칸을 비웁니다.
        this.$set(this.pinnums, this.pinnums.length - 1, '');
      } else if (index > 0) {
        // 입력된 숫자가 있는 경우, 그 이전 칸을 비웁니다.
        this.$set(this.pinnums, index - 1, '');
      }
    },

         submitPin(){
            let store = useResponseStore();

            const formData = new FormData();
            formData.append('type','pin_check');
            formData.append('user_index',store.user_index);
            formData.append('user_pin',Number(this.pinnums.join('')));

            const url = process.env.VUE_APP_API_URL;
            fetch(url+'api/common/cm.php',{
                method : 'POST',
                body : formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                if(data.code == 200){
                    this.$emit('pinSuccess', this.sendType);
                    this.showModal = true
                    }else{
                    alert(data.msg)
                    this.ResetPin();
                    }
                })
         },
         confirmGift(){
            this.showModal = false;
            router.push({ path: '/main' });
            
         }
         
     },

    
         
        
     }
 
 
 </script>
  -->
 
 <style scoped>
 
 @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
 
 
 *li,ul{
     font-family: "Noto Sans KR", sans-serif;
     list-style: none;
 }
 .confirm_pin_header_title {
     display: flex;
     align-items: center;
     justify-content: space-between; /* 가운데 정렬 */
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 60px;
     background-color: #fff;
     font-size: 18px;
     font-weight: 800;
     border-bottom: 1px solid var(--line);
     z-index: 100;
     padding: 0 10px; /* 좌우 여백 추가 */
     box-sizing: border-box; /* 여백과 테두리를 포함한 전체 크기 계산 */
 }
 
 .confirm_pin_header_title > a:nth-child(1) {
     position: absolute; /* 왼쪽 버튼을 절대 위치로 */
     left: 10px; /* 왼쪽으로부터의 거리 */
     top: 50%; /* 세로 가운데 정렬 */
     transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
 }
 
 .confirm_pin_header_title > a:nth-child(2) {
     position: absolute; /* 오른쪽 버튼을 절대 위치로 */
     right: 10px; /* 오른쪽으로부터의 거리 (여백 추가) */
     top: 50%; /* 세로 가운데 정렬 */
     transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
 }
 
 .confirm_pin_header_title > h3 {
     margin: 0 auto;
     text-align: center;
     color: #1749C2;
     font-weight: 900;
 }
 
 .confirm_pin_section{
     position: relative;
     margin-top: 100px;
 }
 
 .form_area{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
 }
 
 .form_area > ul{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     list-style: none;
     padding: 0;
 }
 
 .form_area > ul >li:nth-child(1){
     font-size: 22px;
     font-weight: 700;
     margin-bottom: 14px;
 
 }
 .form_area > ul >li:nth-child(2){
     font-size: 14px;
     font-weight: 400;
 }
 
 
 
 .pinnumber{
     margin-top: 60px;
     width: 20%;
     display: flex;
     justify-content: center;
     gap: 5px;
 }
 
 
 .pinnumber > input {
     width: 50px;
     height: 50px;
     border: 1px solid #F2F2F2;  /* 테두리 파란색 */
     background-color: #F2F2F2;  /* 입력할 때 배경 파란색 */
     color: white;  /* 텍스트 색상을 흰색으로 */
     font-size: 24px;  /* 글자 크기 */
     text-align: center;
     border-radius: 5px;
 }
 
 
 .pinnumber input.active {
     background-color: #1749C2; /* 파란색 배경 */
     color: white; /* 흰색 텍스트 */
 }
 
 
 
 
 
 
 /* Chrome, Safari, Edge, Opera */
 .pinnumber > input::-webkit-outer-spin-button,
 .pinnumber > input::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
 }
 
 /* Firefox */
 .pinnumber > input[type=number] {
   -moz-appearance: textfield;
 }
 
 .pins{
     width: 100%;
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     padding: 0;
     margin-top: 100px;
     position: fixed;
     bottom: 0px;
     border-top: 1px solid #F2F2F2;
 }
 .pins > li {
     width: 30%;
     text-align: center;
     padding: 20px 40px;
     font-size: 20px;
     font-weight: 500;
 }

 
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: fixed; /* 고정 위치 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%); /* 화면의 중앙에 위치 */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 90%;
  padding: 30px 20px;
  text-align: center;
  box-sizing: border-box;
}
.caution{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
 }

 .caution img{
    width: 15%;
 }

.modal button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #4BAE4F;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
 </style>