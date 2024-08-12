<template>
    <div class="wrap">
        <header>
            <p>로그인</p>
        </header>

        <main>
            <div class="img_holder">
                <img src="../assets/cmblogo.png">
            </div>

            <div class="input_holder">
                <div>
                    <label for="id">아이디</label>
                    <input type="text" id="id" v-model="id">
                </div>
                <div>
                    <label for="password">비밀번호</label>
                    <input type="text" id="password" v-model="password">
                </div>
            </div>

            <button type="button" class="login_btn" @click="toLogin()">로그인</button>

            <div class="link_holder">
                <a href="#"><router-link to="/findid">아이디 및 비밀번호 찾기 | </router-link></a>
                <a href="#"><router-link to="/join">회원가입</router-link></a>
            </div>
        </main>

        <ModalPage ref="child" style="display: none;"/>
    </div>
    
</template>

<script>
import { useResponseStore } from '@/store/response.js';
import ModalPage from '@/components/ModalPage2.vue';
import router from '@/router';

export default {
    components : {
        ModalPage
    },
    data() {
        return {
            id : '',
            password : ''
        }
    },
    mounted() {
        let store = useResponseStore();
        store.datas = [];
        console.log(888);
        console.log(store.datas);
    },
    methods : {
        toLogin() {
            if(this.id == '' || this.password == '') {
                alert('아이디와 비밀번호를 입력해주세요.');
                return false;
            }
            if(this.id && this.password) {
                
                let store = useResponseStore();
                const refs = this.$refs.child;

                const formData = new FormData();

                formData.append('type', 'login');
                formData.append('user_id', this.id);
                formData.append('user_pw', this.password);

                fetch('https://cmbarter.com/api/login.php', {
                method : 'POST',
                body : formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    if(data.code == 200) {
                        if(data.msg == 4) {
                            alert('접속이 허용되지 않은 회원입니다.');
                            return false;
                        }
                        else {
                            let jsonObject = JSON.parse(data.msg);
                            store.member = jsonObject.user_role_index;
                            store.user_id = jsonObject.user_id;
                            console.log(jsonObject);
                            console.log(store.member);
                            router.push({'path' : '/main'});
                        }
                    }
                    if(data.code == 404) {
                        refs.mode = 'loginfail';
                        refs.openModal();
                    }
                })
            }
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
    color: #000;
}
.wrap {
    width: 100%; height: 100vh;
    border: 1px solid red;
}
header {
    width: 100%; height: 40px;
    border: 1px solid #ccc;
}
header > p {
    text-align: center; line-height: 40px;
    color: blue;
}
.img_holder {
    text-align: center;
    width: 100%; height: 226px;
    margin: 50px 0 50px 0;
    /* border: 1px solid #000; */
}
.img_holder > img {
    width: 250px; height: 220px;
}
.input_holder {
    width: 100%;
    /* padding: 0 20px 0; */
    /* border: 1px solid red; */
}
.input_holder > div {
    width: 70%; height: 70px;
    margin: 0 auto;
    /* border: 1px solid blue; */
}
.input_holder > div:nth-child(2) {
    margin-top: 20px;
}
label {
    height: 22px;
    text-align: center;
    display: block;
}
input {
    width: 100%; height: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-top: 5px;
    padding-left: 10px;
}
.login_btn {
    display: block;
    width: 70%; height: 40px;
    margin: 40px auto 0;
    background-color: #1bce0b;
    color: #fff;
    border-radius: 10px;
    border: none;
}
.link_holder {
    text-align: center;
    margin-top: 20px;
    /* border: 1px solid red; */
}
</style>