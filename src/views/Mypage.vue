

<template>
    <section class="mypage_1">
        <header class="mypage_1_header_title">
            <RouterLink to="/main"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
            <h3>My CM</h3>
        </header>
         <div class="info"  v-if="this.member =='1'">
            <p>{{ this.name  }}</p>
            <p>{{this.id}}</p>
         </div>

         <div class="info"  v-if="this.member =='3'">
            <p>{{ this.name  }}</p>
            <p>{{this.id}}</p>
         </div>

         

         <ul v-if="this.member =='1'" >
            <span class="title">회원정보</span>
            <li class="info2"><span class="flex_"><img class="img_f" src="@/assets/icon_mobile.svg" alt=""><p class="sub_title">핸드폰</p></span> <span>{{ formattedPhone }}</span></li>
         </ul>

         
         <ul class="info3" v-if="this.member =='3'" >
            <span class="title">회원정보</span>
            <li class="info2"><span class="flex_"><img class="img_f" src="@/assets/icon_mobile.svg" alt=""><p class="sub_title">핸드폰</p></span> <span>{{ formattedPhone }}</span></li>
            <li><RouterLink to="/buisness"><span class="flex_"><img class="img_f" src="@/assets/icon_pw.svg" alt=""><p class="sub_title">사업자 등록정보</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
            <li><RouterLink to="/franchiseeInfo"><span class="flex_"><img class="img_f" src="@/assets/icon_pw.svg" alt=""><p class="sub_title">가맹점 정보</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>

         </ul>

         
         <ul class="info3" v-if="this.member =='3'" >
            <span class="title">서브계정 관리</span>
            <li><RouterLink to="/subId"><span class="flex_"><img class="img_f" src="@/assets/icon_pw.svg" alt=""><p class="sub_title">정보확인</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
         </ul>

          <ul class="list1">
            <span class="title">보안 / 알림</span>
            <li><RouterLink to="/changepw"><span class="flex_"><img class="img_f" src="@/assets/icon_pw.svg" alt=""><p class="sub_title">비밀번호 번경</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
            <li><RouterLink to="/ChangePin1"><span class="flex_"><img  class="img_f" src="@/assets/icon_pin.svg" alt=""><p class="sub_title">핀번호 번경</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
          </ul>
          <ul class="list1">
            <span class="title"> 고객센터</span>
            <li><RouterLink to="/Notice"><span class="flex_"><img  class="img_f" src="@/assets/icon_services.svg" alt=""><p class="sub_title">공지사항</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
            <li><RouterLink to="/Inquiry"><span class="flex_"><img class="img_f" src="@/assets/icon_services.svg" alt=""><p class="sub_title"> Q&A</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
            <li><a href="http://pf.kakao.com/_zFjGG/chat"><span class="flex_"><img class="img_f"  src="@/assets/icon_services.svg" alt=""><p class="sub_title">카카오톡 상담하기</p></span><img src="@/assets/icon_arrow_right.svg" alt=""></a></li>
          </ul>
          <ul>
            <span class="title">정책</span>
            <li><RouterLink to="/Terms"><img src="@/assets/icon_agree.svg" alt=""><p class="sub_title">약관 및 이용 동의</p></RouterLink></li>
            <li><a href="#" @click="showModal = true"><img src="@/assets/icon_logout.svg" alt=""><p class="sub_title"> 로그아웃</p></a></li>
          </ul>

         
            <div class="footer_div">
                <p>씨엠바더코리아(주) | 사업자 등록번호 364-86-03002</p>
                <p>주소:서울 금천구 가산디지털1로 171,601~606호(가산동,SKV1센터)<span class="ceo-name">대표자 박재능</span></p>
                <p>연락처:1566-1691</p>
                <p>Copyright © CMBARTER KOREA All Rights Reserved.</p>
            </div>
            

            
<div v-if="showModal" class="modal">
     <p class="caution">알림</p>
      <p>로그아웃 되었습니다</p>
      <button @click="logout()">확인</button>
  </div>
    </section>
    <Footer class="footer" />
</template>

<script>
import Footer from '@/components/FooterPage.vue'
import { RouterLink } from 'vue-router';
import { useResponseStore } from '@/store/response.js'




export default{
    name: 'MyPage',

    components:{
        Footer,
        RouterLink
    },
    data(){
        return{
            member:'',
            id:'',
            name:'',
            phone:'',
            showModal:false
        }
    },

    computed:{
        formattedPhone (){
            const cleaned = this.phone.replace(/\D/g, ''); //숫자만 남기기
            const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);// 3-4-4 자리로 나누기
            if(match){
                // 가운데 번호의 뒤쪽 2자리와 맨 뒤 번호 앞의 2자리만 *로 변경
                const middlePart = match[2].slice(0, 2) + '**'; // 가운데 번호 뒤쪽 2자리 *로 변경
                const lastPart = '**' + match[3].slice(2); // 맨 뒤 번호 앞쪽 2자리 *로 변경
        return `${match[1]}-${middlePart}-${lastPart}`;
            }
            return this.phone;
        }

       
    },
    mounted(){
        let store = useResponseStore();
        this.member = store.member;

        const formData = new FormData();
        formData.append('type','user_info');
        formData.append('user_index',store.user_index);

        const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/common/main.php', {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(result =>{
                    console.log(result.msg);
                    this.id = result.msg[0].user_id
                    this.name = result.msg[0].user_name
                    this.phone =result.msg[0].user_phone
                })
        
    },
    methods:{
        logout() {
            // localStorage.setItem('response', null);
            localStorage.removeItem('response');
            this.$router.push({ path : '/' });
        }

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

.info3 > li {
    width: 100%;

}
.info3 >li >a{
    display: flex;
    justify-content: space-between;
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


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: fixed; /* 고정 위치 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%); /* 화면의 중앙에 위치 */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 90%;
  padding: 30px 20px;
  text-align: center;
  box-sizing: border-box;
}
 .caution{
    margin-bottom: 20px;
 }

.modal button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #1749c2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
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