<template>
  
        <header>
           
        <RouterLink to="/event"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
            <h3>쿠폰 다운로드</h3>
        </header>

        <section>
            <div class="store_info" v-for="(info,i) in couponinfo" :key="i">
                <div class="store_img">
                    <div :style="{ backgroundImage: `url(${info.store_image})`}">
                    </div>
                </div>
                <div class="store_detail">
                    <div class="store_detail_1">
                    <p>{{ info.store_name }}</p>
                    <button type="button">{{ info.user_cm_use }} CM 가능</button>
                    </div>
                    <p>{{ info.store_address }}</p>
                    <p>{{ info.store_category_name }}</p>
                    <div>
                        <button type="button">tel</button>
                        <button type="button">map</button>
                    </div>
                </div>
            </div>
            <div class="store_coupon">
                <div class="back_ground_coupon" v-for="(list,i) in couponlist" :key="i" :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${list.coupon_price}.jpg')`}" @click="Download(list.coupon_index)">
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
        </section>

    <div id="popup" class="popup">
        <div class="popup-content">
            <div class="center">
                <p class="header">쿠폰을 받으시겠습니까?</p>
                <div class="btn_group">
                    <button type="button" @click="Yes()">예</button>
                    <button type="button" @click="No()">아니오</button>
                </div>
            </div>
        </div>
    </div>

    <div id="popup2" class="popup2">
        <div class="popup-content2">
            <div class="center2">
                <p class="header2" style="font-size: 1.0rem;">{{ message }}</p>
                <div class="btn_group2">
                    <button type="button" @click="Confirm()">확인</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
    components : {
    },
    data() {
        return {
            couponlist : '',
            couponinfo : '',
            couponindex : '',
            message : ''
        }
    },
    mounted() {
        this.CouponInfo();
        this.CouponList();
    },
    methods : {
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
        },
        Download(index) {
            console.log(index);
            this.couponindex = index;
            document.getElementById('popup').style.display = 'flex';
        },
        Yes() {
            document.getElementById('popup').style.display = 'none';
            document.getElementById('popup2').style.display = 'flex';

            let store = useResponseStore();
            let formData = new FormData();
            formData.append('type', 'coupon_take');
            formData.append('user_index', store.user_index);
            formData.append('event_master_index', store.event_master_index);
            formData.append('coupon_index', this.couponindex);

             const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_event.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.message = data.msg;
            })
        },
        No() {
            this.couponindex = '';
            document.getElementById('popup').style.display = 'none';
        },
        Confirm() {
            document.getElementById('popup2').style.display = 'none';
            this.couponindex = '';
            this.message = '';
            this.$router.push({ path : '/event' });
        }
    }
}
</script>

<style scoped>

section {
    margin-top: 50px;
    /* border: 1px solid red; */
}
.store_info {
    display: flex;
    /* border: 1px solid blue; */
}
.store_img {
    width: 60%;
    padding: 10px;
    /* border: 1px solid orange; */
}
.store_img > div {
    width: 100%; height: 140px;
    /* background-image: url(../assets/1.jpg); */
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 5px;
    border: 1px solid #ccc;
}
.store_detail {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-evenly;
    /* border: 1px solid orange; */
}
.store_detail > p {
    font-size: 0.8rem;
}
.store_detail .store_detail_1  > p {
    font-size: 0.9rem;
    font-weight: bold;
}
.store_detail > p:nth-of-type(3) {
    color: #9c9b9b;
}

.store_detail .store_detail_1 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.store_detail .store_detail_1 > button {
    width: 45%;
    font-size: 0.7rem;
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: #1bce0b;

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
.popup {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}
/* 팝업내용 */
.popup-content {
    position: relative;
    width: 90%; height: 25%;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    overflow: scroll;
    color: #000;
}
.center {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    /* border: 1px solid red; */
}
.header {
    font-weight: bold;
    font-size: 1.2rem;
    /* border: 1px solid red; */
}
.btn_group {
    width: 100%;
    margin-top: 10%;
    /* padding: 0 40px; */
}
.btn_group > button {
    width: 65px; height: 35px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 7px;
    color: #000;
    font-size: 0.9rem;
}
.btn_group > button:nth-of-type(1) {
    background-color: #1bce0b;
    border: 1px solid #1bce0b;
    color: #fff;
    margin-right: 20px;
}
.popup2 {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}
/* 팝업내용 */
.popup-content2 {
    position: relative;
    width: 90%; height: 25%;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    overflow: scroll;
    color: #000;
}
.center2 {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    /* border: 1px solid red; */
}
.header2 {
    font-weight: bold;
    font-size: 1.2rem;
    /* border: 1px solid red; */
}
.btn_group2 {
    width: 100%;
    margin-top: 10%;
    /* padding: 0 40px; */
}
.btn_group2 > button {
    width: 65px; height: 35px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 7px;
    color: #000;
    font-size: 0.9rem;
}
</style>