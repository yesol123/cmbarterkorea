<template>
    
        <header>
            <button type="button" class="goback_btn" @click="toMain()"><img src="@/assets/go_back_btn.png"></button>
            <h3>가맹점 신청</h3>
        </header>

        <section>
            <!-- 신청가능해요 -->
            <div class="one">
                <p>신청 가능해요!</p>
                <div>
                    <p>1. 사업자등록증을 소지하고</p>
                    <p>2. 정상 영업 중 또는 영업 예정 중인 가맹점 중</p>
                    <p>3. 카드 단말기 또는 포스에 바코드 리더기를 소지한 가맹점</p>
                </div>
            </div>
            <!-- 이런업종은안돼요 -->
            <div class="two">
                <p>제한업종</p>
                <div style="color: #888686; font-size: 0.9rem;s">
                    사행성(도박), 유사수신, 디지털자산(가상화폐, NFT등)대출, 다단계, 음란물/성매매, 상표권/저작권침해물품, 장기예약회원제, 상품권,유가증권, 포인트충전, 개인정보매매, 판매위법상품, 크라우드펀딩, 투자/로또 정보제공업, 허위/과장광고상품, 부동산, 인테리어업, 사행성 유흥 퇴폐업소 등
                </div>
            </div>
            <!-- 미리준비해주세요 -->
            <div class="three">
                <p>미리 준비해주세요!</p>
                <div>
                    <p>1. 사업자등록증</p>
                    <p>2. 가맹점 사진</p>
                    <p>3. 홍보용 사진(제품, 메뉴 등)</p>
                </div>
            </div>
            <!-- 유의사항 -->
            <div class="four">
                <p>유의사항</p>
                <div>
                    <p>1. 가맹 신청 시, 씨엠 사용한도액을 직접 선택해 주시기 바랍니다.</p>
                    <p>2. 선택하신 한도액에 대한 첫 결제가 이루어져야 한도가 승인됩니다.</p>
                    <p>3. 현재 가맹 프로모션 기간으로 가맹비를 현금 100만원 대신 100만 씨엠으로 지불하실 수 있습니다.</p>
                </div>
            </div>

            <button type="button" @click="toShopIn2()">가맹점 신청하기</button>
        </section>
    
</template>

<script>
export default {

    data() {
        return {

        }
    },
    mounted() {
        // window.$loadScript("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js")
        // .then(() => {
        //     toastr.warning('You clicked Warning Toast')
        // })
        // .catch(() => {
        //     // Failed to fetch script
        // });
    },
    methods : {
        toMain() {
            this.$router.push({ path : '/main' });
        },
        toShopIn2() {
            this.$router.push({ path : '/shopin2' });
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
main {
    width: 100%;
    margin-top: 50px;
    padding: 10px;
    /* border: 1px solid red; */
}
section > div {
    /* padding: 10px; */
    margin-bottom: 20px;
    /* border: 1px solid blue; */
}
section > div > p {
    font-weight: bold;
    margin-bottom: 5px;
}
section > div > div {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 7px;
}
section > div > div p {
    font-size: 0.9rem;
    color: #888686;
    margin-top: 3px;
}
button {
    width: 100%; 
    padding: 10px;
    border-radius: 20px;
    border: none;
    color: #fff;
    background-color: #1bce0b;
}
</style>