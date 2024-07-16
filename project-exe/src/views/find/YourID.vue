<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn"><router-link to="/"><img src="@/assets/go_back_btn.png"></router-link></button>
            <p>아이디찾기</p>
        </header>

        <main>
            <p>가입하신 아이디는</p>
            <p>{{ yourid }} 입니다.</p>

            <div class="btn_group">
                <button type="button"><router-link to="/findpw" style="color: #fff;">비밀번호 재설정</router-link></button>
                <button type="button">로그인</button>
            </div>
        </main>
    </div>
</template>

<script>
import { useResponseStore } from '@/store/response.js';

export default {
    data() {
        return {
            yourid : '', 
        }
    },
    mounted() {
        let store = useResponseStore();
        this.yourid = store.datas.toString();
        console.log(store.datas);
    }
}

</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 1rem;
    color: #000;
}
.wrap {
    position: relative;
    width: 100%; height: 100vh;
    border: 1px solid red;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; height: 40px;
    padding: 0 10px;
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
main {
    margin-top: 130px;
    text-align: center;
    /* border: 1px solid red; */
}
main > p {
    font-size: 1.1rem;
    margin-top: 10px;
}
.btn_group {
    margin-top: 30px;
    /* border: 1px solid red; */
}
button {
    width: 140px; height: 40px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
}
button:last-child {
    width: 80px;
    margin-left: 30px;
}
</style>