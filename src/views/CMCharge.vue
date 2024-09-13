<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn"><img src="@/assets/go_back_btn.png"></button>
            <p>충전</p>
        </header>
        <!-- 현재CM -->
        <div class="cm_amount">
            <p>현재 CM</p>
            <div>
                <div>
                    <p>보유 자산</p>
                </div>
                <div>
                    <p>100,000,000 CMP</p>
                    <p>0 CM</p>
                </div>
            </div>
        </div>
        <!-- 충전할CM -->
        <div class="cm_charging">
            <p>충전 할 CM</p>
            <div>
                <input type="number" placeholder="금액을 입력하세요.">
                <p>* 최소 충전 금액은 10,000 CM 입니다.</p>
            </div>
        </div>
        <!-- 충전후CM -->
        <div class="cm_charged">
            <p>충전 후 CM</p>
            <div>
                <div>
                    <p>보유 자산</p>
                </div>
                <div>
                    <p>100,000,000 CMP</p>
                    <p>0 CM</p>
                </div>
            </div>
        </div>
        <!-- 충전수수료 -->
        <div class="cm_fee">
            <p>충전 수수료</p>
            <div>
                <p>0원</p>
                <p>* 충전 수수료는 충전 CM의 10% 입니다.</p>
            </div>
        </div>

        <button type="button" class="charge_btn">충전하기</button>
    </div>

    <Footer />
</template>

<script>
import Footer from '@/components/FooterPage.vue'

export default {
    components : {
        Footer,
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods : {

    }
}

</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 1rem;
    color: #000;
}
.wrap {
    position: relative;
    width: 100%;
    background-color: #fff;
    /* border: 1px solid red; */
    margin-bottom: 70px;
    padding: 0 20px;
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
.cm_amount {
    width: 100%;
    margin-top: 70px;
    /* border: 1px solid blue; */
}
.cm_amount > p {
    font-weight: bold;
}
.cm_amount > div {
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 30px 20px;
    border-radius: 10px;
    margin-top: 10px;
    border: 1px solid #1bce0b;
}
.cm_amount > div p {
    font-size: 0.9rem;
}
.cm_amount > div > div:nth-of-type(2) p {
    text-align: right;
}
.cm_charging {
    width: 100%;
    margin-top: 20px;
    /* border: 1px solid blue; */
}
.cm_charging > p {
    font-weight: bold;
}
.cm_charging > div {
    width: 100%;
    margin-top: 10px;
}
.cm_charging input {
    width: 100%; height: 35px;
    border-radius: 7px;
    padding-left: 10px;
    border: 1px solid #ccc;
}
.cm_charging input::placeholder {
    font-size: 0.9rem;
}
.cm_charging > div > p {
    color: red;
    font-weight: bold;
    font-size: 0.7rem;
    text-align: right;
    margin-top: 5px;
}
.cm_charged {
    width: 100%;
    margin-top: 20px;
    /* border: 1px solid orange; */
}
.cm_charged > p {
    font-weight: bold;
}
.cm_charged > div {
    display: flex;
    justify-content: space-between;

    width: 100%;
    margin-top: 10px;
    padding: 30px 20px;
    border-radius: 10px;
    border: 1px solid #1bce0b;
}
.cm_charged > div p {
    font-size: 0.9rem
}
.cm_charged > div > div:nth-of-type(2) p {
    text-align: right;
}
.cm_fee {
    width: 100%;
    margin-top: 20px;
    /* border: 1px solid blue; */
}
.cm_fee > p {
    font-weight: bold;
}
.cm_fee > div {
    width: 100%;
    margin-top: 10px;
    /* border: 1px solid #000; */
    text-align: right;
}
.cm_fee > div p {
    font-size: 0.9rem;
}
.cm_fee > div p:nth-of-type(2) {
    color: red;
    font-weight: bold;
    font-size: 0.7rem;
    margin-top: 5px;
}
.charge_btn {
    position: fixed;
    bottom: 60px; left: 50%;
    transform: translateX(-50%);
    width: 95%; height: 40px;
    background-color: #1bce0b;
    border: none;
    color: #fff;
    border-radius: 7px;
}
</style>