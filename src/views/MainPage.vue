<template>


    <div class="main_header">
        <div class="header_center">
            <div class="main_logo">
                <div class="img_contain">
                    <svg width="35" height="35" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="17" r="5" :stroke="fontColor" stroke-width="3" />
                        <path d="M19.5 27H28.5C33.1944 27 37 30.8056 37 35.5V37H11V35.5C11 30.8056 14.8056 27 19.5 27Z"
                            :stroke="fontColor" stroke-width="3" />
                    </svg>
                </div>


                <p v-if="this.member === '1'" :style="{ color: fontColor }">일반</p>
                <p v-else-if="this.member === '2'" :style="{ color: fontColor }">사업자</p>
                <p v-else-if="this.member === '3'" :style="{ color: fontColor }">가맹점</p>
                <p v-else-if="this.member === '6'" :style="{ color: fontColor }">서브계정</p>
            </div>
            <div>
                <h3 :style="{ color: fontColor }">씨엠바더</h3>
            </div>
            <div class="logout" @click="logout()">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <path
                        d="M24.6316 12H13C12.4477 12 12 12.4477 12 13V35C12 35.5523 12.4477 36 13 36H24.6316M20.8421 24.6316H36M36 24.6316L29.6842 18.3158M36 24.6316L29.6842 30.9474"
                        :stroke="fontColor" stroke-width="3" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </div>

  

    <div class="main_content">
        <div class="pay_content" :style="{ backgroundColor: backColor }">
            <div class="pay_center"
                :style="{ borderTop: `3px solid ${borderColor}`, borderBottom: `3px solid ${borderColor} ` }">
                <div class="pay_area" v-bind:style="[subAccountStlye, { backgroundColor: backColor }]"
                    @click="toPayment()">
                    <p v-if="this.member === '1'">{{ user_cm }} CM</p>
                    <p v-if="this.member === '2'" style="margin: 10px 0;">{{ user_cm }} CM</p>
                    <p v-if="this.member === '3'" style="color: pink;">{{ user_cmp }} CMP</p>

                    <p v-if="this.member === '6'" style="color: pink;"> {{ user_cmp }}CMP</p>

                    <p v-if="this.member === '1'">보유쿠폰 <span>{{ coupon_count }}</span>장</p>
                    <!-- <p v-if="this.member === '2'">보유쿠폰 <span>{{ coupon_count }}</span>장</p> -->
                    <p v-if="this.member === '3'" style="font-size: 1.5rem; color: yellow;">{{
                        user_cm }} CM</p>
                    <p v-if="this.member === '6'" style="font-size: 1.5rem; color: yellow;">{{ user_cm }} CM</p>

                    <p>여기를 탭하여 결제하세요.</p>
                </div>
                <div class="pay_btn">
                    <button :style="{ color: fontColor }" type="button" @click="toCMList()">CM내역</button>
                    <button :style="{ color: fontColor }" type="button"
                        v-if="this.member === '3' || this.member === '6'" @click="QrScan()">QR결제</button>
                    <button :style="{ color: fontColor }" type="button" v-if="this.member != '3' && this.member != '6'"
                        @click="CouponBox()">쿠폰함</button>
                    <button :style="{ color: fontColor }" type="button" v-if="this.member === '3'"
                        @click="toCouponMake()">쿠폰발행함</button>
                </div>
            </div>
        </div>

        <div class="commercial">
            <div class="slide_group">
                <img :src="currentBanner">
            </div>
        </div>
        <div class="icons">
            <div class="icon" :style="subAccountStlye" v-if="this.member != '2'" @click="toEvent()">
                <img src="@/assets/common_couponEvent.png">
                <p>쿠폰이벤트</p>
            </div>
            <div class="icon" :style="subAccountStlye" v-if="this.member != '2'" @click="goGame()">
                <img src="@/assets/common_cmgame.png">
                <p>CM게임보상</p>
            </div>
            <div class="icon" :style="subAccountStlye" v-if="this.member == '3' || this.member === '6'"
                @click="toCMCharge()">
                <img src="@/assets/cm_charge.png">
                <p>CM충전</p>
            </div>
            <div class="icon" v-if="this.member == '1'" @click="toShopIn()">
                <img src="@/assets/normal_application.png">
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
                <img src="@/assets/common_CMHomepage.png">
                <p>홈페이지</p>
            </div>
            <div class="icon" :style="subAccountStlye" v-if="this.member == '3' || this.member === '6'"
                @click="gomangestore()">
                <img src="@/assets/store_manage.png">
                <p>매장관리</p>
            </div>
            <div class="icon" :style="subAccountStlye" v-if="this.member == '3' || this.member === '6'"
                @click="gocustomer()">
                <img src="@/assets/customer_manage.png">
                <p>고객관리</p>
            </div>
            <div class="icon" :style="subAccountStlye" @click="gokakao()">
                <img src="@/assets/common_kakao.png">
                <p>카톡상담</p>
            </div>
            <div class="icon" v-if="this.member == '1'">
                <img src="@/assets/common_shoppingmall.png">
                <p>쇼핑몰</p>
            </div>
        </div>
        <div class="commercial">
            <div class="slide_group">
                <img :src="currentAd">
            </div>
        </div>
    </div>

    <!-- CM게임 팝업 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
            <p class="caution">CM게임 보상</p>
            <p>닉네임 입력</p>
            <input type="text" v-model="nickname" placeholder="닉네임을 입력해주세요.">
            <button @click="confirm">확인</button>
        </div>
    </div>

     <!-- CM게임 팝업 에러 모달 -->
    <div v-if="showModal2" class="modal">
        <p class="caution">{{ this.error_massage }}</p>
        <button @click="confirm2">확인</button>
    </div>


    <Payment ref="payment" />

</template>

<script>
import { useResponseStore } from '@/store/response.js'
import Payment from '@/components/PopCoupon.vue'

export default {
    components: {
        Payment,
    },
    data() {
        return {
            member: '',
            main_index: '',
            user_cmp: '',
            user_cm: '',
            main_user_cm: '',  // 메인 계정 CM
            main_user_cmp: '', // 메인 계정 CMP
            coupon_count: '',
            bannerImg: [],
            bannerIndex: 0,
            timeOne: null,
            adImg: [],
            adIndex: 0,
            timeTwo: null,
            nickname: '',
            showModal: false,
            showModal2: false,
            error_massage: '',

        }
    },

    mounted() {
        this.adjustMainContentPadding();
        window.addEventListener('resize', this.adjustMainContentPadding);



        let store = useResponseStore();
        this.member = store.member;
        const mainUserIndex = sessionStorage.getItem('store_main_user_index');

        console.log('mainUserIndex', mainUserIndex);
        this.main_index = mainUserIndex

        if (this.member === '6') {
            // 서브 계정일 때 메인 계정의 CM, CMP 데이터를 가져옴
            this.fetchMainAccountData(mainUserIndex);
        }

        // 일반, 사업자, 가맹점 별 데이터 바인딩
        this.MainList();
        // 배너 슬라이드
        this.bannerSliding();
        // 광고 슬라이드
        this.adSliding();
    },
    beforeUnmount() {
    window.removeEventListener('resize', this.adjustMainContentPadding);
},


    methods: {
        adjustMainContentPadding() {
        const header = document.querySelector('.main_header');
        const mainContent = document.querySelector('.main_content');

        if (header && mainContent) {
            const headerHeight = header.offsetHeight;
            mainContent.style.paddingTop = `${headerHeight}px`;
        }
    },

        fetchMainAccountData(mainUserIndex) {

            const formData = new FormData();
            formData.append('type', 'user_info');
            formData.append('user_index', mainUserIndex);


            const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/common/main.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    console.log('메인 계정 데이터 가져오기 성공:', result); // 추가된 콘솔 로그
                    let toJson = JSON.parse(result.msg);
                    // 메인 계정의 CM, CMP 값을 저장
                    this.main_user_cm = (toJson.user_cm ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    this.main_user_cmp = (toJson.user_cmp ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                })
        },

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
            if (this.member !== '6') {
                this.$refs.payment.openpopup();
            }

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
        closeModal() {
            this.showModal = false; // 모달 닫기
        },
        //cm게임보상 닉네임 입력 모달
        confirm() {
            //this.showModal = false
            let store = useResponseStore();


            const formData = new FormData();
            formData.append('type', 'roulette_take')
            formData.append('user_index', store.user_index)
            formData.append('nickname ', this.nickname)

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_event.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.code == '404') {
                        this.showModal = false
                        this.showModal2 = true
                        this.error_massage = data.msg;
                    }

                })

        },

        confirm2() {
            window.location.href = "https://cmbarter.com/mobile/game_init.php";
        },

        gokakao(){
            window.location.href = "http://pf.kakao.com/_zFjGG/chat";
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
        subAccountStlye() {
            return this.member === '6'
                ? { pointerEvents: 'none', opacity: '0.5' } // 클릭 비활성화 + 시각적 효과
                : {}; // 기본 스타일 유지
        },
        // 회원별 색상 바꿔주기
        backColor() {
            return (this.member === '1') ? '#589CF6'
                : (this.member === '2') ? '#0A6847'
                    : (this.member === '3' || this.member === '6') ? '#F05F5F'
                        : '#ccc'
        },
        //회원별 색상 바꿔주기2
        borderColor() {
            return (this.member === '1') ? '#598ACB'
                : (this.member === '2') ? '#5BA349'
                    : (this.member === '3' || this.member === '6') ? '#C06363'
                        : '#ccc'
        },
        //회원별 색상 바꿔주기3 
        fontColor() {
            return (this.member === '1') ? '#2868BD'
                : (this.member === '2') ? '#1D8521'
                    : (this.member === '3' || this.member === '6') ? '#D23C3C'
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


.main_header {
    position: fixed;
    background: white;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99999;
}

.header_center {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.header_center>div {
    width: 20%;
    text-align: center;
}


.main_logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


.main_content {
    padding-bottom: 60px;
    width: 100%;
}

.pay_content {
    width: 100%;
}

.pay_center {
    padding: 20px;
}

.pay_area {
    text-align: center;
    border-radius: 10px;
    border: 3px solid #fff;
    padding: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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


.pay_btn>button {
    width: 32%;
    height: 30px;
    background-color: #fff;
    color: rgb(9, 9, 116);
    font-weight: bold;
    font-size: 0.9rem;
    border-radius: 10px;
    border: none;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
}

.icon {
    width: 33%;
    padding: 15px;
    text-align: center;
}

.icon>img {
    width: 50%;
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

.modal input {
    border: 1px solid #b1b1b1;
    border-radius: 5px;
    padding: 5px;

}

.modal button {
    display: flex;
    justify-content: center;
    /* 이미지와 텍스트를 가로로 중앙 정렬 */
    align-items: center;
    /* 이미지와 텍스트를 세로로 중앙 정렬 */
    margin: 10px 0;
    padding: 10px 15px;
    background-color: #1749c2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16p
}

.img_contain {
    display: flex;
}



@media (prefers-color-scheme: dark) {
    .main_header{
        background: rgba(22, 21, 27, 1);
    }
    .header_center div >h3{
        opacity: 0.8; 
    }
    .logout > svg{
        opacity: 0.7;
    }
    .main_logo > p {
        opacity: 0.8; 
    }
    .img_contain > svg{
        opacity: 0.7; 
    }
    .pay_center {
        background-color: rgba(40, 38, 44, 1);
    }
    .pay_center > .pay_area{
       opacity: 0.8;

    }

    .pay_btn > button{
        background: rgba(255, 255, 255, 0.08);
        opacity: 0.9;
    }
    label{
        color: rgba(255, 255, 255, 0.87);
    }
    button{
        color: rgba(255, 255, 255, 0.87);
    }
    .popup-content{

        background:  rgba(39, 38, 44, 1);
    }

}
</style>