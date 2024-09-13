<template>

    <header class="couponbox_header_title">
        <RouterLink to="/main"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3>쿠폰 보관함</h3>
    </header>

</template>

<script>
export default{
    name:'CouponBox',
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

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

</style>