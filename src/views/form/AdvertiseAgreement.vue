<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toShopIn2()"><img src="@/assets/go_back_btn.png"></button>
            <p>이용약관</p>
        </header>

        <main>
            <p style="font-weight: bold;">광고성 정보 수신 동의</p>
            <p style="font-size: 0.9rem; margin-top: 10px">ver. 2022.11.30</p>
            <div class="underline"></div>
            <div class="form">
                일반 회원에게 제공하는 서비스(가게홍보서비스, 위치정보서비스등)의 광고성 정보를 수신합니다.
                <br/>
                광고성 정보는 신규 서비스 홍보 및 "회사"에서 제공하는 서비스에 대한 소개, 이벤트 안내 등을 포함합니다.<br/>
                광고성 정보 수신 동의는 "회사" > 내 정보 관리 > 혜택 알림 설정 에서 변경할 수 있습니다.

            </div>
            <div class="underline"></div>
            <div style="font-size: 0.9rem; margin-top: 10px;">
                약관 동의일 : <br>
                정보제공 및 이용 동의를 철회한 이후부터는 해당 서비스에서 회원님의 정보를 조회할 수 없습니다.
            </div>
        </main>
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
        toShopIn2() {
            this.$router.push({ path : '/shopin2' });
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
    margin-top: 70px;
    padding: 0px 15px;
}
.underline {
    width: 100%; height: 1px;
    background-color: #ccc;
    margin-top: 20px
}
.form {
    margin-top: 20px;
    font-size: 0.9rem;
    /* border: 1px solid red; */
}
</style>