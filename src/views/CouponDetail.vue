<template>
    <header class="couponbox_Detail_title">
        <RouterLink to="/couponbox"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3>쿠폰 상세보기</h3>
    </header>

    <section class="couponbox_Detail_section">
        <ul >
            <li class="m_T30">
                <label >쿠폰 이름 
                    <input  type="text" class="input_form" placeholder="쿠폰 이름" readonly="" disabled="" value="쿠폰 이름">
                </label>
            </li>
            <li  class="m_T30">
                <label > 쿠폰 가격 
                    <input  type="text" class="input_form" placeholder="쿠폰 가격" readonly="" disabled="" value="1,000">
                </label>
            </li>
            <li  class="m_T30">
                <label > 쿠폰 기한
                    <input type="text" class="input_form" placeholder="쿠폰 기한" readonly="" disabled="" value="5">
                </label>
            </li>
            <li  class="m_T30">
                <label > 멤버십 명 
                    <input type="text" class="input_form" placeholder="멤버십 명" readonly="" disabled="" value="테스트가맹점">
                </label>
            </li>
            <li  class="m_T30">
                <label > 지급 쿠폰 상태
                    <input type="text" class="input_form" placeholder="지급 쿠폰 상태" readonly="" disabled="" value="사용 가능">
                </label>
            </li>
            <li  class="m_T30">
                <label > 쿠폰 지급일
                    <input type="text" class="input_form" placeholder="쿠폰 지급일" readonly="" disabled="" value="2024-09-11 16:43:20">
                </label>
            </li>
            <li  class="m_T30">
                <label > 쿠폰 지급 만기일
                    <input type="text" class="input_form" placeholder="쿠폰 지급 만기일" readonly="" disabled="" value="2024-09-17">
                </label>
            </li>
        </ul>


    </section>

</template>

<script>
export default{
    name:'couponDetail',

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