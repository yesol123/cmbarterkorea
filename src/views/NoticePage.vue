
<template>

<header class="Notice_header_title">
    <RouterLink to="/ChangePin1">
         <img src="@/assets/icon_arrow_left.svg" alt="Back">
     </RouterLink>
     <h3> 공지사항</h3>
     <RouterLink to="/mypage1">
         <img src="@/assets/icon_close.svg" alt="Close">
     </RouterLink>
    </header>
  <div>
<div class="buttons">
  
  <button @click="add">Add new row</button><br />
    <button @click="update">Update selected rows</button><br />
    <button @click="remove">Delete selected rows</button>


</div>
    <DataTable
      class="display"
      :columns="columns"
      :data="data"
      :options="{ select: true }"
      ref="table"
      @row-click="goDetailPgae()"
    />
  </div>
</template>


<script setup>
import router from '@/router/index.js';
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import 'datatables.net-select';

DataTable.use(DataTablesLib);

let counter = 0;
let dt;
const data = ref([]);
const table = ref();
const columns = [
  {
    data: 'a',
    title: '공지사항 제목',
    render: function (data, type, row) {
      // 클릭 이벤트를 추가합니다.
      console.log();
      
      return `<button onclick="document.dispatchEvent(new CustomEvent('cell-click', { detail: ${JSON.stringify(row)} }))">${data}</button>`;
  }
},
  {
    data: 'b',
    title: '작성 날짜',
  },
];

// Initial data
for (let i = 0; i < 5; i++) {
  add();
}

// Get a DataTables API reference
onMounted(function () {
  dt = table.value.dt;
});

// Add new rows - note how the data object in Vue is changed and the DataTable will reflect
// those changes, rather than using the DataTables API to manipulate the rows.
function add() {
  data.value.push({
    a: 'A-' + counter,
    b: 'B-' + counter,
    c: 'C-' + counter,
  });

  counter += 1;
}

// For each selected row just add an indicator to show that it's data has been updated
function update() {
  dt.rows({ selected: true }).every(function () {
    let row = this.data();

    row.a += ' Updated';
    row.b += ' Updated';
    row.c += ' Updated';
  });
}

// For each selected row find the data object in `data` array and remove it
function remove() {
  dt.rows({ selected: true }).every(function () {
    let idx = data.value.indexOf(this.data());
    data.value.splice(idx, 1);
  });
}

function goDetailPgae(){
  console.log('되긴혀?');
  router.push({path:'/DetailPgae'})
}

</script>


<style>
@import 'datatables.net-dt';

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*li,ul{
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
    color: #1749C2;
    font-weight: 900;
}

.buttons{
  margin-top: 100px;
}

</style>




<!-- <template>
  <div>
    <h1>공지사항!</h1>
    <button @click="add">Add new row</button><br />
    <DataTable
      class="display"
      :columns="columns"
      :data="data"
      :options="{ select: true, paging: true, pageLength: 5 }"
      ref="table"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';

DataTable.use(DataTablesLib);

let counter = 0;
// eslint-disable-next-line no-unused-vars
let dt;
const table = ref();
const data = ref([
  { name: '여기에는 제목을', position: '여기에는 날짜를 표시' },
]);

const columns = [
  {
    data: 'name',
    title: '공지사항 제목',
    contents: 'ㅇㅇ',
    render: function (data, type, row, meta) {
      return `${data} (${meta.settings.aoColumns[meta.col].contents})`; // name + contents 값 렌더링
    }
  },
  {
    data: 'position', //
    title: '작성날짜',
    contents: '악플을 좋아합니다',
    render: function (data, type, row, meta) {
      return `${data} (${meta.settings.aoColumns[meta.col].contents})`;
    }
  },
];

// Initial data
for (let i = 0; i < 5; i++) {
  add();
}

// Get a DataTables API reference
onMounted(function () {
  dt = table.value.dt;
});

// Add new rows dynamically
function add() {
  data.value.push({
    a: 'A-' + counter,
    b: 'B-' + counter,
    c: 'C-' + counter,
  });

  counter += 1;
}
</script>

<style>
@import 'datatables.net-dt'; /* DataTables 스타일을 추가 */
</style>

 -->








<!-- <template>
  <div>
    <h1>Simple table</h1>
    <h2>DataTables + Vue3 example</h2>
    <p>
      This example demonstrates the <code>datatables.net-vue3</code> package
      being used to display an interactive DataTable in a Vue application.
    </p>

    <button @click="add">Add new row</button><br />
    <button @click="update">Update selected rows</button><br />
    <button @click="remove">Delete selected rows</button>

    <DataTable
      class="display"
      :columns="columns"
      :data="data"
      :options="{ select: true }"
      ref="table"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net';
import 'datatables.net-select';

DataTable.use(DataTablesLib);



let counter = 0;
let dt;
const data = ref([]);
const table = ref();
const columns = [
  {
    data: 'a',
    title: 'First',
    contents:'a의 내용'
    
  },
  {
    data: 'b',
    title: 'Second',
    contents:'b의 내용'

  },
  {
    data: 'c',
    title: 'Third',
    contents:'c의 내용'

  },
];

// Initial data
for (let i = 0; i < 5; i++) {
  add();
}

// Get a DataTables API reference
onMounted(function () {
  dt = table.value.dt;
});

// Add new rows - note how the data object in Vue is changed and the DataTable will reflect
// those changes, rather than using the DataTables API to manipulate the rows.
function add() {
  data.value.push({
    a: 'A-' + counter,
    b: 'B-' + counter,
    c: 'C-' + counter,
  });

  counter += 1;
}

// For each selected row just add an indicator to show that it's data has been updated
function update() {
  dt.rows({ selected: true }).every(function () {
    let row = this.data();

    row.a += ' Updated';
    row.b += ' Updated';
    row.c += ' Updated';
  });
}

// For each selected row find the data object in `data` array and remove it
function remove() {
  dt.rows({ selected: true }).every(function () {
    let idx = data.value.indexOf(this.data());
    data.value.splice(idx, 1);
  });
}
</script> -->


  <script>
  
  export default {
    name: 'NoticePage',
  }
  </script>
  
  <style scoped>
  @import 'datatables.net-select-dt';
  @import 'datatables.net-responsive-dt';

  </style>




<!-- 
 const columns = [
   { data: 'name', title: 'Name', contents:"홈프로텍터" },
   { data: 'position', title: 'Position',contents:"악플을 좋아합니다" },
   { data: 'office', title: 'Office',contents:"방탄소년단 덕후" },
   { data: 'extn', title: 'Extension',contents:"우산을 만들어요" },
   { data: 'start_date', title: 'Start date',contents:"젖은 나뭇가지로 불 붙여요" },
   { data: 'salary', title: 'Salary',contents:"별로 천재" },
   {data:'김예솔',title:'우엥',contents:"여행용 티슈"}
 ]; -->