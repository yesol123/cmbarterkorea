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
                <select v-model="selectlist" @change="Search()" v-if="this.cancel == false">
                    <option>전체</option>
                    <option>구매</option>
                    <option>선물</option>
                    <option v-if="this.member == '3'">판매</option>
                    <option v-if="this.member == '3'">충전</option>
                    <option v-if="this.member == '2'">수당</option>
                </select>
                <!-- {{ selectlist }} -->
                <button type="button" v-if="this.cancel == false" @click="Cancellation()">결제 취소</button>
                <p v-if="this.cancel == true">취소할 내역을 클릭하세요.</p>
            </div>
        </div>

        <!-- CM 내역 리스트 -->
        <div class="cm_list" v-for="(list, i) in this.cmlist" :key="i" @click="SelectCancel(list.user_cm_log_value)">
            <div>
                <p>{{ list.user_cm_log_create_time }}</p> 
                <p style="font-weight: bold;" :style="{color : fontColor(list.user_cm_log_payment_name)}">{{ list.user_cm_log_transaction_type_name }}</p>
            </div>
            <div>
                <p>{{ list.user_cm_log_reason }}</p> 
                <p style="font-weight: bold;">{{ list.user_cm_log_value }}</p>
            </div>
        </div>


    </div>
    
    <!-- 결제취소 창 -->
    <div id="popup" class="popup">
        <div class="popup-content">
            <!-- <span class="close-btn">&times;</span> -->
            <div class="center">
                <p class="header">결제 취소 확인</p>
                <p>{{ price }}</p>
                <p>선택한 내역을 취소하시겠습니까?</p>
                <div>
                    <button type="button" @click="Deny()">이전</button>
                    <button type="button" @click="Confirm()">확인</button>
                </div>
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
            selectlist : '전체',
            cancel : false,
            price : ''
          
        }
    },
    mounted() {
        let store = useResponseStore();
        this.member = store.member;

        this.cm = store.cm_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if(this.member == '3') {
            this.cmp = store.cmp_amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        // CM내역
        this.CMList();
    },
    methods : {
        toMain() {
            this.$router.push({ path : '/main' });
        },
        // CM내역
        CMList() {
            let store = useResponseStore();
            const formData = new FormData();

            formData.append('type', 'cm_log');
            formData.append('user_index', store.user_index);
            
            // 선택검색
            if(this.selectlist == '구매' || this.cancel == true) {
                formData.append('user_cm_log_transaction_type_name', '구매');
            }
            if(this.selectlist == '선물') {
                formData.append('user_cm_log_transaction_type_name', '선물');
            }
            if(this.selectlist == '판매') {
                formData.append('user_cm_log_transaction_type_name', '판매');
            }
            if(this.selectlist == '충전') {
                formData.append('user_cm_log_transaction_type_name', '충전');
            }
            if(this.selectlist == '수당') {
                formData.append('user_cm_log_transaction_type_name', '수당');
            }

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

                for(let i=0; i<this.cmlist.length; i++) {
                    // console.log(i);

                    const cm = this.cmlist[i];

                    // console.log(cm.user_cm_log_reason);

                    cm.user_cm_log_reason = '-';

                    if(cm.user_cm_log_transaction_type_name == '구매(결제 취소)' || cm.user_cm_log_transaction_type_name == '구매') {
                        // 판매자 가게 이름
                        cm.user_cm_log_reason = cm.store_name;

                        if(cm.user_cm_log_transaction_type_name == '구매') {

                            // 사용 CM이 0일 경우,
                            if(cm.user_cm_log_value_t == 0) {
                                // cm.user_cm_log_value = '쿠폰'; // + 어떤 단위?
                                cm.user_coupon_value = cm.user_coupon_value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                cm.user_cm_log_value = `'쿠폰'${cm.user_coupon_value}'CM'`; 
                            }
                            else if(cm.user_coupon_value == 0) {
                                cm.user_cm_log_value;
                            }
                            else {
                                cm.user_coupon_value = cm.user_coupon_value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                cm.user_cm_log_value = `${cm.user_cm_log_value}'(쿠폰'${cm.user_coupon_value}'CM)'`;
                            }
                        }
                        if(cm.user_cm_log_transaction_type_name == '구매(결제 취소)') {
                            if(cm.user_cm_log_value_t == 0) {
                                cm.user_coupon_value = cm.user_coupon_value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                cm.user_cm_log_value = `'쿠폰'${cm.user_coupon_value}'CM'`; 
                            }
                            else if(cm.user_coupon_value == 0) {
                                cm.user_cm_log_value;
                            }
                            else {
                                cm.user_coupon_value = cm.user_coupon_value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                cm.user_cm_log_value = `${cm.user_cm_log_value}'(쿠폰'${cm.user_coupon_value}'CM)'`;
                            }
                        }
                    }
                    else if(cm.user_cm_log_transaction_type_name == '판매(결제 취소)' || cm.user_cm_log_transaction_type_name == '판매') {
                        cm.trigger_id = cm.trigger_id.slice(0,1) + '*'.repeat(cm.trigger_id.length - 2) + cm.trigger_id.slice(-1);
                        cm.trigger_name = cm.trigger_name.slice(0,1) + '*'.repeat(cm.trigger_name.length - 2) + cm.trigger_name.slice(-1);
                        
                        cm.user_cm_log_reason = cm.trigger_id + '(' + cm.trigger_name + ')';
                    }
                    else if(cm.user_cm_log_transaction_type_name == '선물') {
                        cm.trigger_id = cm.trigger_id.slice(0,1) + '*'.repeat(cm.trigger_id.length - 2) + cm.trigger_id.slice(-1);
                        cm.trigger_name = cm.trigger_name.slice(0,1) + '*'.repeat(cm.trigger_name.length - 2) + cm.trigger_name.slice(-1);
                        
                        cm.user_cm_log_reason = cm.trigger_id + '(' + cm.trigger_name + ')';
                    }
                    // else if(cm.user_cm_log_transaction_type_name == '충전(CM)' || cm.user_cm_log_transaction_type_name == '충전(CMP)') {

                    // }
                    else {
                        cm.user_cm_log_reason;
                    }

                } 

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
        },
        // 검색하기
        Search() {
            // alert(list);
            // this.selectlist = list;
            // console.log(this.selectlist);
            this.CMList();
        },
        // 결제취소버튼
        Cancellation() {
            this.cancel = true;
            if(this.selectlist != '구매') {
                this.selectlist = '전체';
                this.CMList();
            }
            this.CMList();
        },
        // 결제취소 대상 선택
        SelectCancel(price) {
            if(this.cancel == true) {
                console.log(price);
                this.price = price;
                let store = useResponseStore();
                store.cancel_price = this.price;
                document.getElementById('popup').style.display = 'flex';
            }
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
}
.cm_list > div p, .cm_list > div span {
    color: #000;
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
/* .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: #000;
    cursor: pointer;
} */
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