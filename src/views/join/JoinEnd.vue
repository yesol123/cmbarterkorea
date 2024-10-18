<template>
    <section>
        <div class="wrap_center">
            <p>회원가입 완료!</p>
            <p>씨엠바더 회원이 되신 것을 환영합니다.</p>
            <button type="button" @click="toHome()">확인</button>
        </div>
    </section>
</template>

<script>
import { useResponseStore } from '@/store/response.js';

export default {
    data() {
        return {

        }
    },
    methods : {
        toHome() {
            this.$router.push({ path : '/'});

            // 확인버튼 눌렀을때 Pinia 비워주기
            const store = useResponseStore();
            store.datas = '';
        }
    }
}
</script>

<style scoped>

*p{
    padding: 0px;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 30px;
}
.wrap_center {
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin-top: 250px;

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