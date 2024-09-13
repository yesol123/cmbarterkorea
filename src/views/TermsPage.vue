<template>
    <section class="terms">

        <header class="Terms_header_title">
                  <RouterLink :to="`/mypage/${this.member}`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
                  <h3>약관 및 이용 동의</h3>
          </header>
      
          <ul>
              <li><RouterLink to="/Terms/userService"><p>CMBater 서비스 이용약관</p><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
              <li><RouterLink to="/Terms/franchiseeprivacy"><p>개인정보 수집 및 이용약관</p><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
              <li><RouterLink to="/Terms/FranchiseeMarketing"><p>마케팅 정보 수집 및 이용 동의</p><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
              <li><RouterLink to="/Terms/franchiseeAdvertisement"><p>광고성 정보 수신 동의</p><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
              <li><RouterLink to="/Terms/FranchiseeLocation"><p>위치기반 서비스 이용약관 동의</p><img src="@/assets/icon_arrow_right.svg" alt=""></RouterLink></li>
          </ul>
          <router-view ></router-view>
    </section>

</template>


<script>
import { useResponseStore } from '@/store/response.js';




export default{
    name:'TermsPage',
    data(){
        return{
            member: '',

        }
    },
    mounted(){
          // store에서 member 값을 가져와서 data에 할당
        let store = useResponseStore();
        this.member = store.member;
    }
}
</script>
<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*ul,li,a{
    font-family: "Noto Sans KR", sans-serif;
    list-style: none;
    text-decoration: none;
    
}

ul{
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 95%;
}

ul > li{
    margin: 5px;
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

p{
    margin: 0;
}
</style>