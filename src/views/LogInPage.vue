<template>
   
        <header>
            <h3>로그인</h3>
        </header>

        <section>
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
                    <input type="password" id="password" v-model="password">
                </div>
            </div>

            <button type="button" class="login_btn" @click="toLogin()">로그인</button>

            <div class="link_holder">
                <a href="#"><router-link to="/findid">아이디 및 비밀번호 찾기 | </router-link></a>
                <a href="#"><router-link to="/join">회원가입</router-link></a>
            </div>
        </section>


    <div id="popup" class="popup">
        <div class="popup-content">
            <div class="center">
                <p class="header" style="font-size: 1.0rem;">{{ message }}</p>
                <div class="btn_group">
                    <button type="button" @click="Confirm()">확인</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { useResponseStore } from '@/store/response.js';
// import ModalPage from '@/components/ModalPage2.vue';
import router from '@/router';

export default {
    components : {
        // ModalPage
    },
    data() {
        return {
            id : '',
            password : '',
            message : ''
        }
    },
    mounted() {
        // if(localStorage.response.length > 0) {
        //     localStorage.removeItem('response');
        // }
        // else {
        //     console.log(222)
        // }
        // let store = useResponseStore();
        // console.log(store.state);
        // store.datas = [];

        // window.addEventListener('beforeunload', this.unLoadEvent);
    },
    beforeUnmount() {
        // window.removeEventListener('beforeunload', this.unLoadEvent);
    },
    methods : {
        // unLoadEvent: function (event) {
        //     if (this.canLeaveSite) return;
        
        //     event.preventDefault();
        //     event.returnValue = '';
        // },
        toLogin() {
            if(this.id == '' || this.password == '') {
                alert('아이디와 비밀번호를 입력해주세요.');
                return false;
            }
            if(this.id && this.password) {
                
                let store = useResponseStore();
                // const refs = this.$refs.child;

                const formData = new FormData();

                formData.append('type', 'login');
                formData.append('user_id', this.id);
                formData.append('user_pw', this.password);

                const url = process.env.VUE_APP_API_URL;
                    console.log(url);
                    
                fetch(url + 'api/login.php', {
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
                            //store.store_main_user_index = jsonObject.store_main_user_index;
                            if(jsonObject.user_role_index == 6){
                                let user_id = jsonObject.user_id;
                                store.user_id = user_id.slice(0, -4);
                                store.user_index = jsonObject.store_main_user_index;
                            }
                            else{
                                store.user_id = jsonObject.user_id;
                                store.user_index = jsonObject.user_index;
                            }
                            console.log(jsonObject);
                            console.log('user_role_index 값 : ' + store.member);
                            console.log('user_index 값 : ' + store.user_index);
                            console.log('store_main_user_index 값 : ' + store.store_main_user_index);
                            sessionStorage.setItem('store_main_user_index', jsonObject.store_main_user_index);

                            router.push({'path' : '/main'});
                        }
                    }
                    if(data.code == 404) {
                        console.log(data.msg);
                        this.message = data.msg;
                        document.getElementById('popup').style.display = 'flex';
                    }
                })
            }
        },
        Confirm() {
            this.message = '';
            this.id = '',
            this.password = '',
            document.getElementById('popup').style.display = 'none';
        }
    }
}
</script>

<style scoped>




.img_holder {
    text-align: center;
    width: 60%;
    margin: 30px auto;
    /* border: 1px solid #000; */
}
.img_holder > img {
    width: 100%;
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
    background-color: #fff;
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
.popup {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}
/* 팝업내용 */
.popup-content {
    position: relative;
    width: 90%; height: 25%;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    overflow: scroll;
    color: #000;
}
.center {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    /* border: 1px solid red; */
}
.header {
    font-weight: bold;
    font-size: 1.2rem;
    /* border: 1px solid red; */
}
.btn_group {
    width: 100%;
    margin-top: 10%;
    /* padding: 0 40px; */
}
.btn_group > button {
    width: 65px; height: 35px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 7px;
    color: #000;
    font-size: 0.9rem;
}
</style>