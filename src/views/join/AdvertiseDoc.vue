<template>
    <header>
        <button type="button" class="goback_btn" @click="toJoinPage()">
            <img src="@/assets/go_back_btn.png"></button>
        <h3>이용약관</h3>
    </header>

    <main>
        <div class="title">
            <p>광고성 정보 수신 동의</p>
            <p style="font-size: 0.9rem; color: #ccc;">ver. 2024. 10. 17</p>
        </div>

        <div class="content">
            "일반회원" 회원에게 제공하는 서비스(가게홍보서비스, 위치정보서비스등)의 광고성 정보를 수신합니다.<br>
            광고성 정보는 신규 서비스 홍보 및 회사에서 제공하는 서비스에 대한 소개, 이벤트 안내 등을 포함합니다.<br>
            광고성 정보 수신 동의는 회사 > 내 정보 관리 > 혜택 알림 설정 에서 변경할 수 있습니다
        </div>
    </main>
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
        toJoinPage() {
            this.$router.push({ path : '/join' });
        }
    }
}
</script>

<style scoped>
.goback_btn {
    width: 30px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
main {
    margin-top: 100px;
    padding: 0 15px;
    margin-bottom: 70px;
}
.title {
    width: 100%;
    padding: 0 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
}
.title > p {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 10px;
}
</style>
