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
            첫번째 광고란
        </div>
        <div class="icons">
            <div class="icon">
                <img src="@/assets/gift.png">
                <p>쿠폰게시판</p>
            </div>
            <div class="icon">
                <img src="@/assets/gift.png">
                <p>CM라이프</p>
            </div>
            <div class="icon">
                <img src="@/assets/gift.png">
                <p>가맹점신청</p>
            </div>
            <div class="icon">
                <img src="@/assets/gift.png">
                <p>홈페이지</p>
            </div>
            <div class="icon">
                <img src="@/assets/gift.png">
                <p>카카오 상담</p>
            </div>
        </div>
        <div class="commercial">
            두번째 광고란
        </div>
    </div>


    <Footer />
</template>

<script>
import Footer from '@/components/FooterPage.vue'
import { useResponseStore } from '@/store/response.js';

export default {
    components : {
        Footer,
    },
    data() {
        return {
            member : '',
            user_cmp : '',
            user_cm : '',
            coupon_count : ''
        }
    },
    mounted() {
        let store = useResponseStore();
        this.member = store.member;

        // console.log('user_id : ' + store.user_id);

        this.MainList();
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

                // 유저CMP
                this.user_cmp = toJson.user_cmp;
                if(this.user_cmp != null) {
                    this.user_cmp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
                
                // 유저CM
                this.user_cm = toJson.user_cm.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                // 쿠폰갯수
                this.coupon_count = toJson.coupon_count;
                if(this.coupon_count != null) {
                    this.coupon_count.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        }
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
    margin-top: 70px;
}
.main_content {
    width: 100%; height: 900px;
    /* border: 3px solid red; */
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
    width: 90%; height: 170px;
    margin: 20px auto 0;
    border: 1px solid #ccc;
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