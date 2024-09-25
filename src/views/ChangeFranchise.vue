<template>
    <header class="change_info_header_title">
           <RouterLink :to="`/franchiseeInfo`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
           <h3>매장 관리</h3>
           <RouterLink to="franchiseEdit">
      <img src="@/assets/icon_modify.svg" alt="Close" />
    </RouterLink>
    </header>

    
<section class="info_area">
    <ul>
        <li><RouterLink to ='/ChangeFranchise' > 기본 정보</RouterLink></li>
        <li><RouterLink to ='/storeInformation'> 운영 정보</RouterLink></li>
  </ul>


  <p class="title">매장 이미지</p>
  <ul class="show_img">
    <li><p style="margin: 5px 0;">최대 9장</p></li>
    <div class="selected_nine">
    <li v-for="(image,index) in img" :key="index"><img :src="image.store_image" alt=""></li>
    </div>
   
  </ul>


  <p class="title">매장정보</p>
  <ul class="show_store_info">
    <li><p class="title">매장명</p>
        <span>{{ this.store.store_name }}</span>
    </li>
    <li><p class="title">매장 카테고리</p>
        <span>{{ this.store.store_category }}</span>
    </li>
    <li><p class="title">주소</p>
        <span>{{ this.store.store_address }}</span>
    </li>
    <li><p class="title">연락처</p>
        <span>{{this.store.store_call_number }}</span>
    </li>
    <li><p class="title">대표사이트</p>
        <span>{{ this.store.store_website }}</span>
    </li>
    <li><p class="title">소개</p>
        <p>{{ this.store.store_introduce }}</p>
    </li>
  </ul>


</section>

</template>
<script>
import { useResponseStore } from '@/store/response.js';

export default{
    name:'ChangeFranchise',
    data(){
        return{
            store:{
                store_name:'',
                store_category:'',
                store_address:'',
                store_call_number:'',
                store_website:'',
                store_introduce:''  
            },
            img:[]
        }
    },
    mounted(){
        let store = useResponseStore();
        const formData1 = new FormData();
        formData1.append('type', 'store_select1');
        formData1.append('user_index',store.user_index);
        const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/store/store_update.php', {
                method: 'POST',
                body: formData1
                })
                .then(response => response.json())
                .then(result =>{
                    console.log(result.msg[0]);
                    this.store.store_name = result.msg[0].store_name;
                    this.store.store_category = result.msg[0].store_category_name;
                    this.store.store_address = result.msg[0].store_address;
                    this.store.store_call_number = result.msg[0].store_phone;
                    this.store.store_website = result.msg[0].store_site;
                    this.store.store_introduce = result.msg[0].store_memo;
                })


        const formData2 = new FormData();
        formData2.append('type','store_image_select');
        formData2.append('user_index',store.user_index);

        for (const pair of formData2.entries()) {
        console.log('ㅇㅇㅇㅇ',pair[0], pair[1]);
        }
        fetch(url + 'api/store/store_update.php', {
                method: 'POST',
                body: formData2
                })
                .then(response => response.json())
                .then(result =>{
                    console.log('222 ',result);
                    console.log('222 ',result.msg);
                    this.img = result.msg
                })


    }


}
</script>
<style scoped>
    

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

*{
    font-family: "Noto Sans KR", sans-serif;
}

ul,a{
    list-style: none;
    padding: 0;
    text-decoration: none;
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


.show_img{
    display: flex;
    flex-direction: column;
    gap: 10px;
}


.show_img li {
    width: 20%;
}

.selected_nine {
    display: flex;
    overflow-x: auto; /* 가로 스크롤 활성화 */
    white-space: nowrap; /* 줄바꿈 방지 */
}

.selected_nine li {
    flex: 0 0 auto; /* 아이템 크기가 줄어들지 않게 고정 */
    margin-right: 10px; /* 이미지 간 간격 추가 */
    text-align: center;
    font-size: 18px;
    width: 200px; /* 각 이미지의 너비 고정 */
    height: 150px; /* 각 이미지의 높이 고정 */
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}

.selected_nine li img {
    width: 100%; /* 이미지가 li 요소의 크기에 맞게 */
    height: 100%; /* 높이도 동일하게 맞춤 */
    object-fit: cover; /* 이미지 비율을 유지하며 잘 맞도록 설정 */
}

.show_img,.show_store_info{
    border-top: 1px solid #B1B1B1;
    width: 100%;
}
.title{
    font-weight: bold;
}

</style>