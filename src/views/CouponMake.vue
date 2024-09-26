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
                <button type="button" @click="toCouponMake()">쿠폰발행</button>
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
                    <button @click="gotoDetail(list.coupon_index)">쿠폰 상세보기</button>
                </li>
            </ul>
        </section>
    </div>

    <!-- 쿠폰발행창 -->
    <div id="popup" class="popup">
        <div class="popup-content">
            <div class="center">
                <p class="header">쿠폰 발행</p>
                
                <div>
                    <label>보유CM</label>
                    <input type="number" v-model="cm">
                </div>

                <div>
                    <label>사용CM</label>
                    <input type="number" v-model="price">
                </div>

                <div>
                    <label>가격</label>
                    <select v-model="coupon_price">
                        <option>쿠폰의 가격 선택</option>
                        <option>1,000</option>
                        <option>5,000</option>
                        <option>10,000</option>
                        <option>50,000</option>
                    </select>
                </div>

                <div>
                    <label>개수</label>
                    <input type="number" placeholder="발행수량을 입력해주세요" v-model="coupon_count">
                </div>
                
                <div>
                    <label>기한</label>
                    <input type="number" placeholder="사용기한을 입력해주세요(1일~90일)" v-model="coupon_limit">
                </div>

                <div>
                    <label>이름</label>
                    <input type="text" placeholder="쿠폰이름을 입력해주세요(30자이내)" v-model="coupon_name">
                </div>

                <div>
                    <label>조건</label>
                    <input type="text" placeholder="사용조건을 입력해주세요(30자이내)" v-model="coupon_condition">
                </div>

                <div class="btn_group">
                    <button type="button" @click="IssueCoupon()">확인</button>
                    <button type="button" @click="NotCouponMake()">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
    data() {
        return {
            selectedButton : '전체',
            cmakelist : '',
            id : '',
            cm : '',
            price : '',
            coupon_price : '쿠폰의 가격 선택',
            coupon_count : '',
            coupon_limit : '',
            coupon_name : '',
            coupon_condition : ''

        }
    },
    mounted() {
        this.CouponMakeList();

        let store = useResponseStore();
        this.cm = store.cm_amount;
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
        toCouponMake() {
            document.getElementById('popup').style.display = 'flex';
        },
        NotCouponMake() {
            document.getElementById('popup').style.display = 'none';
            this.price = '';
            this.coupon_price = '쿠폰의 가격 선택';
            this.coupon_count = '';
            this.coupon_limit = '';
            this.coupon_name = '';
            this.coupon_condition = '';
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
        },
        gotoDetail(id) {
            // console.log('123');
            // console.log(id);
            this.id = id;
            this.$router.push({path:`/couponDetail2/${this.id}`});
        },
        IssueCoupon() {
            // console.log('쿠폰발행');
            // console.log(this.coupon_price);
            // console.log(this.coupon_count);
            // console.log(typeof this.coupon_limit);
            // if(this.coupon_limit > 90) {
            //     console.log(11)
            // }
            // console.log(typeof this.coupon_name);
            // console.log(this.coupon_condition);

            if(this.price == '') {
                alert('사용CM을 입력해주세요.');
                return false;
            }
            if(this.coupon_price == '쿠폰의 가격 선택') {
                alert('쿠폰가격을 선택해주세요.');
                return false;
            }
            if(this.coupon_count == '') {
                alert('쿠폰갯수를 입력해주세요.');
                return false;
            }
            if(this.coupon_limit == '') {
                alert('쿠폰기한을 입력해주세요.');
                return false;
            }
            if(this.coupon_limit < 1 || this.coupon_limit > 90) {
                alert('쿠폰기한은 1일 ~ 90일사이로 입력할 수 있습니다.');
                return false;
            }
            if(this.coupon_name == '') {
                alert('쿠폰이름을 입력해주세요.');
                return false;
            }
            if(this.coupon_name.length > 30) {
                alert('쿠폰이름은 30글자 이내로 작성해주세요');
                return false;
            }
            if(this.coupon_condition == '') {
                alert('쿠폰조건을 입력해주세요.');
                return false;
            }
            if(this.coupon_condition.length > 30) {
                alert('쿠폰조건은 30글자 이내로 작성해주세요');
                return false;
            }

            let store = useResponseStore();

            let formData = new FormData();
            formData.append('type', 'coupon_buy');
            formData.append('user_index', store.user_index);
            formData.append('coupon_price', this.coupon_price);
            formData.append('coupon_price', this.coupon_count);
            formData.append('coupon_price', this.coupon_limit);
            formData.append('coupon_price', this.coupon_name);
            formData.append('coupon_price', this.coupon_condition);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_issuance.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('쿠폰발행');
                console.log(data);
                document.getElementById('popup').style.display = 'none';
                this.price = '';
                this.coupon_price = '쿠폰의 가격 선택';
                this.coupon_count = '';
                this.coupon_limit = '';
                this.coupon_name = '';
                this.coupon_condition = '';
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
.couponbox_section label {
    display: flex;
    justify-content: space-between;
    border: 1px solid #B1B1B1;
    border-radius: 10px;
    padding: 10px;
}
.couponbox_section label input {
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
    width: 80%; height: 60%;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    overflow: scroll;
    color: #000;
}
.center {
    position: absolute;
    top: 7%;
    /* transform: translateY(-50%); */
    width: 100%; height: 100%;
    /* border: 1px solid red; */
}
.header {
    font-weight: bold;
    font-size: 1.2rem;
    /* border: 1px solid red; */
}
.center > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    margin: 4% auto 0;
    /* border: 1px solid orange; */
}
.center > div input {
    width: 85%; height: 30px;
    /* margin-left: 5px; */
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 5px;
    font-size: 0.8rem;
}
.center > div select, option {
    width: 85%; height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 5px;
    font-size: 0.8rem;
}
.btn_group {
    width: 100%;
    padding: 0 40px;
    /* border: 1px solid red; */
}
.btn_group > button {
    width: 65px; height: 35px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 7px;
    color: #000;
}
.btn_group > button:nth-of-type(1) {
    background-color: #1bce0b;
    border: 1px solid #1bce0b;
    color: #fff;
}
</style>