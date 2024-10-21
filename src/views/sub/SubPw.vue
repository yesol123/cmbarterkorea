<template>
   

       <div>
           <label for="newpassword_">새 비밀번호</label>
           <input v-model="newpassword" id="newpassword_" type="password" placeholder="새로운 비밀번호를 입력해주세요">
           
       </div>
       <div>
       <label for="newpassword_confirm_">비밀번호 확인  <span v-if="!isPasswordMatching && newpassword_confirm !== ''" class="error">*비밀번호가 일치하지 않습니다.</span></label> 
       <input v-model=" newpassword_confirm" id="newpassword_confirm_" type="password" placeholder="새로운 비밀번호를 다시한번 입력해주세요">
       </div>

       <div class="text">
           <p>*영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상 또는 3종류 이상을 조합하여 최소 8자리 이상의 길이로 구성하세요.</p>
           <p>*연속적인 숫자나 생일, 전화번호 등 추측하기 쉬운 개인 정보 및 아이디와 비슷한 비밀번호는 사용하지 않는 것이 안전합니다.</p>
       </div>


       <div class="btn_class">
           <button :class="[{'active': isButtonActive}, 'origin']" @click="confirm()">확인</button>
       </div>


   
<!-- 
       
       <div v-if="showModal" class="modal">
 <p class="caution">알림</p>
     <p>비밀번호를 수정하였습니다.</p>
     <button @click="confirm()">확인</button>
 </div> -->



</template>

<script>
import { useResponseStore } from '@/store/response.js';
import router from '@/router/index.js';

export default {
   name: 'subPw',
   data(){
       return{
        member:'',
        newpassword:'', //새로운 비밀번호
        newpassword_confirm:'', //새로운 비밀번호 확인
        isbuttonActive:false,
        showModal : false
       }
   },

   
   mounted() {
       // store에서 member 값을 가져와서 data에 할당
       let store = useResponseStore();
       this.member = store.member;
   },
   computed:{
       isPasswordMatching() {
           return this.newpassword === this.newpassword_confirm;
       },
       isButtonActive(){
           return this.newpassword !== '' && this.newpassword_confirm != ''
       }

   },

   
   methods:{
       
       confirm(){
           if(this.password==''){
               alert("현재 비밀번호를 입력해주세요.");
                return
           }

           if (!this.isPasswordMatching) {
           alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
           return;
       }

           let store = useResponseStore();
            this.member = store.member
           // console.log(this.password);

           const formData = new FormData();

           formData.append('type', 'sub_change_password');
           formData.append('sub_id', store.user_id+"_sub");
           formData.append('sub_pw ',this.newpassword_confirm);

           const url = process.env.VUE_APP_API_URL;

           fetch(url + 'api/setting/sub_change_password.php', {
           method: 'POST',
           body: formData
           })
           .then(response => response.json())
           .then(data => {
               console.log(data);

        //    if( data.code == 500){
        //        alert(data.msg)
        //    }
           
     if(data.code == 200 ){
        router.push({path:`/mypage/${this.member}`})
     }
           
           
           });
           
       },

   }
}

</script>

<style scoped>

*p,label{
   margin-bottom: 10px;
}




div{
   display: flex;
   flex-direction: column;
   margin: 20px auto;
}
div > input{
   width: 100%;
   padding: 10px;
   border: 1px solid #B1B1B1;
   border-radius: 5px;
}

div > input:focus {
  outline: 1px solid #4A9EFA;
}

.text{
   margin-top: 10px;
}
.text > p{
   margin: 0;
   font-size: 12px;
   color: #555555;
   font-weight: 400;
}

.text > p:nth-child(2){
   margin-top: 5px;
}


.origin{
   width: 95%;
   padding: 10px;
   border-radius: 5px;
   border: 1px solid #b1b1b1;
   background-color: #b1b1b1;
   color: white;
   font-size: 16px;
   position: fixed;
   bottom: 60px;
   cursor: pointer; /* 비활성화 시 마우스 커서 */
   margin: 0 auto;
}


.origin.active {
   background-color: #4A9EFA;
   border-color: #4A9EFA;
   cursor: pointer; /* 활성화 시 마우스 커서 */
}

.error {
   color: red;
   font-size: 12px;
   margin-top: 5px;
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
   margin-bottom: 20px;
}

.modal button {
 margin: 10px auto 0;
 padding: 10px 20px;
 background-color: #1749c2;
 color: white;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 font-size: 16px;
 width: 30%;
}
</style>