<template>
      <header class="Notice_header_title">
    <RouterLink to="/Notice">
      <img src="@/assets/icon_arrow_left.svg" alt="Back" />
    </RouterLink>
    <h3>공지사항</h3>
    <RouterLink to="/mypage1">
      <img src="@/assets/icon_close.svg" alt="Close" />
    </RouterLink>
  </header>


  <section class="detail_seciotn">
    
    <article v-if="datas" class="detail_contents">
        <h3>{{ datas.notice_title }}</h3>

        <div>
            <p>{{ datas.notice_desc }}</p>
           <p>작성일: <span> {{datas.notice_create_time}}</span>
           </p>
        </div>
    </article>


  </section>
</template>
<script>

export default{
    name: 'DetailPgae',
    data(){
        return{
            id:null,
            datas:{}
        }
    },
   created(){
    this.id = this.$route.params.id;
    console.log(this.id);

    const formData = new FormData();
    formData.append('type', 'notice_get');
    formData.append('notice_index', this.id);

    const url = process.env.VUE_APP_API_URL;

    fetch(`${url}/api/setting/notice.php`, {
    method : 'POST',
    body : formData
    })
    .then(response => response.json())
    .then(result => {
        console.log(result.msg[0]);
        this.datas = result.msg[0]; 
    })
    
   },
  
}
</script>

<style scoped>

@import "datatables.net-dt";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

* {
  font-family: "Noto Sans KR", sans-serif;
  list-style: none;
}
.Notice_header_title {
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

.Notice_header_title > a:nth-child(1) {
  position: absolute; /* 왼쪽 버튼을 절대 위치로 */
  left: 10px; /* 왼쪽으로부터의 거리 */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.Notice_header_title > a:nth-child(2) {
  position: absolute; /* 오른쪽 버튼을 절대 위치로 */
  right: 10px; /* 오른쪽으로부터의 거리 (여백 추가) */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.Notice_header_title > h3 {
  margin: 0 auto;
  text-align: center;
  color: #1749c2;
  font-weight: 900;
}

.detail_seciotn {
  margin-top: 100px;
}

.detail_contents{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.detail_contents > div {
    border-top: 1px solid gray;
    width: 100%;
}

.detail_contents > div > p {
    text-align: center;
}

</style>