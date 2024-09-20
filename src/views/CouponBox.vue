<template>

    <header class="couponbox_header_title">
        <RouterLink to="/main"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3>쿠폰 보관함</h3>
    </header>

    <section class="couponbox_section">
        <label for="search">
            <input type="text" id="search" placeholder="쿠폰 이름을 입력하세요.">
            <button><img src="@/assets/icon_search.svg" alt=""></button>
        </label>


        <div class="buttons">
            <button :class="{'active':selectedButton === 'possible'}"  @click="possible()" >사용가능</button>
            <button :class="{'active':selectedButton === 'complete'}"  @click="complete()">사용완료</button>
            <button :class="{'active':selectedButton === 'pass'}"  @click="pass()">기한경과</button>
            <button :class="{'active':selectedButton === 'all'}"  @click="all()">전체</button>
        </div>
        <p class="coupon_current">사용가능에 해당하는 쿠폰의 개수는 0개 입니다.</p>

        <ul class="flex_direction">
            <li class="coupon_com">
                <div class="back_ground_coupon">
                    <ul class="coupon_conditions">
                        <div>                 
                        <li>하루쿠폰</li>
                        <li><p class="long">장수촌 (1만원 이상 결제)</p></li>
                        <li>2024-09-18</li>
                        </div>
                        <div class="t">
                            <img src="@/assets/1000_t.png" alt="">
                        </div>
                    </ul>
                </div>
                <button @click="gotoDetail()">쿠폰 상세보기</button>
            </li>
        </ul>
    </section>

</template>

<script>
import router from '@/router/index.js';

export default{
    name:'CouponBox',
    data(){
        return{
            selectedButton: 'possible', // 기본값 설정
        }
    },
    methods:{
        gotoDetail(){
            console.log('ddd');
            router.push({path:'/couponDetail'})
        },
        possible(){
            console.log('사용가능을 한다');
             this.selectedButton = 'possible'
        },
        complete(){
            console.log('사용 완료');
            this.selectedButton = 'complete'
        },
        pass(){
            console.log('기한 경과');
             this.selectedButton = 'pass'
            
        },
        all(){
            console.log('전체');
             this.selectedButton = 'all'
            
        }
    }
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
.couponbox_header_title{
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

.couponbox_header_title > a {
    position: absolute; /* 왼쪽 버튼을 절대 위치로 */
    left: 10px; /* 왼쪽으로부터의 거리 */
    top: 50%; /* 세로 가운데 정렬 */
    transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.couponbox_header_title > h3 {
    margin: 0;
    text-align: center; /* 텍스트 가운데 정렬 */
    color: #1749C2;
    font-weight: 900;
}

.couponbox_section{
    margin: 100px auto 0;
    width: 95%;

}

label{
    display: flex;
    justify-content: space-between;
    border: 1px solid #B1B1B1;
    border-radius: 10px;
    padding: 10px;
}

label input{
    border: 0;
    outline: none;
    padding: 0 10px;
    width: 70%;
    font-size: 16px;
    font-weight: bolder;
}

label button{
    outline: none;
    background-color: white;
    border: 0;
}

.buttons{
    display: flex;
    gap: 10px;
    margin-top: 10px;

}

.buttons button{
    border: 1px solid #B1B1B1;
    border-radius: 20px;
    font-size: 14px;
    padding: 10px;
    background-color: transparent;
    font-weight: bold;
}

.buttons button.active{
    border: 1px solid #1749C2;
    border-radius: 20px;
    font-size: 14px;
    padding: 10px;
    background-color: #1749C2;
    font-weight: bold;
    color: white;
}

.coupon_current{
    margin-top: 0;
}


.long {
    display: inline-block;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    animation: marquee 8s linear infinite; /* 텍스트 애니메이션 */
    margin: 0;
  }


.flex_direction{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.flex_direction .coupon_com{
    display: flex;
    flex-direction: column;
    border: 1px solid #0d6efd;
    border-radius: 5px;
}

.flex_direction .coupon_com .back_ground_coupon{
    background-image: url("@/assets/1000.jpg");
    background-size: cover;
}

.flex_direction .coupon_com button{
    border: 0;
    padding: 10px;
    font-size: 16px;
    background-color: transparent;
    font-weight: bold;
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