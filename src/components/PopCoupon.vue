<template>
    <!-- <button type="button" @click="openpopup()">click here</button> -->

    <div id="popup" class="popup">
        <div class="popup-content">
            <span class="close-btn" @click="closepopup()">&times;</span>
            <p class="header">결제하기</p>
            <!-- 쿠폰 화면 -->
            <div v-show="showCoupon">
                <div class="price">
                    <input type="number" placeholder="금액을 입력하세요." v-model="price">
                    <button type="button" @click="toPin()">결 제</button>
                </div>
                <div class="coupon">
                    <label>쿠폰 검색</label>
                    <input type="text" placeholder="쿠폰 이름을 입력하세요." v-model="coupon_name">
                    <div class="btn_box"><button type="button" @click="SearchCoupon()">검 색</button></div>
                    <div class="coupon_list">
                        <div class="coupon_content" v-for="(c, i) in this.coupons" :key="i"
                            :style="{ backgroundImage: `url('https://www.haruby.store/assets/img/money/${c.coupon_price}.jpg')` }">
                            <div>
                                <input type="checkbox" id="checkbox" v-model="c.checked"
                                @change="showIndex(c.coupon_index, c.issuance_user_index, c.coupon_price, $event)">
                            </div>
                            <div class="coupon_value">
                                <p>{{ c.coupon_name }}</p>
                                <p>{{ c.coupon_condition }}</p>
                                <p>{{ c.coupon_limit_time }}</p>
                            </div>
                            <div class="coupon_img">
                                <img :src="`https://www.haruby.store/assets/img/money/${c.coupon_price}_t.png`" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 핀번호 화면 -->
            <div class="pin_wrap" v-show="showPin">
                <div class="pin_word">
                    <p>PIN 번호 입력</p>
                    <p>결제를 위해 PIN 번호를 입력해주세요.</p>

                    <div class="boxes">
                        <div :class="{ active: pinnums.length > 0 }">{{ pinnums[0] != null ? '*' : '' }}</div>
                        <div :class="{ active: pinnums.length > 1 }">{{ pinnums[1] != null ? '*' : '' }}</div>
                        <div :class="{ active: pinnums.length > 2 }">{{ pinnums[2] != null ? '*' : '' }}</div>
                        <div :class="{ active: pinnums.length > 3 }">{{ pinnums[3] != null ? '*' : '' }}</div>
                        <div :class="{ active: pinnums.length > 4 }">{{ pinnums[4] != null ? '*' : '' }}</div>
                        <div :class="{ active: pinnums.length > 5 }">{{ pinnums[5] != null ? '*' : '' }}</div>
                    </div>
                </div>
                <div class="numbers">
                    <div @click="InsertPin(one)">1</div>
                    <div @click="InsertPin(two)">2</div>
                    <div @click="InsertPin(three)">3</div>
                    <div @click="InsertPin(four)">4</div>
                    <div @click="InsertPin(five)">5</div>
                    <div @click="InsertPin(six)">6</div>
                    <div @click="InsertPin(seven)">7</div>
                    <div @click="InsertPin(eight)">8</div>
                    <div @click="InsertPin(nine)">9</div>
                    <div @click="ResetPin()">reset</div>
                    <div @click="InsertPin(zero)">0</div>
                    <div @click="DeletePin()">취소</div>
                </div>
            </div>
            <!-- QR코드 화면 -->
            <div class="qr_wrap" v-show="showQR">
                <p>가맹점에 해당 QR코드를 보여주세요.</p>
                <p style="font-weight: bold;">{{ id }}</p>
                <img :src="`https://quickchart.io/chart?chs=200x200&cht=qr&chl=${qrdigit}`" alt="QR코드">
                <p
                    style="border: 1px solid #ccc; width: 170px; height: 30px; margin: 0 auto; border-radius: 5px; font-size: 0.9rem; font-weight: bold; line-height: 28px;">
                    {{ qrdigit }}</p>
                <p style="font-size: 0.9rem;">결제금액</p>
                <p style="font-weight: bold; font-size: 1.2rem;">{{ commaprice }} CM</p>
                <button type="button" @click="toCMList()">확인</button>
            </div>
        </div>
    </div>

</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
    components: {
    },
    data() {
        return {
            coupons: '',
            coupon_name: '',
            showCoupon: true,
            showPin: false,
            showQR: false,
            price: '',
            commaprice: '',
            coupon_index: [],
            issuance_user_index: [],
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            zero: 0,
            pinnums: [],
            id: '',
            qrdigit: '',
            emptyck: '',
            coupon_price: '',
            arr: [],

        }
    },
    mounted() {
        // this.CouponList();
        // document.getElementById('popup').style.display = 'flex';
        let store = useResponseStore();
        this.id = store.user_id;

        
    },
    methods: {
        // 핀번호 입력
        InsertPin(i) {
            this.pinnums.push(i);

            if (this.pinnums.length == 6) {

                const strpin = this.pinnums.toString();
                const numpin = strpin.replace(/,/g, "");

                let store = useResponseStore();

                let formData = new FormData();
                formData.append('type', 'pin_check');
                formData.append('id', store.user_id);
                formData.append('pin', numpin);

                const url = process.env.VUE_APP_API_URL;

                fetch(url + 'api/pay/Pay.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    // 핀번호 인증 완료
                    if (data.code == 200) {
                        alert(data.msg);
                        this.showPin = false;
                        this.showQR = true;

                        // QR코드 이동
                        let store = useResponseStore();

                        const strcouponindex = this.coupon_index.toString();

                        let formData = new FormData();
                        formData.append('type', 'qr_number');
                        formData.append('coupon_issuance_index_list', strcouponindex);
                        formData.append('user_index', store.user_index);
                        formData.append('user_role_index', store.member);
                        const finalprice = this.price;
                        // console.log('빼기')
                        // console.log(finalprice);
                        formData.append('user_amount', finalprice);

                        const url = process.env.VUE_APP_API_URL;

                        fetch(url + 'api/pay/Pay.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            this.qrdigit = data.msg;

                            const finalprice = this.price + this.coupon_price;
                            this.commaprice = finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        })

                    }
                    if (data.code == 404) {
                        alert(data.msg);
                        this.ResetPin();
                        return false;
                    }
                })
            }
        },
        // 핀번호 입력 취소
        DeletePin() {
            this.pinnums.pop();
        },
        // 핀번호 입력 초기화
        ResetPin() {
            this.pinnums = [];
        },
        // coupon_index 불러오기
        showIndex(coupon_index, user_index, coupon_price, event) {

            // if(this.price < coupon_price) {
            //     alert('결제금액보다 더 큰 금액의 쿠폰은 선택할 수 없습니다.');
            //     event.target.checked = false;
            //     return false;
            // }
            const isChecked = event.target.checked;
            console.log(event.target);

            if (isChecked) {
                this.arr.push(coupon_price);
                let sum = 0;
                this.arr.forEach((num) => {
                    sum += num;
                });
                console.log(sum);
                this.coupon_price = sum;

                if (this.issuance_user_index.length === 0) {
                    this.issuance_user_index.push(user_index);
                } else {
                    const firstValue = this.issuance_user_index[0];
                    if (user_index !== firstValue) {
                        alert('동일한 지점의 쿠폰을 선택해주세요.');
                        event.target.checked = false;
                        return false;
                    }
                }
                this.coupon_index.push(coupon_index);
                this.issuance_user_index.push(user_index);
            } else {
                // this.coupon_index = this.coupon_index.filter(index => index !== coupon_index);
                // this.issuance_user_index = this.issuance_user_index.filter(index => index !== user_index);

                this.arr.pop();
                let sum = 0;
                this.arr.forEach((num) => {
                    sum += num;
                });
                console.log(sum);
                this.coupon_price = sum;
            }

        },
        // 결제창 열기
        openpopup() {
            document.getElementById('popup').style.display = 'flex';
        },
        // 결제창 닫기
        closepopup() {
            document.getElementById('popup').style.display = 'none';
            this.showCoupon = true;
            this.showPin = false;
            this.showQR = false;
            this.price = '';
            this.coupons.forEach(c => {
                c.checked = false;
            })
            this.coupon_index = [];
            this.issuance_user_index = [];
            this.pinnums = [];
            this.coupon_price = '';
            this.arr = [];
        },
        // 쿠폰 리스트 불러오기
        CouponList() {
            let store = useResponseStore();

            const formData = new FormData();
            formData.append('type', 'coupon_select');
            formData.append('id', store.user_id);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/pay/Pay.php', {
                method: 'POST',
                body: formData
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
            let store = useResponseStore();

            const formData = new FormData();
            formData.append('type', 'coupon_select');
            formData.append('id', store.user_id);
            formData.append('coupon_name', this.coupon_name);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/pay/Pay.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(100100100100100);
                    console.log(data);
                    this.coupons = data.msg;
                })
        },
        // 핀번호 이동
        toPin() {

            let store = useResponseStore();

            if (this.price == '' && this.coupon_price == '') {
                alert('결제금액을 입력해주세요.');
                return false;
            }
            if (this.price > store.cm_amount) {
                alert('보유CM보다 큰 금액은 입력할 수 없습니다.');
                return false;
            }
            if (this.coupon_price != '') {
                this.showCoupon = false;
                this.showPin = true;
                this.showQR = false;

                console.log('결제금액 : ' + this.price);
                console.log('쿠폰인덱스 : ' + this.coupon_index);
                console.log('쿠폰가격 : ' + this.coupon_price);
            }

            this.showCoupon = false;
            this.showPin = true;
            this.showQR = false;

            console.log('결제금액 : ' + this.price);
            console.log('쿠폰인덱스 : ' + this.coupon_index);
            console.log('쿠폰가격 : ' + this.coupon_price);

        },
        toCMList() {
            this.$router.push({ path: '/cmlist' });
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
    width: 90%;
    height: 70%;
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
    top: 5px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

.header {
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 10px;
}

.price {
    width: 100%;
    height: 100px;
    text-align: center;
    /* border: 1px solid red; */
}

.price>input {
    width: 100%;
    height: 35px;
    border-radius: 7px;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #ccc;
    color: #000;
}

.price>button {
    width: 25%;
    height: 30px;
    border-radius: 7px;
    padding: 5px;
    margin-top: 15px;
    color: #000;
    background-color: #dcdbdb;
    border: 1px solid #ccc;
}

.coupon {
    width: 100%;
    /* border: 1px solid red; */
}

.coupon>label {
    font-size: 15px;
    font-weight: bold;
}

.coupon>input {
    width: 100%;
    height: 35px;
    border-radius: 7px;
    padding: 5px;
    margin-top: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    color: #000;
}

.btn_box {
    text-align: center;
}

.coupon button {
    width: 25%;
    height: 30px;
    border-radius: 7px;
    padding: 5px;
    margin-top: 15px;
    color: #000;
    background-color: #dcdbdb;
    border: 1px solid #ccc;
}

.coupon_list {
    width: 100%;
    height: 300px;
    /* border: 1px solid blue; */
}

.coupon_content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    background-size: cover; /* 변경된 부분 */
    background-position: center; /* 이미지 중앙 정렬 */
    background-repeat: no-repeat;
    margin: 10px auto 0;
}




.coupon_content > div:nth-child(1){
    display: flex;
    width: 20%;
    align-items: center;
    justify-content: center;
}


.coupon_content > div:nth-child(3){
    width: 40%;
}




.coupon_value {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    gap: 5px;
    text-align: center;
    /* border: 1px solid red; */
}

.coupon_value>p {
    width: 80%;
    border-radius: 10px;
    background-color: #f1eded;
    border: 1px solid #ccc;
    font-size: 0.9rem;
    /* border: 2px solid red; */
    line-height: 30px;
    overflow: hidden;
}
.coupon_img > img {
    width: 100%;
}

.pin_wrap {
    width: 100%;
    height: 85%;
    /* border: 2px solid red; */
}

.pin_word {
    width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 10px;
    margin-top: 30px;
    /* border: 1px solid orange; */
}

.pin_word>p{
    font-weight: bold;
    margin: 0;
}

.pin_word>p:nth-of-type(1) {
    font-size: 1.1rem;
}

.pin_word>p:nth-of-type(2) {
    font-size: 1.0rem;
    margin-bottom: 30px;
}

.boxes {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    width: 100%;
    height: 30px;
    /* border: 3px solid red; */
}

.boxes>div {
    width: 30px;
    height: 30px;
    display: flex; /* Flexbox 사용 */
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    border: none;
    background-color: #e4e2e2;
    border-radius: 7px;
    margin-right: 5px;
    text-align: center;
    font-size: 32px;
    padding-top: 10px;
    display: flex;
    align-items: center;
}


.boxes > div.active {
    background-color: #1e90ff; /* 파란색 배경 */
    color: white; /* 텍스트 색상 흰색 */
}

.numbers {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 70%;
    padding: 20px 20px;
}

.numbers>div {
    width: 33%;
    height: 25%;
    text-align: center;
    line-height: 60px;
    font-weight: bold;

}

.qr_wrap {
    width: 100%;
    text-align: center;
    /* border: 1px solid red; */
}

.qr_wrap button {
    width: 100%;
    height: 35px;
    border-radius: 7px;
    border: none;
    background-color: #1bce0b;
    color: #fff;
    margin-top: 20px;
}




@media (prefers-color-scheme: dark) {
    input{
        background: rgba(255, 255, 255, 0.08);
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

    .coupon_value > p{
        background:  rgba(39, 38, 44, 1);
        color: rgba(255, 255, 255, 0.87);

    }

}

</style>