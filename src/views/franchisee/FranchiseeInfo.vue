<template>


        <header class="franchiseInfo_header_title">
                  <RouterLink :to="`/mypage/${this.member}`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
                  <h3>가맹점 정보</h3>
          </header>
 <section>

    <ul>
                <li li class="m_T30">
                    <label>
                        매장명
                        <input type="text" class="input_form" placeholder="123-45-67890" readonly="readonly" disabled="disabled" :value="storeInfo.store_name">
                    </label>
                </li>

                <li class="m_T30">
                    <label>
                        매장 카테고리
                        <input type="text" class="input_form" placeholder="상호 또는 법인명" readonly="readonly" disabled="disabled" :value="storeInfo.store_category">
                    </label>
                </li>

                <li class="m_T30">
                    <label>
                        주소
                        <input type="text" class="input_form" placeholder="대표자" readonly="readonly" disabled="disabled" :value="storeInfo.store_address">
                    </label>
                </li>

                <li class="m_T30">
                    <label>
                        연락처
                        <input type="text" class="input_form" placeholder="사업자 유형" readonly="readonly" disabled="disabled" :value="storeInfo.store_phone">
                    </label>
                </li>
                <li class="m_T30">
                    <label>
                        대표사이트
                        <input type="text" class="input_form" placeholder="사업자 유형" readonly="readonly" disabled="disabled" :value="storeInfo.store_site">
                    </label>
                </li>
                <li class="m_T30">
                    <label>
                        담당자 아이디
                        <input type="text" class="input_form" placeholder="사업자 유형" readonly="readonly" disabled="disabled" :value="storeInfo.store_id">
                    </label>
                </li>

                <div class="btn_basic">
                <button type="button" class="m_B30 m_T30" @click="gotochange()">
                    정보변경
                </button>
    </div>
    </ul>

 </section>

 
</template>
<script>
import { useResponseStore } from '@/store/response.js';
import router from '@/router/index.js';


export default{
    name:'FranchiseeInfo',
    data(){
        return{
            member: '',
            storeInfo: {
                store_name: '',
                store_category:'',
                store_address:'',
                store_phone:'',
                store_site:'',
                store_id:''
            }

        }
    },
    mounted(){
          // store에서 member 값을 가져와서 data에 할당
        let store = useResponseStore();
        this.member = store.member;
        const formData = new FormData();
        formData.append('type', 'store_get');
        formData.append('user_index',store.user_index);

        const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/setting/store_select.php', {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(result =>{
                    console.log(result.msg[0]);
                    this.storeInfo.store_name = result.msg[0].store_name;
                    this.storeInfo.store_category = result.msg[0].store_category_name;
                    this.storeInfo.store_address = result.msg[0].store_address;
                    this.storeInfo.store_phone = result.msg[0].store_phone;
                    this.storeInfo.store_site = result.msg[0].store_site;
                    this.storeInfo.store_id = result.msg[0].businee_user_id;


                })

    },
    methods:{
        gotochange(){
            router.push({path:'/ChangeFranchise'})

        }
    }
}

</script>
<style scoped>


ul{
    margin: 60px auto 0;
    display: flex; 
    flex-direction: column;
    padding: 0;
    width: 95%;
}

ul > li{
    margin: 5px;
}

ul > li > a{
    display: flex;
    justify-content: space-between;
    width: 100%;

}

ul > li > label {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
}

.terms{
    width: 100%;
    margin: 0 auto;
}

.input_form{
    width: 100%;
    height: 40px;
    border: 1px solid #F2F2F2;
    background-color: #F2F2F2;;
    border-radius: 6px;
    text-indent: 16px;
    margin-top: 10px;
}
.btn_basic{
    display: flex;
    margin-top: 10px;
    justify-content: center

}

.btn_basic button {
    width: 100%;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #1749C2;;
    background-color: #1749C2;;
    color: white;
    font-size: 16px;
    bottom: 10px;
    cursor: pointer; 
    font-family: "Noto Sans KR", sans-serif;
}
</style>