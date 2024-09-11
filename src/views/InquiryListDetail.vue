<template>

<header class="Inquiry_header_title">
    <RouterLink to="/InquiryList">
      <img src="@/assets/icon_arrow_left.svg" alt="Back" />
    </RouterLink>
    <h3>Q&A</h3>
    <RouterLink to="/mypage1">
      <img src="@/assets/icon_close.svg" alt="Close" />
    </RouterLink>
  </header>

<section class="detail_area" v-if="choice">
    <article class="qna1">
        <h5>{{ choice.question_title }}</h5>
        <p class="question_d"><span>[{{ choice.answer_desc2 }}]</span><span>{{choice.qna_create_time}}</span></p>

        <p>
           {{ choice.question_desc}}
        </p>
    </article>
 

    <article class="qna2" v-if="choice.answer_desc2 ==='답변 대기'">
        <p>등록된 답변이 없습니다. </p><br>
        <p>관리가 확인 후 답변이 등록됩니다.</p>

        <div class="notdone">
        <button @click="showModal= true">삭제</button>
        <button @click="golist()">목록으로</button>
    </div>

    <div v-if="showModal" class="modal">
      <p>정말로 삭제하시겠습니까?</p>
      <button @click="confirmDelete">확인</button>
      <button @click="cancelDelete">취소</button>
    </div>
    </article>

    <article class="qna3" v-if="choice.answer_desc2 ==='답변 완료'">
        <p class="question_d"><span>관리자 답변</span><span>{{choice.answer_create_time}}</span></p>
        <p>{{ choice.answer_desc }}</p>

        <div class="done">
         <button @click="golist()">목록으로</button>
        </div>
    </article>

    
   
</section>

</template>

<script>
export default{
    name: 'InquiryListDetail',
    data(){
        return{
            id:null,
            Inquiries:[],
            choice: null, // 특정 문의를 저장할 변수
            showModal: false
        }
    },

    methods:{
        golist(){
            this.$router.push('/InquiryList')
        },
        confirmDelete(){
            this.deleteqna();
            this.showModal = false;
        },
        cancelDelete(){
            this.showModal = false;
        },
        deleteqna(){
        
        this.id = this.$route.params.id;
        const formData = new FormData();
        formData.append('type', 'qna_del');
        formData.append('qna_index',this.id)
    

        const url = process.env.VUE_APP_API_URL;
        fetch(url + 'api/setting/qna.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result =>{
            console.log(result.msg);
            console.log(this.id);
            alert(result.msg)
            this.$router.push({ path: '/InquiryList' });
        })

            
        }
    },
    mounted()  {


        this.id = this.$route.params.id;
        const formData = new FormData();
        formData.append('type', 'qna_get2');
        formData.append('qna_index',this.id)
    

        const url = process.env.VUE_APP_API_URL;
        fetch(url + 'api/setting/qna.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result =>{
            console.log(result.msg);
            this.Inquiries = result.msg //가져온 데이터를 Inquiries배열에 저장 
            console.log(this.id);

            this.choice = this.Inquiries.find(
                (choice) => Number(choice.qna_index) === Number(this.id)
            )

            if (!this.choice) {
                console.error('해당 id에 맞는 문의를 찾을 수 없습니다.');
            }
            
        })

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

.detail_area{
  margin: 0 auto;  
  width: 95%;
}

.qna2{
    border-top: 1px solid #B1B1B1;
}

.detail_area article{
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    
}

.question_d{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    border-bottom: 1px solid #B1B1B1;
}

.qna3 {
    border-top: 1px solid #B1B1B1;
}

.done {
   display: flex;   
    justify-content: center;
    
}


.notdone{
 display: flex;
 justify-content: center;
 gap: 20px;
}

.notdone button{
    margin-top: 20px;
    border: 1px solid #B1B1B1;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 14px;
    background: transparent;
}

.done button{
    margin-top: 20px;
    border: 1px solid #B1B1B1;
    border-radius: 20px;
    padding: 10px 20px;
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