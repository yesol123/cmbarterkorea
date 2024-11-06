<template>
    
        <header>
            <button type="button" class="goback_btn" @click="toCMList()"><img src="@/assets/icon_arrow_left.svg"></button>
            <h3>CM내역</h3>
        </header>
<section>

    <div class="btn_list">
        <!-- 보유 포인트, 머니 보여주기 -->
        <div class="money" :style="{backgroundColor : backColor}">
            <div v-if="this.member == '3'">
                <p>보유</p> 
                <p>{{ cmp }}<span> CMP</span></p>
            </div>
            <div style="margin-top: 10px;">
                <p>사용가능</p> 
                <p>{{ cm }}<span> CM</span></p>
            </div>
        </div>

        <!-- 셀렉트 및 결제취소 버튼 -->
        <div class="select">
            <p>취소할 내역을 클릭하세요.</p>
        </div>
    </div>

    <!-- CM 내역 리스트 -->
    <div class="cm_list" v-for="(list, i) in this.cancellist" :key="i" @click="SelectCancel(list.user_cm_log_value, list.user_cm_log_index)">
        <div>
            <p>{{ list.user_cm_log_create_time }}</p> 
            <p style="color: red; font-weight: bold">{{ list.user_cm_log_transaction_type_name }}</p>
        </div>
        <div>
            <p>{{ list.store_name }}</p> 
            <p style="font-weight: bold;">{{ list.user_cm_log_value_o }} CM</p>
        </div>
    </div>
</section>


    <!-- 결제취소 창 -->
    <div id="popup" class="popup">
        <div class="popup-content">
            <!-- <span class="close-btn">&times;</span> -->
            <div class="center">
                <p class="header">결제 취소 확인</p>
                <p>{{ price }} CM</p>
                <p>선택한 내역을 취소하시겠습니까?</p>
                <div>
                    <button type="button" @click="Deny()">이전</button>
                    <button type="button" @click="Confirm()">확인</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useResponseStore } from '@/store/response.js';

export default {

    data() {
        return {
            member : '',
            cm : '',
            cmp : '',
            cancellist : '',
            price : '',
            index : ''
          
        }
    },
    mounted() {
        let store = useResponseStore();
        this.member = store.member;

        this.cm = store.cm_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if(this.member == '3') {
            this.cmp = store.cmp_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        this.CMCancelList();
    },
    methods : {
        toCMList() {
            this.$router.push({ path : '/cmlist' });
        },
        CMCancelList() {
            let store = useResponseStore();
            const formData = new FormData();

            formData.append('type', 'cm_cancel_log_t');
            formData.append('user_index', store.user_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/common/cm.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('cm결제취소');
                console.log(data);
                this.cancellist = data.msg;
            })
        },
        // 결제취소 대상 선택
        SelectCancel(price, index) {
            console.log(price);
            const dotprice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            this.price = dotprice;
            console.log('123');
            console.log(this.price)
            let store = useResponseStore();
            store.cancel_price = this.price;
            store.user_cm_log_index = index;
            document.getElementById('popup').style.display = 'flex';
        },
        // 결제취소 취소
        Deny() {
            document.getElementById('popup').style.display = 'none';
        },
        // 결제취소 확인
        Confirm() {
            this.$router.push({ path : 'cmpin'});
        }
    },
    computed : {
        backColor() {
            return(this.member == '1') ? 'rgb(9, 9, 116)'
            : (this.member === '2') ? '#0A6847'
            : (this.member === '3') ? '#E4003A'
            : '#ccc'
        },
    }
}

</script>

<style scoped>


P{
    margin: 0;
}

.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
.btn_list {
    width: 100%;
    margin-top: 60px;
    padding: 0 20px;
    /* border: 1px solid red; */
}
.money {
    width: 100%;
    margin: 20px auto;
    border-radius: 7px;
    /* background-color: #ccc; */
    padding-bottom: 15px;
}
.money p, span {
    color: #fff;
    font-weight: bold;
    font-size: 1.1rem;
}
.money > div {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0;
}
.select {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    /* border: 1px solid blue; */
}
.select > p {
    width: 100%;
    font-size: 0.9rem;
    font-weight: bold;
    color: red;
    margin-top: 8px;
    text-align: right;
    /* border: 1px solid red; */
}
.cm_list {
    width: 100%;
    margin-top: 20px;
    padding: 0 20px;
    /* border: 1px solid orange; */
}
.cm_list > div {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    /* font-weight: bold; */
}
.cm_list > div:nth-of-type(2) {
    border-bottom: 1px solid #ccc;
}
.popup {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}
.popup-content {
    position: relative;

    width: 90%; height: 30%;
    background-color: #fff;
    border-radius: 8px;
    /* max-width: 90%; */
    /* max-height: 80%; */
    position: relative;
    overflow: scroll;
    text-align: center;
}
.center {
    position: absolute;
    top: 50%; left: 0;
    transform: translateY(-50%);
    width: 100%;
    /* border: 1px solid red; */
}
.header {
    font-size: 1.1rem;
    font-weight: bold;
}
.center > p, .center > div {
    width: 100%;
    /* font-size: 0.9rem; */
    margin-bottom: 5%;
    /* border: 1px solid blue; */
}
.center > p:nth-of-type(2) {
    font-weight: bold;
}
.center > div {
    display: flex;
    justify-content: space-evenly;

    width: 80%;
    margin: 7% auto 0;
    /* border:1px solid red; */
}
.center button {
    width: 50px; height: 30px;
    font-size: 0.9rem;
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    border: 1px solid #ccc;
}
.center button:nth-of-type(2) {
    background-color: #1bce0b;
    color: #fff;
    border: none;
}
</style>