<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toShopIn2()"><img src="@/assets/go_back_btn.png"></button>
            <p>가맹점 신청</p>
        </header>

        <main>
            <div class="index">
                <div>1</div><span></span><div>2</div><span></span><div>3</div>
            </div>

            <div>
                <p style="font-weight: bold;">사업자 정보를 입력해 주세요.</p>
                <p style="font-size: 0.9rem; margin-top: 10px">모두 입력해 주셔야 다음 페이지로 이동 가능합니다.</p>

                <div class="person_info">
                    <p>신청자 정보</p>
                    <div>
                      <p>이름</p>  
                      <p>씨엠바더</p>  
                      <p>휴대폰 번호</p>  
                      <p>010-1234-5678</p>  
                    </div>
                    <p style="margin-top: 5px;">*신청자 정보와 제출하신 사업자등록증 상의 대표자명이 다를 경우, 가맹점 승인이 제한될 수 있습니다.</p>
                </div>

                <p style="font-weight: bold; margin: 20px 0;">사업자 등록 정보 입력</p>

                <div class="biz_info">
                    <p>사업자등록번호</p>
                    <input type="number" placeholder="숫자만 입력(-제외)">
                    <button type="button">중복 확인</button>
                    <p>*사업자등록번호 10자리를 입력해주세요.</p>
                    <button type="button">사업자등록번호 진위 여부 확인</button>
                </div>

                <div class="company_info">
                    <p>상호 또는 법인명(단체명)</p>
                    <input type="text" placeholder="상호 또는 법인명(단체명)">
                    <select>
                        <option>사업자유형</option>
                        <option>비영리단체</option>
                        <option>일반과세자</option>
                        <option>간이과세자</option>
                    </select>
                    <p>대표자</p>
                    <input type="text" placeholder="사업자등록증 상 대표자명">
                </div>

                <div class="company_img">
                    <p>사업자등록증 사진 업로드</p>
                    <div>
                        <p>파일을 업로드해주세요.</p>
                    </div>
                    <p>*가맹점 심사 담당자가 내용을 확인할 수 있는 사업자등록증 스캔 이미지 또는 사진을 등록해 주세요.</p>
                </div>
            </div>

            <button type="button" class="nextbtn" @click="toShopIn4()">다음</button>
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
        },
        toShopIn4() {
            this.$router.push({ path : '/shopin4' });
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
.index > div:nth-of-type(2) {
    background-color: #1bce0b;
    color: #fff;
    border: none;
}
.index > span {
    width: 20px; height: 1px;
    border: 1px solid #ccc;
}
.person_info {
    margin-top: 20px;
    /* border: 1px solid red; */
}
.person_info > p {
    font-weight: bold;
}
.person_info > p:nth-of-type(2) {
    font-weight: 100;
    font-size: 0.8rem;
}
.person_info > div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
}
.person_info > div p {
    width: 50%; height: 35px;
    line-height: 35px;
    font-size: 0.9rem;
}
.person_info > div p:nth-of-type(2), .person_info > div p:nth-of-type(4) {
    text-align: right;
}
.person_info > div p:nth-of-type(1), .person_info > div p:nth-of-type(2) {
    border-bottom: 1px solid #ccc;
}
.biz_info {
    /* border: 1px solid red; */
}
.biz_info > p:nth-of-type(1) {
    font-weight: bold;
    margin-bottom: 10px;
}
.biz_info > input {
    width: 75%; height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 0.9rem;
    padding: 0 0 0 5px;
}
.biz_info > button:nth-of-type(1) {
    width: 25%; height: 30px;
    border-radius: 15px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 0.9rem;
}
.biz_info > p:nth-of-type(2) {
    font-size: 0.8rem;
    margin-top: 5px;
}
.biz_info > button:nth-of-type(2) {
    width: 100%; height: 35px;
    border-radius: 15px;
    border: none;
    background-color: #1bce0b;
    font-size: 0.9rem;
    margin-top: 20px;
    color: #fff;
}
.company_info {
    margin-top: 20px;
    /* border: 1px solid red; */
}
.company_info > p {
    font-weight: bold;
}
.company_info > input:nth-of-type(1) {
    width: 100%; height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    font-size: 0.9rem;
    padding: 0 0 0 5px;
}
.company_info > select {
    width: 100%;
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    font-size: 0.9rem;
}
.company_info > select option {
    font-size: 0.8rem;
}
.company_info > input:nth-of-type(2) {
    width: 100%; height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    font-size: 0.9rem;
    padding: 0 0 0 5px;
}
.company_img {
    margin-top: 20px;
    /* border: 1px solid red; */
}
.company_img > p:nth-of-type(1) {
    font-weight: bold;
}
.company_img > div {
    width: 100%; height: 200px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px dashed #ccc;
}
.company_img > div p {
    text-align: center;
    line-height: 200px;
    font-size: 0.9rem;
}
.company_img > p:nth-of-type(2) {
    font-size: 0.8rem;
    margin-top: 5px;
}
.nextbtn {
    width: 100%; height: 35px;
    margin-top: 50px;   
    border-radius: 20px;
    background-color: #fff;
    font-size: 0.9rem;
    border: 1px solid #ccc;
}
</style>