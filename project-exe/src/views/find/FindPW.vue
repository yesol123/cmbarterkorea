<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn"><router-link to="/"><img src="@/assets/go_back_btn.png"></router-link></button>
            <p>비밀번호 확인</p>
        </header>

        <main>
            <div class="join_form">
                <div>
                    <label for="id">새 비밀번호 입력</label>
                    <input type="text" id="id" placeholder=" 영문,숫자 조합 8자리">
                </div>
                <div>
                    <label for="password">새 비밀번호 확인</label>
                    <input type="password" id="password">
                </div>
            </div>    

            <div class="change_btn_holder">
                <button type="button" class="change_btn">변경</button>
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
.change_btn_holder {
    position: absolute;
    left: 50%; bottom: 10px;
    transform: translateX(-50%);
    width: 95%; height: 40px;
    border-radius: 25px;
    /* border: 1px solid blue; */
}
.change_btn {
    width: 100%; height: 100%;
    background-color: #1bce0b; color: #fff;
    border: none; border-radius: 10px;
    /* border: 1px solid red; */
}
.join_form {
    width: 100%;
    padding: 20px;
    /* border: 1px solid red; */
}
.join_form label {
    display: block;
    margin-top: 20px;
    /* border: 1px solid red; */
}
.join_form input {
    display: block;
    width: 100%; height: 40px;
    margin-top: 5px;
    border-radius: 10px;
    border: 1px solid #ccc;
}
</style>