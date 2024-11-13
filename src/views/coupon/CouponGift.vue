<template>

    <header class="customerM_header_title">
        <RouterLink :to="`/CustomerManagement`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3> 쿠폰선물</h3>
    </header>


    <section class="couponGift_area">

        <form action="" class="form">
            <label for="category">
                <p>종류</p>
                <select v-model="cate" name="" id="">
                    <option hidden="" disabled="disabled" selected="seleted" value="">
                        쿠폰을 선택해주세요
                    </option>
                    <option value="1000">1,000</option>
                    <option value="5000">5,000</option>
                    <option value="10000">10,000</option>
                    <option value="50000">50,000</option>
                </select>
            </label>
            <label for="">
                <p>기한</p>
                <input v-model="limit" type="text" placeholder="쿠폰 사용기한을 입력해주세요 (1일~90일)">
            </label>
            <label for="">
                <p>이름</p>
                <input v-model="name" type="text" placeholder="쿠폰이름을 입력해주세요 (30자 이내)">
            </label>
            <label for="">
                <p>조건</p>
                <input v-model="condition" type="text" placeholder="사용조건을 입력해주세요">
            </label>
        </form>

        <article>
            <ul>
                <li>
                    <p>보유 CM</p><span>{{ this.user_cm }} CM머니</span>
                </li>
                <li>
                    <p>선택한 고객 수</p><span>{{ this.length }} 명</span>
                </li>
                <li>
                    <div class="couponbox" :style="backgroundImageStyle">
                        <ul class="coupon_conditions">
                            <div>
                                <li>
                                    <p class="long">{{ name }}</p></li>
                                <li>
                                    <p class="long">{{ condition }}</p>
                                </li>
                                <li>{{ limit }}</li>
                            </div>
                            <div class="t">
                                <img :src="couponImage" alt="">
                            </div>
                        </ul>

                    </div>
                </li>
                <li>
                    <p>필요 CM</p><span>{{ this.need_user_cm }} CM 머니</span>
                </li>
                <li>
                    <p>잔여 CM</p><span>{{ this.rest_user_cm }} CM 머니</span>
                </li>
            </ul>
            <div class="buttons">
                <button @click="showConfrimPin">선물하기</button>
                <button @click="clear">취소</button>
            </div>
        </article>

        <ConfirmPin v-if="isOpen" ref="confirmPin" @pinSuccess="handlePinSuccess" :sendType="'coupon'" />


    </section>
</template>
<script>
import { ref } from 'vue';
import ConfirmPin from '@/components/ConfirmPin.vue';
import { useResponseStore } from '@/store/response.js'
//import router from '@/router/index.js';

export default {
    name: 'couponGift',
    components: { ConfirmPin },
    setup() {
        const confirmPin = ref(null); // ConfirmPin 컴포넌트를 참조하는 ref 선언
        return { confirmPin };
    },
    data() {
        return {
            isOpen: false, // ConfirmPin 컴포넌트의 가시성 제어 변수
            // apiUrl: process.env.VUE_APP_API_URL + 'api/store/store_update.php',
            user_cm: '', // 보유 CM
            cate: '', // 종류
            limit: '', //기한
            name: '', //이름
            condition: '', //조건
            selectedCustomers: [],
            length: '',
            need_user_cm: '', //필요 CM
            rest_user_cm: '', //잔여 CM
        }
    },
    created() {
        this.selectedCustomers = this.$route.query.indexs.split(',');
        console.log('전달받음', this.selectedCustomers);
        this.length = this.$route.query.length
        console.log('선택된 고객 수 ', this.$route.query.length);
    },
    mounted() {

        let store = useResponseStore();
        const formData = new FormData();

        formData.append('type', 'authentication');
        formData.append('user_id', store.user_id);

        const url = process.env.VUE_APP_API_URL;
        fetch(url + 'api/common/main.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('jsondata???');
                console.log(data.msg);
                let toJson = JSON.parse(data.msg)
                console.log(toJson);
                this.user_cm = toJson.user_cm.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                this.updateNeedUserCm();
                this.updateRest();
            })


    },

    computed: {
        backgroundImageStyle() {
            switch (this.cate) {
                case '1000':
                    return {
                        backgroundImage: `url(${require('@/assets/1000.jpg')})`
                    };
                case '5000':
                    return {
                        backgroundImage: `url(${require('@/assets/5000.jpg')})`
                    };
                case '10000':
                    return {
                        backgroundImage: `url(${require('@/assets/10000.jpg')})`
                    };
                case '50000':
                    return {
                        backgroundImage: `url(${require('@/assets/50000.jpg')})`
                    };
                default:
                    return {};
            }
        },
        couponImage() {
            switch (this.cate) {
                case '1000':
                    return require('@/assets/1000_t.png');
                case '5000':
                    return require('@/assets/5000_t.png');
                case '10000':
                    return require('@/assets/10000_t.png');
                case '50000':
                    return require('@/assets/50000_t.png');
                default:
                    return require('@/assets/1000_t.png');
            }
        },

    },

    watch: {
        cate() {
            this.updateRest(); // cate 값이 변경될 때 필요 CM 계산
        },
        length() {
            this.updateRest(); // 고객 수가 변경될 때 필요 CM 계산
        },

    },
    methods: {
        showConfrimPin() {
            this.isOpen = true; // ConfirmPin 컴포넌트를 보이게 함
        },
        handlePinSuccess() {
            console.log('핀번호 성공, 선물하기 호출');
            this.gift(); // PIN 검증 성공 시 gift 함수 호출
            this.isOpen = false; // ConfirmPin 컴포넌트 닫기
        },
        updateNeedUserCm() {
            const cateValue = Number(this.cate);
            const lengthValue = parseInt(this.length, 10);
            // 선택한 쿠폰 금액 * 선택한 고객 수
            const needCmValue = cateValue * lengthValue;

            console.log('계산이 맞는가?', cateValue, lengthValue);


            // 필요 CM에 천 단위 콤마 추가
            this.need_user_cm = needCmValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        updateRest() {
            // updateNeedUserCm을 호출하여 need_user_cm를 업데이트
            this.updateNeedUserCm();

            // Vue의 반응성 시스템에서 need_user_cm이 업데이트된 후에 값을 사용
            this.$nextTick(() => {
                // need_user_cm에 천 단위 콤마가 들어가 있으므로 콤마 제거 후 숫자로 변환
                const needCm = parseInt(this.need_user_cm.replace(/,/g, ''), 10);

                // 보유 CM도 콤마 제거 후 숫자로 변환
                const userCm = parseInt(this.user_cm.replace(/,/g, ''), 10);

                console.log('필요 CM (숫자):', needCm);
                console.log('보유 CM (숫자):', userCm);

                // 잔여 CM 계산
                const restCm = userCm - needCm;

                console.log('잔여 CM:', restCm);

                // 잔여 CM에 다시 천 단위 콤마를 추가하여 화면에 표시
                this.rest_user_cm = restCm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            });
        },
        gift() {
            let store = useResponseStore();

            const formData = new FormData();

            formData.append('type', 'coupon_gift');
            formData.append('user_index', store.user_index);
            formData.append('coupon_price', this.cate);
            formData.append('coupon_limit', this.limit);
            formData.append('coupon_name', this.name);
            formData.append('arr', this.selectedCustomers.join(','));
            formData.append('coupon_condition', this.condition);

            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const url = process.env.VUE_APP_API_URL;
            fetch(url + 'api/customer/customer_setting.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                })


            // this.sendType = 'Coupon';  
            // const store = useResponseStore();
            // store.cate = this.cate;
            // store.limit = this.limit;
            // store.name = this.name;
            // store.condition = this.condition;
            // store.selectedCustomers = this.selectedCustomers;
            // store.length = this.length;
            // store.need_user_cm = this.need_user_cm;
            // store.rest_user_cm = this.rest_user_cm;
            // console.log('pinia',store);
            //this.$router.push({ path: '/main' });

            //쿠폰 선물 페이지로 이동
            //    this.$router.push({ path: '/confirmpin' });
        },
        clear(){
            this.limit = '',
            this.name = '',
            this.condition = ''
        }

    }

}
</script>
<style scoped>
*p {
    margin: 0;
}

.form>label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

}

.form>label>p {
    width: 10%;
}

.form>label>select,
input {
    width: 85%;
    padding: 5px;
    border: 1px solid #B1B1B1;
    border-radius: 5px;
}

article>ul {
    display: flex;
    flex-direction: column;
}

article>ul>li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #B1B1B1;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 5px;
}


.couponbox {
    background-image: url("@/assets/1000.jpg");
    background-size: cover;
    width: 100%;
}

.coupon_conditions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.coupon_conditions div:nth-child(1) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 45%;

}

.coupon_conditions div:nth-child(1) li {
    border: 1px solid #E7F1F6;
    border-radius: 15px;
    background-color: #E7F1F6;
    width: 90%;
    text-align: center;
    font-weight: bold;
    overflow: hidden;
    min-height: 30px; /* 빈 내용일 때도 공간을 유지하도록 최소 높이 설정 */
}


.t {
    width: 30%;
}

.t img {
    width: 100%;
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.buttons>button {
    padding: 5px 10px;
}


.buttons>button:nth-child(1) {
    border: 1px solid #4BAE4F;
    border-radius: 5px;
    background-color: #4BAE4F;
    color: #fff;
    font-weight: bold;
}

.buttons>button:nth-child(2) {
    border: 1px solid #B1B1B1;
    border-radius: 5px;
    background-color: transparent;
    color: #b1b1b1d8;
}



@media (max-width: 430px) {
    .long {
        display: inline-block;
        white-space: nowrap;
        /* 텍스트 줄바꿈 방지 */
        animation: marquee 8s linear infinite;
        /* 텍스트 애니메이션 */
        margin: 0;
    }

    @keyframes marquee {
        0% {
            transform: translateX(100%);
            /* 텍스트를 li의 오른쪽 끝에서 시작 */
        }

        100% {
            transform: translateX(-100%);
            /* 텍스트가 li의 왼쪽으로 사라짐 */
        }
    }
}
</style>