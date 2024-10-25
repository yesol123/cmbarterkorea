<template>
    <header class="charge_gift_title">
        <RouterLink :to="`/main`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3> 충전</h3>
    </header>

    <section class="charge_area">

        <!-- 현재CM -->
        <p class="title">현재 CM</p>
        <div class="present_CM show">
            <p class="gray">보유 자산</p>
            <p>{{ this.user_cmp }}<span>CMP</span></p>
            <p>{{ this.user_cm }}<span>CM</span></p>
        </div>

        <!-- 충전할CM -->
        <p class="title">충전 할 CM</p>
        <div class="cm_charging">
            <input id="user_search" name="user_search" v-model="add_cm" @input="calculate" value="" type="number"
                class="send input_design" placeholder="금액을 입력하세요.">
            <p class="red">* 최소 충전 금액은 100,000 CM 입니다.</p>
        </div>

        <!-- 충전후CM -->
        <p class="title">충전 후 CM</p>
        <div class="cm_charged show">
            <p class="gray">보유 자산</p>
            <p>{{ this.current_cmp }}<span>CMP</span></p>
            <p>{{ this.all_cm }}<span>CM</span></p>
        </div>
        <!-- 충전수수료 -->
        <div class="charge_money">
            <p class="title">충전 수수료</p>
            <div class="cm_fee">
                <div>
                    <p>{{ formattedPayMoney }}원 <small class="red">(부가세 포함)</small></p>
                    <p class="red">* 충전 수수료는 충전 CM의 10% 입니다.</p>
                </div>
            </div>

        </div>

        <button type="button" :class="['charge_btn', buttonClass]" @change="charge" :disabled="!isChargeable"
            @click="charge">충전하기</button>



    </section>
</template>



<script>

import { useResponseStore } from '@/store/response.js'


export default {

    data() {
        return {
            isOpen: false,
            user_cmp: '',//보유 CMP
            user_cm: '', // 보유 CM
            add_cm: '',//충전할 CM
            all_cm: '',//충전 후 CM
            TPO: window.TPO,
            paymoney: '', // 부가세 포함
            user_index: '',
            user_phone: '',
            surtax: '', //부가세제외
            current_cmp: ''//충전후 CMP
        }
    },
    computed: {
        formattedPayMoney() {
            // paymoney를 3자리마다 콤마로 포맷팅
            return this.paymoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        isChargeable() {
            // add_cm 값이 100,000 이상일 때 true
            return this.add_cm >= 100000;
        },
        buttonClass() {
            // 충전 가능한 상태일 때 버튼 클래스 설정
            return this.isChargeable ? 'charge_btn_enabled' : 'charge_btn_disabled';
        }
    },
    mounted() {

        let store = useResponseStore();
        const formData1 = new FormData();

        formData1.append('type', 'authentication');
        formData1.append('user_id', store.user_id);

        const url = process.env.VUE_APP_API_URL;

        fetch(url + 'api/common/main.php', {
            method: 'POST',
            body: formData1
        })
            .then(response => response.json())
            .then(data => {
                console.log('jsondata???');
                console.log(data.msg);
                let toJson = JSON.parse(data.msg)
                console.log(toJson);
                this.user_cm = toJson.user_cm.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                this.user_cmp = toJson.user_cmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            })

        this.fetchUserData()


        window.addEventListener('message', (e) => {
            let recv;

            // e.data가 문자열인지 객체인지 확인한 후 처리
            if (typeof e.data === 'string') {
                try {
                    recv = JSON.parse(e.data); // 문자열일 경우 JSON으로 파싱
                } catch (error) {
                    console.error('JSON 파싱 오류:', error);
                    return; // 파싱 오류 시 처리 중단
                }
            } else {
                recv = e.data; // 이미 객체인 경우 그대로 사용
            }

            console.log('Received data:', recv);

            // 받은 메시지 데이터에 따라 동작 처리
            if (recv && recv.type === 'PAY_RESULT') {
                this.handlePaymentResult(recv.data);
            }
        });
    },

    methods: {
        async fetchUserData() {
            const formData2 = new FormData();
            formData2.append('type', 'user_get');
            let store = useResponseStore();
            formData2.append('user_index', store.user_index);

            const url = process.env.VUE_APP_API_URL;

            try {
                let response = await fetch(url + 'api/common/user.php', {
                    method: 'POST',
                    body: formData2
                });

                let data = await response.json();

                console.log('fdd', data.msg[0].user_name);
                console.log('dfawefawef', data.msg[0].user_phone);

                this.user_index = data.msg[0].user_name;
                this.user_phone = data.msg[0].user_phone;

            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        },
        handlePinSuccess() {
            console.log('핀번호 성공, 선물하기 호출');
            this.charge(); // PIN 검증 성공 시 charge 함수 호출

            this.isOpen = false; // ConfirmPin 컴포넌트 닫기
        },

        toMain() {
            this.$router.push({ path: '/main' });
        },

        calculate() {
            const userCM = parseInt(this.user_cm.replace(/,/g, ''), 10); // 문자열에서 콤마 제거 후 숫자로 변환
            const userCMP = parseInt(this.user_cmp.replace(/,/g, ''), 10); // CMP도 숫자로 변환
            const addCM = parseInt(this.add_cm, 10) || 0; // 충전할 CM을 숫자로 변환

            // 보유 CM과 충전할 CM 더한 값
            this.all_cm = (userCM + addCM).toLocaleString();

            // 보유 CMP와 충전한 CM을 더한 값 (충전 후 CMP)
            this.current_cmp = (userCMP - addCM).toLocaleString(); // CMP도 더해서 계산

            // 충전 수수료 계산 (충전할 CM의 10%)
            this.paymoney = Math.floor(addCM * 0.1 * 1.1).toLocaleString(); // 부가세 포함
            this.surtax = Math.floor(addCM * 0.1); // 부가세 제외
        },

        charge() {
            if (this.isChargeable) {
                console.log('앵?');
                //timestampSecond = Math.floor(+ new Date() / 1000);
                let store = useResponseStore();
                let tx = store.user_id + Math.floor(+ new Date() / 1000);
                console.log(this.paymoney);
                let result = this.paymoney.replace(/,/g, '');

                if (this.TPO) {
                    this.TPO.pay({
                        amount: parseInt(result), // 충전할 금액
                        publicKey: 'pk_1703-f7d8df-4f6-dff5a',
                        products: [{ name: 'cm', desc: 'description' }],
                        trackId: tx,  // 유저 ID 또는 트랜잭션 ID
                        responseFunction: this.eventFnc,  // 응답 받을 함수
                        redirectUrl: 'https://your-redirect-url.com',
                        webhookUrl: 'https://your-webhook-url.com',
                        tmnId: "cm0000", // 터미널 키
                        payerName: this.user_index,
                        payerEmail: '',
                        payerTel: this.user_phone,
                        mode: 'layer',   // 레이어 모드로 결제 창 표시
                        debugMode: 'live' // 실시간 모드
                    });
                } else {
                    console.error('TPO 객체가 없습니다. ThePayOne API가 로드되지 않았습니다.');
                }
            }

        },


        async eventFnc(data) {
            let json_data = JSON.stringify(data);
            console.log(json_data);

            if (data.result.resultCd == "0000") {

                const formData = new FormData();
                let store = useResponseStore();

                formData.append('type', 'charge')
                formData.append('user_index', store.user_index); // 유저 인덱스
                formData.append('cash', this.surtax); // 결제 금액 (부가세 제외)
                formData.append('amount', this.add_cm); // 충전된 CM 양
                formData.append('data', JSON.stringify(data));

                const url = process.env.VUE_APP_API_URL;
                fetch(url + 'api/store/charge.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.code == 200) {
                            alert('성공!')
                            this.$router.push('/main'); // 메인 페이지로 이동

                        }
                    })
            }

        }
    }

}

</script>

<style scoped>
p {
    margin: 0;
}

.show {
    display: flex;
    flex-direction: column;
    padding: 15px;
    border: 1px solid #1bce0b;
    border-radius: 5px;
}

.show p:nth-of-type(2),
.show p:nth-of-type(3) {
    align-self: flex-end;
    /* 개별 요소를 flex-end로 정렬 */
}


.red {
    color: red;
    text-align: end;
    font-size: small;
}


.title {
    font-weight: 500;
    margin: 10px 0px;
}

.input_design {
    width: 100%;
    padding: 10px;
    /* 이미지 공간을 확보하기 위해 padding 추가 */
    border: 1px solid #b1b1b1;
    border-radius: 5px;
}


.send {
    text-align: right;
    /* 기본은 오른쪽 정렬 */
}

.send:focus {
    text-align: left;
}

.cm_fee {
    display: flex;

}

.cm_fee div {
    width: 100%;
    text-align: end;
}

.charge_money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}

.charge_btn {
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 40px;
    background-color: transparent;
    color: #b1b1b1;
    /* background-color: #1bce0b; */
    border: 1px solid #b1b1b1;
    border-radius: 10px;
}


.charge_btn_enabled {
    background-color: #1bce0b;
    color: white;
    border: 1px solid #1bce0b;
    cursor: pointer;
}
</style>