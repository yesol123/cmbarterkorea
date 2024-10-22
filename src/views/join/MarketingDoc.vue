<template>
    <header>
        <button type="button" class="goback_btn" @click="toJoinPage()">
            <img src="@/assets/go_back_btn.png"></button>
        <h3>이용약관</h3>
    </header>

    <main>
        <div class="title">
            <p>마케팅/서비스,이벤트 정보제공</p>
            <p style="font-size: 0.9rem; color: #ccc;">ver. 2024.10.17.</p>
        </div>

        <div class="content">
            마케팅/서비스/이벤트 정보 제공을 위한 개인정보 수집 이용 동의<br>
            "회사"는 선택 항목으로 아래 개인정보를 추가 수집 이용합니다.<br>
            1. 수집 이용 항목<br>
            - 휴대폰번호, 회원 가입 시 수집한 항목, 서비스 이용 시 수집한 항목, 서비스 이용기록<br><br>

            2. 수집 이용 목적<br>
            - 회사에서 제공하는 서비스 일체에 대한 맞춤 서비스 제공, 마케팅 및 프로모션 활용(광고성/이벤트 정보 제공)<br><br>

            3. 보유 및 이용 기간<br>
            회원 탈퇴 또는 동의 철회시까지 합니다.<br>
            (단, 관련법령 또는 회사 정책에 의하여 보관해야 하는 경우는 예외)<br><br>

            위 개인정보 수집 이용 동의는 선택사항이므로 동의를 거부하더라도 서비스 이용이 가능합니다.<br>
            더 이상 맞춤 서비스 제공, 마케팅 및 프로모션 활용을 원하시지 않는 경우,<br>
            > 내 정보 관리 > 혜택 알림 설정 메뉴 혹은, 개별 서비스의 내 정보 관리 메뉴에서 동의를 철회하실 수 있습니다.<br>
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