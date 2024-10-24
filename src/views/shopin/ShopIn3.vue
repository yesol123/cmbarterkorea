<template>
   
        <header>
            <button type="button" class="goback_btn" @click="toShopIn2()"><img src="@/assets/go_back_btn.png"></button>
            <p>가맹점 신청</p>
        </header>

        <section>
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
                      <p>{{ name }}</p>  
                      <p>휴대폰 번호</p>  
                      <p>{{ phone }}</p>  
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
                    <input type="text" placeholder="상호 또는 법인명(단체명)" v-model="biz_name">
                    <input type="text" placeholder="사업자유형" v-model="tax_type">
                    <!-- <select>
                        <option selected disabled>사업자유형</option>
                        <option>비영리단체</option>
                        <option>일반과세자</option>
                        <option>간이과세자</option>
                    </select> -->
                    <p style="margin-top: 20px;">사업자등록증 상 대표자명</p>
                    <input type="text" placeholder="사업자등록증 상 대표자명" v-model="biz_ceo">
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
                    <input type="text" placeholder="고객에게 보이는 가맹점명" v-model="shop_name">
                    <select v-model="shop_option">
                        <option selected disabled>가맹점유형</option>
                        <option value="1">슈퍼/마트</option>
                        <option value="2">레저</option>
                        <option value="3">미용/뷰티/위생</option>
                        <option value="4">병원/약국</option>
                        <option value="5">스포츠/헬스</option>
                        <option value="6">식품</option>
                        <option value="7">학원/교육</option>
                        <option value="8">서비스업</option>
                        <option value="9">가구/인테리어</option>
                        <option value="10">디지털/가전</option>
                        <option value="11">생활/주방용품</option>
                        <option value="12">음식점/카페</option>
                        <option value="13">패션잡화</option>
                        <option value="14">기타 도소매</option>
                    </select>
                    <p style="margin-top: 20px;">가게대표 전화번호</p>
                    <input type="number" placeholder="숫자만 입력(-제외)" v-model="shop_tel">
                </div>

                <div class="address">
                    <p>주소</p>
                    <input type="number" placeholder="우편번호" v-model="postcode">
                    <button type="button" @click="GetPostCode()">우편번호 검색</button>
                    <input type="text" placeholder="주소" v-model="address">
                    <input type="text" placeholder="상세주소 입력" v-model="extra_address">
                </div>

                <div class="web">
                    <p>대표 사이트</p>
                    <input type="text" placeholder="사이트 주소" v-model="website">
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
                    <input type="radio" v-model="limit" value="10000000" id="first_limit"><label for="first_limit"> 10,000,000 CM 포인트</label><br>
                    <input type="radio" v-model="limit" value="8000000" id="second_limit"><label for="second_limit"> 8,000,000 CM 포인트</label><br>
                    <input type="radio" v-model="limit" value="5000000" id="third_limit"><label for="third_limit"> 5,000,000 CM 포인트</label><br>
                    <input type="radio" v-model="limit" value="3000000" id="fourth_limit"><label for="fourth_limit"> 3,000,000 CM 포인트</label><br>
                    <input type="radio" v-model="limit" value="2000000" id="fifth_limit"><label for="fifth_limit"> 2,000,000 CM 포인트</label>
                </div>

                <div class="fee">
                    <p style="margin-bottom: 10px;">가맹비 납부 방식</p>
                    <input type="radio" v-model="fee" value="CM" id="cm"><label for="cm"> CM</label>&emsp;
                    <input type="radio" v-model="fee" value="현금" id="cash"><label for="cash"> 현금</label>
                </div>

                <div class="incharge">
                    <p style="margin-bottom: 10px;">담당자 여부</p>
                    <input type="radio" v-model="in_charge" value="Y" id="yes"><label for="yes"> YES</label>&emsp;
                    <input type="radio" v-model="in_charge" value="N" id="no"><label for="no"> NO</label>
                </div>

            </div>

            <button type="button" class="nextbtn" @click="ShopIn()">가맹점 신청하기</button>
        </section>
    
</template>

<script>
import { useResponseStore } from '@/store/response.js'
import router from '@/router/index.js';

export default {
    data() {
        return {
            x : '',
            y : '',
            name : '',
            phone : '',
            biz_num : '',
            biz_name : '',
            biz_ceo : '',
            tax_type : '',
            postcode : '',
            address : '',
            extra_address : '',
            company_img : '',
            board_img : '',
            shop_img : '',
            shop_name : '',
            shop_option : '가맹점유형',
            shop_tel : '',
            website : '',
            limit : '10000000',
            fee : 'CM',
            in_charge : 'N'
        }
    },
    mounted() {
        // 이름,번호 조회
        this.GetInfo();

        // console.log(this.limit)
    },
    methods : {
        toShopIn2() {
            this.$router.push({ path : '/shopin2' });
        },
        GetInfo() {
            let store = useResponseStore();

            const formData = new FormData();
            formData.append('type', 'user_get');
            formData.append('user_index', store.user_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/common/user.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.name = data.msg[0].user_name;
                this.phone = data.msg[0].user_phone;
            })

        },
        // 사업자 번호 조회
        ListUp() {
            // const params =  new URLSearchParams({
            //     serviceKey:'u14R%2BGEwvcJIVOZqPn4ejzEslgsrrHzUiTM48ronDxfzKPBIgVJEatd4VFvVQebke2KntzrSJ1L5iiMuvtSw1w%3D%3D'
            // })

            // console.log('https://api.odcloud.kr/api/nts-businessman/v1/status?' + params.toString())            

            if(this.biz_num == '') {
                alert('사업자등록번호를 입력해주세요.');
                return false;
            }

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
            this.company_img = file;
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
            this.board_img = file;
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
            this.shop_img = file;
            // console.log(this.shop_img);
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
        },
        // 우편번호찾기
        GetPostCode() {

            this.postcode = '';
            this.address = '';

            new window.daum.Postcode({
                oncomplete : (data) => {
                    console.log(data);
                    this.postcode = data.zonecode;
                    this.address = data.roadAddress;

                    // 우편번호로 좌표찾기
                    var geocoder = new window.kakao.maps.services.Geocoder();

                    var callback = (result, status) => {
                        if(status === window.kakao.maps.services.Status.OK) {

                            console.log(result);
                            console.log(result[0].x);
                            console.log(result[0].y);
                            this.x = result[0].x;
                            this.y = result[0].y;
                        }
                    }

                    geocoder.addressSearch(this.address, callback);

                }
            })
            .open();
        },
        // 가맹점 신청하기
        ShopIn() {
            if(this.name == '') {
                alert('신청자 이름을 입력해주세요.');
                return false;
            }
            if(this.phone == '') {
                alert('신청자 휴대폰 번호를 입력해주세요.');
                return false;
            }
            if(this.biz_num == '') {
                alert('사업자등록번호를 입력해주세요.');
                return false;
            }
            if(this.biz_name == '') {
                alert('상호 또는 법인명을 입력해주세요.');
                return false;
            }
            if(this.tax_type == '국세청에 등록되지 않은 사업자등록번호입니다.') {
                alert('사업자등록번호를 다시 한번 확인해주세요.');
                return false;
            }
            if(this.biz_ceo == '') {
                alert('대표자명을 입력해주세요.');
                return false;
            }
            if(this.company_img == '') {
                alert('사업자등록증 사진을 업로드해주세요.');
                return false;
            }
            if(this.shop_name == '') {
                alert('가게명을 입력해주세요.');
                return false;
            }
            if(this.shop_option == '가맹점유형') {
                alert('가맹점유형을 선택해주세요.');
                return false;
            }
            if(this.shop_tel == '') {
                alert('가게 전화번호를 입력해주세요.');
                return false;
            }
            if(this.postcode == '') {
                alert('우편번호를 입력해주세요.');
                return false;
            }
            if(this.address == '') {
                alert('주소를 입력해주세요.');
                return false;
            }
            if(this.extra_address == '') {
                alert('상세주소를 입력해주세요.');
                return false;
            }
            if(this.website == '') {
                alert('대표 사이트를 입력해주세요.');
                return false;
            }
            if(this.board_img == '') {
                alert('가맹점 간판 사진을 업로드해주세요.');
                return false;
            }
            if(this.shop_img == '') {
                alert('가맹점 매장 사진을 업로드해주세요.');
                return false;
            }

            // 기존 가입 여부 체크
            let store = useResponseStore();
            const formData = new FormData();
            formData.append('type', 'fran_join_check');
            formData.append('user_index', store.user_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/join/joinform.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if(data.msg.length == 1) {
                    alert('이미 가입된 가맹점입니다.');
                    return false;
                }
                if(data.msg.length == 0) {
                    // 결제창
                    let tx = store.user_id + Math.floor(+ new Date() / 1000);

                    window.TPO.pay({
                        amount : parseInt(1000), // 최소금액
                        publicKey: 'pk_1703-f7d8df-4f6-dff5a',
                        products: [{ name: 'cm', desc: 'description' }],
                        trackId: tx,  // 유저 ID 또는 트랜잭션 ID
                        responseFunction: async () => {
                            await this.eventFnc();
                        },  // 응답 받을 함수
                        // redirectUrl: 'https://your-redirect-url.com',
                        // webhookUrl: 'https://your-webhook-url.com',
                        tmnId: "cm0000", // 터미널 키
                        payerName: this.name,
                        payerEmail: '',
                        payerTel: this.phone,
                        mode: 'layer',   // 레이어 모드로 결제 창 표시
                        debugMode: 'live' // 실시간 모드
                    })
                }
            })
        },
        // 가맹정 가입
        eventFnc(data) {
            let json_data = JSON.stringify(data);
            console.log(json_data);

            let store = useResponseStore();
            let tx = store.user_id + Math.floor(+ new Date() / 1000);

            // let json_data = JSON.stringify(data);

            // if(json_data.result.resultCd == '0000') {

                const formData = new FormData();
                formData.append('type', 'fran_join');
                formData.append('user_index', store.user_index);
                formData.append('manager_radio', this.in_charge);  // 담당자여부
                formData.append('business_number', this.biz_num); // 사업자등록번호
                formData.append('tax_type', this.tax_type); // 과세유형
                formData.append('business_name', this.biz_name); // 법인명
                formData.append('ceo', this.biz_ceo); // 대표자명
                formData.append('franchise_name', this.shop_name); // 가게명
                formData.append('franchise_type', this.shop_option); // 가맹점유형
                formData.append('franchise_number', this.shop_tel); // 가게 전화번호
                formData.append('link', this.website); // 가게 대표 웹사이트
                formData.append('zip_code', this.postcode); // 우편번호
                formData.append('post', this.address); // 주소
                formData.append('post_detail', this.extra_address); // 상세주소
                formData.append('pos1', this.y); // 위도
                formData.append('pos2', this.x); // 경도
                formData.append('limit_type', this.limit); // CM한도
                formData.set('file', this.company_img); // 사업자등록증 사진
                formData.set('file2', this.board_img); // 가게간판 사진
                formData.set('file3', this.shop_img); // 가게정면 사진
                formData.append('trxId', tx); // 거래명
                formData.append('fee_radio', this.fee); // 가맹비 납부 방식
                formData.append('limit_value', 1000); // 실제결제금액
                formData.append('user_id', store.user_id);

                
                const url = process.env.VUE_APP_API_URL;

                fetch(url + 'api/join/joinform.php', {
                method : 'POST',
                body : formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log('가맹점가입여부');
                    console.log(data);

                    for (let key of formData.keys()) {
                        console.log(key, ":", formData.get(key));
                    }

                    if(data.code == 200) {
                        router.push({ path : '/complete' });
                    }

                })

            // }

        }
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
p {
    color: #000;
}
input {
    color: #000;
    background-color: #fff;
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