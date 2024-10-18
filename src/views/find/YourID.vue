<template>
    
        <header>
            <button type="button" class="goback_btn"><router-link to="/"><img src="@/assets/go_back_btn.png"></router-link></button>
            <h3>아이디찾기</h3>
        </header>

        <section>
            <div class="show_your_info">
                <p>가입하신 아이디는</p>
            <p>{{ yourid }} 입니다.</p>

            <div class="btn_group">
                <button type="button"><router-link to="/findpw" style="color: #fff;">비밀번호 재설정</router-link></button>
                <button type="button" @click="gotoLogin()">로그인</button>
            </div>
            </div>
        </section>
    
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
        console.log(store.datas); // store.datas가 무엇인지 확인
        this.yourid = store.datas[0].toString();
        // console.log(store.datas);
    },
    methods:{
        gotoLogin() {
    console.log('로그인 버튼 클릭됨'); // 더 명확한 로그
    this.$router.push('/'); // 경로 이동
}
    }
}

</script>

<style scoped>
.show_your_info{
    margin-top: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
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