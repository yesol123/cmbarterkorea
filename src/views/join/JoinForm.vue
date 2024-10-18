<template>
   
        <header>
            <button type="button" class="goback_btn" @click="toHome()"><img src="@/assets/go_back_btn.png"></button>
            <h3>회원가입</h3>
        </header>

        <section>
            <div class="join_form">
                <div>
                    <label for="id">아이디</label>
                    <input type="text" id="id" v-model="id" placeholder=" 영문,숫자 조합 6자리" :class="idError ? 'error' : 'no'" @click="reset('id')">
                    <p id="error_code" v-show="idShow">아이디를 정확히 입력해주세요.</p>
                </div>
                <div>
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" v-model="password" placeholder=" 영문,숫자 조합 8자리" :class="pwError ? 'error' : 'no'" @click="reset('pw')">
                    <p id="error_code" v-show="pwShow">비밀번호를 정확히 입력해주세요.</p>
                </div>
                <div>
                    <label for="confirm_pw">비밀번호 확인</label>
                    <input type="password" id="confirm_pw" v-model="confirm_pw" :class="cpwError ? 'error' : 'no'" @click="reset('cpw')">
                    <p id="error_code" v-show="cpwShow">일치하지 않는 비밀번호입니다.</p>
                </div>
                <div>
                    <label for="pin">핀번호</label>
                    <input type="number" id="pin" v-model="pin" placeholder=" 숫자 6자리" :class="pinError ? 'error' : 'no'" @click="reset('pin')">
                    <p id="error_code" v-show="pinShow">핀번호를 정확히 입력해주세요.</p>
                </div>
                <div>
                    <label for="recommend_id">추천인 아이디</label>
                    <p>*해당하는 경우에만 작성해주세요.</p>
                    <input type="text" id="recommend_id" v-model="recommend_id" style="border: 1px solid #ccc;">
                </div>
            </div>    

            <div class="join_btn_holder">
            <button type="button" class="join_btn" @click="join()">회원가입하기</button>
        </div>
        </section>

    
</template>

<script>
import { useResponseStore } from '@/store/response.js';
import router from '@/router/index.js';

export default {
    inject: ['api_pw'],
    data() {
        return {
            id : '',
            password : '',
            confirm_pw : '',
            pin : '',
            recommend_id : '',
            idError : false,
            pwError : false,
            cpwError : false,
            pinError : false,
            idShow : false,
            pwShow : false,
            cpwShow : false,
            pinShow : false,
            maxlength : 6
        }
    },
    mounted() {
        let store = useResponseStore();
        console.log(333);
        console.log(store.datas);
    },
    methods : {
        join() {
            //유효성검사
            const empty = /\s/g;     // 공백체크
            const engnum = /^[a-zA-Z0-9]*$/;     // 영어,숫자체크

            if(this.id == '' || empty.test(this.id) || !engnum.test(this.id) || this.id. length < 6 || this.id.length > 15) {
                this.idError = true;
                this.idShow = true;
            }
            if(this.password == '' || empty.test(this.password) || !engnum.test(this.password) || this.password.length < 8 || this.password.length > 20) {
                this.pwError = true;
                this.pwShow = true;
            }
            if(this.confirm_pw == '' || this.confirm_pw != this.password) {
                this.cpwError = true;
                this.cpwShow = true;
            }
            if(this.pin == '' || !(this.pin.toString().length == this.maxlength)) {
                this.pinError = true;
                this.pinShow = true;
            }

            //FormData에 가입정보 붙이기
            let store = useResponseStore();

            const formData = new FormData();

            formData.append('type', 'join');
            formData.append('api_pw', this.api_pw);
        
            //약관 + 본인인증
            store.datas.forEach(data => {
                for (let key in data) {
                    formData.append(key, data[key]);
                }
            })
            //아이디, 비밀번호 등
            formData.append('id', this.id);
            formData.append('password', this.password);
            formData.append('pin', this.pin);
            formData.append('recommend_id', this.recommend_id);

            for(let entry of formData.entries()) {
                console.log(entry[0], ":", entry[1]);
            }

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/join/joinform.php', {
            method: 'POST',
            body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if(data.code == '200') {
                // 회원가입 완료 페이지로 이동
                router.push({ path : '/joinend' });
                }
                if(data.code == '500') {
                    alert(data.msg);
                    return false;
                }
            });
        },
        // 가입폼 효과
        reset(value) {
            if(value == 'id' && this.idError == true) {
                this.idError = false;
                this.idShow = false;
                return false;
            }
            if(value == 'pw' && this.pwError == true) {
                this.pwError = false;
                this.pwShow = false;
                return false;
            }
            if(value == 'cpw' && this.cpwError == true) {
                this.cpwError = false;
                this.cpwShow = false;
                return false;
            }
            if(value == 'pin' && this.pinError == true) {
                this.pinError = false;
                this.pinShow = false;
                return false;
            }
        },
        // 로그인 페이지로 돌아가기
        toHome() {
            this.$router.push({ path : '/'});

            // 뒤로가기 눌렀을때 Pinia 비워주기
            const store = useResponseStore();
            store.datas = '';
        }
    },
    // watch : {
    //     id : function() {
    //         this.join();
    //     }
    // }
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
    /* border: 1px solid red; */
}
.join_form > div:nth-of-type(5) > label {
    display: inline-block;
    /* border: 1px solid blue; */
}
.join_form > div:nth-of-type(5) > p {
    display: inline-block;
    font-size: 0.7rem;
    margin-left: 5px;
}
.join_form input {
    display: block;
    width: 100%; height: 35px;
    margin-top: 5px;
    border-radius: 10px;
    /* border: 2px solid #ccc; */
}
#id::placeholder, #password::placeholder, #pin::placeholder  {
    font-size: 14px;
}

.join_btn {
    width: 95%; /* 적절한 너비로 조정 */
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #1749C2;
    background-color: #1749C2;
    color: white;
    font-size: 16px;
    position: fixed; /* 부모 요소를 기준으로 절대 위치 설정 */
    bottom: 60px;
    left: 50%; /* 부모 요소의 가운데 위치로 설정 */
    transform: translateX(-50%); /* 왼쪽으로 50% 이동하여 가운데 정렬 */
    cursor: pointer;
}
.error {
    border: 2px solid red;
}
.no {
    border: 1px solid #ccc;
}
#error_code {
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: 3px;
    color: red;
}
</style>