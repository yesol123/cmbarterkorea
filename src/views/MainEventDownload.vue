<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toMainCouponEvent()"><img src="@/assets/go_back_btn.png"></button>
            <p>쿠폰 다운로드</p>
        </header>

        <main>
            <div class="store_info" v-for="(info,i) in couponinfo" :key="i">
                <div class="store_img">
                    <div :style="{ backgroundImage: `url(${info.store_image})`}">
                    </div>
                </div>
                <div class="store_detail">
                    <p>{{ info.store_name }}</p>
                    <button type="button">{{ info.user_cm_use }} CM 가능</button>
                    <p>{{ info.store_address }}</p>
                    <p>{{ info.store_category_name }}</p>
                    <div>
                        <button type="button">tel</button>
                        <button type="button">map</button>
                    </div>
                </div>
            </div>
            <div class="store_coupon">
                <div class="back_ground_coupon" v-for="(list,i) in couponlist" :key="i" :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${list.coupon_price}.jpg')`}">
                    <ul class="coupon_conditions">
                        <div>
                            <li>{{ list.coupon_name }}</li>
                            <li>{{ list.coupon_issuance_status }}</li>
                            <li>{{ list.coupon_limit }}일</li>
                        </div>
                        <div class="t">
                            <!-- <img src="@/assets/1000_t.png" alt=""> -->
                            <div :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${list.coupon_price}_t.png')`}"></div>
                        </div>
                    </ul>
                </div>
            </div>
        </main>
    </div>  
</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
    data() {
        return {
            couponlist : '',
            couponinfo : ''
        }
    },
    mounted() {
        this.CouponInfo();
        this.CouponList();
    },
    methods : {
        toMainCouponEvent() {
            this.$router.push({ path : '/event' });
        },
        // 쿠폰리스트
        CouponList() {
            let store = useResponseStore();
            let formData = new FormData();
            formData.append('type', 'event_info2');
            formData.append('event_master_index', store.event_master_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_event.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                this.couponlist = data.msg;
            })
        },
        CouponInfo() {
            let store = useResponseStore();
            let formData = new FormData();
            formData.append('type', 'event_info1');
            formData.append('event_master_index', store.event_master_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_event.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.couponinfo = data.msg;
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
main {
    margin-top: 50px;
    /* border: 1px solid red; */
}
.store_info {
    display: flex;
    /* border: 1px solid blue; */
}
.store_img {
    width: 40%;
    padding: 10px;
    /* border: 1px solid orange; */
}
.store_img > div {
    width: 100%; height: 140px;
    /* background-image: url(../assets/1.jpg); */
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 5px;
}
.store_detail {
    width: 60%;
    padding: 10px 10px 10px 0;
    /* border: 1px solid orange; */
}
.store_detail > p {
    font-size: 0.8rem;
}
.store_detail > p:nth-of-type(1) {
    font-size: 0.9rem;
    font-weight: bold;
}
.store_detail > p:nth-of-type(2) {
    margin-top: 10px;
}
.store_detail > p:nth-of-type(3) {
    color: #9c9b9b;
    margin-top: 10px;
}
.store_detail > button {
    width: 100px; height: 30px;
    font-size: 0.8rem;
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: #1bce0b;
    margin-left: 50%;
}
.store_detail > div {
    text-align: right;
}
.store_detail > div button {
    margin-left: 10px;
    width: 35px; height: 35px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #ccc;
}
.store_coupon {
    width: 100%; height: 100vh;
    overflow: scroll;
    margin-top: 10px;
    padding-right: 5px;
    /* border: 1px solid #000; */
}
.back_ground_coupon {
    width: 100%; height: 130px;
    background-size: cover;
    background-repeat: no-repeat;
    margin-top: 10px;
    /* border: 1px solid red; */
}
.coupon_conditions {
    display: flex;
    justify-content: space-around;
}
.coupon_conditions > div:nth-of-type(1) {
    width: 60%; height: 130px;
    margin-left: 15%;
    /* border: 1px solid red; */
}
.coupon_conditions > div:nth-of-type(1) > li {
    width: 90%; height: 25px;
    line-height: 25px;
    text-align: center;
    margin-top: 5px;
    border-radius: 15px;
    background-color: #E7F1F6;
    border: none;
    font-weight: bold;
    font-size: 0.9rem;
    list-style: none;
}
.coupon_conditions > div:nth-of-type(1) > li:nth-of-type(1) {
    margin-top: 11%;
}
.t {
    width: 40%; height: 130px;
    /* border: 1px solid red; */
}
.t > div {
    width: 100%; height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
}
</style>