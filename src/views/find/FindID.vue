<template>
    <div>
        <ModalPage ref="child" style="display: none;"/>
    </div>
</template>

<script>
import router from '@/router/index.js';
import ModalPage from '@/components/ModalPage2.vue';
import { useResponseStore } from '@/store/response.js';

export default {
    components : {
        ModalPage
    },
    data() {
        return {

        }
    },
    mounted() {
        this.authMe();
        // console.log(process.env.VUE_APP_API_URL);
        // const url = process.env.VUE_APP_API_URL;
        // console.log(url + 'api/find/id_find1.php');
    },
    methods : {
        getYmd10() {
        //yyyy-mm-dd 포맷 날짜 생성
        var d = new Date();
        return d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());
        },
        // 본인인증
        authMe() {
            const refs = this.$refs.child;

            const { IMP } = window;
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

                        fetch(url + 'api/find/id_find1.php', {
                        method: 'POST',
                        body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);

                            if(data.code == '200') { 

                                const idData = data.msg;
                                store.datas.push(idData);
                                router.push({ path : '/yourid'});

                                return false;
                            }
                            if(data.code == '500') {

                                refs.mode = 'notfound';
                                refs.openModal();
                                return false;
                            }

                        });

                    } else {
                        alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
                        router.push({ path : '/'});
                    }
                }
            );
        },
    }
}
</script>