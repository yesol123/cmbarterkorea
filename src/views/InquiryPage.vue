<template>

<header class="Inquiry_header_title">
    <RouterLink :to="`/mypage/${this.member}`">
      <img src="@/assets/icon_arrow_left.svg" alt="Back" />
    </RouterLink>
    <h3>Q&A</h3>
    <RouterLink :to="`/mypage/${this.member}`">
      <img src="@/assets/icon_close.svg" alt="Close" />
    </RouterLink>
  </header>

<section class="qna_area">
    <ul >
    <li><RouterLink to ='/Inquiry' > 문의하기</RouterLink></li>
    <li><RouterLink to ='/InquiryList'> 문의내역</RouterLink></li>
  </ul>

<form @submit.prevent="insertWrite" class="form_area" action="">
    <label for="title">문의 제목</label>
    <input  v-model="title" id="title" type="text" name='title' placeholder="문의하실 제목을 입력하세요.">
    <label class="text" for="text">문의 내역</label>
    <textarea  v-model="contents" name="contents" id="text" placeholder="문의하실 내용을 입력하세요."></textarea>

    <button @click="showModal = true" type="submit">문의하기</button>

</form>


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
  </div>

</section>
  
</template>
<script>
import { useResponseStore } from '@/store/response.js';
import router from '@/router/index.js';


export default{
    name: 'InquiryPage',
    data(){
        return{
            member:'',
            title:'',
            contents:'',
            showModal: false,
            showModal2: false
        }
    },
    
    mounted(){
          // store에서 member 값을 가져와서 data에 할당
        let store = useResponseStore();
        this.member = store.member;
    },
    methods:{

      confirmInsert(){
        this.insertWrite();
        this.showModal = false;
        router.push({ path: '/InquiryList' });
      },
      cancelInsert(){
        this.showModal = false;
      },
      insertWrite() {
      // 유효성 검사: title과 contents가 비어있으면 메시지를 표시
      if (!this.title.trim() || !this.contents.trim()) {
       alert('제목과 내용을 모두 입력해 주세요.')  // 공백일 때 메시지
        return;
      }
      console.log('zzzz',"폼데이터를 저장할 거예용");
      let store = useResponseStore();
          const formData = new FormData();
          console.log(store.user_index);
          console.log(this.title);
          console.log(this.contents);

          
          formData.append('type','qna_insert');
          formData.append('user_index',store.user_index);
          formData.append('question_title',this.title);
          formData.append('question_desc',this.contents);

          const url = process.env.VUE_APP_API_URL;
          fetch(url+'api/setting/qna.php',{
            method:'POST',
            body:formData
          })
          .then(response => response.json())
          .then(data => {
            console.log('-------',data);
           

            
          })
    }

    }
}
    
</script>
<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

* {
  font-family: "Noto Sans KR", sans-serif;
  list-style: none;
}
.Inquiry_header_title {
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

.Inquiry_header_title > a:nth-child(1) {
  position: absolute; /* 왼쪽 버튼을 절대 위치로 */
  left: 10px; /* 왼쪽으로부터의 거리 */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.Inquiry_header_title > a:nth-child(2) {
  position: absolute; /* 오른쪽 버튼을 절대 위치로 */
  right: 10px; /* 오른쪽으로부터의 거리 (여백 추가) */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.Inquiry_header_title > h3 {
  margin: 0 auto;
  text-align: center;
  color: #1749c2;
  font-weight: 900;
}
.qna_area{
 
    width: 95%;
    margin: 0 auto;
}
.qna_area > ul{
  margin-top: 100px;
    display: flex;
    justify-content: center;
    padding: 0;
    text-decoration: none;
}

.qna_area > ul > li:nth-child(1) {
    padding: 10px 20px;
    width: 50%;
    text-align: center;
    font-size: 20px;
    border-bottom: 3px solid #1749c2; 
    
}

.qna_area > ul > li:nth-child(2) {
    padding: 10px 20px;
    width: 50%;
    text-align: center;
    font-size: 20px;
    border-bottom: 3px solid gray; 
}


.qna_area > ul > li > a:nth-child(1){
  color: #1749c2;
}

.qna_area > ul > li > a:nth-child(2){
  color: gray;
}


.qna_area > ul > li >a {
   text-decoration: none;
}


.form_area{
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form_area > input,textarea {
    border-radius: 5px;
    padding: 8px 8px;
    border: 1px solid #B1B1B1;

}

.form_area > input:focus{
  outline: 1px solid #4A9EFA;
}

.form_area >textarea{
    min-height: 400px;
}


.form_area >textarea:focus{
  outline: 1px solid #4A9EFA;
}


button{
    margin-top: 20px;
    border: 1px solid #B1B1B1;
    border-radius: 20px;
    padding: 10px;
    font-size: 14px;
    background: transparent;
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
</style>