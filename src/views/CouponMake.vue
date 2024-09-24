<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toMain()"><img src="@/assets/go_back_btn.png"></button>
            <p>쿠폰발행함</p>
        </header>

        <section class="couponbox_section">
            <label for="search">
                <input type="text" id="search" placeholder="쿠폰 이름을 입력하세요.">
                <button><img src="@/assets/icon_search.svg" alt=""></button>
            </label>

            <div class="buttons">
                <button :class="{'active':selectedButton === '보유중'}"  @click="possible()" >보유중</button>
                <button :class="{'active':selectedButton === '보내기완료'}"  @click="complete()">보내기완료</button>
                <button :class="{'active':selectedButton === '사용완료'}"  @click="pass()">사용완료</button>
                <button :class="{'active':selectedButton === '전체'}"  @click="all()">전체</button>
            </div>
            <p class="coupon_current">'보유중'에 해당하는 쿠폰의 개수는 '0'개 입니다.</p>

            <div class="coupon_btns">
                <button type="button">쿠폰발행</button>
                <button type="button">쿠폰선물</button>
                <button type="button" @click="toCouponEvent()">쿠폰이벤트</button>
            </div>

            <ul class="flex_direction">
                <li class="coupon_com" v-for="(list,i) in this.cmakelist" :key="i">
                    <div class="back_ground_coupon" :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${list.coupon_price}.jpg')`}">
                        <ul class="coupon_conditions">
                            <div><input type="checkbox"></div>
                            <div>              
                            <li>{{ list.coupon_name }}</li>
                            <li>{{ list.coupon_issuance_status }}</li>
                            <li>{{ list.coupon_limit }}일</li>
                            </div>
                            <div class="t">
                                <div :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${list.coupon_price}_t.png')`}"></div>
                                <!-- <img :src="require('https://www.haruby.store/assets/img/money/5000_t.png')" alt=""> -->
                            </div>
                        </ul>
                    </div>
                    <button @click="gotoDetail()">쿠폰 상세보기</button>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
    data() {
        return {
            selectedButton : '전체',
            cmakelist : '',
        }
    },
    mounted() {
        this.CouponMakeList();
    },
    methods : {
        toMain() {
            this.$router.push({ path : '/main' });
        },
        possible(){
            console.log('보유중');
            this.selectedButton = '보유중';
            this.CouponMakeList();
        },
        complete(){
            console.log('보내기완료');
            this.selectedButton = '보내기완료';
            this.CouponMakeList();
        },
        pass(){
            console.log('사용완료');
            this.selectedButton = '사용완료';
            this.CouponMakeList();
            
        },
        all(){
            console.log('전체');
            this.selectedButton = '전체';
            this.CouponMakeList();
        },
        toCouponEvent() {
            this.$router.push({ path : '/cevent' });
        },
        CouponMakeList() {

            let store = useResponseStore();

            let formData = new FormData();
            formData.append('type', 'select');
            formData.append('user_index', store.user_index);
            formData.append('status', this.selectedButton);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_issuance.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('쿠폰발행함');
                //console.log(data);
                this.cmakelist = data.msg;
                console.log(this.cmakelist);
            })
        }
    }
}
</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 1rem;
    color: hsl(0, 0%, 0%);
}
.wrap {
    position: relative;
    width: 100%;
    background-color: #fff;
    /* border: 1px solid red; */
    margin-bottom: 70px;
}
header {
    position: fixed;
    top: 0; left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; height: 40px;
    padding: 0 10px;
    background-color: #fff;
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
.couponbox_section {
    margin: 70px auto 0;
    width: 95%;
}
label {
    display: flex;
    justify-content: space-between;
    border: 1px solid #B1B1B1;
    border-radius: 10px;
    padding: 10px;
}
label input {
    border: 0;
    outline: none;
    padding: 0 10px;
    width: 70%;
    font-size: 0.9rem;
    font-weight: bolder;
}
label button {
    outline: none;
    background-color: white;
    border: 0;
}
.buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
.buttons button {
    border: 1px solid #B1B1B1;
    border-radius: 20px;
    font-size: 0.8rem;
    padding: 10px;
    background-color: transparent;
    font-weight: bold;
}
.buttons button.active {
    border: 1px solid #1749C2;
    background-color: #1749C2;
    color: white;
}
.coupon_current {
    margin-top: 10px;
    font-size: 0.9rem;
    font-weight: bold;
}
.flex_direction {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
}
.flex_direction .coupon_com {
    display: flex;
    flex-direction: column;
    border: 1px solid #0d6efd;
    border-radius: 5px;
}
.flex_direction .coupon_com .back_ground_coupon {
    /* background-image: url("@/assets/1000.jpg"); */
    background-size: cover;
}
.flex_direction .coupon_com button {
    border: 0;
    padding: 10px;
    font-size: 0.9rem;
    background-color: transparent;
    font-weight: bold;
    color: blue;
}
.coupon_conditions {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.coupon_conditions div:nth-child(1) {
    margin-left: 8%;
}
.coupon_conditions div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 45%;
    margin-left: 8%;
}
.coupon_conditions div:nth-child(2) li {
    border: 1px solid #E7F1F6;
    border-radius: 15px;
    background-color: #E7F1F6;
    width: 85%;
    text-align: center;
    font-weight: bold;
    overflow: hidden;
    font-size: 0.9rem;
    margin-top: 3%;
}
.t {
    width: 35%; height: 120px;
    /* border: 1px solid red; */
}
.t > div {
    width: 100%; height: 100%;
    /* border: 1px solid blue; */
    background-size: contain;
    background-repeat: no-repeat;
}
.coupon_btns {
    margin-top: 10px;
    /* border: 1px solid red; */
}
.coupon_btns > button {
    height: 27px;
    border-radius: 5px;
    padding: 0 5px;
    border: none;
    margin-left: 10px;
    font-size: 0.8rem;
    color: #fff;
    background-color: purple;
}
.coupon_btns > button:nth-of-type(1) {
    margin-left: 0;
}
.coupon_btns > button:nth-of-type(2) {
    background-color: green;
}
.coupon_btns > button:nth-of-type(3) {
    background-color: orange;
}

</style>