<template>
    <!-- <button type="button" @click="openpopup()">click here</button> -->
    
    <div id="popup" class="popup">
        <div class="popup-content">
            <span class="close-btn" @click="closePopup()">&times;</span>
            <p class="header">결제하기</p>
            <div class="price">
                <input type="number" placeholder="금액을 입력하세요.">
                <button type="button">결 제</button>
            </div>
            <div class="coupon">
                <label>쿠폰 검색</label>
                <input type="text" placeholder="쿠폰 이름을 입력하세요." v-model="coupon_name">
                <div class="btn_box"><button type="button" @click="SearchCoupon()">검 색</button></div>
                <div class="coupon_list">
                    <div class="coupon_content" v-for="(c,i) in this.coupons" :key="i" :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${c.coupon_price}.jpg')`}">
                        <input type="checkbox">
                        <div class="coupon_value">
                            <p>{{ c.coupon_name }}</p>
                            <p>{{ c.coupon_provided_status }}</p>
                            <p>{{ c.coupon_limit_time }}</p>
                        </div>
                        <div class="coupon_img" :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${c.coupon_price}_t.png')`}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { useResponseStore } from '@/store/response.js'

export default {
    data() {
        return {
            // urls : [
            //     {
            //         back : 'https://www.haruby.store/assets/img/money/1000.jpg',
            //         badge : 'https://www.haruby.store/assets/img/money/1000_t.png'
            //     },
            //     {
            //         back : 'https://www.haruby.store/assets/img/money/5000.jpg',
            //         badge : 'https://www.haruby.store/assets/img/money/5000_t.png'
            //     },
            //     {
            //         back : 'https://www.haruby.store/assets/img/money/10000.jpg',
            //         badge : 'https://www.haruby.store/assets/img/money/10000_t.png'
            //     },
            //     {
            //         back : 'https://www.haruby.store/assets/img/money/50000.jpg',
            //         badge : 'https://www.haruby.store/assets/img/money/50000_t.png'
            //     },
            // ],
            coupons : '',
            coupon_name : ''
        }
    },
    mounted() {
        this.CouponList();
        // document.getElementById('popup').style.display = 'flex';
        // let store = useResponseStore();
        // console.log(88889);
        // console.log(store.member);
        // console.log(store.user_id);
    },
    methods : {
        // 결제창 열기
        openpopup() {
            document.getElementById('popup').style.display = 'flex';
        },
        // 결제창 닫기
        closePopup() {
            document.getElementById('popup').style.display = 'none';
        },
        // 쿠폰 리스트 불러오기
        CouponList() {
            // let store = useResponseStore();

            const formData = new FormData();
            formData.append('type', 'coupon_select');
            // formData.append('id', store.user_id);
            formData.append('id', 'asd1543715');

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/pay/Pay.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(1234567899999);
                console.log(data);
                this.coupons = data.msg;
            })
        },
        // 쿠폰검색
        SearchCoupon() {
            const formData = new FormData();
            formData.append('type', 'coupon_select');
            formData.append('id', 'asd1543715');
            formData.append('coupon_name', this.coupon_name);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/pay/Pay.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(100100100100100);
                console.log(data);
                this.coupons = data.msg;
            })

            // this.CouponList();

           
        }
    }
}


</script>

<style scoped>
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
    width: 90%; height: 70%;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    /* max-width: 90%; */
    /* max-height: 80%; */
    position: relative;
    overflow: scroll;
}
.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}
.header {
    font-weight: bold;
    font-size: 1.2rem;
}
.price {
    width: 100%; height: 100px;
    text-align: center;
    /* border: 1px solid red; */
}
.price > input {
    width: 100%; height: 35px;
    border-radius: 7px;
    padding: 5px;
    border: 1px solid #ccc;
}
.price > button {
    width: 25%; height: 30px;
    border-radius: 7px;
    padding: 5px;
    margin-top: 15px;
    border: 1px solid #ccc;
}
.coupon {
    width: 100%;
    /* border: 1px solid red; */
}
.coupon > label {
    font-size: 15px;
    font-weight: bold;
}
.coupon > input {
    width: 100%; height: 35px;
    border-radius: 7px;
    padding: 5px;
    margin-top: 10px;
    border: 1px solid #ccc;
}
.btn_box {
    text-align: center;
}
.coupon button {
    width: 25%; height: 30px;
    border-radius: 7px;
    padding: 5px;
    margin-top: 15px;
    border: 1px solid #ccc;
}
.coupon_list {
    width: 100%; height: 300px;
    /* border: 1px solid blue; */
}
.coupon_content {
    position: relative;
    
    width: 330px; height: 150px;
    /* background-image: url('https://www.haruby.store/assets/img/money/1000.jpg'); */
    background-repeat: no-repeat;
    background-size: contain;
    margin: 10px auto 0;
    /* border: 1px solid red; */
}
.coupon_content > input {
    position: absolute;
    top: 40%; left: 15px;
}
.coupon_value {
    position: absolute;
    top: 5px; left: 60px;
    width: 160px;
    text-align: center;
    /* border: 1px solid red; */
}
.coupon_value > p {
    width: 90%; height: 20%;
    border-radius: 7px;
    background-color: #f1eded;
    border: 1px solid #ccc;
    font-size: 0.9rem;
}
.coupon_img {
    position: absolute;
    top: 15%; right: 15px;
    width: 100px; height: 150px;
    /* background-image: url('https://www.haruby.store/assets/img/money/1000_t.png'); */
    background-repeat: no-repeat;
    background-size: contain;
    /* border: 1px solid red; */
}
</style>