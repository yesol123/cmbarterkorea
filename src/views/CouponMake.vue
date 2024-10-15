<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toMain()"><img src="@/assets/go_back_btn.png"></button>
            <p>쿠폰발행함</p>
        </header>

        <section class="couponbox_section">
            <label for="search">
                <input type="text" id="search" placeholder="쿠폰 이름을 입력하세요." v-model="name">
                <button type="button" @click="SearchCoupon()"><img src="@/assets/icon_search.svg" alt=""></button>
            </label>


            <div class="buttons">
                <button :class="{ 'active': selectedButton === '보유중' }" @click="possible()">보유중</button>
                <button :class="{ 'active': selectedButton === '보내기완료' }" @click="complete()">보내기완료</button>
                <button :class="{ 'active': selectedButton === '사용완료' }" @click="pass()">사용완료</button>
                <button :class="{ 'active': selectedButton === '전체' }" @click="all()">전체</button>
            </div>
            <p class="coupon_current">'{{ selectedButton }}'에 해당하는 쿠폰의 개수는 '{{ couponCount }}'개 입니다.</p>

            <div class="coupon_btns">
                <button type="button" @click="toCouponMake()">쿠폰발행</button>
                <button type="button" @click="toCouponGift()">쿠폰선물</button>
                <button type="button" @click="toCouponEvent()">쿠폰이벤트</button>
            </div>

            <ul class="flex_direction">
                <li class="coupon_com" v-for="(list, i) in filteredCoupons" :key="i">
                    <!-- 쿠폰 리스트 렌더링 -->
                    <div class="back_ground_coupon"
                        :style="{ backgroundImage: `url('https://www.haruby.store/assets/img/money/${list.coupon_price}.jpg')` }">
                        <ul class="coupon_conditions">
                            <div><input type="checkbox" @click="CouponIndex(list.coupon_index, $event)"></div>
                            <div>
                                <li>{{ list.coupon_name }}</li>
                                <li>{{ list.coupon_issuance_status }}</li>
                                <li>{{ list.coupon_limit }}일</li>
                            </div>
                            <div class="t">
                                <div
                                    :style="{ backgroundImage: `url('https://www.haruby.store/assets/img/money/${list.coupon_price}_t.png')` }">
                                </div>
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
                    <input type="number" v-model="price" readonly>
                </div>

                <div>
                    <label>가격</label>
                    <select v-model="coupon_price">
                        <option>쿠폰의 가격 선택</option>
                        <option value="1000">1,000 CM</option>
                        <option value="5000">5,000 CM</option>
                        <option value="10000">10,000 CM</option>
                        <option value="50000">50,000 CM</option>
                    </select>
                </div>

                <div>
                    <label>개수</label>
                    <input type="number" placeholder="발행수량을 입력해주세요" v-model="coupon_count" @change="TotalPrice()">
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

    <!-- 쿠폰선물 창 -->
    <div id="popup2" class="popup2">
        <div class="popup-content2">
            <div class="center2">
                <p class="header2">쿠폰 선물</p>
                <div class="num_search">
                    <input type="number" placeholder="핸드폰 번호 뒤 4자리를 입력해주세요." v-model="phone_num">
                    <button type="button" @click="SearchNumber()">검색</button>
                </div>
                <div class="num_list">
                    <div v-for="(list, i) in this.giftlist" :key="i">
                        <input type="checkbox" @click="UserIndex(list.user_index, $event)">
                        <p>{{ list.user_name }}</p>
                        <p>{{ list.user_id }}</p>
                        <p>{{ list.user_phone }}</p>
                        <p>{{ list.store_customer_status }}</p>
                    </div>
                </div>
                <div class="btn_group2">
                    <button type="button" @click="GiveGift()">선물</button>
                    <button type="button" @click="NoGift()">취소</button>
                </div>
            </div>
        </div>
    </div>

    <div id="popup3" class="popup3">
        <div class="popup-content3">
            <div class="center3">
                <div class="pin_word">
                    <p>PIN 번호 입력</p>
                    <p>쿠폰선물을 위해 PIN 번호를 입력해주세요.</p>

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
        </div>
    </div>

</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
    data() {
        return {
            selectedButton: '전체',
            cmakelist: '',
            id: '',
            cm: '',
            price: '',
            coupon_price: '쿠폰의 가격 선택',
            coupon_count: '',
            coupon_limit: '',
            coupon_name: '',
            coupon_condition: '',
            coupon_index: [],
            phone_num: '',
            giftlist: '',
            isUser: false,
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
            name: ''

        }
    },
    computed: {
        filteredCoupons() {
            if (this.selectedButton === '보유중') {
                return this.cmakelist.filter(coupon => coupon.coupon_issuance_status === '보유중');
            } else if (this.selectedButton === '보내기완료') {
                return this.cmakelist.filter(coupon => coupon.coupon_issuance_status === '보내기완료');
            } else if (this.selectedButton === '사용완료') {
                return this.cmakelist.filter(coupon => coupon.coupon_issuance_status === '사용완료');
            } else {
                return this.cmakelist; // 전체
            }
        },
        couponCount() {
            return this.filteredCoupons.length;
        }
    },
    mounted() {
        this.CouponMakeList();

        let store = useResponseStore();
        this.cm = store.cm_amount;
    },
    methods: {
        // 쿠폰발행 > 사용CM 계산식
        TotalPrice() {
            if (this.coupon_price != '쿠폰의 가격 선택' && this.coupon_count != '') {
                this.price = this.coupon_price * this.coupon_count;
            }
        },
        toMain() {
            this.$router.push({ path: '/main' });
        },
        possible() {
            console.log('보유중');
            this.selectedButton = '보유중';
            this.CouponMakeList();
        },
        complete() {
            console.log('보내기완료');
            this.selectedButton = '보내기완료';
            this.CouponMakeList();
        },
        pass() {
            console.log('사용완료');
            this.selectedButton = '사용완료';
            this.CouponMakeList();

        },
        all() {
            console.log('전체');
            this.selectedButton = '전체';
            this.CouponMakeList();
        },
        // 쿠폰발행하기
        toCouponMake() {
            document.getElementById('popup').style.display = 'flex';
        },
        //쿠폰발행취소
        NotCouponMake() {
            document.getElementById('popup').style.display = 'none';
            this.price = '';
            this.coupon_price = '쿠폰의 가격 선택';
            this.coupon_count = '';
            this.coupon_limit = '';
            this.coupon_name = '';
            this.coupon_condition = '';
        },
        // 쿠폰이벤트 이동
        toCouponEvent() {
            this.$router.push({ path: '/cevent' });
        },
        // 쿠폰리스트
        CouponMakeList() {

            let store = useResponseStore();

            let formData = new FormData();
            formData.append('type', 'select');
            formData.append('user_index', store.user_index);
            formData.append('status', this.selectedButton);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_issuance.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log('쿠폰발행함');
                    //console.log(data);
                    this.cmakelist = data.msg;
                    console.log(this.cmakelist);
                })
        },
        // 쿠폰검색
        SearchCoupon() {
            let store = useResponseStore();

            let formData = new FormData();
            formData.append('type', 'select');
            formData.append('user_index', store.user_index);
            formData.append('status', this.selectedButton);
            formData.append('coupon_name', this.name);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_issuance.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.cmakelist = data.msg;
                })
        },
        // 쿠폰상세보기
        gotoDetail(id) {
            // console.log('123');
            // console.log(id);
            this.id = id;
            this.$router.push({ path: `/couponDetail2/${this.id}` });
        },
        // 쿠폰발행하기
        IssueCoupon() {
            // console.log('쿠폰발행');
            // console.log(this.price);
            // console.log(this.coupon_price);
            // console.log(this.coupon_count);
            // console.log(this.coupon_limit);
            // console.log(this.coupon_name);
            // console.log(this.coupon_condition);

            if (this.coupon_price == '쿠폰의 가격 선택') {
                alert('쿠폰가격을 선택해주세요.');
                return false;
            }
            if (this.coupon_count == '') {
                alert('쿠폰갯수를 입력해주세요.');
                return false;
            }
            if (this.coupon_limit == '') {
                alert('쿠폰기한을 입력해주세요.');
                return false;
            }
            if (this.coupon_limit < 1 || this.coupon_limit > 90) {
                alert('쿠폰기한은 1일 ~ 90일사이로 입력할 수 있습니다.');
                return false;
            }
            if (this.coupon_name == '') {
                alert('쿠폰이름을 입력해주세요.');
                return false;
            }
            if (this.coupon_name.length > 30) {
                alert('쿠폰이름은 30글자 이내로 작성해주세요');
                return false;
            }
            if (this.coupon_condition == '') {
                alert('쿠폰조건을 입력해주세요.');
                return false;
            }
            if (this.coupon_condition.length > 30) {
                alert('쿠폰조건은 30글자 이내로 작성해주세요');
                return false;
            }

            let store = useResponseStore();

            let formData = new FormData();
            formData.append('type', 'coupon_buy');
            formData.append('user_index', store.user_index);
            formData.append('coupon_price', this.coupon_price);
            formData.append('coupon_count', this.coupon_count);
            formData.append('coupon_limit', this.coupon_limit);
            formData.append('coupon_name', this.coupon_name);
            formData.append('coupon_condition', this.coupon_condition);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_issuance.php', {
                method: 'POST',
                body: formData
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

                    this.CouponMakeList();
                })
        },
        // 쿠폰클릭시 해당 coupon_index 저장
        CouponIndex(couponindex, event) {
            let store = useResponseStore();

            if (event.target.checked == true) {

                this.coupon_index.push(couponindex);
                // console.log('IN : ' + this.coupon_index);

            } else {

                const index = this.coupon_index.indexOf(couponindex);
                if (index !== -1) {
                    this.coupon_index.splice(index, 1);
                }
                // console.log('OUT : ' + this.coupon_index);
            }

            store.coupon_index = this.coupon_index;
            // console.log(store.coupon_index);
        },
        // 쿠폰선물창
        toCouponGift() {
            if (this.coupon_index == '') {
                alert('쿠폰을 선택해주세요.');
                return false;
            }

            document.getElementById('popup2').style.display = 'flex';

        },
        // 선물하기
        GiveGift() {
            if (this.isUser == true) {
                console.log(333);
                document.getElementById('popup2').style.display = 'none';
                document.getElementById('popup3').style.display = 'flex';
            }
            if (this.isUser == false) {
                alert('선물할 대상을 선택해주세요.');
                return false;
            }
        },
        // 선물취소
        NoGift() {
            document.getElementById('popup2').style.display = 'none';

            let store = useResponseStore();
            store.coupon_index = '';
            this.coupon_index = [];
            // console.log(store.coupon_index);
        },
        // 쿠폰선물검색
        SearchNumber() {

            let store = useResponseStore();
            let formData = new FormData();
            formData.append('type', 'gift_find_id');
            formData.append('user_index', store.user_index);
            formData.append('find_phone', this.phone_num);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_issuance.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // console.log(data.msg[0].store_customer_status);
                    for (let i = 0; i < data.msg.length; i++) {
                        data.msg[i].user_id = data.msg[i].user_id.slice(0, 7);
                        // console.log(data.msg[i].user_id);

                    }
                    this.giftlist = data.msg;
                })
        },
        // 쿠폰선물 user_index 넘기기
        UserIndex(userindex, event) {
            let store = useResponseStore();

            const isChecked = event.target.checked;

            if (isChecked) {
                if (this.isUser == false) {
                    store.coupon_user_index = userindex;
                    this.isUser = true;
                    console.log(store.coupon_user_index);
                } else {
                    alert('쿠폰선물은 한명에게만 할 수 있습니다.');
                    event.target.checked = false;
                    console.log(store.coupon_user_index);
                    return false;
                }
            } else {
                store.coupon_user_index = '';
                this.isUser = false;
                console.log(store.coupon_user_index);
            }

        },
        // 핀번호 입력
        InsertPin(i) {
            this.pinnums.push(i);

            if (this.pinnums.length == 6) {
                const strpin = this.pinnums.toString();
                const numpin = strpin.replace(/,/g, "");

                let store = useResponseStore();
                let formData = new FormData();
                formData.append('type', 'coupon_gift');
                formData.append('give_user_index', store.user_index);
                formData.append('gift_user_index', store.coupon_user_index);
                formData.append('pin', numpin);
                formData.append('coupon_issuance_index_list', store.coupon_index);

                const url = process.env.VUE_APP_API_URL;
                fetch(url + 'api/coupon/coupon_issuance.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.code == 200) {
                            alert(data.msg);
                            document.getElementById('popup3').style.display = 'none';
                            this.pinnums = [];
                            return false;
                        }
                        if (data.code == 500) {
                            alert(data.msg);
                            document.getElementById('popup3').style.display = 'none';
                            this.pinnums = [];
                            return false;
                        }
                    })

                const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        checkbox.checked = false;
                    }
                });
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
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 1rem;
    color: hsl(0, 0%, 0%);
}

.wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* 화면 전체 높이로 설정 */
    background-color: #fff;
}

header {
    display: flex;
    flex-shrink: 0;
    /* 헤더는 고정 */
    position: fixed;
    /* 상단 고정 */
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    z-index: 100;
}


.couponbox_section {
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    /* header 아래로 이동 */
    padding: 10px;
    flex-grow: 1;
    /* 남은 공간을 모두 차지 */
    overflow: hidden;
    /* 기본적으로 내용이 넘칠 때 스크롤을 숨김 */
}


header>p {
    line-height: 40px;
    color: blue;
    /* border: 1px solid red; */
    margin: 0 auto;
}

.goback_btn {
    width: 30px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}

.goback_btn img {
    width: 100%;
    height: 100%;
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
    margin: 10px 0;
    flex-shrink: 0;
    /* 버튼 그룹은 고정 */
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
    flex-shrink: 0;
    /* 쿠폰 개수 표시 고정 */
}

.flex_direction {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    /* 내용이 넘칠 때 세로 스크롤 추가 */
    max-height: 100%;
    /* 쿠폰 목록만 스크롤 */
    flex-grow: 1;
    /* 남은 공간을 모두 차지 */
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
    width: 35%;
    height: 120px;
    /* border: 1px solid red; */
}

.t>div {
    width: 100%;
    height: 100%;
    /* border: 1px solid blue; */
    background-size: contain;
    background-repeat: no-repeat;
}

.coupon_btns {
    margin: 10px 0;
    /* border: 1px solid red; */
}

.coupon_btns>button {
    height: 27px;
    border-radius: 5px;
    padding: 0 5px;
    border: none;
    margin-left: 10px;
    font-size: 0.8rem;
    color: #fff;
    background-color: purple;
}

.coupon_btns>button:nth-of-type(1) {
    margin-left: 0;
}

.coupon_btns>button:nth-of-type(2) {
    background-color: green;
}

.coupon_btns>button:nth-of-type(3) {
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
    width: 80%;
    height: 60%;
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
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
}

.header {
    font-weight: bold;
    font-size: 1.2rem;
    /* border: 1px solid red; */
}

.center>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    margin: 4% auto 0;
    /* border: 1px solid orange; */
}

.center>div input {
    width: 85%;
    height: 30px;
    /* margin-left: 5px; */
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 5px;
    font-size: 0.8rem;
}

.center>div select,
option {
    width: 85%;
    height: 30px;
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

.btn_group>button {
    width: 65px;
    height: 35px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 7px;
    color: #000;
}

.btn_group>button:nth-of-type(1) {
    background-color: #1bce0b;
    border: 1px solid #1bce0b;
    color: #fff;
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
    width: 100%;
    height: 60%;
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
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 100%;
    padding: 0 10px;
    /* border: 1px solid red; */
}

.header2 {
    font-weight: bold;
    font-size: 1.4rem;
    padding-top: 5%;
}

.num_search {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 5%;
    /* border: 1px solid red; */
}

.num_search>input {
    width: 90%;
    height: 35px;
    font-size: 0.8rem;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.num_search>button {
    width: 70px;
    height: 35px;
    margin-left: 10px;
    border-radius: 5px;
    border: none;
    background-color: purple;
    color: #fff;
}

.num_list {
    width: 100%;
    height: 55%;
    margin-top: 3%;
    overflow: scroll;
    padding: 10px;
    border: 1px solid #000;
}

.num_list>div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 15px 10px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
}

.num_list>div p {
    width: 20%;
    font-size: 0.9rem;
    /* text-align: left; */
    /* border: 1px solid red; */
}

.num_list>div p:nth-of-type(2) {
    text-align: left;
}

.btn_group2 {
    width: 100%;
    margin-top: 4%;
    /* border: 1px solid red; */
}

.btn_group2>button {
    width: 50px;
    height: 30px;
    color: #fff;
    background-color: #1bce0b;
    border: none;
    border-radius: 5px;
    font-size: 0.8rem;
}

.btn_group2>button:nth-of-type(2) {
    margin-left: 50px;
    background-color: #fff;
    color: #ccc;
    border: 1px solid #ccc;
}

.popup3 {
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
.popup-content3 {
    position: relative;
    width: 100%;
    height: 80%;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    overflow: scroll;
    color: #000;
}

.center3 {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 100%;
    padding: 0 10px;
    /* border: 1px solid red; */
}

.pin_word {
    width: 100%;
    height: 150px;
    text-align: center;
    margin-top: 30px;
    /* border: 1px solid orange; */
}

.pin_word>p {
    font-size: 1.1rem;
    font-weight: bold;
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
    line-height: 30px;
    border: none;
    background-color: #e4e2e2;
    border-radius: 7px;
    margin-right: 5px;
}

.numbers {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 70%;
    padding: 20px 20px;
    /* border: 1px solid pink; */
}

.numbers>div {
    width: 33%;
    height: 25%;
    text-align: center;
    line-height: 60px;
    /* border: 1px solid blue; */
}
</style>