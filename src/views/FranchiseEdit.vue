<template>
        <header class="change_info_header_title">
           <RouterLink :to="`/ChangeFranchise`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
           <h3>매장 관리</h3>
           <RouterLink to="/ChangeFranchise">
      <img src="@/assets/icon_close.svg" alt="Close" />
    </RouterLink>
    </header>

    
<section class="info_area">
    <ul>
        <li><RouterLink to ='/ChangeFranchise' > 기본 정보</RouterLink></li>
        <li><RouterLink to ='/storeInformation'> 정보 변경</RouterLink></li>
    </ul>

<!-- 
  <p class="title">매장 이미지</p>
  <ul class="show_img">
    <li><p style="margin: 5px 0;">최대 9장</p></li>
    <div class="selected_nine">
    <li class="change"><RouterLink to="/changeImg" ><img class="changeImg" src="@/assets/contetns_img.svg" alt=""></RouterLink></li>
    <li><img src="@/assets/1.jpg" alt=""></li>
    <li><img src="@/assets/2.jpg" alt=""></li>
    <li><img src="@/assets/3.jpg" alt=""></li>
    <li><img src="@/assets/1.jpg" alt=""></li>
    <li><img src="@/assets/2.jpg" alt=""></li>
    <li><img src="@/assets/3.jpg" alt=""></li>
    <li><img src="@/assets/3.jpg" alt=""></li>
    <li><img src="@/assets/3.jpg" alt=""></li>
    <li><img src="@/assets/3.jpg" alt=""></li>
    <li><img src="@/assets/3.jpg" alt=""></li>
    </div>
   
  </ul> -->


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
        <input type="text" v-model="website" placeholder="사이트 주소를 입력해주세요." >
    </li>
    <li><p class="title">소개</p>
        <textarea v-model="introduce" name="" id="" placeholder="사장님의 매장을 소개해주세요!"></textarea>
    </li>
    <button class="save" @click="showModal = true"> 저장</button>
  </ul>

<div v-if="showModal" class="modal">
  <p class="caution">알림</p>
      <p>변경 하시겠습니까?</p>
      <button @click="update">확인</button>
      <button @click="cancelInsert">취소</button>
  </div>



</section>
</template>
<script>
import { useResponseStore } from '@/store/response.js';
import router from '@/router/index.js';


export default{
    name:'franchiseEdit',
    data(){
        return{
            website:'',
            introduce:'',
            showModal:false,
            store:{
                store_name:'',
                store_category:'',
                store_address:'',
                store_call_number:'', 
            }

        }
    },
    mounted(){
        let store = useResponseStore();
        const formData = new FormData();
        formData.append('type', 'store_select1');
        formData.append('user_index',store.user_index);
        const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/store/store_update.php', {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(result =>{
                    console.log(result.msg[0]);
                    this.store.store_name = result.msg[0].store_name;
                    this.store.store_category = result.msg[0].store_category_name;
                    this.store.store_address = result.msg[0].store_address;
                    this.store.store_call_number = result.msg[0].store_phone;
                })


    },
    methods:{
        
      cancelInsert(){
        this.showModal = false;
      },
        update(){
        let store = useResponseStore();
          const formData = new FormData();
          console.log(store.user_index);
          console.log(this.website);
          console.log(this.introduce);
           
          formData.append('type','store_update1');
          formData.append('user_index',store.user_index);
          formData.append('store_site',this.website);
          formData.append('store_memo',this.introduce);

          const url = process.env.VUE_APP_API_URL;
          fetch(url+'api/store/store_update.php',{
            method:'POST',
            body:formData
          })
          .then(response => response.json())
          .then(data => {
            console.log('-------',data);
            router.push({path:'/ChangeFranchise'})
          })
        }

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


.show_store_info{
    border-top: 1px solid #B1B1B1;
    width: 100%;
}
.title{
    font-weight: bold;
    margin: 5px 0;
}

input,textarea,.save{
    width: 100%;
    padding: 8px;
    border: 1px solid #B1B1B1;
    border-radius: 5px;
}
textarea{
    height: 265px;
}

.save{
    margin-top: 10px;
    border: 0;
    background-color: #1749C2;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
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

.modal > button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #1749c2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}


</style>