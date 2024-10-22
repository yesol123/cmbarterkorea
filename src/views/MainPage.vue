<template>
    <div class="main_header" :style="{ backgroundColor: backColor }">
        <div class="header_center">
            <div class="main_logo">
                <img src="@/assets/mypage.png">
                <p v-if="this.member === '1'">일반</p>
                <p v-else-if="this.member === '2'">사업자</p>
                <p v-else-if="this.member === '3'">가맹점</p>
            </div>
            <div>
                <h1 style="font-size: 1.3rem; color: #fff;">씨엠바더</h1>
            </div>
            <div @click="logout()">
                <img src="@/assets/logout.png">
            </div>
        </div>
    </div>

    <div class="main_content">
        <div class="pay_content" :style="{ backgroundColor: backColor }">
            <div class="pay_center">
                <div class="pay_area" :style="{ backgroundColor: backColor }" @click="toPayment()">
                    <p v-if="this.member === '1'">{{ user_cm }} CM</p>
                    <p v-if="this.member === '2'" style="margin: 10px 0;">{{ user_cm }} CM</p>
                    <p v-if="this.member === '3'" style="color: pink;">{{ user_cmp }} CMP</p>

                    <p v-if="this.member === '1'">보유쿠폰 <span>{{ coupon_count }}</span>장</p>
                    <!-- <p v-if="this.member === '2'">보유쿠폰 <span>{{ coupon_count }}</span>장</p> -->
                    <p v-if="this.member === '3'" style="font-size: 1.5rem; color: yellow;">{{ user_cm }} CM</p>

                    <p >여기를 탭하여 결제하세요.</p>
                </div>
                <div class="pay_btn">
                    <button type="button" @click="toCMList()">CM내역</button>
                    <button type="button" v-if="this.member === '3'" @click="QrScan()">QR결제</button>
                    <button type="button" v-if="this.member != '3'" @click="CouponBox()">쿠폰함</button>
                    <button type="button" v-if="this.member === '3'" @click="toCouponMake()">쿠폰발행함</button>
                </div>
            </div>
        </div>

        <div class="commercial">
            <div class="slide_group">
                <img :src="currentBanner">
            </div>
        </div>
        <div class="icons">
            <div class="icon" v-if="this.member != '2'" @click="toEvent()">
                <img src="@/assets/coupon_icon.svg">
                <p>쿠폰이벤트</p>
            </div>
            <div class="icon" v-if="this.member != '2'" @click="goGame()">
                <img src="@/assets/roulette_icon.svg">
                <p>CM게임 보상</p>
            </div>
            <div class="icon" v-if="this.member == '3'" @click="toCMCharge()">
                <img src="@/assets/charge_icon.svg">
                <p>CM충전</p>
            </div>
            <div class="icon" v-if="this.member == '1'" @click="toShopIn()">
                <img src="@/assets/application.png">
                <p>가맹점신청</p>
            </div>
            <div class="icon" v-if="this.member == '2'">
                <img src="@/assets/gift.png">
                <p>중개수수료</p>
            </div>
            <div class="icon" v-if="this.member == '2'">
                <img src="@/assets/gift.png">
                <p>산하 사업자</p>
            </div>
            <div class="icon" v-if="this.member == '2'">
                <img src="@/assets/gift.png">
                <p>산하 가맹점</p>
            </div>
            <div class="icon" @click="goHomePage()">
                <img src="@/assets/homepage_icon.svg">
                <p>홈페이지</p>
            </div>
            <div class="icon" v-if="this.member == '3'" @click="gomangestore()">
                <img src="@/assets/store_icon.svg">
                <p>매장관리</p>
            </div>
            <div class="icon" v-if="this.member == '3'" @click="gocustomer()">
                <img src="@/assets/management_icon.svg">
                <p>고객관리</p>
            </div>
            <div class="icon">
                <img src="@/assets/kakao_icon.svg">
                <p>카톡상담</p>
            </div>
            <div class="icon">
                <img src="@/assets/shoppingmall_icon.svg">
                <p>쇼핑몰</p>
            </div>
        </div>
        <div class="commercial">
            <div class="slide_group">
                <img :src="currentAd">
            </div>
        </div>
    </div>

    <div v-if="showModal" class="modal">
        <p class="caution">CM게임 보상</p>
        <p>닉네임 입력</p>
        <input type="text" v-model="nickname" placeholder="닉네임을 입력해주세요.">
        <button @click="confirm">확인</button>
    </div>

    <div v-if="showModal2" class="modal">
        <p class="caution">{{ this.error_massage }}</p>
        <button @click="confirm2">확인</button>
    </div>


    <Payment ref="payment" />

    <!-- <Footer /> -->
</template>

<script>
//import Footer from '@/components/FooterPage.vue'
import { useResponseStore } from '@/store/response.js'
import Payment from '@/components/PopCoupon.vue'

export default {
    components: {
        Payment,
        //Footer,
    },
    data() {
        return {
            member: '',
            user_cmp: '',
            user_cm: '',
            coupon_count: '',
            bannerImg: [],
            bannerIndex: 0,
            timeOne: null,
            adImg: [],
            adIndex: 0,
            timeTwo: null,
            nickname:'',
            showModal: false,
            showModal2:false,
            error_massage:''
        }
    },
    mounted() {
        let store = useResponseStore();
        this.member = store.member;

        // 일반, 사업자, 가맹점 별 데이터 바인딩
        this.MainList();
        // 배너 슬라이드
        this.bannerSliding();
        // 광고 슬라이드
        this.adSliding();
    },
    methods: {
        MainList() {

            let store = useResponseStore();
            const formData = new FormData();

            formData.append('type', 'authentication');
            formData.append('user_id', store.user_id);

            const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/common/main.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('jsondata???');
                console.log(data);

                let toJson = JSON.parse(data.msg);
                console.log(toJson);

                // 유저CMP (null 걸러주기)
                this.user_cmp = (toJson.user_cmp ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                // 유저CM
                this.user_cm = (toJson.user_cm ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                this.user_cm = (toJson.user_cm ?? null).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                store.cm_amount = toJson.user_cm;
                store.cmp_amount = toJson.user_cmp;

                // 쿠폰갯수
                this.coupon_count = toJson.coupon_count;
            })

            this.getBanner();
            this.getAd();

        },
        bannerSliding() {
            this.timeOne = setInterval(() => {
                this.bannerIndex = (this.bannerIndex + 1) % this.bannerImg.length;
            }, 3000);
        },
        adSliding() {
            this.timeTwo = setInterval(() => {
                this.adIndex = (this.adIndex + 1) % this.adImg.length;
            }, 3000);
        },
        // 배너 이미지 불러오기
        getBanner() {

            const formData = new FormData();
            formData.append('type', 'banner_get');

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/common/main.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let toJson = JSON.parse(data.msg);
                console.log(toJson);

                for (var i in toJson) {
                    console.log(11111111);
                    console.log(toJson[i]);
                    this.bannerImg.push(toJson[i]);
                }
            })

        },
        // 광고 이미지 불러오기
        getAd() {

            const formData = new FormData();
            formData.append('type', 'advertisement_get');

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/common/main.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let toJson = JSON.parse(data.msg);
                console.log(toJson);

                for (var i in toJson) {
                    console.log(100000000);
                    console.log(toJson[i]);
                    this.adImg.push(toJson[i]);
                }
            })

        },
        // 결제 페이지로 이동
        toPayment() {
            // console.log(4444);

            this.$refs.payment.openpopup();
        },
        // QR결제 페이지로 이동
        QrScan() {
            this.$router.push({ path: '/qrscan' });
        },
        goHomePage() {
            window.open('https://www.cmbarter.co.kr/default/main/main.php', '_blank')
        },
        // CM내역으로 이동
        toCMList() {
            this.$router.push({ path: '/cmlist' });
        },
        CouponBox() {
            this.$router.push({ path: '/couponbox' });
        },
        // 쿠폰발행함으로 이동
        toCouponMake() {
            this.$router.push({ path: '/cmake' });
        },
        toCMCharge() {
            this.$router.push({ path: '/charge' });
        },
        gocustomer() {
            this.$router.push({ path: '/CustomerManagement' })
        },
        // 메인 쿠폰이벤트 이동
        toEvent() {
            this.$router.push({ path: '/event' });
        },
        toShopIn() {
            this.$router.push({ path: '/shopin' });
        },
        gomangestore() {
            this.$router.push({ path: '/storeInformation' })
        },
        gomanagecustomer() {
            this.$router.push({ path: '/couponbox' })

        },
        goGame() {
            this.showModal = true
        },
        //cm게임보상 닉네임 입력 모달
        confirm() {
            //this.showModal = false
            let store = useResponseStore();


        const formData = new FormData();
        formData.append('type', 'roulette_take')
        formData.append('user_index', store.user_index)
        formData.append('nickname ',this.nickname)

        const url = process.env.VUE_APP_API_URL;
            
        fetch(url + 'api/coupon/coupon_event.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data=>{
            console.log(data);
            if(data.code == '404'){
                this.showModal = false
                this.showModal2 = true
                 this.error_massage = data.msg;
            }
            
        })

        },

        confirm2(){
            window.location.href = "https://cmbarter.com/mobile/game_init.php";
        },

        // 로그아웃
        logout() {
            // localStorage.setItem('response', null);
            localStorage.removeItem('response');

            let store = useResponseStore();
            const formData = new FormData();
            formData.append('type', 'logout');
            formData.append('user_index', store.user_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('로그아웃되었음');
                console.log(data);
            })

            this.$router.push({ path: '/' });
        }
    },
    computed: {
        // 회원별 색상 바꿔주기
        backColor() {
            return (this.member === '1') ? 'rgb(9, 9, 116)'
                : (this.member === '2') ? '#0A6847'
                    : (this.member === '3') ? '#E4003A'
                        : '#ccc'
        },
        // 메인배너
        currentBanner() {
            return this.bannerImg[this.bannerIndex];
        },
        // 메인광고
        currentAd() {
            return this.adImg[this.adIndex];
        },

    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 1rem;
    text-decoration: none;
    color: #000;
}

.main_header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    /* background-color: rgb(9, 9, 116); */
    /* border: 1px solid red; */
}

.header_center {
    display: flex;
    justify-content: space-between;
    width: inherit;
    height: inherit;
}

.header_center>div {
    width: 90px;
    text-align: center;
    padding-top: 10px;
    /* border: 1px solid blue; */
}

.header_center>div:nth-of-type(2) {
    padding-top: 20px;
}

.header_center>div:nth-of-type(3) {
    padding-top: 18px;
}

img {
    width: 30px;
}

.main_logo>p {
    color: #fff;
    font-size: small;
}

.main_content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin: 70px 0;
}

.pay_content {
    width: 100%;
    height: 200px;
    /* border: 2px solid blue; */
    /* background-color: rgb(9, 9, 116); */
}

.pay_center {
    padding: 20px;
    /* border: 1px solid orange; */
}

.pay_area {
    /* background-color: rgb(9, 9, 116); */
    text-align: center;
    border-radius: 10px;
    border: 3px solid #fff;
    padding: 5px;
}

.pay_area>p {
    font-weight: bold;
    font-size: 1.2rem;
    color: #fff;
}

.pay_area span {
    font-size: 1.5rem;
    color: yellow;
}

.pay_area>p:nth-of-type(1) {
    font-size: 1.5rem;
    color: yellow;
}

.pay_area>p:nth-of-type(3) {
    margin-top: 5px;
    font-size: 0.9rem;
}

.pay_btn {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    /* border: 1px solid orange; */
}

button {
    width: 32%;
    height: 30px;
    background-color: #fff;
    color: rgb(9, 9, 116);
    font-weight: bold;
    font-size: 0.9rem;
    border-radius: 10px;
    border: none;
}

.commercial {
    width: 90%;
    height: 200px;
    margin: 20px auto;
    background-color: #fff;
    border: 1px solid #ccc;
}

.slide_group {
    width: 100%;
    height: 100%;
}

.slide_group>img {
    display: block;
    width: 100%;
    height: 100%;
}

.icons {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 20px auto;
    padding: 10px;
    /* border: 1px solid red; */
}

.icon {
    width: 33%;
    padding: 8px;
    text-align: center;
    /* border: 1px solid red; */
}

.icon>img {
    width: 40px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

.caution {
    margin-bottom: 10px;
    font-weight: bold;
}
.modal input{
    border: 1px solid #b1b1b1;
    border-radius: 5px;
    padding: 5px;

}

.modal button {
    display: flex;
    justify-content: center; /* 이미지와 텍스트를 가로로 중앙 정렬 */
    align-items: center; /* 이미지와 텍스트를 세로로 중앙 정렬 */
    margin: 10px 0;
    padding: 10px 15px;
    background-color: #1749c2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
</style>