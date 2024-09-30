<template>

    <header class="customerM_header_title">
           <RouterLink :to="`/CustomerManagement`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
           <h3> 쿠폰선물</h3>
    </header>


    <section class="couponGift_area">

        <form action="" class="form">
            <label for="category"><p>종류</p>
            <select v-model="cate" name="" id="">
                <option hidden="" disabled="disabled" selected="seleted" value="">
                    쿠폰을 선택해주세요
                </option>
                <option value="1000">1,000</option>
                <option value="5000">5,000</option>
                <option value="10000">10,000</option>
                <option value="50000">50,000</option>
            </select>
            </label>
            <label for=""><p>기한</p>
                <input  v-model="limit" type="text" placeholder="쿠폰 사용기한을 입력해주세요 (1일~90일)">
            </label>
            <label for=""><p>이름</p>
            <input v-model="name" type="text" placeholder="쿠폰이름을 입력해주세요 (30자 이내)">
            </label>
            <label for="">
                <p>조건</p>
                <input v-model="condition" type="text" placeholder="사용조건을 입력해주세요">
            </label>
        </form>

        <article>
            <ul>
                <li><p>보유 CM</p><span>{{this.user_cm}} CM머니</span></li>
                <li><p>선택한 고객 수</p><span>{{ this.length}} 명</span></li>
                <li>
                    <div class="couponbox" :style="backgroundImageStyle">
                    <ul class="coupon_conditions">
                        <div>                 
                        <li>{{name}}</li>
                        <li><p class="long">{{condition}}</p></li>
                        <li>{{ limit }}</li>
                        </div>
                        <div class="t">
                            <img :src="couponImage"  alt="">
                        </div>
                    </ul>

                </div></li>
                <li><p>필요 CM</p><span>{{this.need_user_cm}} CM 머니</span></li>
                <li><p>잔여 CM</p><span>{{ this.rest_user_cm }} CM 머니</span></li>
            </ul>
            <div class="buttons">
                <button @click="gift()">선물하기</button>
                <button>취소</button>
            </div>
        </article>

        

    </section>
</template>
<script>
import { useResponseStore } from '@/store/response.js'
import router from '@/router/index.js';

export default{
    name:'couponGift',
    data(){
        return{
            user_cm:'', // 보유 CM
            cate:'', // 종류
            limit:'', //기한
            name:'', //이름
            condition:'', //조건
            selectedCustomers:[],
            length:'',
            need_user_cm:'', //필요 CM
            rest_user_cm:'', //잔여 CM
        }
    },
    created(){
        this.selectedCustomers = this.$route.query.indexs.split(',');
        console.log('전달받음',this.selectedCustomers);
        this.length = this.$route.query.length
        console.log('선택된 고객 수 ',this.$route.query.length);
    },
    mounted(){

        let store = useResponseStore();
        const formData = new FormData();

        formData.append('type', 'authentication');
        formData.append('user_id', store.user_id);

        const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/common/main.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('jsondata???');
                console.log(data.msg);
                let toJson = JSON.parse(data.msg)
                console.log(toJson);
                this.user_cm = toJson.user_cm.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                this.updateNeedUserCm();
                this.updateRest();
            })

             
        },

    computed: {
        backgroundImageStyle() {
            switch (this.cate) {
                case '1000':
                    return {
                        backgroundImage: `url(${require('@/assets/1000.jpg')})`
                    };
                case '5000':
                    return {
                        backgroundImage: `url(${require('@/assets/5000.jpg')})`
                    };
                case '10000':
                    return {
                        backgroundImage: `url(${require('@/assets/10000.jpg')})`
                    };
                case '50000':
                    return {
                        backgroundImage: `url(${require('@/assets/50000.jpg')})`
                    };
                default:
                    return {};
            }
        },
        couponImage() {
            switch (this.cate) {
                case '1000':
                    return require('@/assets/1000_t.png');
                case '5000':
                    return require('@/assets/5000_t.png');
                case '10000':
                    return require('@/assets/10000_t.png');
                case '50000':
                    return require('@/assets/50000_t.png');
                default:
                    return require('@/assets/1000_t.png');
            }
        },

    },

    watch: {
        cate() {
            this.updateRest(); // cate 값이 변경될 때 필요 CM 계산
        },
        length() {
            this.updateRest(); // 고객 수가 변경될 때 필요 CM 계산
        },
     
    },
    methods:{

        updateNeedUserCm() {
            const cateValue = Number(this.cate);
            const lengthValue = parseInt(this.length,10);
            // 선택한 쿠폰 금액 * 선택한 고객 수
            const needCmValue = cateValue * lengthValue;

        console.log('계산이 맞는가?',cateValue,lengthValue);
        

        // 필요 CM에 천 단위 콤마 추가
        this.need_user_cm = needCmValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        updateRest(){
           // updateNeedUserCm을 호출하여 need_user_cm를 업데이트
        this.updateNeedUserCm();

        // Vue의 반응성 시스템에서 need_user_cm이 업데이트된 후에 값을 사용
        this.$nextTick(() => {
        // need_user_cm에 천 단위 콤마가 들어가 있으므로 콤마 제거 후 숫자로 변환
        const needCm = parseInt(this.need_user_cm.replace(/,/g, ''), 10);
    
        // 보유 CM도 콤마 제거 후 숫자로 변환
        const userCm = parseInt(this.user_cm.replace(/,/g, ''), 10);

        console.log('필요 CM (숫자):', needCm);
        console.log('보유 CM (숫자):', userCm);

        // 잔여 CM 계산
        const restCm = userCm - needCm;

        console.log('잔여 CM:', restCm);

        // 잔여 CM에 다시 천 단위 콤마를 추가하여 화면에 표시
        this.rest_user_cm = restCm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        });
        
            
        },

        gift() {

            const store = useResponseStore();
            store.cate = this.cate;
            store.limit = this.limit;
            store.name = this.name;
            store.condition = this.condition;
            store.selectedCustomers = this.selectedCustomers;
            store.length = this.length;
            store.need_user_cm = this.need_user_cm;
            store.rest_user_cm = this.rest_user_cm;
            console.log('pinia',store);
            

             //쿠폰 선물 페이지로 이동
           router.push({ path: '/confrimpin' });
        },
    }



}

</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*{
   font-family: "Noto Sans KR", sans-serif;
}

*ul,li{
    list-style: none;
    padding: 0;
}
*p{
    margin: 0;
}

.customerM_header_title{
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

.customerM_header_title > a {
   position: absolute; /* 왼쪽 버튼을 절대 위치로 */
   left: 10px; /* 왼쪽으로부터의 거리 */
   top: 50%; /* 세로 가운데 정렬 */
   transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.customerM_header_title > h3 {
   margin: 0;
   text-align: center; /* 텍스트 가운데 정렬 */
   color: #1749C2;
   font-weight: 900;
}

.couponGift_area{
    width: 95%;
    margin: 100px auto 0;
}

.form > label{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    
}

.form > label > p{
    width: 10%;
}

.form > label > select,input{
    width: 85%;
    padding: 5px;
    border: 1px solid #B1B1B1;
    border-radius: 5px;
}

article > ul{
    display: flex;
    flex-direction: column;
}
article > ul > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #B1B1B1;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 5px;
}

article > ul > li > p {
   
    
}

.couponbox{
    background-image: url("@/assets/1000.jpg"); 
    background-size: cover;
    width: 100%;
}

.coupon_conditions{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.coupon_conditions div:nth-child(1){
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 45%;

}

.coupon_conditions div:nth-child(1) li{
    border: 1px solid #E7F1F6;
    border-radius: 15px;
    background-color: #E7F1F6;
    width: 90%;
    text-align: center;
    font-weight: bold;
    overflow: hidden;
}


.t{
    width: 30%;
}

.t img{
    width: 100%;
}
.buttons{
    display: flex;
    justify-content: center;
    gap: 20px;
}

.buttons > button{
    padding: 5px 10px;
}


.buttons > button:nth-child(1){
    border: 1px solid #4BAE4F;
    border-radius: 5px;
    background-color:   #4BAE4F;
    color: #fff;
    font-weight: bold;
}

.buttons > button:nth-child(2){
    border:1px solid #B1B1B1;
    border-radius: 5px;
    background-color: transparent;
    color: #b1b1b1d8;
}



@media (max-width: 430px) {
  .long {
    display: inline-block;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    animation: marquee 8s linear infinite; /* 텍스트 애니메이션 */
    margin: 0;
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%); /* 텍스트를 li의 오른쪽 끝에서 시작 */
    }
    100% {
      transform: translateX(-100%); /* 텍스트가 li의 왼쪽으로 사라짐 */
    }
  }
}
</style>