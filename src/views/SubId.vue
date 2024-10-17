<template>
    <header class="subid_header_title">
           <RouterLink :to="`/mypage/${this.member}`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
           <h3>서브계정 관리</h3>
       </header>

   <section class="subid_seciotn">

    <div class="list1">
        <p>{{ this.name  }}</p>
        <p>{{this.id}}</p>
    </div>

   
         <SubPw/>

       

   </section>

</template>

<script>
import { useResponseStore } from '@/store/response.js';
import SubPw from './SubPw.vue';



export default {
   name: 'subId',
   components:{
    SubPw,
   },
   data(){
       return{
            id:'',
            name:'',
            member:'',
           password:'',
           newpassword:'',
           newpassword_confirm:'',
           isbuttonActive:false,
           showModal : false
       }
   },

   
   mounted(){
        let store = useResponseStore();
        this.member = store.member;

        const formData = new FormData();
        formData.append('type','user_info');
        formData.append('user_index',store.user_index);

        const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/common/main.php', {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(result =>{
                    console.log(result.msg);
                    this.id = result.msg[0].user_id
                    this.name = result.msg[0].user_name
                    this.phone =result.msg[0].user_phone
                })
        
    },
   computed:{
       isPasswordMatching() {
           return this.newpassword === this.newpassword_confirm;
       },
       isButtonActive(){
           return this.password !== '' && this.newpassword !== '' && this.newpassword_confirm != ''
       }

   },

   
   methods:{
      

   }
}

</script>

<style scoped>


*p,label{
   margin-bottom: 10px;
}

.subid_header_title{
   display: flex;
   align-items: center;
   justify-content: center; /* 가운데 정렬 */
   position: fixed;
   top: 0;
   left: 50%;
   width: 100%;
   /* max-width: 768px; */
   transform: translateX(-50%);
   height: 60px;
   background-color: #fff;
   font-size: 18px;
   font-weight: 800;
   border-bottom: 1px solid var(--line);
   z-index: 100;
}

.subid_header_title > a {
   position: absolute; /* 왼쪽 버튼을 절대 위치로 */
   left: 10px; /* 왼쪽으로부터의 거리 */
   top: 50%; /* 세로 가운데 정렬 */
   transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.subid_header_title > h3 {
   margin: 0;
   text-align: center; /* 텍스트 가운데 정렬 */
   color: #1749C2;
   font-weight: 900;
}

.subid_seciotn{
   margin-top: 80px;
}



.list1{
    width: 100%;
    border-bottom: 1px solid gainsboro;
    text-align: center;
    padding-bottom: 15px;
}

.list1 > p{ 
    font-weight: 900;
    margin: 0;
    
}
.list1 > p:nth-child(1){ 
    font-weight: 900;
    font-size: 14px;    
}

a{
   display: flex;
   gap: 10px;
}

.flex_{
    display: flex;
    width: 50%;
    gap: 10px;
}

.title{
    font-size: 14px;
    color: #b1b1b1;
    font-weight: 500;
    padding-left: 20px;
}

.sub_title{
    font-size: 16px;
    font-weight: 500;
}


.footer_div{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    bottom: 10px;
    
}
.footer_div >p{
    font-size: 13px;
}

.footer_div >p > span::before{
    content: '|';
    color: #333;
    padding: 0 6px;
    font-weight: 500;
}

.mypage_1 .footer {
    width: 100%; /* mypage의 width에 맞추기 */
    height: 50px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    
}


/* 작은 화면에서 스타일 변경 */
@media (max-width: 600px) {
    .ceo-name {
        display: block; /* 화면이 작아지면 block으로 바꿔서 줄바꿈 */
        font-size: 14px; /* 필요에 따라 글씨 크기 조절 */
        text-align: center;
    }

    .footer_div > p > span::before {
        content: ''; /* content를 빈 값으로 설정해서 제거 */
        padding: 0;  /* 필요에 따라 padding도 초기화 */
    }
}

</style>