<template>
  
        <header>
            <button type="button" class="goback_btn" @click="toCouponMake()"><img src="@/assets/go_back_btn.png"></button>
            <h3>쿠폰 이벤트 등록</h3>
        </header>
        <section>
            <div class="main">
            <div>
                <label>쿠폰 종류</label>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <input type="number" v-model="number" style="width: 80%;" placeholder="검색할 쿠폰금액을 입력해주세요."><button type="button" style="width: 60px; height: 35px; background-color: blue; margin-bottom: 5px;" @click="search()">검색</button>
                </div>
            </div>
            <div>
                <label>이벤트 이름</label>
                <input type="text" placeholder="15글자 이내 / 공백없이" v-model="e_name">
            </div>
            <div>
                <label>적용할 조건</label>
                <input type="text" placeholder="15글자 이내 / 공백없이" v-model="e_condition">
            </div>
            <div>
                <label>다운로드 횟수</label>
                <input type="number" placeholder="20회 이하" v-model="e_download">
            </div>

            <div>
                <button type="button" @click="SelectAll()">전체선택</button>
                <button type="button" @click="Register()">등록</button>
            </div>
        </div>

        <div class="coupon_list">
            <ul class="flex_direction">
                <li class="coupon_com" v-for="(list,i) in couponlist" :key="i">
                    <div class="back_ground_coupon" :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${list.coupon_price}.jpg')`}">
                        <ul class="coupon_conditions">
                            <div><input type="checkbox" name="coupon_event" @click="GetIndex(list.coupon_index, $event)"></div>
                            <div>              
                            <li>{{ list.coupon_name }}</li>
                            <li>{{ list.coupon_issuance_status }}</li>
                            <li>{{ list.coupon_limit }}일</li>
                            </div>
                            <div class="t">
                                <!-- <img src="@/assets/1000_t.png" alt=""> -->
                                <div :style="{backgroundImage : `url('https://www.haruby.store/assets/img/money/${list.coupon_price}_t.png')`}"></div>
                            </div>
                        </ul>
                    </div>
                    <button @click="gotoDetail(list.coupon_index)">쿠폰 상세보기</button>
                </li>
            </ul>
        </div>

        </section>




    
</template>

<script>

import { useResponseStore } from '@/store/response.js'

export default {
    data() {
        return {
            couponlist : '',
            id : '',
            index_list : [],
            coupon_issuance_index_list : '',
            other_coupon_issuance_index_list : [],
            number : '',
            e_name : '',
            e_condition : '',
            e_download : '',
        }
    },
    mounted() {
        this.CouponMakeList();
    },
    methods : {
        // 쿠폰발행함으로 이동
        toCouponMake() {
            this.$router.push({ path : '/cmake' });
        },
        // 쿠폰리스트
        CouponMakeList() {
            let store = useResponseStore();

            let formData = new FormData();
            formData.append('type', 'select');
            formData.append('user_index', store.user_index);
            formData.append('status', '보유중');
            formData.append('coupon_name', '');

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_issuance.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.couponlist = data.msg;

                for(let i=0; i<data.msg.length; i++) {
                    this.index_list.push(data.msg[i].coupon_index);
                    // console.log(this.index_list);
                } 
                console.log(333);
                console.log(this.index_list);
            })
        },
        // 쿠폰상세보기
        gotoDetail(id) {
            this.id = id;
            this.$router.push({ path : `/couponDetail2/${this.id}` });
        },
        // 전체선택 클릭
        SelectAll() {
            const checkboxes = document.querySelectorAll('input[name="coupon_event"]');
            checkboxes.forEach(checkbox => {
                if(checkbox.checked == false) {
                    checkbox.checked = true;
                    this.coupon_issuance_index_list = this.index_list;
                    console.log(this.coupon_issuance_index_list);
                }else{
                    checkbox.checked = false;
                    this.coupon_issuance_index_list = '';
                    console.log(this.coupon_issuance_index_list);
                }
            });
            // console.log(this.index_list);
        },
        // 등록버튼 클릭
        Register() {
            if(this.e_name == '') {
                alert('이벤트 이름을 입력해주세요.');
                return false;
            }
            if(this.e_name.length > 15) {
                alert('이벤트 이름은 15글자 이내로 입력해주세요.');
                return false;
            }
            if(this.e_name.match(/\s/g)) {
                alert('이벤트 이름에 공백은 빼주세요.');
                return false;
            }
            if(this.e_condition == '') {
                alert('이벤트 조건을 입력해주세요.');
                return false;
            }
            if(this.e_condition.length > 15) {
                alert('이벤트 조건은 15글자 이내로 입력해주세요.');
                return false;
            }
            if(this.e_condition.match(/\s/g)) {
                alert('이벤트 조건에 공백은 빼주세요.');
                return false;
            }
            if(this.e_download > 20) {
                alert('이벤트 다운로드 횟수는 최대 20회까지입니다.');
                return false;
            }
            let store = useResponseStore();
            let formData = new FormData();
            formData.append('type', 'event_insert');
            formData.append('user_index', store.user_index);
            formData.append('event_name', this.e_name);
            formData.append('event_condition', this.e_condition);
            formData.append('event_down_limit', this.e_download);
            // formData.append('coupon_issuance_index_list', JSON.stringify(this.coupon_issuance_index_list));
            formData.append('coupon_issuance_index_list', JSON.stringify(this.other_coupon_issuance_index_list));
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_event.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if(data.code == 500) {
                    alert(data.msg);
                    return false;
                }

                this.coupon_issuance_index_list = '';
                this.other_coupon_issuance_index_list = [];

                this.e_name = '';
                this.e_condition = '';
                this.e_download = '';
                
                const checkboxes = document.querySelectorAll('input[name="coupon_event"]');
                checkboxes.forEach(checkbox => {
                    if(checkbox.checked == true) {
                        checkbox.checked = false;
                    }
                });

                this.CouponMakeList();
            })
        },
        // 검색버튼
        search() {
            // console.log(123);
            let store = useResponseStore();
            let formData = new FormData();
            formData.append('type', 'event_select');
            formData.append('user_index', store.user_index);
            formData.append('coin', this.number);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/coupon/coupon_event.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.couponlist = data.msg;
            })
        },
        GetIndex(index, event) {
            // console.log(index);
            // console.log(event);
            if(event.target.checked == true) {
                this.other_coupon_issuance_index_list.push(index);
                console.log(this.other_coupon_issuance_index_list);
            } else {
                const i = this.other_coupon_issuance_index_list.indexOf(index);
                if(i !== -1) {
                    this.other_coupon_issuance_index_list.splice(i, 1);
                    console.log(this.other_coupon_issuance_index_list);
                }
            }
        }
    }
}
</script>

<style scoped>

.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
.main {
    width: 95%;
    margin: 50px auto 0;
    /* border: 1px solid red; */
}
.main > div {
    width: 100%;
    /* border: 1px solid blue; */
}
.main > div:nth-of-type(5) {
    text-align: center;
    margin-top: 20px;
}
.main > div label {
    font-size: 0.9rem;
    font-weight: bold;
}
.main > div input {
    display: block;
    width: 100%; height: 35px;
    padding: 5px;
    font-size: 0.9rem;
    margin: 5px 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.main button {
    width: 90px; height: 30px;
    font-size: 0.9rem;
    border: none;
    color: #fff;
    background-color: #1bce0b;
    border-radius: 5px;
}
.main button:nth-of-type(2) {
    margin-left: 50px;
}
.coupon_list {
    width: 95%;
    margin: 10px auto 0;
    overflow: scroll;
    /* border: 1px solid red; */
}
.flex_direction {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
}
.flex_direction .coupon_com {
    display: flex;
    flex-direction: column;
    border: 1px solid #0d6efd;
    border-radius: 5px;
}
.flex_direction .coupon_com .back_ground_coupon {
    /* background-image: url("@/assets/1000.jpg"); */
    background-size: cover;
}
.flex_direction .coupon_com button {
    border: 0;
    padding: 10px;
    font-size: 0.9rem;
    background-color: transparent;
    font-weight: bold;
    color: blue;
}
.coupon_conditions {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.coupon_conditions div:nth-child(1) {
    margin-left: 8%;
}
.coupon_conditions div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 45%;
    margin-left: 8%;
}
.coupon_conditions div:nth-child(2) li {
    border: 1px solid #E7F1F6;
    border-radius: 15px;
    background-color: #E7F1F6;
    width: 85%;
    text-align: center;
    font-weight: bold;
    overflow: hidden;
    font-size: 0.9rem;
    margin-top: 3%;
}
.t {
    width: 35%; height: 120px;
    /* border: 1px solid red; */
}
.t > div {
    width: 100%; height: 100%;
    /* border: 1px solid blue; */
    background-size: contain;
    background-repeat: no-repeat;
}
</style>