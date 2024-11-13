<template>
  <header class="Notice_header_title">
    <RouterLink :to="`/mypage/${member}`">
      <img src="@/assets/icon_arrow_left.svg" alt="Back" />
    </RouterLink>
    <h3>공지사항</h3>
    <RouterLink :to="`/mypage/${member}`">
      <img src="@/assets/icon_close.svg" alt="Close" />
    </RouterLink>
  </header>
  <section>
   
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
  </section>
</template>

<script setup>
import { useResponseStore } from '@/store/response.js';
import router from "@/router/index.js";
import { ref, onMounted } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import "datatables.net-select";

DataTable.use(DataTablesLib);


// eslint-disable-next-line no-unused-vars
let dt;
let store = useResponseStore();
const data = ref([]);
const table = ref();
const member = store.member
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




.datatable{
  width: 95%;
  margin: 100px auto 0;

}

.dt-type-date{
  font-size: 12px;
}

.buttons {
  margin-top: 100px;
}

@media (prefers-color-scheme: dark) {
  .datatable_wrapper label,
  .datatable_wrapper .dataTables_info,
  .datatable_wrapper .dataTables_length,
  .datatable_wrapper .dataTables_filter,
  .datatable_wrapper .dataTables_paginate {
    color: #eee !important; /* 다크 모드에서 텍스트를 흰색으로 변경 */
  }
  
  .dataTables_wrapper table {
    color: #eee !important; /* 데이터 테이블의 기본 텍스트 색상 변경 */
  }
}


</style>


<script>
export default {
  name: "NoticePage",
};
</script>
