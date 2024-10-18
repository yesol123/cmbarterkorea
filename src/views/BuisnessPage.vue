<template>
    <header>
        <header class="buisness_header_title">
                  <RouterLink :to="`/mypage/${this.member}`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
                  <h3>사업자 등록정보</h3>
          </header>
    </header>
    <section>
        <ul>
                <li li class="m_T30">
                    <label>
                        사업자 등록번호
                        <input type="text" class="input_form" placeholder="123-45-67890" readonly="readonly" disabled="disabled" :value="formattedBuisnessNum">
                    </label>
                </li>

                <li class="m_T30">
                    <label>
                        상호 또는 법인명
                        <input type="text" class="input_form" placeholder="상호 또는 법인명" readonly="readonly" disabled="disabled" :value="businessInfo.business_name">
                    </label>
                </li>

                <li class="m_T30">
                    <label>
                        대표자
                        <input type="text" class="input_form" placeholder="대표자" readonly="readonly" disabled="disabled" :value="businessInfo.ceo_name">
                    </label>
                </li>

                <li class="m_T30">
                    <label>
                        사업자 유형
                        <input type="text" class="input_form" placeholder="사업자 유형" readonly="readonly" disabled="disabled" :value="businessInfo.business_type">
                    </label>
                </li>
    </ul>

    </section>
   

</template>
<script>
import { useResponseStore } from '@/store/response.js';

export default{
    name:'BuisnessPgae',
    data(){
        return{
            member: '',
            businessInfo: {
                business_number: '',
                business_name: '',
                ceo_name: '',
                business_type: ''
            }
        }
    },

    computed:{
        formattedBuisnessNum(){
            return this.businessInfo.business_number.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')
        }
    },
    mounted(){
          // store에서 member 값을 가져와서 data에 할당
        let store = useResponseStore();
        this.member = store.member;
        const formData = new FormData();
        formData.append('type', 'buisness_get');
        formData.append('user_index',store.user_index);

        const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/setting/store_select.php', {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(result =>{
                    console.log(result.msg[0]);
                    
            this.businessInfo.business_number = result.msg[0].store_registration_num;
            this.businessInfo.business_name = result.msg[0].store_corporate_name;
            this.businessInfo.ceo_name = result.msg[0].store_boss_name;
            this.businessInfo.business_type = result.msg[0].store_type_taxation;
                })





    }
}
</script>
<style scoped>


ul{
    margin: 100px auto;
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
    padding-top: 30px;
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

</style>