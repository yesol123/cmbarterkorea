<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toCMList()"><img src="@/assets/go_back_btn.png"></button>
            <p>PIN 번호 입력</p>
        </header>

        <div>
            <div class="pin_word">
                <p>결제를 위해 PIN 번호를 입력해주세요.</p>
                <div class="boxes">
                    <div>{{ pinnums[0] }}</div>
                    <div>{{ pinnums[1] }}</div>
                    <div>{{ pinnums[2] }}</div>
                    <div>{{ pinnums[3] }}</div>
                    <div>{{ pinnums[4] }}</div>
                    <div>{{ pinnums[5] }}</div>
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
        </div>
    </div>
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
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 1rem;
    color: hsl(0, 0%, 0%);
}
.wrap {
    position: relative;
    width: 100%;
    background-color: #fff;
    /* border: 1px solid red; */
    margin-bottom: 70px;
}
header {
    position: fixed;
    top: 0; left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; height: 40px;
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid #ccc;
}
header > p {
    line-height: 40px;
    color: blue;
    /* border: 1px solid red; */
    margin: 0 auto;
}
.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
.wrap > div {
    width: 100%; 
    margin-top: 120px;
    /* border: 1px solid red; */
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
}
.numbers > div {
    width: 33%; height: 20%;
    text-align: center; line-height: 60px;
    /* border: 1px solid blue; */
}
</style>