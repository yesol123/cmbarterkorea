<template>
    <header class="confrim_pin_header_title">
     <RouterLink to="/couponGift">
          <img src="@/assets/icon_arrow_left.svg" alt="Back">
      </RouterLink>
      <h3>PIN 번호 확인</h3>
      <RouterLink to="/couponGift">
          <img src="@/assets/icon_close.svg" alt="Close">
      </RouterLink>
     </header>
 
     <section class="confrim_pin_section">
         <div>
             <form class="form_area" action="#">
                 <ul>
                     <li>PIN 번호 입력</li>
                     <li>PIN번호를 입력해주세요.</li>
                 </ul>
 
                 <div class="pinnumber">
                     <input :class="{ 'active': pinnums[0] }" type="password" v-model="pinnums[0]">
                     <input :class="{ 'active': pinnums[1] }" type="password" v-model="pinnums[1]">
                     <input :class="{ 'active': pinnums[2] }" type="password" v-model="pinnums[2]">
                     <input :class="{ 'active': pinnums[3] }" type="password" v-model="pinnums[3]">
                     <input :class="{ 'active': pinnums[4] }" type="password" v-model="pinnums[4]">
                     <input :class="{ 'active': pinnums[5] }" type="password" v-model="pinnums[5]">
                 </div>
             </form>
         </div>
 
         <div class="number_button_area">
 
             <ul class="pins">
                     <li @click="InsertPin(one)">1</li>
                     <li @click="InsertPin(two)">2</li>
                     <li @click="InsertPin(three)">3</li>
                     <li @click="InsertPin(four)">4</li>
                     <li @click="InsertPin(five)">5</li>
                     <li @click="InsertPin(six)">6</li>
                     <li @click="InsertPin(seven)">7</li>
                     <li @click="InsertPin(eight)">8</li>
                     <li @click="InsertPin(nine)">9</li>
                     <li @click="ResetPin()"><img src="@/assets/icon_menu_change_on.svg" alt=""></li>
                     <li @click="InsertPin(zero)">0</li>
                     <li @click="DeletePin()"><img src="@/assets/icon_clear.svg" alt=""></li>
             </ul>
         </div>
 
     </section>
 

     <div v-if="showModal" class="modal">
  <p class="caution"><img src="@/assets/accept.png" alt=""></p>
      <p>쿠폰을 선물 하였습니다.</p>
      <button @click="confrimGift()">확인</button>
  </div>



 
 
 </template>
 
 
 <script>
 //import { RouterLink } from 'vue-router'; 
 import router from '@/router/index.js';
 //import { useResponseStore } from '@/store/response.js'
import { useResponseStore } from '@/store/response.js'

 
 export default{
     name: 'confrimPin',
     data(){
         return{
             pinnums : [],
             one : 1,
             two : 2,
             three : 3,
             four : 4,
             five : 5,
             six : 6,
             seven : 7,
             eight : 8,
             nine : 9,
             zero : 0,
             isActive: [false, false, false, false, false, false],
             showModal:false
         }
     },
     methods:{
         InsertPin(i) {
         // 숫자 입력을 pinnums 배열에 추가
         this.pinnums.push(i);
         this.isActive = true
         console.log('PIN 입력 중:', this.pinnums);
         
         // PIN 번호가 6자리가 되면 이벤트 발생 및 페이지 이동
         if (this.pinnums.length === 6) {
           localStorage.setItem('pinnumber',JSON.stringify(this.pinnums))
           console.log('PIN번호가 완성되었습니다',this.pinnums);
          
          

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
                    this.showModal = true
                 
                
                }else{
                    alert(data.msg)
                }
            
            })


         }
     },
 
         ResetPin(){
             this.pinnums = [];
         },
         DeletePin() {
             this.pinnums.pop();
         },
         
         confrimGift(){
            
        let store = useResponseStore();
            

        console.log('쿠폰선물!');
        console.log('ddd',store);
        
        const formData = new FormData();

        formData.append('type', 'coupon_gift');
        formData.append('user_index', store.user_index);
        formData.append('coupon_price',store.cate);
        formData.append('coupon_limit',store.limit);
        formData.append('coupon_name',store.name);
        formData.append('arr',store.selectedCustomers)
        formData.append('coupon_condition',store.condition)


        for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
        }
        const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/customer/customer_setting.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.showModal = false
                router.push({path:'/CustomerManagement'})

            
            })
            
         }
     }
 }
 
 </script>
 
 
 <style scoped>
 
 @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
 
 
 *li,ul{
     font-family: "Noto Sans KR", sans-serif;
     list-style: none;
 }
 .confrim_pin_header_title {
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
 
 .confrim_pin_header_title > a:nth-child(1) {
     position: absolute; /* 왼쪽 버튼을 절대 위치로 */
     left: 10px; /* 왼쪽으로부터의 거리 */
     top: 50%; /* 세로 가운데 정렬 */
     transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
 }
 
 .confrim_pin_header_title > a:nth-child(2) {
     position: absolute; /* 오른쪽 버튼을 절대 위치로 */
     right: 10px; /* 오른쪽으로부터의 거리 (여백 추가) */
     top: 50%; /* 세로 가운데 정렬 */
     transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
 }
 
 .confrim_pin_header_title > h3 {
     margin: 0 auto;
     text-align: center;
     color: #1749C2;
     font-weight: 900;
 }
 
 .confrim_pin_section{
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