<template>
     <header class="changePw_header_title">
            <RouterLink to="/mypage1"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
            <h3> 비밀번호 변경</h3>
        </header>

    <section class="changePw_seciotn">

        <div>
            <label for="password_">현재 비밀번호</label>
            <input v-model="password" id="password_" type="password" placeholder="현재 비밀번호를 입력해주세요">
        </div>

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
        <div>
            <button :class="{ 'active': isButtonActive }" @click="confirm()">확인</button>
        </div>
    </section>

</template>

<script>
import { useResponseStore } from '@/store/response.js';
import router from '@/router/index.js';

export default {
    name: 'changePassword',
    data(){
        return{
            password:'',
            newpassword:'',
            newpassword_confirm:'',
            isbuttonActive:false
        }
    },
    computed:{
        isPasswordMatching() {
            return this.newpassword === this.newpassword_confirm;
        },
        isButtonActive(){
            return this.password !== '' && this.newpassword !== '' && this.newpassword_confirm != ''
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

            // console.log(this.password);

            const formData = new FormData();

            formData.append('type', 'user_pw_change');
            formData.append('user_index', store.user_index);
            formData.append('user_pw_current', this.password);
            formData.append('user_pw_change', this.newpassword);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/setting/user_pw_change.php', {
            method: 'POST',
            body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            if( data.code == 500){
                alert(data.msg)
            }
            
            if(data.code == 200 ){
                alert(data.msg)
                 router.push({path:'/main'})
            }
            
            
            });
            
        },
 
    }
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*p,label{
    font-family: "Noto Sans KR", sans-serif;
    margin-bottom: 10px;
}

.changePw_header_title{
    display: flex;
    align-items: center;
    justify-content: center; /* 가운데 정렬 */
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    /* max-width: 768px; */
    transform: translateX(-50%);
    height: 60px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 800;
    border-bottom: 1px solid var(--line);
    z-index: 100;
}

.changePw_header_title > a {
    position: absolute; /* 왼쪽 버튼을 절대 위치로 */
    left: 10px; /* 왼쪽으로부터의 거리 */
    top: 50%; /* 세로 가운데 정렬 */
    transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.changePw_header_title > h3 {
    margin: 0;
    text-align: center; /* 텍스트 가운데 정렬 */
    color: #1749C2;
    font-weight: 900;
}

.changePw_seciotn{
    margin-top: 100px;

}

div{
    width: 95%;
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

button{
    width: 95%;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #b1b1b1;
    background-color: #b1b1b1;
    color: white;
    font-size: 16px;
    position: fixed;
    bottom: 10px;
    cursor: pointer; /* 비활성화 시 마우스 커서 */
}


button.active {
    background-color: #4A9EFA;
    border-color: #4A9EFA;
    cursor: pointer; /* 활성화 시 마우스 커서 */
}

.error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

</style>