<template>
   
        <header>
            <button type="button" class="goback_btn" @click="toCMList()"><img src="@/assets/icon_arrow_left.svg"></button>
            <h3>PIN 번호 입력</h3>
        </header>

        <section>
            <div class="pin_word">
                <p>결제를 위해 PIN 번호를 입력해주세요.</p>
                <div class="boxes">
                    <div :class="{ active: pinnums.length > 0 }">{{ pinnums[0] != null ? '*' : '' }}</div>
  <div :class="{ active: pinnums.length > 1 }">{{ pinnums[1] != null ? '*' : '' }}</div>
  <div :class="{ active: pinnums.length > 2 }">{{ pinnums[2] != null ? '*' : '' }}</div>
  <div :class="{ active: pinnums.length > 3 }">{{ pinnums[3] != null ? '*' : '' }}</div>
  <div :class="{ active: pinnums.length > 4 }">{{ pinnums[4] != null ? '*' : '' }}</div>
  <div :class="{ active: pinnums.length > 5 }">{{ pinnums[5] != null ? '*' : '' }}</div>
                </div>
            </div>
            <div class="numbers">
                <div @click="InsertPin(one)">1</div>
                <div @click="InsertPin(two)">2</div>
                <div @click="InsertPin(three)">3</div>
                <div @click="InsertPin(four)">4</div>
                <div @click="InsertPin(five)">5</div>
                <div @click="InsertPin(six)">6</div>
                <div @click="InsertPin(seven)">7</div>
                <div @click="InsertPin(eight)">8</div>
                <div @click="InsertPin(nine)">9</div>
                <div @click="ResetPin()">reset</div>
                <div @click="InsertPin(zero)">0</div>
                <div @click="DeletePin()">취소</div>
            </div>
        </section>
  
</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
    data() {
        return {
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
            pinnums : [],
        }
    },
    mounted() {

    },
    methods : {
        InsertPin(i) {
            this.pinnums.push(i);

            if(this.pinnums.length == 6) {

                const strpin = this.pinnums.toString();
                const numpin = strpin.replace(/,/g, "");

                let store = useResponseStore();

                let formData = new FormData();
                formData.append('type', 'pin_check');
                formData.append('user_index', store.user_index);
                formData.append('user_pin', numpin);

                const url = process.env.VUE_APP_API_URL;

                fetch(url + 'api/common/cm.php', {
                method : 'POST',
                body : formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    if(data.code == 500) {
                        alert(data.msg);
                        return false;
                    }
                    if(data.code == 200) {
                        alert(data.msg);
                        this.$router.push({path:'/cmqr'})
                        
                    }
                })
            }
        },
        DeletePin() {
            this.pinnums.pop();
        },
        ResetPin() {
            this.pinnums = [];
        },
        toCMList() {
            this.$router.push({ path : '/cmlist' });
        }
    }
}

</script>

<style scoped>

.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
.wrap > div {
    width: 100%; height: 500px;
    /* margin-top: 120px; */
    padding-top: 120px;
    /* border: 1px solid red; */
    background-color: #fff;
}
.pin_word {
    width: 100%;
    text-align: center;
    margin-top: 10%;
    /* border: 1px solid orange; */
}
.pin_word > p {
    font-weight: bold;
    margin-bottom: 30px;
}
.boxes {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    width: 100%; height: 30px;
    /* border: 3px solid red; */
}
.boxes > div {
    width: 30px; height: 30px;
    line-height: 30px;
    border: none;
    background-color: #e4e2e2;
    border-radius: 7px;
    margin-right: 5px;
}
.numbers {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%; height: 50%;
    padding: 20px 20px;
    /* border: 1px solid pink; */
    background-color: #fff;
}
.numbers > div {
    width: 33%; height: 20%;
    text-align: center; line-height: 60px;
    /* border: 1px solid blue; */
}

.boxes > div{
    display: flex;
    align-items: center;
    justify-content: center;
}

.boxes > div.active {
    background-color: #1e90ff; /* 파란색 배경 */
    color: white; /* 텍스트 색상 흰색 */
}

</style>