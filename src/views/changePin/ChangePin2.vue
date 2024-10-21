<template>
   <header class="changePin2_header_title">
    <RouterLink to="/ChangePin1">
         <img src="@/assets/icon_arrow_left.svg" alt="Back">
     </RouterLink>
     <h3>PIN 번호 변경</h3>
     <RouterLink to="/mypage1">
         <img src="@/assets/icon_close.svg" alt="Close">
     </RouterLink>
    </header>

    <section class="changePin2_section">
        <div>
            <form class="form_area" action="#">
                <ul>
                    <li>새 PIN 번호 입력</li>
                    <li>변경하실 PIN번호를 입력해주세요.</li>
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

export default{
    name: 'ChangePin2',
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
            isActive: [false, false, false, false, false, false]
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
          this.$router.push('/ChangePin3');
          
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


.changePin2_section{
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
    position: fixed;
    bottom: 60px;
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