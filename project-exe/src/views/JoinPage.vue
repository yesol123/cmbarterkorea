<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn"><router-link to="/"><img src="../assets/go_back_btn.png"></router-link></button>
            <p>회원가입</p>
        </header>

        <main>
            <div class="img_holder">
                <img src="../assets/cmblogo.png">
            </div>

            <div class="join_content">
                <p>고객님</p>
                <p>환영합니다!</p>

                <div class="agreement">
                    <div>
                        <input type="checkbox" id="all_agreed">
                        <label for="all_agreed">약관 전체 동의</label>

                        <div class="underline"></div>
                    </div>

                    <div>
                        <input type="checkbox" id="all_agreed">
                        <label for="all_agreed">[필수] 이용약관 동의</label>
                        <button type="button"><img src="../assets/go_for_btn.png"></button>
                    </div>
                    <div>
                        <input type="checkbox" id="all_agreed">
                        <label for="all_agreed">[필수] 개인정보 수집 및 이용 동의</label>
                        <button type="button"><img src="../assets/go_for_btn.png"></button>
                    </div>
                    <div>
                        <input type="checkbox" id="all_agreed">
                        <label for="all_agreed">[선택] 마케팅 정보 수집/이용 동의</label>
                        <button type="button"><img src="../assets/go_for_btn.png"></button>
                    </div>
                    <div>
                        <input type="checkbox" id="all_agreed">
                        <label for="all_agreed">[선택] 광고성 정보 수신 동의</label>
                        <button type="button"><img src="../assets/go_for_btn.png"></button>
                    </div>
                    <div>
                        <input type="checkbox" id="all_agreed">
                        <label for="all_agreed">[선택] 위치기반 서비스 이용 약관 동의</label>
                        <button type="button"><img src="../assets/go_for_btn.png"></button>
                    </div>
                </div>
            </div>

            <button type="button" class="confirm_btn">확인</button>

        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    color: #000;
}
main {
    position: relative;
}
.wrap {
    width: 100%; height: 852px;
    border: 1px solid red;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 180px 0 10px;
    border: 1px solid #ccc;
}
header > p {
    line-height: 40px;
    font-size: 1rem;
    /* color: blue; */
}
.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
.img_holder {
    /* width: 233px; height: 226px; */
    padding: 15px;
    /* border: 1px solid #000; */
}
.img_holder > img {
    width: 120px; height: 100px;
}
.join_content {
    padding: 20px;
    /* border: 1px solid red; */
}
.join_content > p {
    font-size: 31px;
    font-weight: 500;
}
.agreement {
}
.agreement > div {
    position: relative;
    height: 40px;
    /* border: 1px solid blue; */
}
.agreement > div label {
    margin-left: 10px;
}
.agreement > div {
    line-height: 40px;
    margin-top: 20px;
}
.agreement > div > button {
    position: absolute;
    right: 10px;
    background-color: #fff;
    border: 1px solid #fff;
}
.agreement > div > button > img {
    width: 25px; height: 25px;
}
.underline {
    width: 100%; height: 1px;
    background-color: #ccc;
}
.agreement > div:nth-of-type(1) {
    height: 50px;
    padding-top: 5px;
}
.confirm_btn {
    position: absolute;
    /* bottom: 0; */
    width: 100%; height: 40px;
    color: #fff; background-color: #1bce0b;
    border: 1px solid red;
}
</style>