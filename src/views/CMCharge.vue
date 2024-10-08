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
                  <p>{{this.user_cmp}}<span>CMP</span></p>
                  <p>{{this.user_cm}}<span>CM</span></p>
            </div>

        <!-- 충전할CM -->
        <p class="title">충전 할 CM</p>
        <div class="cm_charging">
            <input id="user_search" name="user_search" v-model="add_cm" @input="calculate" value="" type="number" class="send input_design" placeholder="금액을 입력하세요.">
            <p class="red">* 최소 충전 금액은 100,000 CM 입니다.</p>
        </div>

        <!-- 충전후CM -->
        <p class="title">충전 후 CM</p>
        <div class="cm_charged show">
            <p class="gray">보유 자산</p>
            <p>{{this.user_cmp}}<span>CMP</span></p>
            <p>{{this.all_cm}}<span>CM</span></p>
        </div>
        <!-- 충전수수료 -->
        
        <p class="title">충전 수수료
            <!-- <small>부가세 포함 금액</small> -->
        </p>
        <div class="cm_fee">
            <div>
                <p>{{this.surtax}}원</p>
                <p class="red">* 충전 수수료는 충전 CM의 10% 입니다.</p>
            </div>
        </div>
        
        <button type="button" class="charge_btn" @click="charge()">충전하기</button>
            
         </section>
      
    <Footer />
</template>



<script>

import { useResponseStore } from '@/store/response.js'
import Footer from '@/components/FooterPage.vue'


export default {
    components : {
        Footer,
    },
    data() {
        return {
            user_cmp:'',//보유 CMP
            user_cm:'', // 보유 CM
            add_cm:'',//충전할 CM
            all_cm:'',//충전 후 CM
            TPO: window.TPO,
            surtax:'', //부가세
            paymoney:'', // 부가세 포함
            user_index:'',
            user_phone:''
        }
    },
    mounted() {
       // var tag = document.createElement('script');
       // tag.src = "https://api.thepayone.com/js/clientside.js";
        
        let store = useResponseStore();
         const formData1 = new FormData();

         formData1.append('type', 'authentication');
         formData1.append('user_id', store.user_id);

         const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/common/main.php', {
            method : 'POST',
            body : formData1
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

         const formData2 = new FormData();

         formData2.append('type','user_get');
         formData2.append('user_index',store.user_index);

        fetch(url+'api/common/user.php',{
            method:'POST',
            body:formData2
        })
        .then(response => response.json())
        .then(data => {
            console.log('fdd',data.msg[0].user_name);
            this.user_index = data.msg[0].user_name
            this.user_phone = data.msg[0].user_phone
        })
         
            

    // ThePayOne에서 전달받는 메시지를 처리하기 위해 message 이벤트 리스너를 추가
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
            // const script = document.createElement('script');
            // script.src = "https://api.thepayone.com/js/clientside.js";
            // script.onload = () => {
            // // 스크립트가 로드되면 TPO 객체를 사용할 수 있음
            // console.log('ThePayOne API 로드 성공');
            // };
            // script.onerror = () => {
            // console.error('ThePayOne API 로드 실패');
            // };
            // document.head.appendChild(script);


    },


    methods : {

        handlePaymentResult(paymentData) {
        // 결제 결과에 대한 처리 로직
        console.log('결제 결과:', paymentData);

        if (paymentData.success) {
            alert('결제가 성공적으로 완료되었습니다.');
        } else {
            alert('결제가 실패했습니다.');
        }
    },
        toMain() {
            this.$router.push({ path : '/main' });
        },
        
        calculate(){

        const userCM = parseInt(this.user_cm.replace(/,/g, '')); // 문자열에서 콤마 제거 후 숫자로 변환
        // const sendCM = parseInt(this.send_cm) || 0; // 보내는 CM도 숫자로 변환


        this.all_cm = (userCM+this.add_cm).toLocaleString();
        this.paymoney = Math.floor(this.add_cm* 0.1 * 1.1) // 충전 수수료 계산 (10%)
        this.surtax = Math.floor(this.add_cm * 0.1); 
        },

        charge() {
            console.log('앵?');
            //timestampSecond = Math.floor(+ new Date() / 1000);
            let store = useResponseStore();
            let tx = store.user_id + Math.floor(+ new Date() / 1000);

            if (this.TPO) {
                this.TPO.pay({
                    amount: parseInt(this.paymoney), // 충전할 금액
                    publicKey: 'pk_1703-f7d8df-4f6-dff5a',
                    products: [{ name: 'cm', desc: 'description' }],
                    trackId: tx,  // 유저 ID 또는 트랜잭션 ID
                    responseFunction: this.eventFnc,  // 응답 받을 함수
                    redirectUrl: 'https://your-redirect-url.com',
                    webhookUrl: 'https://your-webhook-url.com',
                    tmnId: "cm0000", // 터미널 키
                    payerName: '',
                    payerEmail: '',
                    payerTel: '',
                    mode: 'layer',   // 레이어 모드로 결제 창 표시
                    debugMode: 'live' // 실시간 모드
                });
            } else {
                console.error('TPO 객체가 없습니다. ThePayOne API가 로드되지 않았습니다.');
            }
            
          // ThePayOne 스크립트를 로드
          //this.$loadScript('https://api.thepayone.com/js/clientside.js')
            // .then(() => {
            //     // TPO 객체가 로드된 후에 호출 가능
                
            //     // 결제 API 호출
            //     this.TPO.pay({
            //         amount: parseInt(this.add_cm), // 충전할 금액
            //         publicKey: 'pk_1703-f7d8df-4f6-dff5a',
            //         products: [{ name: 'CM 충전', desc: 'CM 충전 상품 설명' }],
            //         trackId: 'tx123',  // 유저 ID 또는 트랜잭션 ID
            //         responseFunction: this.eventFnc,  // 응답 받을 함수
            //         redirectUrl: 'https://your-redirect-url.com',
            //         webhookUrl: 'https://your-webhook-url.com',
            //         tmnId: "cm0000", // 터미널 키
            //         payerName: '사용자 이름',
            //         payerEmail: '사용자 이메일',
            //         payerTel: '사용자 전화번호',
            //         mode: 'layer',   // 레이어 모드로 결제 창 표시
            //         debugMode: 'live' // 실시간 모드
            //     });
            // })
            // .catch(() => {
            //     console.error('ThePayOne 스크립트 로드 실패');
            // });
            // if (this.TPO) {
            //     this.TPO.pay({
            //         amount: parseInt(this.add_cm), // 충전할 금액
            //         publicKey: 'pk_1703-f7d8df-4f6-dff5a',
            //         products: [{ name: 'CM 충전', desc: 'CM 충전 상품 설명' }],
            //         trackId: 'tx123',  // 유저 ID 또는 트랜잭션 ID
            //         responseFunction: this.eventFnc,  // 응답 받을 함수
            //         redirectUrl: 'https://your-redirect-url.com',
            //         webhookUrl: 'https://your-webhook-url.com',
            //         tmnId: "cm0000", // 터미널 키
            //         payerName: '사용자 이름',
            //         payerEmail: '사용자 이메일',
            //         payerTel: '사용자 전화번호',
            //         mode: 'layer',   // 레이어 모드로 결제 창 표시
            //         debugMode: 'live' // 실시간 모드
            //     });
            // } else {
            //     console.error('TPO 객체가 없습니다. ThePayOne API가 로드되지 않았습니다.');
            // }
        }
    }

}

</script>

<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    color: #000;
    font-family: "Noto Sans KR", sans-serif;
}


.charge_gift_title{
   display: flex;
   align-items: center;
   justify-content: center; /* 가운데 정렬 */
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

.charge_gift_title > a {
   position: absolute; /* 왼쪽 버튼을 절대 위치로 */
   left: 10px; /* 왼쪽으로부터의 거리 */
   top: 50%; /* 세로 가운데 정렬 */
   transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.charge_gift_title > h3 {
   margin: 0;
   text-align: center; /* 텍스트 가운데 정렬 */
   color: #1749C2;
   font-weight: 900;
}

.charge_area{
    width: 95%;
    margin: 100px auto 0;
}

.show{
    display: flex;
    flex-direction: column;
    padding: 15px;
    border: 1px solid #1bce0b;
    border-radius: 5px;
}

.show p:nth-of-type(2),
.show p:nth-of-type(3) {
  align-self: flex-end; /* 개별 요소를 flex-end로 정렬 */
}


.red{
   color: red;
   text-align: end;
   font-size: small;
}


.title{
   font-weight: 500;
   margin: 10px 0px;
}

.input_design {
    width: 100%;
    padding: 10px; /* 이미지 공간을 확보하기 위해 padding 추가 */
    border: 1px solid #b1b1b1;
    border-radius: 5px;
}


.send {
  text-align: right; /* 기본은 오른쪽 정렬 */
}

.send:focus{
   text-align: left;
}

/* //// */
.cm_fee{
    display: flex;

}

.cm_fee div{
    width: 100%;
    text-align: end;
}
.charge_btn {
    position: fixed;
    bottom: 60px; left: 50%;
    transform: translateX(-50%);
    width: 95%; height: 40px;
    background-color: #1bce0b;
    border: none;
    color: #fff;
    border-radius: 10px;
}
</style>