<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toHome()"><img src="@/assets/go_back_btn.png"></button>
            <p>회원가입</p>
        </header>

        <main>
            <div class="auth_content">
                <p>휴대폰 인증하기</p>
                <p>본인인증을 위해 버튼을 클릭해주세요.</p>
                <p>휴대폰 인증을 통해 본인 인증 절차를 완료해야 회원가입이 가능합니다.</p>
            </div>

            <div class="auth_btn_holder">
                <button type="button" class="auth_btn" @click="authMe()">휴대폰 인증하기</button>
            </div>
        </main>
    </div>

    <div>
        <ModalPage ref="child"/>
    </div>
</template>

<script>
import { useResponseStore } from '@/store/response.js';
// import router from '@/router/index.js';
import ModalPage from '@/components/ModalPage2.vue';

export default {
    components : {
        ModalPage
    },
    mounted() {
        // const a = 'abcde';
        // console.log(a + '/123.com')
        // let store = useResponseStore();

        // console.log(222);
        // console.log(store.datas);

        // const jsonArr = store.datas;
        // jsonArr.push({
        //             aaa : 'aaa'
        //         })
        // console.log(jsonArr);
        
        // store.setResponseData(jsonArr);
        // store = useResponseStore();
        // console.log(333);
        // console.log(store.datas);

        //this.$refs.child.openModal();
    },
    methods : {
        // 다날 휴대폰 본인인증
        // authMe() {
        //     // 가맹점 식별하기
        //     const { IMP } = window;
        //     IMP.init('imp00000000'); // 'imp00000000' 대신 발급받은 가맹점 식별코드를 사용해야 함.

        //     // 본인인증 데이터 정의
        //     const data = {
        //         merchant_uid : `mid_${new Date().getTime()}`, //주문번호
        //         company : '아임포트', //회사명 혹은 url
        //         carrier : 'SKT', //통신사
        //         name : '홍길동', //이름
        //         phone : '01012341234', //전화번호
        //     };

        //     // 본인인증 창 호출
        //     IMP.certification(data, this.callback);
        // },
        getYmd10() {
        //yyyy-mm-dd 포맷 날짜 생성
        var d = new Date();
        return d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());
        },
        // 본인인증
        authMe() {
            const { IMP } = window;

            const refs = this.$refs.child;

            IMP.init("imp06362454");
            IMP.certification({ // param
                    merchant_uid : "cmbarter " + this.getYmd10(),
                    min_age : 13,
                    // m_redirect_url : "/pages/user/m_join_process.php",
                    popup : false
                }, 
                function (rsp) {
                    console.log(rsp);
                    console.log(rsp.success);

                    if (rsp.success) {

                        let store = useResponseStore();

                        console.log(rsp);
                        const formData = new FormData();

                        formData.append('type', 'auth');
                        formData.append('imp_uid', rsp.imp_uid);

                        const url = process.env.VUE_APP_API_URL;

                        fetch(url + 'api/join/AuthPage.php', {
                        method: 'POST',
                        body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);

                            if(data.code == '200') {
                                const authData = data.msg.response;
                                // console.log(authData);

                                // Pinia 데이터 저장
                                const jsonArr = store.datas;
                                jsonArr.push({
                                    'birthday' : authData.birthday,
                                    'gender' : authData.gender,
                                    'name' : authData.name,
                                    'phone' : authData.phone,
                                    'unique_key' : authData.unique_key
                                })

                                console.log(jsonArr);

                                // 본인인증 완료 모달창
                                refs.mode = 'pass';
                                refs.openModal();

                                return false;
                            }
                            if(data.code == '500') {

                                // 본인인증 실패 모달창
                                refs.mode = 'fail';
                                refs.openModal();

                                return false;
                            }
                        });

                    } else {
                        alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
                    }
                }
            );
        },
        toHome() {
            this.$router.push({ path : '/'});

            // 뒤로가기 눌렀을때 Pinia 비워주기
            const store = useResponseStore();
            store.datas = '';
        },
        // callback(response) {
        //     // 콜백함수 정의
        //     const {
        //         success,
        //         // merchant_uid,
        //         error_msg,
        //     } = response;

        //     if(success) {
        //         alert('본인인증 성공');
        //     } else {
        //         alert(`본인인증 실패 : ${error_msg}`);
        //     }
        // }
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
.auth_content {
    width: 100%;
    padding: 50px 20px;
    /* border: 1px solid red; */
}
.auth_content > p:nth-of-type(1),:nth-of-type(2) {
    font-size: 1.2rem;
}
.auth_content > p:last-child {
    font-size: 0.9rem;
    margin-top: 10px;
}
.auth_btn_holder {
    position: absolute;
    left: 50%; bottom: 10px;
    transform: translateX(-50%);
    width: 95%; height: 40px;
    border-radius: 25px;
    /* border: 1px solid blue; */
}
.auth_btn {
    width: 100%; height: 100%;
    background-color: #1bce0b; color: #fff;
    border: none; border-radius: 10px;
    /* border: 1px solid red; */
}
</style>