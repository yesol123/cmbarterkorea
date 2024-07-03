<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn"><router-link to="/join"><img src="../assets/go_back_btn.png"></router-link></button>
            <p>회원가입</p>
        </header>

        <main>
            <div class="auth_content">
                <p>휴대폰 인증하기</p>
                <p>본인인증을 위해 버튼을 클릭해주세요.</p>
                <p>휴대폰 인증을 통해 본인 인증 절차를 완료해야 회원가입이 가능합니다.</p>
            </div>

            <div class="auth_btn_holder">
                <button type="button" class="auth_btn">휴대폰 인증하기</button>
            </div>
        </main>
    </div>
</template>

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
    width: 100%; height: 100vh;
    border: 1px solid red;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; height: 40px;
    padding: 0 10px;
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
.auth_content {
    width: 100%;
    padding: 50px 20px;
    /* border: 1px solid red; */
}
.auth_content > p:nth-of-type(1),:nth-of-type(2) {
    font-size: 1.2rem;
}
.auth_content > p:last-child {
    font-size: 0.9rem;
    margin-top: 10px;
}
.auth_btn_holder {
    position: absolute;
    left: 50%; bottom: 10px;
    transform: translateX(-50%);
    width: 95%; height: 40px;
    border-radius: 25px;
    /* border: 1px solid blue; */
}
.auth_btn {
    width: 100%; height: 100%;
    background-color: #1bce0b; color: #fff;
    border: none; border-radius: 10px;
    /* border: 1px solid red; */
}
</style>