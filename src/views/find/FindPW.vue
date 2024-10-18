<template>
   
        <header>
            <button type="button" class="goback_btn"><router-link to="/"><img src="@/assets/go_back_btn.png"></router-link></button>
            <h3>비밀번호 확인</h3>
        </header>

        <section>
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
        </section>

        <ModalPage ref="child" style="display: none;"/>
 
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

                const url = process.env.VUE_APP_API_URL;

                fetch(url + 'api/find/pw_change.php', {
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

.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}

.change_btn {
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