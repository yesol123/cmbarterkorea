<template>

<header class="Terms_header_title">
            <RouterLink to="/Terms"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
            <h3>약관 및 이용 동의</h3>
    </header>
<ul class="titlebox">
                            <li>
                                광고성 정보 수신 동의
                            </li>
                            <li class="version">
                                ver. 2022.11.30
                            </li>
                        </ul>


                        <div class="m_T30">
                            <p class="terms_txtview">
                                일반 회원에게 제공하는 서비스(가게홍보서비스, 위치정보서비스등)의 광고성 정보를 수신합니다.
                                <br>
                                광고성 정보는 신규 서비스 홍보 및 "회사"에서 제공하는 서비스에 대한 소개, 이벤트 안내 등을 포함합니다.<br>
                                광고성 정보 수신 동의는 "회사" &gt; 내 정보 관리 &gt; 혜택 알림 설정 에서 변경할 수 있습니다.
                            </p>
                        </div>
                        <hr class="line_l">

<div class="agree_terms m_T30 m_B30">
    <p>
        약관 동의일 :
        <span class="eng"></span></p>
    <p>
        정보제공 및 이용 동의를 철회한 이후부터는 해당 서비스에서 회원님의 정보를 조회할 수 없습니다.</p>
</div>


</template>
<script>
export default{
    name:'franchisee_Advertisement',
}
</script>
<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*ul,li,a,p{
    font-family: "Noto Sans KR", sans-serif;
    list-style: none;
    text-decoration: none;
    
}

ul{
    margin: 100px auto 0;
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 95%;
}


ul > li > a{
    display: flex;
    justify-content: space-between;
    width: 100%;

}

.terms{
    width: 100%;
    margin: 0 auto;
}

.Terms_header_title{
    display: flex;
    align-items: center;
    justify-content: center; /* 가운데 정렬 */
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    /* max-width: 768px; */
    transform: translateX(-50%);
    height: 60px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 800;
    border-bottom: 1px solid var(--line);
    z-index: 100;
}

.Terms_header_title > a {
    position: absolute; /* 왼쪽 버튼을 절대 위치로 */
    left: 10px; /* 왼쪽으로부터의 거리 */
    top: 50%; /* 세로 가운데 정렬 */
    transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.Terms_header_title > h3 {
    margin: 0;
    text-align: center; /* 텍스트 가운데 정렬 */
    color: #1749C2;
    font-weight: 900;
}

.m_T30{
    width: 95%;
    margin: 0 auto;
}

.terms_txtview{
    font-size: 15px;
}
.titlebox {
    border-bottom: 1px solid #f1f1f1;
    padding: 18px 20px;
}

.titlebox li:nth-child(1) {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
}

.version {
    font-size: 14px;
    font-weight: 500;
    color: #89949c;
}

.agree_terms p:nth-child(1) span {
    font-size: 16px;
    font-weight: 500;
}

.agree_terms p:nth-child(2) {
    font-size: 14px;
    color: #666;
    font-weight: 400;
}
</style>