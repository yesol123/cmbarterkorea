<template>
    <div class="wrap">
        <header>
            <p>가맹점 신청</p>
        </header>

        <main>
            <div></div>
            <p>가맹점 신청이 완료되었습니다!</p>
            <p>영업일 5일 이내에 승인이 이루어집니다.</p>
            <p>승인 완료시 가맹점 서비스 이용이 가능합니다.</p>
            <button type="button" @click="toMain()">확인</button>
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
        toMain() {
            this.$router.push({ path : '/main' });
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
    margin-top: 30%;
    text-align: center;
}
main > div {
    width: 100%; height: 100px;
    margin-bottom: 30px;
    background: url('../assets/complete.png') no-repeat center;
    /* border: 1px solid red; */
}
main > p {
    margin-top: 5px;
}
main > p:nth-of-type(1) {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 20px;
}
button {
    position: fixed;
    bottom: 20px; left: 50%;
    transform: translateX(-50%);
    width: 95%; height: 35px;
    border-radius: 15px;
    border: none;
    color: #fff;
    background-color: #1bce0b;
}
</style>