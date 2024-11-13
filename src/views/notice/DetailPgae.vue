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