<template>
    <header class="change_info_header_title">
           <RouterLink :to="`/franchiseeInfo`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
           <h3>매장 관리</h3>
           <RouterLink to="">
      <img src="@/assets/icon_close.svg" alt="Close" />
    </RouterLink>
    </header>

    
<section class="info_area">
    <ul>
        <li><RouterLink to ='/ChangeFranchise' > 기본 정보</RouterLink></li>
        <li><RouterLink to ='/#'> 정보 변경</RouterLink></li>
  </ul>


  <p class="title">매장 이미지</p>
  <ul class="show_img">
    <li><img src="@/assets/1.jpg" alt=""></li>
    <li><img src="@/assets/2.jpg" alt=""></li>
    <li><img src="@/assets/3.jpg" alt=""></li>
    <li><img src="@/assets/1.jpg" alt=""></li>
    <li><img src="@/assets/2.jpg" alt=""></li>
    <li><img src="@/assets/3.jpg" alt=""></li>
  </ul>


  <p class="title">매장정보</p>
  <ul class="show_store_info">
    <li><p>매장명</p>
        <span>명현만 간장게장 합정점</span>
    </li>
    <li><p>매장 카테고리</p>
        <span>음식점/카페</span>
    </li>
    <li><p>주소</p>
        <span>서울 마포구 양화로 45 메세나폴리스 123호~129호</span>
    </li>
    <li><p>연락처</p>
        <span>010-1234-5678</span>
    </li>
    <li><p>대표사이트</p>
        <span>www.사이트.입니다.</span>
    </li>
    <li><p>소개</p>
        <p>저희 매장에서 어쩌구 저쩌고! </p>
    </li>
  </ul>

<!-- <form @submit.prevent="insertWrite" class="form_area" action="">
    <label for="title">문의 제목</label>
    <input  v-model="title" id="title" type="text" name='title' placeholder="문의하실 제목을 입력하세요.">
    <label class="text" for="text">문의 내역</label>
    <textarea  v-model="contents" name="contents" id="text" placeholder="문의하실 내용을 입력하세요."></textarea>

    <button @click="showModal = true" type="submit">문의하기</button>
</form> -->

<!-- 
<div v-if="showModal" class="modal">
  <p class="caution">알림</p>
      <p>문의 등록하시겠습니까?</p>
      <button @click="showModal2 = true">확인</button>
      <button @click="cancelInsert">취소</button>
  </div>


  <div v-if="showModal2" class="modal">
    <p class="caution">알림</p>
      <p>문의 등록이 정상적으로 완료 되었습니다.</p>
      <button @click="confirmInsert">확인</button>
  </div> -->

</section>

</template>
<script>
import { useResponseStore } from '@/store/response.js';

export default{
    name:'ChangeFranchise',
    data(){
        return{
            member:'',

        }
    },
    mounted(){
    let store = useResponseStore();
    this.member = store.member;

    }

}
</script>
<style scoped>
    

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

*{
    font-family: "Noto Sans KR", sans-serif;
}

ul{
    list-style: none;
    padding: 0;
}

.change_info_header_title {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 가운데 정렬 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  font-size: 18px;
  font-weight: 800;
  border-bottom: 1px solid var(--line);
  z-index: 100;
  padding: 0 10px; /* 좌우 여백 추가 */
  box-sizing: border-box; /* 여백과 테두리를 포함한 전체 크기 계산 */
}

.change_info_header_title > a:nth-child(1) {
  position: absolute; /* 왼쪽 버튼을 절대 위치로 */
  left: 10px; /* 왼쪽으로부터의 거리 */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.change_info_header_title > a:nth-child(2) {
  position: absolute; /* 오른쪽 버튼을 절대 위치로 */
  right: 10px; /* 오른쪽으로부터의 거리 (여백 추가) */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.change_info_header_title > h3 {
  margin: 0 auto;
  text-align: center;
  color: #1749c2;
  font-weight: 900;
}

.info_area{
 
 width: 95%;
 margin: 0 auto;
}
.info_area > ul:nth-child(1){
margin-top: 100px;
 display: flex;
 justify-content: center;
 padding: 0;
 text-decoration: none;
 list-style: none;
}

.info_area > ul:nth-child(1) > li:nth-child(1) {
 padding: 10px 20px;
 width: 50%;
 text-align: center;
 font-size: 20px;
 border-bottom: 3px solid #1749c2; 
 
}

.info_area > ul:nth-child(1) > li:nth-child(2) {
 padding: 10px 20px;
 width: 50%;
 text-align: center;
 font-size: 20px;
 border-bottom: 3px solid gray; 
}


.info_area >  ul:nth-child(1) > li:nth-child(2) > a:nth-child(1){
color: #1749c2;
}

.info_area > ul:nth-child(1) > li:nth-child(2) > a:nth-child(2){
color: gray;
}


.info_area > ul > li >a {
text-decoration: none;
}

.show_img{
    display: flex;
}

.show_img li {
    width: 40%;
}
.show_img li img{
    width: 100%;
}

.show_img,.show_store_info{
    border-top: 1px solid #B1B1B1;
    width: 100%;
}
.title{
    
}

</style>