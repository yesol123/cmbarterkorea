<template>
    <header class="customerM_header_title">
        <RouterLink :to="`/main`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
        <h3> 고객 관리</h3>
    </header>


    <section class="customerM_area">
        <div class="search">
            <input type="number" v-model="searchNum" name="" id="" placeholder="전화번호 뒤 4자리를 입력하세요.">

            <button class="searchBtn" @click="search(searchNum)">검색</button>

        </div>

        <div class="select">
            <select id="member" name="member" v-model="selectedType" @change="updateFilteredCustomers">
                <option selected="">전체</option>
                <option value="일반">일반 고객</option>
                <option value="단골">단골 고객</option>
                <option value="추천">추천 고객</option>
            </select>
        </div>

        <div class="btn-group" role="group" aria-label="Basic example" style="margin-bottom:5px;">
            <button type="button" class="btn btn-outline-dark" id="customer_insert" @click="lover()">단골 등록</button>
            <button type="button" class="btn btn-outline-dark" id="customer_insert2" @click="normal()">일반 등록</button>
            <button type="button" class="btn btn-outline-success" id="coupon_gifts" @click="goPresentCoupon()">쿠폰
                선물</button>
        </div>


        <ul class="list-group">
            <li class="list-group-item"
                style="border: 1px solid #000; background: linear-gradient(to right, #2BB488, #1A5CB7); color:white;">
                <div class="row">
                    <div class="col-2">
                        <input class="form-check-input me-1" type="checkbox" v-model="selectAll"
                            @change="toggleSelectAll">
                    </div>
                    <div class="col-3">이름</div>
                    <div class="col-2">ID</div>
                    <div class="col-3">전화번호</div>
                    <div class="col-2">구분</div>
                </div>
            </li>

            <li class="list-group-item" style="border: 1px solid #000;" v-for="(customer, index) in filteredCustomers"
                :key="index">
                <div class="row">
                    <div class="col-2">
                        <input class="form-check-input me-1" type="checkbox" v-model="customer.checked">
                    </div>
                    <div class="col-3">{{ customer.name }}</div>
                    <div class="col-2" style="transform: translateX(-15px);">{{ customer.id }}</div>
                    <div class="col-3" style="transform: translateX(-10px);">{{ customer.phone }}</div>
                    <div class="col-2">{{ customer.type }}</div>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
import router from '@/router';
import { useResponseStore } from '@/store/response.js'


export default {
    name: 'CustomerManagement',
    data() {
        return {
            customers: [],         // 전체 고객 목록
            searchNum: '',         // 전화번호 검색 조건
            selectedType: '전체',  // 고객 타입 검색 조건
            filteredByPhone: [],   // 전화번호로 필터링된 고객 목록
            filteredByType: []     // 타입으로 필터링된 고객 목록
        }
    },
    computed: {
        filteredCustomers() {
            // 전화번호 필터와 타입 필터가 둘 다 적용되지 않은 경우 전체 목록을 보여줍니다.
            if (this.searchNum === '' && this.selectedType === '전체') {
                return this.customers;
            }

            // 전화번호와 타입 필터가 모두 적용된 경우 교집합을 구합니다.
            let phoneFiltered = this.filteredByPhone.length > 0 ? this.filteredByPhone : this.customers;
            let typeFiltered = this.filteredByType.length > 0 ? this.filteredByType : this.customers;

            // 교집합 계산 (두 필터 결과에 모두 포함된 고객들)
            return phoneFiltered.filter(customer => typeFiltered.includes(customer));
        },
        watch: {
            filteredCustomers(newValue) {
                console.log('검색 결과:', newValue);
                console.log('선택된 타입:', this.selectedType);
            }
        }
    },
    methods: {
        search() {

            console.log('전화번호 뒷자리 입력!!!!');
            this.filteredByPhone = this.customers.filter(customer =>
                customer.phone.endsWith(this.searchNum)
            );
            console.log('전화번호 검색 결과:', this.filteredByPhone);

            this.updateFilteredCustomers();

        },

        // 고객 타입을 변경할 때 호출되는 메서드
        updateFilteredCustomers() {
            this.filteredByType = this.customers.filter(customer =>
                this.selectedType === '전체' || customer.type === this.selectedType
            );
            console.log('고객 타입 검색 결과:', this.filteredByType);
        },
        toggleSelectAll() {
            this.customers.forEach(customer => {
                customer.checked = this.selectAll;
            });
        },
        lover() {
            console.log('단골고객');
            const selectedCustomers = this.customers.filter(customer => customer.checked);

            if (selectedCustomers.length === 0) {
                alert('고객을 선택해주세요!');
                return;
            }

            // 선택된 고객들의 type을 '단골'로 변경
            selectedCustomers.forEach(customer => {
                customer.type = '단골';
            });

            // 변경된 정보를 서버로 전송
            this.updateCustomerType(selectedCustomers, '단골');


        },
        normal() {
            console.log('일반고객');
            const selectedCustomers = this.customers.filter(customer => customer.checked);

            if (selectedCustomers.length === 0) {
                alert('고객을 선택해주세요!');
                return;
            }

            // 선택된 고객들의 type을 '일반'으로 변경
            selectedCustomers.forEach(customer => {
                customer.type = '일반';
            });

            // 변경된 정보를 서버로 전송
            this.updateCustomerType(selectedCustomers, '일반');
        },

        goPresentCoupon() {
            //체크된 고객이 있는지 획인
            const selectedCustomers = this.customers.filter(customer => customer.checked);


            if (selectedCustomers.length === 0) {
                alert('고객을 선택해주세요!')
                return;
            }
            const selectedIndex = this.customers
                .filter(customer => customer.checked)
                .map(customer => customer.store_customer_user_index)

            console.log(selectedIndex);

            router.push({
                path: '/couponGift',
                query: {
                    indexs: selectedIndex.join(','),
                    length: selectedIndex.length
                }
            })
        },
    },
    mounted() {
        let store = useResponseStore();

        const formData = new FormData();

        formData.append('type', 'select')
        formData.append('user_index', store.user_index)

        const url = process.env.VUE_APP_API_URL;

        fetch(url + 'api/customer/customer_setting.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                console.log(result.msg);

                console.log(result.msg[0].store_customer_user_index);

                this.customers = result.msg.map(customer => ({
                    store_customer_user_index: customer.store_customer_user_index,
                    name: customer.name,
                    id: customer.user_id,
                    phone: customer.user_phone,
                    type: customer.store_customer_status,
                    checked: false

                }))



            })





    }
}
</script>


<style scoped>
.search {
    display: flex;
    justify-content: space-between;

    border-radius: 5px;
    margin-bottom: 5px;
}

.search input {
    width: 85%;
    border: 0;
    border: 1px solid #B1B1B1;

}

.searchBtn {
    width: 30%;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    background-color: rgb(159, 76, 226);
    color: white;
}

select {
    width: 100%;
    padding: 5px;
    /* 여백을 추가해서 조금 더 넓어 보이게 설정 */
    border: 1px solid #B1B1B1;
    /* 테두리 설정 */
    border-radius: 5px;
    /* 모서리를 둥글게 설정 */
    font-size: 16px;
    /* 텍스트 크기를 적당히 조정 */
}

.btn-group {
    margin-top: 5px;
    display: flex;

}

.btn-group button {
    width: 35%;
    padding: 5px;
    background-color: #1749C2;
    color: white;
    border: 1px solid #f8f9fa;
    border-radius: 5px;
}

.list-group-item .row {
    display: flex;
    justify-content: space-around;
}
</style>