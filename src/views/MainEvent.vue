<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toMain()"><img src="@/assets/go_back_btn.png"></button>
            <p>쿠폰 이벤트</p>
        </header>

        <main style="margin-top: 50px;">
            <div class="buttons">
                <div :class="{ btn1 : isFirst }" @click="FirstBtn()">진행중</div>
                <div :class="{ btn2 : isSecond }" @click="SecondBtn()">종료</div>
            </div>
            <div class="coupons" v-for="(list,i) in eventlist" :key="i">
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
        </main>
    </div>
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
                // this.eventlist = data.msg;

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
        }
    }
}
</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 1rem;
    color: hsl(0, 0%, 0%);
}
.wrap {
    position: relative;
    width: 100%;
    background-color: #fff;
    /* border: 1px solid red; */
    margin-bottom: 70px;
}
header {
    position: fixed;
    top: 0; left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; height: 40px;
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid #ccc;
}
header > p {
    line-height: 40px;
    color: blue;
    /* border: 1px solid red; */
    margin: 0 auto;
}
.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
main {
    /* border: 1px solid red; */
}
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
    margin-top: 10px;
}
.coupons > div {
    width: 50%; height: 100px;
    /* border: 1px solid #000; */
}
.coupons > div:nth-of-type(1) > p, div:nth-of-type(2) > p {
    font-size: 0.9rem;
    margin-top: 7px;
    padding: 0 5px;
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