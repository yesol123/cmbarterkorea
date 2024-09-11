<template>
  <header class="Notice_header_title">
    <RouterLink to="/mypage1">
      <img src="@/assets/icon_arrow_left.svg" alt="Back" />
    </RouterLink>
    <h3>공지사항</h3>
    <RouterLink to="/mypage1">
      <img src="@/assets/icon_close.svg" alt="Close" />
    </RouterLink>
  </header>
  <div>
   
    <DataTable
      class="display"
      :columns="columns"
      :data="data"
      :options="{
        select: true,
        responsive: true, // Adjust options as needed
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/ko.json' // 한글 언어 파일 경로
        },
        rowCallback: (row, data) => {
          row.notice_index = data.notice_index;
          row.addEventListener('click', function () {
            // 클릭 시 실행할 코드
            console.log(row.notice_index);
            router.push(`/DetailPgae/${row.notice_index}`)
          });
        },
      }"
      ref="table"
    />
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import { ref, onMounted } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import "datatables.net-select";

DataTable.use(DataTablesLib);

// eslint-disable-next-line no-unused-vars
let dt;
const data = ref([]);
const table = ref();
const columns = [
  {
    data: "notice_title",
    title: "공지사항 제목",
  },
  {
    data: "notice_create_time",
    title: "작성 날짜",
  },
];

const formData = new FormData();
formData.append('type', 'notice');

const url = process.env.VUE_APP_API_URL;

fetch(`${url}/api/setting/notice.php`, {
  method : 'POST',
  body : formData
})
.then(response => response.json())
.then(datas => {
  console.log(datas);
  data.value = datas.msg;
})

// Get a DataTables API reference
onMounted(function () {
 // dt = table.value.dt;
});


</script>

<style  scoped>
@import "datatables.net-dt";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");




.Notice_header_title {
  font-family: 'Noto Sans KR', sans-serif;

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

.datatable{
  width: 95%;
  margin: 100px auto 0;
  font-family: 'Noto Sans KR', sans-serif;
}

.dt-type-date{
  font-size: 12px;
}

.buttons {
  margin-top: 100px;
}





</style>


<script>
export default {
  name: "NoticePage",
};
</script>
