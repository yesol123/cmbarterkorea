<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toShopIn2()"><img src="@/assets/go_back_btn.png"></button>
            <p>이용약관</p>
        </header>

        <main>
            <p style="font-weight: bold;">마케팅/서비스,이벤트 정보제공</p>
            <p style="font-size: 0.9rem; margin-top: 10px">ver. 2022.11.30</p>
            <div class="underline"></div>
            <div class="form">
                마케팅/서비스/이벤트 정보 제공을 위한 개인정보 수집 이용 동의 <br />
              "회사"는 선택 항목으로 아래 개인정보를 추가 수집 이용합니다.<br />
              1. 수집 이용 항목<br />
              - 이메일주소, 휴대폰번호, 회원 가입 시 수집한 항목, 서비스 이용 시 수집한 항목, 서비스 이용기록<br /><br />

              2. 수집 이용 목적<br />
               - 회사에서 제공하는 서비스 일체에 대한 맞춤 서비스 제공, 마케팅 및 프로모션 활용(광고성/이벤트 정보 제공)<br /><br />

              3. 보유 및 이용 기간<br />
              회원 탈퇴 또는 동의 철회시까지 합니다.<br />
              (단, 관련법령 또는회사정책에 의하여 보관해야하는 경우는 예외)<br /><br />

              위 개인정보 수집 이용 동의는 선택사항이므로 동의를 거부하더라도 서비스 이용이 가능합니다.<br />
              더이상 맞춤 서비스 제공, 마케팅 및 프로모션 활용을 원하시지 않는 경우, <br />
              > 내 정보 관리 > 혜택 알림 설정 메뉴 혹은, 개별 서비스의 내 정보 관리 메뉴에서 동의를 철회하실 수 있습니다.
            
            </div>
            <div class="underline"></div>
            <div style="font-size: 0.9rem; margin-top: 10px;">
                약관 동의일 : 2022-22-22 <br>
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