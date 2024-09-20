<template>

<header class="changePin3_header_title">
    <RouterLink to="/ChangePin1">
         <img src="@/assets/icon_arrow_left.svg" alt="Back">
     </RouterLink>
     <h3>PIN 번호 변경</h3>
     <RouterLink to="/mypage1">
         <img src="@/assets/icon_close.svg" alt="Close">
     </RouterLink>
    </header>

    <section class="changePin3_section">
        <div>
            <form class="form_area" action="#">
                <ul>
                    <li>새 PIN 번호 재입력</li>
                    <li>변경하실 PIN번호를 재입력해주세요.</li>
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
</template>

<script>
import { useResponseStore } from '@/store/response.js';
import router from '@/router/index.js';



export default{
    name:'ChangePin3',


    mounted() {
    const savedPin = JSON.parse(localStorage.getItem('pinnumber'))
    if(savedPin){
        this.carrypinsnum = savedPin;
    }
  
  },
  unmounted() {
    
  },
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
            carrypinsnum: []
        }
    },

    methods:{
        InsertPin(i) {
            if (this.pinnums.length < 6) {
                this.pinnums.push(i); // 입력한 PIN 추가
            }
            if (this.pinnums.length === 6) {
                this.checkPin(); // PIN이 6자리가 되면 확인
            }
            },
            checkPin() {
            // 입력한 PIN과 저장된 PIN을 비교
            const enteredPin = this.pinnums.join(''); // 배열을 문자열로 변환
            const storedPin = this.carrypinsnum.join(''); // 배열을 문자열로 변환

            if (enteredPin !== storedPin) {
            alert("PIN 번호 불일치!");
            this.ResetPin();
            return; // PIN이 일치하지 않으면 서버 요청을 보내지 않음
        }

            if (enteredPin === storedPin) {
                let store = useResponseStore();
                const formData = new FormData();

                formData.append('type','user_pin_change');
                formData.append('user_index',store.user_index);
                formData.append('user_pin',enteredPin)

                const url = process.env.VUE_APP_API_URL;

                fetch(url + 'api/setting/user_pin_change.php',{
                    method:'POST',
                    body:formData
                })
                .then(response => response.json())
                .then(data => { 
                    console.log(data);
                    if(data.code==200){
                        alert(data.msg)
                        localStorage.removeItem('pinnumber'); 
                        router.push({ path: '/ChangePin4' });
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
    }


}
</script>



<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*li,ul{
    font-family: "Noto Sans KR", sans-serif;
    list-style: none;
}
.changePin3_header_title {
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

.changePin3_header_title > a:nth-child(1) {
    position: absolute; /* 왼쪽 버튼을 절대 위치로 */
    left: 10px; /* 왼쪽으로부터의 거리 */
    top: 50%; /* 세로 가운데 정렬 */
    transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.changePin3_header_title > a:nth-child(2) {
    position: absolute; /* 오른쪽 버튼을 절대 위치로 */
    right: 10px; /* 오른쪽으로부터의 거리 (여백 추가) */
    top: 50%; /* 세로 가운데 정렬 */
    transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.changePin3_header_title > h3 {
    margin: 0 auto;
    text-align: center;
    color: #1749C2;
    font-weight: 900;
}

.changePin3_section{
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
</style>