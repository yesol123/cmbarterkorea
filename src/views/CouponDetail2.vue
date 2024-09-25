<template>
    <header class="couponbox_Detail_title">
        <RouterLink to="/cmake"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3>쿠폰 상세보기</h3>
    </header>

<!-- 여기는 쿠폰이 쌓이면 여기만 스크롤이 생기게 해주세용! / 반영 전 -->
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
    name:'couponDetail',
    data(){
        return{
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
            console.log('ddddgggg',result.msg[0].coupon_index);
            console.log(result.msg[0].coupon_index);

            this.coupon.coupon_name = result.msg[0].coupon_name;
            this.coupon.coupon_price = result.msg[0].coupon_price;
            this.coupon.coupon_condition = result.msg[0].coupon_price; //조건
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

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

*{
    font-family: "Noto Sans KR", sans-serif;
}


ul,li{
    list-style: none;
    padding: 0;
}

.couponbox_Detail_title{
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

.couponbox_Detail_title > a {
    position: absolute; /* 왼쪽 버튼을 절대 위치로 */
    left: 10px; /* 왼쪽으로부터의 거리 */
    top: 50%; /* 세로 가운데 정렬 */
    transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.couponbox_Detail_title > h3 {
    margin: 0;
    text-align: center; /* 텍스트 가운데 정렬 */
    color: #1749C2;
    font-weight: 900;
}

.couponbox_Detail_section{
    margin: 100px auto 0;
    width: 95%;
}

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



</style>