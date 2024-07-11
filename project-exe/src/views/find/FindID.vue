<template>
    <div>1</div>
</template>

<script>
// import router from '@/router/index.js'

export default {
    data() {
        return {

        }
    },
    mounted() {
        this.authMe();
    },
    methods : {
        getYmd10() {
        //yyyy-mm-dd 포맷 날짜 생성
        var d = new Date();
        return d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());
        },
        // 본인인증
        authMe() {
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

                        console.log(rsp);
                        const formData = new FormData();

                        formData.append('type', 'auth');
                        formData.append('imp_uid', rsp.imp_uid);

                        fetch('https://cmbarter.com/api/find/id_find1.php', {
                        method: 'POST',
                        body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);

                            if(data.code == '200') { 
                                alert('본인인증 완료되었습니다.');
                                // router.push({ path : '/yourid'});
                                return false;
                            }
                            if(data.code == '500') {
                                alert('이미 가입된 회원입니다.');
                                return false;
                            }

                        });

                    } else {
                        alert("인증에 실패하였습니다. 에러 내용: " + rsp.error_msg);
                    }
                }
            );
        },
    }
}
</script>