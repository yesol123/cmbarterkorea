<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toShopIn3()"><img src="@/assets/go_back_btn.png"></button>
            <p>가맹점 신청</p>
        </header>

        <main>
            <div class="index">
                <div>1</div><span></span><div>2</div><span></span><div>3</div>
            </div>

            <div>
                <p style="font-weight: bold;">가맹점 정보를 입력해 주세요.</p>
                <p style="font-size: 0.9rem; margin-top: 10px">모두 입력해 주셔야 다음 페이지로 이동 가능합니다.</p>

                <div class="shop_info">
                    <p>가맹점 등록 정보 입력</p>
                    <p>가맹점명</p>
                    <input type="text" placeholder="고객에게 보이는 가맹점명">
                    <select>
                        <option>가맹점유형</option>
                        <option>슈퍼/마트</option>
                        <option>레저</option>
                        <option>미용/뷰티/위생</option>
                        <option>병원/약국</option>
                        <option>스포츠/헬스</option>
                        <option>식품</option>
                        <option>학원/교육</option>
                        <option>서비스업</option>
                        <option>가구/인테리어</option>
                        <option>디지털/가전</option>
                        <option>생활/주방용품</option>
                        <option>음식점/카페</option>
                        <option>패션잡화</option>
                        <option>기타 도소매</option>
                    </select>
                    <p>대표번호전화</p>
                    <input type="number" placeholder="숫자만 입력(-제외)">
                </div>

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
        toShopIn3() {
            this.$router.push({ path : '/shopin3' });
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
    width: 100%;
    margin-top: 50px;
    padding: 10px;
    border: 1px solid red;
}
.index {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0 50px 0;
    padding: 0 100px;
    /* border: 1px solid blue; */
}
.index > div {
    width: 25px; height: 25px;
    margin: 0 auto;
    border-radius: 50px;
    text-align: center; line-height: 25px;
    color: #ccc;
    border: 1px solid #ccc;
}
.index > div:nth-of-type(3) {
    background-color: #1bce0b;
    color: #fff;
    border: none;
}
.index > span {
    width: 20px; height: 1px;
    border: 1px solid #ccc;
}
.shop_info {
    margin-top: 20px;
    border: 1px solid red;
}
.shop_info > p {
    margin-bottom: 10px;
}
.shop_info > input:nth-of-type(1) {
    width: 100%;
    font-size: 0.8rem;
    padding: 0 0 0 5px;
    border: none;
    border-bottom: 1px solid #ccc;
}
.shop_info > select {
    width: 100%;
    font-size: 0.8rem;
    color: #ccc;
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
}
</style>