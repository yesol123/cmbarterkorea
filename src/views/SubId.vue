<template>
    <header class="subid_header_title">
           <RouterLink :to="`/mypage/${this.member}`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
           <h3>서브계정 관리</h3>
       </header>

   <section class="subid_seciotn">

    <ul class="list1">
            <span class="title">보안 / 알림</span>
            <li><RouterLink to="/subPw"><span class="flex_"><img class="img_f" src="@/assets/icon_pw.svg" alt=""><p class="sub_title">비밀번호 번경</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
    </ul>

   
         
    <div class="footer_div">
                <p>씨엠바더코리아(주) | 사업자 등록번호 364-86-03002</p>
                <p>주소:서울 금천구 가산디지털1로 171,601~606호(가산동,SKV1센터)<span class="ceo-name">대표자 박재능</span></p>
                <p>연락처:1566-1691</p>
                <p>Copyright © CMBARTER KOREA All Rights Reserved.</p>
            </div>

       

   </section>
<Footer/>

</template>

<script>
import { useResponseStore } from '@/store/response.js';



export default {
   name: 'subId',
   data(){
       return{
            member:'',
           password:'',
           newpassword:'',
           newpassword_confirm:'',
           isbuttonActive:false,
           showModal : false
       }
   },

   
   mounted() {
       // store에서 member 값을 가져와서 data에 할당
       let store = useResponseStore();
       this.member = store.member;
   },
   computed:{
       isPasswordMatching() {
           return this.newpassword === this.newpassword_confirm;
       },
       isButtonActive(){
           return this.password !== '' && this.newpassword !== '' && this.newpassword_confirm != ''
       }

   },

   
   methods:{
      

   }
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*p,label{
   font-family: "Noto Sans KR", sans-serif;
   margin-bottom: 10px;
}

.subid_header_title{
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

.subid_header_title > a {
   position: absolute; /* 왼쪽 버튼을 절대 위치로 */
   left: 10px; /* 왼쪽으로부터의 거리 */
   top: 50%; /* 세로 가운데 정렬 */
   transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.subid_header_title > h3 {
   margin: 0;
   text-align: center; /* 텍스트 가운데 정렬 */
   color: #1749C2;
   font-weight: 900;
}

.subid_seciotn{
   margin-top: 100px;

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

.flex_{
    display: flex;
    width: 50%;
    gap: 10px;
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


.footer_div{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    bottom: 10px;
    
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
    width: 100%; /* mypage의 width에 맞추기 */
    height: 50px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    
}


/* 작은 화면에서 스타일 변경 */
@media (max-width: 600px) {
    .ceo-name {
        display: block; /* 화면이 작아지면 block으로 바꿔서 줄바꿈 */
        font-size: 14px; /* 필요에 따라 글씨 크기 조절 */
        text-align: center;
    }

    .footer_div > p > span::before {
        content: ''; /* content를 빈 값으로 설정해서 제거 */
        padding: 0;  /* 필요에 따라 padding도 초기화 */
    }
}

</style>