<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn"><router-link to="/auth"><img src="@/assets/go_back_btn.png"></router-link></button>
            <p>회원가입</p>
        </header>

        <main>
            <div class="join_form">
                <div>
                    <label for="id">아이디</label>
                    <input type="text" id="id">
                </div>
                <div>
                    <label for="password">비밀번호</label>
                    <input type="text" id="password" placeholder=" 문자,숫자 조합 8자리">
                </div>
                <div>
                    <label for="confirm_pw">비밀번호 확인</label>
                    <input type="text" id="confirm_pw">
                </div>
                <div>
                    <label for="pin">핀번호</label>
                    <input type="text" id="pin" placeholder=" 숫자 6자리">
                </div>
                <div>
                    <label for="recommend_id">추천인 아이디</label>
                    <input type="text" id="recommend_id">
                </div>
            </div>    
        </main>

        <div class="join_btn_holder">
            <button type="button" class="join_btn">회원가입하기</button>
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
    mounted() {
        let store = useResponseStore();
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
.join_form {
    width: 100%;
    padding: 20px;
    /* border: 1px solid red; */
}
.join_form > div {
    /* width: 95%; */
    /* border: 1px solid blue; */
}
.join_form label {
    display: block;
    margin-top: 20px;
}
.join_form input {
    display: block;
    width: 100%; height: 35px;
    margin-top: 5px;
    border-radius: 10px;
    border-color: #ccc;
}
#password::placeholder, #pin::placeholder  {
    font-size: 14px;
}
.join_btn_holder {
    position: absolute;
    left: 50%; bottom: 10px;
    transform: translateX(-50%);
    width: 95%; height: 40px;
    border-radius: 25px;
    /* border: 1px solid blue; */
}
.join_btn {
    width: 100%; height: 100%;
    background-color: #1bce0b; color: #fff;
    border: none; border-radius: 10px;
    /* border: 1px solid red; */
}
</style>