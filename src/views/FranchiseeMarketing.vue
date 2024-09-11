<template>

    <header class="Terms_header_title">
            <RouterLink to="/Terms"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
            <h3>약관 및 이용 동의</h3>
    </header>
    <ul class="titlebox">
            <li> 마케팅/서비스,이벤트 정보제공 </li>
            <li class="version"> ver. 2022.11.30 </li>
          </ul>
          
<div class="m_T30">
    <p class="terms_txtview">
      마케팅/서비스/이벤트 정보 제공을 위한 개인정보 수집 이용 동의 <br>
      "회사"는 선택 항목으로 아래 개인정보를 추가 수집 이용합니다.<br>
      1. 수집 이용 항목<br>
      - 이메일주소, 휴대폰번호, 회원 가입 시 수집한 항목, 서비스 이용 시 수집한 항목, 서비스 이용기록<br><br>

      2. 수집 이용 목적<br>
       - 회사에서 제공하는 서비스 일체에 대한 맞춤 서비스 제공, 마케팅 및 프로모션 활용(광고성/이벤트 정보 제공)<br><br>

      3. 보유 및 이용 기간<br>
      회원 탈퇴 또는 동의 철회시까지 합니다.<br>
      (단, 관련법령 또는회사정책에 의하여 보관해야하는 경우는 예외)<br><br>

      위 개인정보 수집 이용 동의는 선택사항이므로 동의를 거부하더라도 서비스 이용이 가능합니다.<br>
      더이상 맞춤 서비스 제공, 마케팅 및 프로모션 활용을 원하시지 않는 경우, <br>
      &gt; 내 정보 관리 &gt; 혜택 알림 설정 메뉴 혹은, 개별 서비스의 내 정보 관리 메뉴에서 동의를 철회하실 수 있습니다.
    </p>
  </div>
  <hr class="line_l">

<div class="agree_terms m_T30 m_B30">
    <p>약관 동의일 :<span class="eng"></span></p>
        <button>이용 동의 </button>
        <button>이용 동의 철회</button>
    <p>
        정보제공 및 이용 동의를 철회한 이후부터는 해당 서비스에서 회원님의 정보를 조회할 수 없습니다.</p>
</div>
</template>

<script>
//import { useResponseStore } from '@/store/response.js';


export default{
    name:'franchisee_Marketing',
    data(){
        return{
            yesorno:[]
        }
    },
    mounted(){

        //let store = useResponseStore();

        const formData = new FormData();

        formData.append('type','conditions_get')
        formData.append('user_index',1)

        const url = process.env.VUE_APP_API_URL;

        fetch(url + 'api/setting/conditions.php', {
                method: 'POST',
                body: formData
                })
                .then(response => response)
                .then(result =>{
                    console.log(result.msg);
                    
                    
                })


}
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

.agree_terms > button{
    padding: 15px;
    border: 1px solid gray;
    border-radius: 25px;
    background-color: transparent;
}
</style>