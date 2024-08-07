<template>
    <div class="main_header">
        <div class="header_center">
            <div class="main_logo">
                <img src="@/assets/my.png">
                <p>일반</p>
            </div>
            <div>
                <h1>씨엠바더</h1>
            </div>
            <div>
                <img src="@/assets/setting.png">
            </div>
        </div>
    </div>

    <div class="main_content">
        <div class="pay_content">
            <div class="pay_center">
                <div class="pay_area">
                    <p>20,000CM</p>
                    <p>보유쿠폰 5장</p>
                    <p>여기를 탭하여 결제하세요.</p>
                </div>
                <div class="pay_btn">
                    <button type="button">CM내역</button>
                    <button type="button">쿠폰함</button>
                </div>
            </div>
        </div>

        <div>
            쿠폰이벤트 CM라이프 등등
        </div>
    </div>


    <Footer />
</template>

<script>
import Footer from '@/components/FooterPage.vue'

export default {
    components : {
        Footer,
    }
}
</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    font-size: 1rem;
    text-decoration: none;
    color: #000;
}
.main_header {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 70px;
    background-color: #ccc;
    /* border: 1px solid red; */
}
.header_center {
    display: flex;
    justify-content: space-between;
    width: inherit; height: inherit;
}
.header_center > div {
    width: 70px;
    text-align: center;
    padding-top: 10px;
    /* border: 1px solid blue; */
}
.header_center > div:nth-of-type(2) {
    padding-top: 25px;
}
.header_center > div:nth-of-type(3) {
    padding-top: 18px;
}
img {
    width: 35px;
}
.main_logo > p {
    font-size: small;
}
.main_content {
    margin-top: 70px;
}
.main_content {
    width: 100%; height: 100vh;
    border: 3px solid red;
}
.pay_content {
    width: 100%; height: 200px;
    /* border: 2px solid blue; */
    background-color: #ccc;
}
.pay_center {
    padding: 20px;
    /* border: 1px solid orange; */
}
.pay_area {
    background-color: rgb(9, 9, 116);
    text-align: center;
    border-radius: 10px;
    border: 3px solid #fff;
}
.pay_area > p {
    color: #fff
}
.pay_btn {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    /* border: 1px solid orange; */
}
button {
    width: 130px; height: 30px;
    background-color: #fff;
    color: rgb(9, 9, 116);
    font-weight: bold; font-size: 0.9rem;
    border-radius: 10px;
    border: none;
}
</style>