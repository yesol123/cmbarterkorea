<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toCouponMake()"><img src="@/assets/go_back_btn.png"></button>
            <p>쿠폰 이벤트 등록</p>
        </header>

        <div class="main">
            <div>
                <label>쿠폰 종류</label>
                <input type="text" placeholder="전체">
            </div>
            <div>
                <label>이벤트 이름</label>
                <input type="text" placeholder="15글자 이내">
            </div>
            <div>
                <label>적용할 조건</label>
                <input type="text">
            </div>
            <div>
                <label>다운로드 횟수</label>
                <input type="number">
            </div>

            <div>
                <button type="button">전체선택</button>
                <button type="button">등록</button>
            </div>
        </div>

        <div class="coupon_list">
            <ul class="flex_direction">
                <li class="coupon_com">
                    <div class="back_ground_coupon">
                        <ul class="coupon_conditions">
                            <div><input type="checkbox"></div>
                            <div>              
                            <li>테스트쿠폰</li>
                            <li>보유중</li>
                            <li>2024-09-18</li>
                            </div>
                            <div class="t">
                                <img src="@/assets/1000_t.png" alt="">
                            </div>
                        </ul>
                    </div>
                    <button @click="gotoDetail()">쿠폰 상세보기</button>
                </li>
            </ul>

            <ul class="flex_direction">
                <li class="coupon_com">
                    <div class="back_ground_coupon">
                        <ul class="coupon_conditions">
                            <div><input type="checkbox"></div>
                            <div>              
                            <li>테스트쿠폰</li>
                            <li>보유중</li>
                            <li>2024-09-18</li>
                            </div>
                            <div class="t">
                                <img src="@/assets/1000_t.png" alt="">
                            </div>
                        </ul>
                    </div>
                    <button @click="gotoDetail()">쿠폰 상세보기</button>
                </li>
            </ul>

            <ul class="flex_direction">
                <li class="coupon_com">
                    <div class="back_ground_coupon">
                        <ul class="coupon_conditions">
                            <div><input type="checkbox"></div>
                            <div>              
                            <li>테스트쿠폰</li>
                            <li>보유중</li>
                            <li>2024-09-18</li>
                            </div>
                            <div class="t">
                                <img src="@/assets/1000_t.png" alt="">
                            </div>
                        </ul>
                    </div>
                    <button @click="gotoDetail()">쿠폰 상세보기</button>
                </li>
            </ul>
        </div>
    </div>

    
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    methods : {
        // 쿠폰발행함으로 이동
        toCouponMake() {
            this.$router.push({ path : '/cmake' });
        },
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
.main {
    width: 95%;
    margin: 50px auto 0;
    /* border: 1px solid red; */
}
.main > div {
    width: 100%;
    /* border: 1px solid blue; */
}
.main > div:nth-of-type(5) {
    text-align: center;
    margin-top: 20px;
}
.main > div label {
    font-size: 0.9rem;
    font-weight: bold;
}
.main > div input {
    display: block;
    width: 100%; height: 35px;
    padding: 5px;
    font-size: 0.9rem;
    margin: 5px 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.main button {
    width: 90px; height: 30px;
    font-size: 0.9rem;
    border: none;
    color: #fff;
    background-color: #1bce0b;
    border-radius: 5px;
}
.main button:nth-of-type(2) {
    margin-left: 50px;
}
.coupon_list {
    width: 95%;
    margin: 10px auto 0;
    overflow: scroll;
    /* border: 1px solid red; */
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
    background-image: url("@/assets/1000.jpg");
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
    width: 30%;
}
.t img {
    width: 100%;
}
</style>