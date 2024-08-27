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
                        <div class="coupon_content" v-for="(c,i) in this.coupons" :key="i" :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${c.coupon_price}.jpg')`}">
                            <input type="checkbox" id="checkbox" v-model="c.checked" @change="showIndex(c.coupon_index, c.issuance_user_index, $event)">
                            <div class="coupon_value">
                                <p>{{ c.coupon_name }}</p>
                                <!-- <p>{{ c.coupon_provided_status }}</p> -->
                                <p>{{ c.coupon_limit_time }}</p>
                            </div>
                            <div class="coupon_img" :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${c.coupon_price}_t.png')`}"></div>
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
                        <div>{{ pinnums[0] }}</div>
                        <div>{{ pinnums[1] }}</div>
                        <div>{{ pinnums[2] }}</div>
                        <div>{{ pinnums[3] }}</div>
                        <div>{{ pinnums[4] }}</div>
                        <div>{{ pinnums[5] }}</div>
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
                <!-- <qrcode-stream @detect="onDetect()"></qrcode-stream> -->
                 <p>멤버십에 해당 QR코드를 보여주세요.</p>
                 <p style="font-weight: bold;">{{ id }}</p>
                <img src="https://quickchart.io/chart?chs=200x200&cht=qr&chl=908509" alt="QR코드">
                <p style="border: 1px solid #ccc; width: 170px; height: 30px; margin: 0 auto; border-radius: 5px; font-size: 0.9rem; font-weight: bold; line-height: 28px;">{{ qrdigit }}</p>
                <p style="font-size: 0.9rem;">결제금액</p>
                <p style="font-weight: bold; font-size: 1.2rem;">{{ commaprice }} CM</p>
            </div>
        </div>
    </div>

</template>

<script>
import { useResponseStore } from '@/store/response.js'
// import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    components : {
        // QrcodeStream,
    },
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
            coupon_name : '',
            showCoupon : true,
            showPin : false,
            showQR : false,
            price : '',
            commaprice : '',
            coupon_index : [],
            issuance_user_index : [],
            one : 1,
            two : 2,
            three : 3,
            four : 4,
            five : 5,
            six : 6,
            seven : 7,
            eight : 8,
            nine : 9,
            zero : 0,
            pinnums : [],
            id : '',
            qrdigit : '',
            emptyck : '',

        }
    },
    mounted() {
        this.CouponList();
        // document.getElementById('popup').style.display = 'flex';
        let store = useResponseStore();
        this.id = store.user_id;
        // console.log(88889);
        // console.log(store.member);
        // console.log(store.user_id);
    },
    methods : {
        // QR 스캔
        // onDetect (detectedCodes) {
        //     // this.qrCodeData = detectedCodes;
        //     console.log(detectedCodes);
        // },
        // 핀번호 입력
        InsertPin(i) {
            this.pinnums.push(i);

            if(this.pinnums.length == 6) {

                const strpin = this.pinnums.toString();
                const numpin = strpin.replace(/,/g, "");

                let store = useResponseStore();

                let formData = new FormData();
                formData.append('type', 'pin_check');
                formData.append('id', store.user_id);
                formData.append('pin', numpin);

                const url = process.env.VUE_APP_API_URL;

                fetch(url + 'api/pay/Pay.php', {
                method : 'POST',
                body : formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    // 핀번호 인증 완료
                    if(data.code == 200) {
                        alert(data.msg);
                        this.showPin = false;
                        this.showQR = true;

                        // QR 이동
                        let store = useResponseStore();

                        const strcouponindex = this.coupon_index.toString();

                        let formData = new FormData();
                        formData.append('type', 'qr_number');
                        formData.append('coupon_issuance_index_list', strcouponindex);
                        formData.append('user_index', store.user_index);
                        formData.append('user_role_index', store.member);
                        formData.append('user_amount', this.price);

                        const url = process.env.VUE_APP_API_URL;

                        fetch(url + 'api/pay/Pay.php', {
                            method : 'POST',
                            body : formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            this.qrdigit = data.msg;

                            this.commaprice = this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        })

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
        showIndex(coupon_index,user_index,event) {

            const isChecked = event.target.checked;
            console.log(event.target)

            if(isChecked) {
                if(this.issuance_user_index.length === 0) {
                    this.issuance_user_index.push(user_index);
                } else {
                    const firstValue = this.issuance_user_index[0];
                    if(user_index !== firstValue) {
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
        },
        // 쿠폰 리스트 불러오기
        CouponList() {
            let store = useResponseStore();

            const formData = new FormData();
            formData.append('type', 'coupon_select');
            formData.append('id', store.user_id);

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
            let store = useResponseStore();

            const formData = new FormData();
            formData.append('type', 'coupon_select');
            formData.append('id', store.user_id);
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

           
        },
        // 핀번호 이동
        toPin() {

            let store = useResponseStore();

            if(this.price == '') {
                alert('결제금액을 입력해주세요.');
                return false;
            }
            if(this.price > store.cm_amount) {
                alert('보유CM보다 큰 금액은 입력할 수 없습니다.');
                return false;
            }
            
            this.showCoupon = false;
            this.showPin = true;
            this.showQR = false;

            console.log('결제금액 : ' + this.price);
            console.log('쿠폰인덱스 : ' + this.coupon_index);

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
    background-color: #fff;
    border: 1px solid #ccc;
}
.price > button {
    width: 25%; height: 30px;
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
.coupon > label {
    font-size: 15px;
    font-weight: bold;
}
.coupon > input {
    width: 100%; height: 35px;
    border-radius: 7px;
    padding: 5px;
    margin-top: 10px;
    background-color: #fff;
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
    color: #000;
    background-color: #dcdbdb;
    border: 1px solid #ccc;
}
.coupon_list {
    width: 100%; height: 300px;
    /* border: 1px solid blue; */
}
.coupon_content {
    position: relative;
    
    width: 100%; height: 150px;
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
    top: 5%; left: 13%;
    width: 50%;
    text-align: center;
    /* border: 1px solid red; */
}
.coupon_value > p {
    width: 95%; height: 20%;
    border-radius: 7px;
    background-color: #f1eded;
    border: 1px solid #ccc;
    font-size: 0.9rem;
    margin-top: 12%;
    /* border: 2px solid red; */
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
.pin_wrap {
    width: 100%; height: 85%;
    /* border: 2px solid red; */
}
.pin_word {
    width: 100%; height: 150px;
    text-align: center;
    margin-top: 30px;
    /* border: 1px solid orange; */
}
.pin_word > p {
    font-size: 1.1rem;
    font-weight: bold;
}
.pin_word > p:nth-of-type(2) {
    font-size: 1.0rem;
    margin-bottom: 30px;
}
.boxes {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    width: 100%; height: 30px;
    /* border: 3px solid red; */
}
.boxes > div {
    width: 30px; height: 30px;
    line-height: 30px;
    border: none;
    background-color: #e4e2e2;
    border-radius: 7px;
    margin-right: 5px;
}
.numbers {
    display: flex;
    flex-wrap: wrap;
    width: 100%; height: 70%;
    padding: 20px 20px;
    /* border: 1px solid pink; */
}
.numbers > div {
    width: 33%; height: 25%;
    text-align: center; line-height: 60px;
    /* border: 1px solid blue; */
}
.qr_wrap {
    width: 100%;
    text-align: center;
    /* border: 1px solid red; */
}
</style>