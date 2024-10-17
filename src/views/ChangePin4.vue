<template>
<header class="changePin4_header_title">
    <RouterLink to="/ChangePin1">
     </RouterLink>
     <h3>PIN 번호 변경 </h3>
     <RouterLink to="/mypage1">
         <img src="@/assets/icon_close.svg" alt="Close">
     </RouterLink>
    </header>


    <section class="changePin4_section">
        <div>
                <ul>
                    <li>PIN 번호 변경 완료</li>
                    <li>PIN번호 변경이 완료되었습니다.</li>
                </ul>
        </div>
                    <button @click="goNext()">다음</button>
    </section>
</template>


<script>
import router from '@/router/index.js';

export default{
    name: "ChangePin4",
    methods: {
        goNext(){
            router.push({path:'/main'})
        }
    }

}
</script>


<style scoped>

*li,ul{
    list-style: none;
}
.changePin4_header_title {
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

.changePin4_header_title > a {
    position: absolute; /* 오른쪽 버튼을 절대 위치로 */
    right: 10px; /* 오른쪽으로부터의 거리 (여백 추가) */
    top: 50%; /* 세로 가운데 정렬 */
    transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.changePin4_header_title > h3 {
    margin: 0 auto;
    text-align: center;
    color: #1749C2;
    font-weight: 900;
}

.changePin4_section{
    position: relative;
    margin-top: 100px;
}


ul{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
}

ul >li:nth-child(1){
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 14px;

}
 ul >li:nth-child(2){
    font-size: 14px;
    font-weight: 400;
}



button {
    width: 95%; /* 적절한 너비로 조정 */
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #1749C2;
    background-color: #1749C2;
    color: white;
    font-size: 16px;
    position: fixed; /* 부모 요소를 기준으로 절대 위치 설정 */
    bottom: 60px;
    left: 50%; /* 부모 요소의 가운데 위치로 설정 */
    transform: translateX(-50%); /* 왼쪽으로 50% 이동하여 가운데 정렬 */
    cursor: pointer;
}
</style>