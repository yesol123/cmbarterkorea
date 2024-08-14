<template>
    <div class="main_header" :style="{backgroundColor : backColor}">
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
            <div>
                <img src="@/assets/settings.png">
            </div>
        </div>
    </div>

    <div class="main_content">
        <div class="pay_content" :style="{backgroundColor : backColor}">
            <div class="pay_center">
                <div class="pay_area" :style="{backgroundColor : backColor}">
                    <p v-if="this.member === '1'">{{ user_cm }} CM</p>
                    <p v-if="this.member === '2'">20,000 CM</p>
                    <p v-if="this.member === '3'" style="color: pink;">{{ user_cmp }} CMP</p>

                    <p v-if="this.member === '1'">보유쿠폰 <span>{{ coupon_count }}</span>장</p>
                    <p v-if="this.member === '2'">보유쿠폰 <span>5</span>장</p>
                    <p v-if="this.member === '3'" style="font-size: 1.5rem; color: yellow;">{{ user_cm }} CM</p>
                    
                    <p>여기를 탭하여 결제하세요.</p>
                </div>
                <div class="pay_btn">
                    <button type="button">CM내역</button>
                    <button type="button">쿠폰함</button>
                </div>
            </div>
        </div>

        <div class="commercial">
            <div class="slide_group">
                <img :src="currentBanner">
            </div>
        </div>
        <div class="icons">
            <div class="icon">
                <img src="@/assets/gift.png">
                <p>쿠폰이벤트</p>
            </div>
            <div class="icon">
                <img src="@/assets/gift.png">
                <p>CM라이프</p>
            </div>
            <div class="icon" v-if="this.member == '3'">
                <img src="@/assets/gift.png">
                <p>CM충전</p>
            </div>
            <div class="icon" v-if="this.member == '1'">
                <img src="@/assets/gift.png">
                <p>가맹점신청</p>
            </div>
            <div class="icon">
                <img src="@/assets/gift.png">
                <p>홈페이지</p>
            </div>
            <div class="icon" v-if="this.member == '3'">
                <img src="@/assets/gift.png">
                <p>매장관리</p>
            </div>
            <div class="icon" v-if="this.member == '3'">
                <img src="@/assets/gift.png">
                <p>고객관리</p>
            </div>
            <div class="icon">
                <img src="@/assets/gift.png">
                <p>카카오 상담</p>
            </div>
            <div class="icon" v-if="this.member == '3'">
                <img src="@/assets/gift.png">
                <p>이벤트등록</p>
            </div>
        </div>
        <div class="commercial">
            <div class="slide_group">
                <img :src="currentAd">
            </div>
        </div>
    </div>


    <Footer />
</template>

<script>
import Footer from '@/components/FooterPage.vue'
import { useResponseStore } from '@/store/response.js'

export default {
    components : {
        Footer,
    },
    data() {
        return {
            member : '',
            user_cmp : '',
            user_cm : '',
            coupon_count : '',
            bannerImg : [],
            bannerIndex : 0,
            timeOne: null,
            adImg : [],
            adIndex : 0,
            timeTwo: null
        }
    },
    mounted() {
        let store = useResponseStore();
        this.member = store.member;

        // 일반, 사업자, 가맹점 별 데이터 바인딩
        this.MainList();
        this.bannerSliding();
        this.adSliding();
    },
    methods : {
        MainList() {

            let store = useResponseStore();
            const formData = new FormData();

            formData.append('type', 'authentication');
            formData.append('user_id', store.user_id);

            fetch('https://cmbarter.com/api/common/main.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let toJson = JSON.parse(data.msg);
                console.log(toJson);

                // 유저CMP (null 걸러주기)
                this.user_cmp = (toJson.user_cmp ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                
                // 유저CM
                this.user_cm = (toJson.user_cm ?? '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                // 쿠폰갯수
                this.coupon_count = toJson.coupon_count;
            })

            this.getBanner();
            this.getAd();

        },
        bannerSliding() {
            this.timeOne = setInterval(() => {
                this.bannerIndex = (this.bannerIndex + 1) % this.bannerImg.length;
            },3000);
        },
        adSliding() {
            this.timeTwo = setInterval(() => {
                this.adIndex = (this.adIndex + 1) % this.adImg.length;
            },3000);
        },
        // 배너 이미지 불러오기
        getBanner() {

            const formData = new FormData();
            formData.append('type', 'banner_get');

            fetch('https://www.cmbarter.com/api/common/main.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let toJson = JSON.parse(data.msg);
                console.log(toJson);

                for(var i in toJson) {
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

            fetch('https://www.cmbarter.com/api/common/main.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let toJson = JSON.parse(data.msg);
                console.log(toJson);

                for(var i in toJson) {
                    console.log(100000000);
                    console.log(toJson[i]);
                    this.adImg.push(toJson[i]);
                }
            })
            
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
    margin: 0; padding: 0;
    box-sizing: border-box;
    font-size: 1rem;
    text-decoration: none;
    color: #000;
}
.main_header {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 70px;
    /* background-color: rgb(9, 9, 116); */
    /* border: 1px solid red; */
}
.header_center {
    display: flex;
    justify-content: space-between;
    width: inherit; height: inherit;
}
.header_center > div {
    width: 90px;
    text-align: center;
    padding-top: 10px;
    /* border: 1px solid blue; */
}
.header_center > div:nth-of-type(2) {
    padding-top: 20px;
}
.header_center > div:nth-of-type(3) {
    padding-top: 18px;
}
img {
    width: 30px;
}
.main_logo > p {
    color: #fff;
    font-size: small;
}
.main_content {
    width: 100%; height: 100%;
    margin: 70px 0;
}
.pay_content {
    width: 100%; height: 200px;
    /* border: 2px solid blue; */
    /* background-color: rgb(9, 9, 116); */
}
.pay_center {
    padding: 20px;
    /* border: 1px solid orange; */
}
.pay_area {
    height: 100px;
    /* background-color: rgb(9, 9, 116); */
    text-align: center;
    border-radius: 10px;
    border: 3px solid #fff;
}
.pay_area > p {
    font-weight: bold;
    font-size: 1.2rem;
    color: #fff
}
.pay_area span {
    font-size: 1.5rem;
    color: yellow;
}
.pay_area > p:nth-of-type(1) {
    font-size: 1.5rem;
    color: yellow;
}
.pay_area > p:nth-of-type(3) {
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
    width: 130px; height: 30px;
    background-color: #fff;
    color: rgb(9, 9, 116);
    font-weight: bold; font-size: 0.9rem;
    border-radius: 10px;
    border: none;
}
.commercial {
    width: 90%; height: 200px;
    margin: 20px auto;
    border: 1px solid #ccc;
}
.slide_group {
    width: 100%; height: 100%;
}
.slide_group > img {
    display: block;
    width: 100%; height: 100%;
}
.icons {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    /* border: 1px solid red; */
}
.icon {
    width: 33%; height: 100px;
    text-align: center;
    /* border: 1px solid red; */
}
.icon > img {
    width: 40px;
    margin-top: 20px;
}
</style>