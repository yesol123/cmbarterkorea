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
                    <input type="number" placeholder="숫자만 입력(-제외)" v-model="biz_num">
                    <p>*사업자등록번호 10자리를 입력해주세요.</p>
                    <button type="button" @click="ListUp()">사업자 번호 조회</button>
                </div>

                <div class="company_info">
                    <p>상호 또는 법인명(단체명)</p>
                    <input type="text" placeholder="상호 또는 법인명(단체명)">
                    <input type="text" placeholder="사업자유형" v-model="tax_type">
                    <!-- <select>
                        <option selected disabled>사업자유형</option>
                        <option>비영리단체</option>
                        <option>일반과세자</option>
                        <option>간이과세자</option>
                    </select> -->
                    <p style="margin-top: 20px;">사업자등록증 상 대표자명</p>
                    <input type="text" placeholder="사업자등록증 상 대표자명">
                </div>

                <div class="company_img">
                    <p>사업자등록증 사진 업로드</p>
                    <div @click="UploadCompany()">
                        <p id="text1">파일을 업로드 해주세요.</p>
                        <img id="preview1" style="display: none; width: 100%; height: 100%;">
                    </div>
                    <input type="file" id="company" style="display: none" @change="previewCompany($event)">
                    <p>*가맹점 심사 담당자가 내용을 확인할 수 있는 사업자등록증 스캔 이미지 또는 사진을 등록해 주세요.</p>
                </div>
            </div>

            <div>
                <p style="font-weight: bold; margin-top: 30px">가맹점 등록 정보 입력</p>

                <div class="shop_info">
                    <p>가게명(간판)</p>
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
                    <p style="margin-top: 20px;">가게대표 전화번호</p>
                    <input type="number" placeholder="숫자만 입력(-제외)">
                </div>

                <div class="address">
                    <p>주소</p>
                    <input type="number" placeholder="우편번호">
                    <button type="button">우편번호 검색</button>
                    <input type="text" placeholder="주소">
                    <input type="text" placeholder="상세주소 입력">
                </div>

                <div class="web">
                    <p>대표 사이트</p>
                    <input type="text" placeholder="사이트 주소">
                </div>

                <div class="board_img" @click="UploadBoard()">
                    <p>가맹점 간판 사진 업로드</p>
                    <div>
                        <p id="text2">파일을 업로드 해주세요.</p>
                        <img id="preview2" style="display: none; width: 100%; height: 100%;">
                    </div>
                    <input type="file" id="board" style="display: none" @change="previewBoard($event)">
                    <p>*가맹점 심사 담당자가 내용을 확인할 수 있는 매장 간판 사진을 등록해 주세요.</p>
                </div>

                <div class="shop_img" @click="UploadShop()">
                    <p>가맹점 매장 정면 사진 업로드</p>
                    <div>
                        <p id="text3">파일을 업로드 해주세요.</p>
                        <img id="preview3" style="display: none; width: 100%; height: 100%;">
                    </div>
                    <input type="file" id="shop" style="display: none" @change="previewShop($event)">
                    <p>*가맹점 심사 담당자가 내용을 확인할 수 있는 매장 정면 사진을 등록해 주세요.</p>
                </div>

                <!-- <div class="id">
                    <p>담당자 아이디(사업자 회원)</p>
                    <input type="text" placeholder="담당자 아이디(사업자 회원)를 입력하세요.">
                </div> -->

                <div class="limit">
                    <p style="margin-bottom: 10px;">한도 선택</p>
                    <input type="radio" checked><label> 10,000,000 CM 포인트</label><br>
                    <input type="radio"><label> 8,000,000 CM 포인트</label><br>
                    <input type="radio"><label> 5,000,000 CM 포인트</label><br>
                    <input type="radio"><label> 3,000,000 CM 포인트</label><br>
                    <input type="radio"><label> 2,000,000 CM 포인트</label>
                </div>

                <div class="fee">
                    <p style="margin-bottom: 10px;">가맹비 납부 방식</p>
                    <input type="radio" checked><label> CM</label>&emsp;
                    <input type="radio"><label> 현금</label>
                </div>

                <div class="incharge">
                    <p style="margin-bottom: 10px;">담당자 여부</p>
                    <input type="radio"><label> YES</label>&emsp;
                    <input type="radio" checked><label> NO</label>
                </div>

            </div>

            <button type="button" class="nextbtn">가맹점 신청하기</button>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            biz_num : '',
            tax_type : ''
        }
    },
    mounted() {

    },
    methods : {
        toShopIn2() {
            this.$router.push({ path : '/shopin2' });
        },
        // 사업자유형
        ListUp() {
            // const params =  new URLSearchParams({
            //     serviceKey:'u14R%2BGEwvcJIVOZqPn4ejzEslgsrrHzUiTM48ronDxfzKPBIgVJEatd4VFvVQebke2KntzrSJ1L5iiMuvtSw1w%3D%3D'
            // })

            // console.log('https://api.odcloud.kr/api/nts-businessman/v1/status?' + params.toString())            

            const jsonData = {
                b_no:[this.biz_num.toString()]
            }

            fetch('https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=u14R%2BGEwvcJIVOZqPn4ejzEslgsrrHzUiTM48ronDxfzKPBIgVJEatd4VFvVQebke2KntzrSJ1L5iiMuvtSw1w%3D%3D', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // console.log(data.data[0].tax_type);
                this.tax_type = data.data[0].tax_type;
            })
        },
        // 사업자등록증 사진 업로드
        UploadCompany() {
            document.getElementById('company').click();
        },
        // 가맹점 간판 사진 업로드
        UploadBoard() {
            document.getElementById('board').click();
        },
        // 가맹점 정면 사진 업로드
        UploadShop() {
            document.getElementById('shop').click();
        },
        previewCompany(event) {
            const file = event.target.files[0];
            const uploadText = document.getElementById('text1');
            const preview = document.getElementById('preview1');

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadText.style.display = 'none'; // 텍스트 숨기기
                    preview.src = e.target.result; // 이미지 미리보기
                    preview.style.display = 'block'; // 이미지 보이기
                };
                reader.readAsDataURL(file);
            }
        },
        previewBoard(event) {
            const file = event.target.files[0];
            const uploadText = document.getElementById('text2');
            const preview = document.getElementById('preview2');

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadText.style.display = 'none'; // 텍스트 숨기기
                    preview.src = e.target.result; // 이미지 미리보기
                    preview.style.display = 'block'; // 이미지 보이기
                };
                reader.readAsDataURL(file);
            }
        },
        previewShop(event) {
            const file = event.target.files[0];
            const uploadText = document.getElementById('text3');
            const preview = document.getElementById('preview3');

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadText.style.display = 'none'; // 텍스트 숨기기
                    preview.src = e.target.result; // 이미지 미리보기
                    preview.style.display = 'block'; // 이미지 보이기
                };
                reader.readAsDataURL(file);
            }
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
    padding: 0 150px;
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
    width: 100%; height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 0.9rem;
    padding: 0 0 0 5px;
}
/* .biz_info > button:nth-of-type(1) {
    width: 25%; height: 30px;
    border-radius: 15px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 0.9rem;
} */
.biz_info > p:nth-of-type(2) {
    font-size: 0.8rem;
    margin-top: 5px;
}
.biz_info > button:nth-of-type(1) {
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
.company_info > input {
    width: 100%; height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    font-size: 0.9rem;
    padding: 0 0 0 5px;
}
/* .company_info > select {
    width: 100%;
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    font-size: 0.9rem;
} */
/* .company_info > select option {
    font-size: 0.8rem;
} */
/* .company_info > input:nth-of-type(2) {
    width: 100%; height: 30px;
    border: none;
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    font-size: 0.9rem;
    padding: 0 0 0 5px;
} */
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
    background-color: #1bce0b;
    font-size: 0.9rem;
    border: none;
    color: #fff;
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
/* .id > p {
    margin-top: 20px;
}
.id > input {
    width: 100%; height: 35px;
    font-size: 0.8rem;
    padding: 0 0 0 5px;
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
} */
.limit {
    margin: 20px 0;
}
</style>