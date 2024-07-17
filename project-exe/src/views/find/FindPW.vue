<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn"><router-link to="/"><img src="@/assets/go_back_btn.png"></router-link></button>
            <p>비밀번호 확인</p>
        </header>

        <main>
            <div class="join_form">
                <div>
                    <label for="newpw">새 비밀번호 입력</label>
                    <input type="password" id="newpw" placeholder=" 영문,숫자 조합 8자리" v-model="newpw">
                </div>
                <div>
                    <label for="checkpw">새 비밀번호 확인</label>
                    <input type="password" id="checkpw" v-model="checkpw">
                </div>
            </div>    

            <div class="change_btn_holder">
                <button type="button" class="change_btn" @click="setChange()">변경</button>
            </div>
        </main>

        <ModalPage ref="child" style="display: none;"/>
    </div>
</template>

<script>
import { useResponseStore } from '@/store/response.js';
import ModalPage from '@/components/ModalPage2.vue';

export default {
    inject: ['api_pw'],
    components : {
        ModalPage
    },
    data() {
        return {
            newpw : '',
            checkpw : ''
        }
    },
    mounted() {

    },
    methods : {
        setChange() {
            let store = useResponseStore();
            const refs = this.$refs.child;

            const engnum = /^[a-zA-Z0-9]*$/;     // 영어,숫자체크

            if(!(this.newpw == this.checkpw)) {
                alert('비밀번호가 일치하지 않습니다.');
                return false;

            }else if(!engnum.test(this.newpw) || this.newpw.length != 8) {
                alert('비밀번호는 영문, 숫자 조합 8자리로 해주세요.');
                return false;

            } else {

                const formData = new FormData();
                formData.append('type', 'pw_change');
                formData.append('api_pw', this.api_pw);
                formData.append('id', store.datas.toString());
                formData.append('pw', this.newpw);

                fetch('https://cmbarter.com/api/find/pw_change.php', {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    
                    refs.mode = 'changepw';
                    refs.openModal();
                    return false;
                });
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
.change_btn_holder {
    position: absolute;
    left: 50%; bottom: 10px;
    transform: translateX(-50%);
    width: 95%; height: 40px;
    border-radius: 25px;
    /* border: 1px solid blue; */
}
.change_btn {
    width: 100%; height: 100%;
    background-color: #1bce0b; color: #fff;
    border: none; border-radius: 10px;
    /* border: 1px solid red; */
}
.join_form {
    width: 100%;
    padding: 20px;
    /* border: 1px solid red; */
}
.join_form label {
    display: block;
    margin-top: 20px;
    /* border: 1px solid red; */
}
.join_form input {
    display: block;
    width: 100%; height: 40px;
    margin-top: 5px;
    border-radius: 10px;
    border: 1px solid #ccc;
}
</style>