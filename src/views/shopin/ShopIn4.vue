<template>
   
        <header>
            <button type="button" class="goback_btn" @click="toShopIn3()"><img src="@/assets/go_back_btn.png"></button>
            <p>가맹점 신청</p>
        </header>

        <section>
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
                    <p style="margin-top: 20px;">대표번호전화</p>
                    <input type="number" placeholder="숫자만 입력(-제외)">
                </div>

                <div class="address">
                    <p>주소</p>
                    <input type="number" placeholder="우편번호">
                    <button type="button">우편번호 검색</button>
                    <input type="text" placeholder="주소">
                    <input type="text" placeholder="상세주소 입력">
                    <input type="text" placeholder="참조">
                </div>

                <div class="web">
                    <p>대표 사이트</p>
                    <input type="text" placeholder="사이트 주소">
                </div>

                <div class="board_img">
                    <p>가맹점 간판 사진 업로드</p>
                    <div>
                        <p>파일을 업로드해주세요.</p>
                    </div>
                    <p>*가맹점 심사 담당자가 내용을 확인할 수 있는 매장 간판 사진을 등록해 주세요.</p>
                </div>

                <div class="shop_img">
                    <p>가맹점 매장 정면 사진 업로드</p>
                    <div>
                        <p>파일을 업로드해주세요.</p>
                    </div>
                    <p>*가맹점 심사 담당자가 내용을 확인할 수 있는 매장 정면 사진을 등록해 주세요.</p>
                </div>

                <div class="id">
                    <p>담당자 아이디(사업자 회원)</p>
                    <input type="text" placeholder="담당자 아이디(사업자 회원)를 입력하세요.">
                </div>

            </div>

            <button type="button" class="shopin">가맹점 신청하기</button>
        </section>

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
        },
    }
}
</script>

<style scoped>

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
    /* border: 1px solid red; */
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
    /* border: 1px solid red; */
}
.shop_info > p {
    margin-bottom: 10px;
}
.shop_info > input {
    width: 100%; height: 35px;
    font-size: 0.8rem;
    padding: 0 0 0 5px;
    border: none;
    border-bottom: 1px solid #ccc;
}
.shop_info > select {
    width: 100%;
    font-size: 0.8rem;
    color: #ccc;
    margin-top: 20px;
    border: none;
    border-bottom: 1px solid #ccc;
}
.shop_info > select option {
    font-size: 0.8rem;
}
.address {
    /* border: 1px solid red; */
}
.address > p {
    margin-top: 20px;
}
.address > input {
    width: 100%; height: 35px;
    font-size: 0.8rem;
    padding: 0 0 0 5px;
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
}
.address > input:nth-of-type(1) {
    width: 70%; height: 35px;
    font-size: 0.8rem;
    padding: 0 0 0 5px;
    border: none;
    border-bottom: 1px solid #ccc;
}
.address > button {
    width: 30%; height: 35px;
    font-size: 0.8rem;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
}
.web {
    /* border: 1px solid red; */
}
.web > p {
    margin-top: 20px;
}
.web > input {
    width: 100%; height: 35px;
    font-size: 0.8rem;
    padding: 0 0 0 5px;
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
}
.board_img > p:nth-of-type(1) {
    margin-top: 20px;
}
.board_img > div {
    width: 100%; height: 200px;
    border-radius: 5px;
    border: 1px dashed #ccc;
}
.board_img > div p {
    text-align: center;
    line-height: 200px;
    font-size: 0.9rem;
}
.board_img > p:nth-of-type(2) {
    font-size: 0.8rem;
    margin-top: 5px;
}
.shop_img > p:nth-of-type(1) {
    margin-top: 20px;
}
.shop_img > div {
    width: 100%; height: 200px;
    border-radius: 5px;
    border: 1px dashed #ccc;
}
.shop_img > div p {
    text-align: center;
    line-height: 200px;
    font-size: 0.9rem;
}
.shop_img > p:nth-of-type(2) {
    font-size: 0.8rem;
    margin-top: 5px;
}
.id > p {
    margin-top: 20px;
}
.id > input {
    width: 100%; height: 35px;
    font-size: 0.8rem;
    padding: 0 0 0 5px;
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
}
.shopin {
    width: 100%; height: 35px;
    margin-top: 50px;   
    border-radius: 20px;
    background-color: #fff;
    font-size: 0.9rem;
    border: 1px solid #ccc; 
}
</style>