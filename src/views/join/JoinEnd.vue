<template>
    <div class="wrap">
        <div class="wrap_center">
            <p>회원가입 완료!</p>
            <p>씨엠바더 회원이 되신 것을 환영합니다.</p>
            <button type="button" @click="toHome()">확인</button>
        </div>
    </div>
</template>

<script>
import { useResponseStore } from '@/store/response.js';

export default {
    data() {
        return {

        }
    },
    methods : {
        toHome() {
            this.$router.push({ path : '/'});

            // 확인버튼 눌렀을때 Pinia 비워주기
            const store = useResponseStore();
            store.datas = '';
        }
    }
}
</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    font-size: 1rem;
    text-decoration: none;
    color: #000;
}
.wrap {
    position: relative;
    width: 100%; height: 100vh;
    border: 1px solid red;
}
.wrap_center {
    position: absolute;
    top: 50%; left: 0;
    transform: translateY(-100%);
    width: inherit;
    /* border: 1px solid blue; */
    text-align: center;
}
.wrap_center > p {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 30px;
}
button {
    width: 70%; height: 40px;
    margin-top: 40px;
    background-color: #1bce0b;
    color: #fff;
    border-radius: 10px;
    border: none;
}
</style>