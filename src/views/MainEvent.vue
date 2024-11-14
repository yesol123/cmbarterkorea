<template>

        <header>
            <RouterLink to="/main"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
            <h3>쿠폰 이벤트</h3>
        </header>

        <section style="margin-top: 50px;">
            <div class="buttons">
                <div :class="{ btn1 : isFirst }" @click="FirstBtn()">진행중</div>
                <div :class="{ btn2 : isSecond }" @click="SecondBtn()">종료</div>
            </div>
            <div class="coupons" v-for="(list,i) in eventlist" :key="i" @click="toDownloadCoupon(list.event_master_index)">
                <div>
                    <p>{{ list.event_master_name }}</p>
                    <p>{{ list.event_master_condition }}</p>
                    <p>잔여쿠폰 {{ commaprice[i] }} CM</p>
                </div>
                <div>
                    <p>{{ storename[i] }}</p>
                    <p>{{ list.store_name }}</p>
                    <p v-if="this.isSecond == false">다운로드 가능 : {{ list.event_master_limit }}</p>
                </div>
            </div>
        </section>

</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
    data() {
        return {
            isFirst : false,
            isSecond : false,
            eventlist : '',
            commaprice : [],
            storename : []
        }
    },
    mounted() {
        this.FirstBtn();
    },
    methods : {
        toMain() {
            this.$router.push({ path : '/main' });
        },
        // 진행중
        FirstBtn() {

            this.eventlist = '';
            this.commaprice = [];
            this.storename = [];

            this.isFirst = true;
            this.isSecond = false;

            let store = useResponseStore();
            let formData = new FormData();
            formData.append('type', 'event_start');
            formData.append('user_index', store.user_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_event.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                for(let i=0; i<data.msg.length; i++) {
                    const comprice = data.msg[i].total_coupon_price;
                    this.commaprice.push(comprice.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                    
                    const str1 = '[';
                    const slash = '/';
                    const str2 = ']';

                    const address = data.msg[i].store_address;
                    this.storename.push(str1 + address.slice(0,2) + slash + address.slice(3,6) + str2);
                    
                }

                this.eventlist = data.msg;
            })
        },
        // 종료
        SecondBtn() {

            this.eventlist = '';
            this.commaprice = [];
            this.storename = [];

            this.isFirst = false;
            this.isSecond = true;

            let store = useResponseStore();
            let formData = new FormData();
            formData.append('type', 'event_end');
            formData.append('user_index', store.user_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_event.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);

                for(let i=0; i<data.msg.length; i++) {
                    const comprice = data.msg[i].total_coupon_price;
                    this.commaprice.push(comprice.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
                    
                    const str1 = '[';
                    const slash = '/';
                    const str2 = ']';

                    const address = data.msg[i].store_address;
                    this.storename.push(str1 + address.slice(0,2) + slash + address.slice(3,6) + str2);
                    
                }

                this.eventlist = data.msg;
            })
        },
        // 쿠폰다운로드페이지로 이동
        toDownloadCoupon(i) {
            if(this.isFirst == true) {
                console.log(i);

                let store = useResponseStore();
                store.event_master_index = i;
                this.$router.push({ path : '/edownload' });
            }
        }
    }
}
</script>

<style scoped>

.buttons {
    display: flex;
    justify-content: space-between;
    /* border: 1px solid blue; */
}
.buttons > div {
    width: 50%; height: 45px;
    font-weight: bold;
    text-align: center;
    line-height: 45px;
    border-bottom: 1px solid #ccc;
}
.buttons > .btn1 {
    color: #1bce0b;
    border-bottom: 2px solid #666464;
}
.buttons > .btn2 {
    color: #1bce0b;
    border-bottom: 2px solid #666464;
}
.coupons {
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px auto;
    width: 95%;

}
.coupons > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%; 
    padding: 5px;
}
.coupons > div:nth-of-type(1) > p, div:nth-of-type(2) > p {
    font-size: 0.9rem;
    margin-top: 7px;
    padding: 0 5px;
    margin: 5px;
    text-align: center;
}
.coupons > div:nth-of-type(1) > p:nth-of-type(1) {
    color: purple;
    font-weight: bold;
    font-size: 1.0rem;
}
.coupons > div:nth-of-type(2) > p:nth-of-type(2) {
    font-weight: bold;
}
</style>