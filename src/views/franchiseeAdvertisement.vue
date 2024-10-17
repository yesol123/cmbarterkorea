<template>

    <header class="Terms_header_title">
        <RouterLink to="/Terms"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3>약관 및 이용 동의</h3>
    </header>
    <ul class="titlebox">
        <li>
            광고성 정보 수신 동의
        </li>
        <li class="version">
            ver. 2022.11.30
        </li>
    </ul>


    <div class="m_T30">
        <p class="terms_txtview">
            일반 회원에게 제공하는 서비스(가게홍보서비스, 위치정보서비스등)의 광고성 정보를 수신합니다.
            <br>
            광고성 정보는 신규 서비스 홍보 및 "회사"에서 제공하는 서비스에 대한 소개, 이벤트 안내 등을 포함합니다.<br>
            광고성 정보 수신 동의는 "회사" &gt; 내 정보 관리 &gt; 혜택 알림 설정 에서 변경할 수 있습니다.
        </p>
    </div>
    <hr class="line_l">

    <div class="agree_terms m_T30 m_B30">
        <p>
            약관 동의일 :
            <span class="eng">{{ this.agreementDate }}</span>
        </p>
        <div v-if="yesorno == 'N'" class="N">
            <button @click="showModal3 = true">이용 동의 </button>
        </div>
        <div v-if="yesorno == 'Y'" class="Y">
            <button @click="showModal = true">이용 동의 철회</button>
        </div>
        <p>
            정보제공 및 이용 동의를 철회한 이후부터는 해당 서비스에서 회원님의 정보를 조회할 수 없습니다.</p>
    </div>


    <!--  철회 과정 modal1,modal2 -->
    <div v-if="showModal" class="modal">
        <p>마케팅 정보 수집 및 이용 동의를 철회하시겠습니까?</p>
        <p>마케팅 정보 수집 및 이용 동의를 철회한 이후부터는 해당 서비스에서 회원님의 정보를 조회할 수 없습니다.</p>
        <button @click="confirmRevoke">확인</button>
        <button @click="cancel">취소</button>
    </div>


    <div v-if="showModal2" class="modal">
        <p>철회가 완료 되었습니다.</p>
        <button @click="cancelAgree">확인</button>
    </div>

    <!--  동의 과정 modal3 -->
    <div v-if="showModal3" class="modal">
        <p>마케팅 정보 수집 및 이용동의를 동의하시겠습니까?</p>
        <button @click="agree">확인</button>
    </div>


</template>
<script>
import { useResponseStore } from '@/store/response.js';

export default {
    name: 'franchisee_Advertisement',
    data() {
        return {
            yesorno: 'N', // 동의인지 거부인지 상태를 저장
            agreementDate: null, // 약관 동의일
            showModal: false,
            showModal2: false,
            showModal3: false
        }
    },
    methods: {
        cancelAgree() {
            let store = useResponseStore();
            const formData = new FormData();
            this.yesorno = 'N'
            formData.append('type', 'user_advertisement_checked')
            formData.append('user_index', store.user_index)
            formData.append('user_advertisement_checked', this.yesorno)
            console.log(this.yesorno);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/setting/conditions.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    console.log('msg', result);
                })

            this.showModal2 = false
        },
        cancel() {
            this.showModal = false;
        },

        confirmRevoke() {
            this.showModal = false; // 모달 1 닫기
            this.agreementDate = '';
            this.showModal2 = true; // 모달 2 열기

        },
        agree() {
            let store = useResponseStore();
            const formData = new FormData();
            this.yesorno = 'Y'
            formData.append('type', 'user_advertisement_checked')
            formData.append('user_index', store.user_index)
            formData.append('user_advertisement_checked', this.yesorno)
            console.log(this.yesorno);


            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/setting/conditions.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    console.log('msg', result);
                    this.fetchLatestConditions();// 철회 후 최신 정보 다시 불러오기
                })
            this.showModal3 = false
        },
        fetchLatestConditions() {
            let store = useResponseStore();
        const formData = new FormData();

        formData.append('type', 'conditions_get');
        formData.append('user_index', store.user_index);

        const url = process.env.VUE_APP_API_URL;

        fetch(url + 'api/setting/conditions.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('msg', result.msg[0]);
            this.yesorno = result.msg[0].user_advertisement_checked;
            this.agreementDate = result.msg[0].user_create_time; // 동의 날짜 갱신
        });
        }

    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*ul,
li,
a,
p {
    font-family: "Noto Sans KR", sans-serif;
    list-style: none;
    text-decoration: none;

}

ul {
    margin: 60px auto 0;
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 95%;
}


ul>li>a {
    display: flex;
    justify-content: space-between;
    width: 100%;

}

.terms {
    width: 100%;
    margin: 0 auto;
}

.Terms_header_title {
    display: flex;
    align-items: center;
    justify-content: center;
    /* 가운데 정렬 */
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    /* max-width: 768px; */
    transform: translateX(-50%);
    height: 60px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 800;
    border-bottom: 1px solid var(--line);
    z-index: 100;
}

.Terms_header_title>a {
    position: absolute;
    /* 왼쪽 버튼을 절대 위치로 */
    left: 10px;
    /* 왼쪽으로부터의 거리 */
    top: 50%;
    /* 세로 가운데 정렬 */
    transform: translateY(-50%);
    /* 세로 가운데 정렬 보정 */
}

.Terms_header_title>h3 {
    margin: 0;
    text-align: center;
    /* 텍스트 가운데 정렬 */
    color: #1749C2;
    font-weight: 900;
}

.m_T30 {
    width: 95%;
    margin: 0 auto;
}

.terms_txtview {
    font-size: 15px;
}

.titlebox {
    border-bottom: 1px solid #f1f1f1;
    padding: 18px 20px;
}

.titlebox li:nth-child(1) {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
}

.version {
    font-size: 14px;
    font-weight: 500;
    color: #89949c;
}

.agree_terms p:nth-child(1) span {
    font-size: 16px;
    font-weight: 500;
}

.agree_terms p:nth-child(2) {
    font-size: 14px;
    color: #666;
    font-weight: 400;
}


.Y,
.N {
    display: flex;
    justify-content: center;
}

.agree_terms>div>button {
    padding: 10px 15px;
    border: 1px solid gray;
    border-radius: 25px;
    background-color: transparent;
    font-size: 16px;
}


.eng {
    font-size: 10px;
}


.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    position: fixed;
    /* 고정 위치 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    /* 화면의 중앙에 위치 */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 400px;
    max-width: 90%;
    padding: 30px 20px;
    text-align: center;
    box-sizing: border-box;
}


.modal button {
    margin: 10px;
    padding: 10px 20px;
    background-color: #1749c2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
</style>