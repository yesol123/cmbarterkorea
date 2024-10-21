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

  <section class="qna_list">
    <ul>
      <li>
        <RouterLink to='/Inquiry'> 문의하기</RouterLink>
      </li>
      <li>
        <RouterLink to='/InquiryList'> 문의내역</RouterLink>
      </li>
    </ul>

    <div>
      <ul class="list">
        <li v-for="(item, index) in paginatedInquiries" :key="index" @click="goToDetail(item.qna_index)">
          <p>{{ item.question_title }}</p>
          <p class="question_d"><span>{{ item.answer_desc }}</span><span>{{ item.qna_create_time }}</span></p>
        </li>
      </ul>
    </div>

    <div class="pagination">
      <button class="previous" @click="previousPage" :disabled="currentPage === 1"><img
          src="@/assets/icon _arrow ios back_.png" alt=""></button>
      <button v-for="page in totalPages" :key="page" @click="changePage(page)"
        :class="{ active: page === currentPage }">{{ page }}</button>
      <button class="next" @click="nextPage" :disabled="currentPage === totalPages"><img
          src="@/assets/icon _arrow ios forward_.png" alt=""></button>
    </div>

  </section>


</template>
<script>
import { useResponseStore } from '@/store/response.js';

export default {
  name: 'InquiryList',
  data() {
    return {
      Inquiries: [],
      currentPage: 1,
      itemsPerPage: 10,
      member: ''
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.Inquiries.length / this.itemsPerPage);
    },
    paginatedInquiries() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.Inquiries.slice(start, end);
    }
  },

  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'InquiryListDetail', params: { id } })
    },

    changePage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  mounted() {
    let store = useResponseStore()
    this.member = store.member;

    const formData = new FormData();
    formData.append('type', 'qna_get');

    const url = process.env.VUE_APP_API_URL;
    fetch(url + 'api/setting/qna.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.msg);
        //데이터를 가져온 후 qna_create_time을 기준으로 정렬
        this.Inquiries = result.msg.sort((a, b) => {
          return b.qna_index - a.qna_index;
        })
      })


  }
}
</script>
<style scoped>



.qna_list>ul {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  padding: 0;
  text-decoration: none;
}

.qna_list>ul>li:nth-child(1) {
  padding: 10px 20px;
  width: 50%;
  text-align: center;
  font-size: 20px;
  border-bottom: 3px solid gray;
}


.qna_list>ul>li:nth-child(2) {
  padding: 10px 20px;
  width: 50%;
  text-align: center;
  font-size: 20px;
  border-bottom: 3px solid #1749c2;
}

.qna_list>ul>li>a:nth-child(2) {
  color: red;
}

.qna_list>ul>li>a {
  text-decoration: none;
}


div>.list {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  cursor: pointer;
}

div>.list>li {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

div>.list>li>p {
  margin: 0;
}

.question_d {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.pagination button {
  background-color: transparent;
  border: 0;
  font-size: 14px;
}


.previous img,
.next img {
  transform: translateY(3px);
}
</style>