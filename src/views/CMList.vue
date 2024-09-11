<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toMain()"><img src="@/assets/go_back_btn.png"></button>
            <p>CM내역</p>
        </header>

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
                <select>
                    <option>전체</option>
                    <option>구매</option>
                    <option>선물</option>
                    <option v-if="this.member == '3'">판매</option>
                    <option v-if="this.member == '3'">충전</option>
                    <option v-if="this.member == '2'">수당</option>
                </select>

                <button type="button">결제 취소</button>
            </div>
        </div>

        <!-- CM 내역 리스트 -->
        <div class="cm_list" v-for="(list, i) in this.cmlist" :key="i">
            <div>
                <p>{{ list.user_cm_log_create_time }}</p> 
                <p style="font-weight: bold;" :style="{color : fontColor(list.user_cm_log_payment_name)}">{{ list.user_cm_log_transaction_type_name }}</p>
            </div>
            <div>
                <p>작업예정</p> 
                <p style="font-weight: bold;">{{ list.user_cm_log_value }}</p>
            </div>
        </div>


    </div>

    <Footer />
</template>

<script>
import Footer from '@/components/FooterPage.vue'
import { useResponseStore } from '@/store/response.js';

export default {
    components : {
        Footer,
    },
    data() {
        return {
            member : '',
            cm : '',
            cmp : '',
            cmlist : '',
            // whatcolor : []
          
        }
    },
    mounted() {
        let store = useResponseStore();
        this.member = store.member;

        this.cm = store.cm_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if(this.member == '3') {
            this.cmp = store.cmp_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        this.CMList();
    },
    methods : {
        toMain() {
            this.$router.push({ path : '/main' });
        },
        CMList() {
            let store = useResponseStore();
            const formData = new FormData();

            formData.append('type', 'cm_log');
            formData.append('user_index', store.user_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/common/cm.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                // console.log('cm내역');
                // console.log(data.msg);
                this.cmlist = data.msg;
                // console.log(this.cmlist[0].party_name);

                // for(let i=0; i<this.cmlist.length; i++) {
                //     this.whatcolor.push(this.cmlist[i].user_cm_log_payment_name);
                //     console.log(this.whatcolor);
                // }
            })

        },
        fontColor(type) {
            if(type == '입금') {
                return 'blue';
            } else if (type == '출금') {
                return 'red';
            } else {
                return '#000';
            }
        }

    },
    computed : {
        backColor() {
            return(this.member == '1') ? 'rgb(9, 9, 116)'
            : (this.member === '2') ? '#0A6847'
            : (this.member === '3') ? '#E4003A'
            : '#ccc'
        },
        // fontColor() {
        //     // return(this.whatcolor == '출금') ? 'red'
        //     // : (this.whatcolor == '입금') ? 'blue'
        //     // : '#000'

        //     return (document.querySelector('.color').innerHTML == '입금') ? 'red'
        //     : (document.querySelector('.color').innerHTML == '출금') ? 'blue' : '#000'
        // }
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
.select > select {
    width: 100px; height: 35px;
    border-radius: 5px;
    font-size: 0.9rem;
    background-color: #fff;
    color: #000;
}
.select option {
    font-size: 0.9rem;
    color: #000;
}
.select > button {
    width: 70px; height: 35px;
    border-radius: 5px;
    border: none;
    background-color: #1bce0b;
    color: #fff;
    font-size: 0.8rem;
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
}
.cm_list > div p, .cm_list > div span {
    color: #000;
}
.cm_list > div:nth-of-type(2) {
    border-bottom: 1px solid #ccc;
}
</style>