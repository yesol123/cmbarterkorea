

<template>
    <section class="mypage_1">
        <header class="mypage_1_header_title">
            <RouterLink to="/main"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
            <h3> 내 정보</h3>
        </header>
         <div class="info">
            <p>박하루</p>
            <p>ge0001</p>
         </div>


         <ul>
            <span class="title">회원정보</span>
            <li class="info2"><span class="flex_"><img class="img_f" src="@/assets/icon_mobile.svg" alt=""><p class="sub_title">핸드폰</p></span> <span>010-4341-7321</span></li>
         </ul>

          <ul class="list1">
            <span class="title">보안 / 알림</span>
            <li><RouterLink to="/changepw"><span class="flex_"><img class="img_f" src="@/assets/icon_pw.svg" alt=""><p class="sub_title">비밀번호 번경</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
            <li><RouterLink to="/ChangePin1"><span class="flex_"><img  class="img_f" src="@/assets/icon_pin.svg" alt=""><p class="sub_title">핀번호 번경</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
          </ul>
          <ul class="list1">
            <span class="title"> 고객센터</span>
            <li><RouterLink to="Notice"><span class="flex_"><img  class="img_f" src="@/assets/icon_services.svg" alt=""><p class="sub_title">공지사항</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
            <li><a href=""><span class="flex_"><img class="img_f" src="@/assets/icon_services.svg" alt=""><p class="sub_title"> Q&A</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></a></li>
            <li><a href=""><span class="flex_"><img class="img_f"  src="@/assets/icon_services.svg" alt=""><p class="sub_title">카카오톡 상담하기</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></a></li>
          </ul>
          <ul>
            <span class="title">정책</span>
            <li><a href=""><img src="@/assets/icon_agree.svg" alt=""><p class="sub_title">약관 및 이용 동의</p></a></li>
            <li><a href=""><img src="@/assets/icon_logout.svg" alt=""><p class="sub_title"> 로그아웃</p></a></li>
          </ul>

         
            <div class="footer_div">
                <p>씨엠바더코리아(주) | 사업자 등록번호 364-86-03002</p>
                <p>주소:서울 금천구 가산디지털1로 171,601~606호(가산동,SKV1센터)<span>대표자 박재능</span></p>
                <p>연락처:1566-1691</p>
                <p>Copyright © CMBARTER KOREA All Rights Reserved.</p>
            </div>
            
    </section>
    <Footer class="footer" />
</template>

<script>
import Footer from '@/components/FooterPage.vue'
import { RouterLink } from 'vue-router';




export default{
    name: 'MyPage1',
    components:{
        Footer,
        RouterLink
    },
    methods:{

    }
    
}
</script>

<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*p,span{
    font-family: "Noto Sans KR", sans-serif;
    
}

.mypage_1{
    width: 100%;
    margin: 0 auto;
}

.mypage_1_header_title{
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

.mypage_1_header_title > a {
    position: absolute; /* 왼쪽 버튼을 절대 위치로 */
    left: 10px; /* 왼쪽으로부터의 거리 */
    top: 50%; /* 세로 가운데 정렬 */
    transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.mypage_1_header_title > h3 {
    margin: 0;
    text-align: center; /* 텍스트 가운데 정렬 */
    color: #1749C2;
    font-weight: 900;
}

.info{
    margin-top: 100px;
    text-align: center;
}
.info > p{ 
    font-weight: 900;
    
}
.info > p:nth-child(1){ 
    font-weight: 900;
    font-size: 14px;    
}
.info2{
    display: flex;
    justify-content: space-between;
}

.info2 > span:nth-child(2){
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
}

.title{
    font-size: 14px;
    color: #b1b1b1;
    font-weight: 500;
    padding-left: 20px;
}

.sub_title{
    font-size: 16px;
    font-weight: 500;
}
ul{
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid gainsboro;
    padding: 15px 0 11px;
}
ul > li{
    margin-top: 5px;
    padding: 10px 10px 10px 20px;
}

.list1{
    width: 100%;
    border-top: 1px solid gainsboro;
    padding: 15px 0 11px;
}
.list1 > li > a {
    display: flex;
    justify-content: space-between;
}

.list1 > li > a > p {
    right: 100px;
}
a{
   display: flex;
   gap: 10px;
}

p{
    margin: 0;
}
li,a{
    list-style-type: none;
    text-decoration: none;
}
.flex_{
    display: flex;
    width: 50%;
    gap: 10px;
}

.footer_div{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 280px;
    
}
.footer_div >p{
    font-size: 13px;
}

.footer_div >p > span::before{
    content: '|';
    color: #333;
    padding: 0 6px;
    font-weight: 500;
}

.mypage_1 .footer {
    position: relative; /* mypage에서만 상대 위치로 설정 */
    width: 100%; /* mypage의 width에 맞추기 */
    height: 50px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: auto; /* 하단으로 위치 이동 */
}

</style>