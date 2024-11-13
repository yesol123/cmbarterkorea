<template>
    <header class="couponbox_Detail_title">
        <RouterLink to="/cmake"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3>쿠폰 상세보기</h3>
    </header>

    <section class="couponbox_Detail_section">
        <ul >
            <li class="m_T30">
                <label >쿠폰 이름 
                    <input  type="text" class="input_form" placeholder="쿠폰 이름" readonly="" disabled="" :value="coupon.coupon_name">
                </label>
            </li>
            <li  class="m_T30">
                <label > 쿠폰 가격 
                    <input  type="text" class="input_form" placeholder="쿠폰 가격" readonly="" disabled="" :value="coupon.coupon_price">
                </label>
            </li>
            <li  class="m_T30">
                <label > 쿠폰 사용 조건
                    <input  type="text" class="input_form" placeholder="사용 조건" readonly="" disabled="" :value="coupon.coupon_condition">
                </label>
            </li>
            <li  class="m_T30">
                <label > 쿠폰 기한
                    <input type="text" class="input_form" placeholder="쿠폰 기한" readonly="" disabled="" :value="coupon.coupon_deadline">
                </label>
            </li>
            <!-- <li  class="m_T30">
                <label > 멤버십 명 
                    <input type="text" class="input_form" placeholder="멤버십 명" readonly="" disabled="" :value="coupon.membership">
                </label>
            </li> -->
            <li  class="m_T30">
                <label > 지급 쿠폰 상태
                    <input type="text" class="input_form" placeholder="지급 쿠폰 상태" readonly="" disabled="" :value="coupon.status">
                </label>
            </li>
            <li  class="m_T30">
                <label > 쿠폰 지급일
                    <input type="text" class="input_form" placeholder="쿠폰 지급일" readonly="" disabled="" :value="coupon.payment">
                </label>
            </li>
            <li  class="m_T30">
                <label > 쿠폰 지급 만기일
                    <input type="text" class="input_form" placeholder="쿠폰 지급 만기일" readonly="" disabled="" :value="coupon.limit">
                </label>
            </li>
        </ul>


    </section>

</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default{
    name:'couponDetail2',
    data(){
        return{
            member:'',
            id:'',
            coupon:{
                coupon_name:'',
                coupon_price:'',
                coupon_condition:'',
                coupon_deadline:'',
                membership:'',
                status:'',
                payment:'',
                limit:''

            }
        }

    }, 
    mounted(){
        this.id = this.$route.params.id;

        const formData = new FormData();
        let store = useResponseStore()
        
        formData.append('type','view');
        formData.append('user_index',store.user_index);
        formData.append('coupon_issuance_index',this.id);

        const url = process.env.VUE_APP_API_URL;
        fetch( url + 'api/coupon/coupon_issuance.php',{
            method:'POST',
            body:formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('디테일2',result);
            
            console.log('ddddgggg',result.msg[0].coupon_index);
            console.log(result.msg[0].coupon_index);

            this.coupon.coupon_name = result.msg[0].coupon_name;
            this.coupon.coupon_price = result.msg[0].coupon_price;
            this.coupon.coupon_condition = result.msg[0].coupon_condition; //조건
            this.coupon.coupon_deadline = result.msg[0].coupon_limit; //기한
            this.coupon.membership = result.msg[0].coupon_price; //멤버십
            this.coupon.status = result.msg[0].coupon_provided_status; //상태
            this.coupon.payment = result.msg[0].coupon_issuance_time; //지급일
            this.coupon.limit = result.msg[0].coupon_limit_time_f; //만기일


        })
    },

}

</script>

<style scoped>


.couponbox_Detail_section ul li{
    margin-bottom: 10px;
}

.couponbox_Detail_section ul li label{
    display: flex;
    flex-direction: column;
    font-size: 16px;
    margin-bottom: 8px;
}


.couponbox_Detail_section ul li label input{
  padding: 6px 12px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: #e9ecef;
  font-size: 16px
}



@media (prefers-color-scheme: dark) {
  
  .couponbox_Detail_section ul li label{
      color: #eee;
  }
  }


</style>