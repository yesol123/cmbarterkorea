<template>
    <header class="Terms_header_title">
        <RouterLink :to="`/mypage/${this.member}`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3>약관 및 이용 동의</h3>
    </header>

    <section class="terms">
        <ul>
            <li>
                <RouterLink to="/Terms/userService">
                    <p>CMBater 서비스 이용약관</p><img src="@/assets/icon_arrow_right.svg" alt="">
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/Terms/franchiseeprivacy">
                    <p>개인정보 수집 및 이용약관</p><img src="@/assets/icon_arrow_right.svg" alt="">
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/Terms/FranchiseeMarketing">
                    <p>마케팅 정보 수집 및 이용 동의</p><img src="@/assets/icon_arrow_right.svg" alt="">
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/Terms/franchiseeAdvertisement">
                    <p>광고성 정보 수신 동의</p><img src="@/assets/icon_arrow_right.svg" alt="">
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/Terms/FranchiseeLocation">
                    <p>위치기반 서비스 이용약관 동의</p><img src="@/assets/icon_arrow_right.svg" alt="">
                </RouterLink>
            </li>
        </ul>
    </section>

</template>


<script>
import { useResponseStore } from '@/store/response.js';




export default {
    name: 'TermsPage',
    data() {
        return {
            member: '',

        }
    },
    mounted() {
        // store에서 member 값을 가져와서 data에 할당
        let store = useResponseStore();
        this.member = store.member;
    }
}
</script>
<style scoped>
ul {
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 95%;
}

ul>li {
    margin: 5px;
}

ul>li>a {
    display: flex;
    justify-content: space-between;
    width: 100%;

}

.terms {
    width: 100%;
    margin: 0 auto;
}


p {
    margin: 0;
}
</style>