<template>

    <header>
        <button type="button" class="goback_btn" @click="toMain()"><img src="@/assets/go_back_btn.png"></button>
        <h3>가맹점 찾기</h3>
    </header>

    <section>
        <div class="btns">
            <div :class="{ one: isOne }" @click="GetList()">목록검색</div>
            <div :class="{ two: isTwo }" @click="GetMap()">지도보기</div>
        </div>

        <div class="option">
            <select @change="GetCity($event.target.value)">
                <option selected disabled>시/도 전체</option>
                <option v-for="(state, i) in this.states" :key="i" :value="state">{{ state }}</option>
                <!-- <option value="2">{{ city[1] }}</option> -->
            </select>
            <select @change="SearchByCity($event.target.value)">
                <option selected disabled>구/군 전체</option>
                <option v-for="(city, i) in this.cities" :key="i" :value="city">{{ city }}</option>
            </select>
        </div>

        <div class="category">
            <ul>
                <li :value="0" :class="{ all: isAll }" @click="All()">전체</li>
                <li v-for="(c, i) in categories" :key="i" :value="c.store_category_index"
                    @click="Selected(c.store_category_index)"
                    :class="{ select: selectedCategory === c.store_category_index }">{{ c.store_category_name }}</li>
            </ul>
        </div>

        <div class="search">
            <input type="text" placeholder="검색어를 입력하세요." v-model="value"><button type="button"
                @click="SearchStore(this.value)">검색</button>
        </div>

        <div class="list" v-for="(post, i) in showPosts" :key="i">
            <div class="img" :style="{ backgroundImage: `url(${post.store_image})` }" @click="StoreDetail(post.store_index)"></div>
            <div class="info" @click="StoreDetail(post.store_index)">
                <p style="font-size: 0.9rem; font-weight: bold;">{{ post.store_name }}</p>
                <p style="font-size: 0.7rem;">{{ post.store_address }}</p>
                <p style="font-size: 0.7rem;">{{ post.store_category_name }}</p>
            </div>
            <div class="etc">
                <!-- <button type="button">
                    <p>{{ post.user_cm_use }} CM 가능</p>
                </button> -->
                <button type="button" class="media" @click="StoreDetail(post.store_index)">
                    <p>{{ post.user_cm_use }} CM <br>가능</p>
                </button>
                <div class="call_map">
                    <button type="button"><a :href="`tel:${post.store_phone}`"><img src="@/assets/call.png" alt=""></a></button>
                    <button type="button" @click="GetStoreIndex(post.store_index)"><img src="@/assets/location.png"
                            alt=""></button>
                </div>
            </div>
        </div>



        <div class="paging">
            <button type="button" v-if="currentPage > 1" @click="currentPage--">이전 페이지</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button type="button" v-if="currentPage < totalPages" @click="currentPage++" style="margin-left: 10px;">다음
                페이지</button>
        </div>

    </section>

</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
    data() {
        return {
            isOne: true,
            isTwo: false,
            states: [],
            state_name: '',
            cities: [],
            posts: [],
            currentPage: 1,
            postsPerPage: 20,
            categories: [],
            isAll: true,
            selectedCategory: '',
            address1: '',
            address2: '',
            fran_type: '',
            value: '',
        }
    },
    mounted() {
        this.GetStates(); // 시/도 목록 불러오기
        this.GetCategory(); // 카테고리 불러오기
        this.GetStoreList(); // 가맹점리스트 불러오기
    },
    methods: {
        All() {
            this.isAll = true;
            // this.isSelected = false;
            this.selectedCategory = '';
            this.address1 = '';
            this.address2 = '';
            this.fran_type = '';
            this.value = '';

            this.GetStoreList();
        },
        toMain() {
            this.$router.push({ path: '/main' });
        },
        GetList() {
            this.isTwo = false;
            this.isOne = true;
        },
        GetMap() {
            this.isOne = false;
            this.isTwo = true;

            this.$router.push({ path: '/findmap' });
        },
        GetStates() {
            // let store = useResponseStore();

            const formData = new FormData();
            formData.append('type', 'category_select1');

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // this.cities = data.msg;

                for (let i = 0; i < data.msg.length; i++) {
                    console.log(data.msg[i].address1);
                    this.states.push(data.msg[i].address1);
                    // console.log(this.cities);
                }
            })
        },
        // 구/군 목록 불러오기
        GetCity(value) {
            // console.log(111);
            this.address1 = '';
            this.cities = [];
            this.address1 = value;

            console.log(value);

            const city = value;
            const formData = new FormData();
            formData.append('type', 'category_select2');
            formData.append('address1', city);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);

                for (let i = 0; i < data.msg.length; i++) {
                    // console.log(data.msg[i].address2);
                    this.cities.push(data.msg[i].address2);
                    // console.log(this.cities);
                }
            })

        },
        GetStoreList() {
            // let store = useResponseStore();
            const formData = new FormData();
            formData.append('type', 'store_select');
            formData.append('address1', this.address1);
            formData.append('address2', this.address2);
            formData.append('fran_type', this.fran_type);
            formData.append('value', this.value);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(333);
                console.log(data);

                this.posts = [];

                for (let i = 0; i < data.msg.length; i++) {
                    // console.log(data.msg[i].address2);
                    this.posts.push(data.msg[i]);
                    // console.log(typeof this.posts.length);
                    // store.store_index = data.msg[i].store_index;
                    // console.log(store.store_index);
                }
            })
        },
        GetCategory() {
            const formData = new FormData();
            formData.append('type', 'category_select3');

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.msg.length; i++) {
                    // console.log(data.msg[i].address2);
                    this.categories.push(data.msg[i]);
                    // console.log(typeof this.posts.length);
                }
            })
        },
        SearchByCity(value) {
            this.address2 = '';
            console.log(value);
            this.address2 = value;

            this.GetStoreList();
        },
        Selected(value) {
            this.fran_type = '';
            console.log(value);
            this.fran_type = value;
            this.isAll = false;
            this.selectedCategory = '';
            // this.isSelected = true;
            this.selectedCategory = value;

            this.GetStoreList();
        },
        SearchStore(value) {
            this.value = '';
            console.log(value);
            this.value = value;

            this.GetStoreList();
        },
        // 가맹점 위지찾기
        GetStoreIndex(store_index) {
            let store = useResponseStore();
            store.store_index = '';
            store.store_index = store_index;
            console.log(store_index);

            this.$router.push({ path: '/mapdetail' });
        },
        // 가맹점 상세보기
        StoreDetail(index) {
            console.log(index);
            let store = useResponseStore();
            store.store_index = '';
            store.store_index = index;

            this.$router.push({ path: '/shopdetail' });
        }
    },
    computed: {
        showPosts() {
            const startIndex = (this.currentPage - 1) * this.postsPerPage;
            const endIndex = startIndex + this.postsPerPage;
            return this.posts.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.posts.length / this.postsPerPage);
        }
    },

}
</script>

<style scoped>
*p {
    margin: 5px
}

.goback_btn {
    width: 30px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}

.goback_btn img {
    width: 100%;
    height: 100%;
}

main {
    width: 100%;
    margin-top: 40px;
    /* border: 1px solid red; */
}

.btns {
    display: flex;
    width: 100%;
    /* border: 1px solid blue; */
}

.btns>div {
    width: 50%;
    height: 50px;
    color: #ccc;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
}

.btns>.one {
    color: #000;
    font-weight: bold;
    border-bottom: 2px solid #1bce0b;
}

.btns>.two {
    color: #000;
    font-weight: bold;
    border-bottom: 2px solid #1bce0b;
}

.option {
    width: 95%;
    height: 60px;
    margin: 10px auto 0;
    border-radius: 5px;
    padding: 15px 10px;
    border: 1px solid #ccc;
}

.option>select {
    width: 50%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 7px;
}

.category {
    width: 100%;
    padding: 15px;
    /* border: 1px solid red; */
    overflow-x: auto;
    padding: 0 10px;
}

.category>ul {
    margin: 8px 0;
    padding: 5px;
    display: flex;
    gap: 5px;
    white-space: nowrap;
    /* 리스트 항목이 가로로 배치되도록 설정 */
    flex-shrink: 0;
    overflow-x: auto;
    justify-content: space-between;
    scrollbar-width: none;
    /* Firefox: 스크롤바 숨기기 */
    -ms-overflow-style: none;
    /* IE and Edge: 스크롤바 숨기기 */
}


/* Chrome, Safari, Opera에서 스크롤바 숨기기 */
.category::-webkit-scrollbar {
    display: none;
}

.category li {
    width: 100%;
    padding: 8px 15px;
    list-style: none;
    font-size: 0.8rem;
    /* text-align: center; */
    font-weight: bold;
    border-radius: 20px;
    border: 1px solid #ccc;
}

.category .all {
    border: none;
    background-color: #1bce0b;
    color: #fff;
}

.category .select {
    border: none;
    background-color: #1bce0b;
    color: #fff;
}

.search {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    padding: 5px;
    margin-top: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin: 5px 0;
}

.search > input {
    width: 80%;
    height: 35px;
    font-size: 0.8rem;
    padding: 0 5px;
    border: none;
}

.search>button {
    width: 15%;
    height: 35px;
    font-size: 0.8rem;
    border: none;
    background-color: #1bce0b;
    color: #fff;
    margin-left: 10px;
    font-weight: bold;
    border-radius: 10px;
}

.list {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 25px 15px;

    border-bottom: 1px solid #ccc;
}

.list>div {
    width: 35%;
}

.img {
    border-radius: 5px;
    border: 1px solid #ccc;
    background-repeat: no-repeat;
    background-size: cover;
    margin-right: 10px;
}

.info {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    /* border: 1px solid red; */
}

.info>p {
    margin-bottom: 5px;
}

.etc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.etc>button {
    width: 100%;
    background-color: #1bce0b;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 0.8rem;
}

.call_map {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.call_map>button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    padding: 5px;
    border: 1px solid #1bce0b;
    border-radius: 50%;
    background-color: transparent;
    max-width: 50px;
    /* 최대 크기 제한 */
    max-height: 50px;
    /* 최대 높이 제한 */
}
.call_map button img {
    width: 80%;
}


.paging {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    /* border: 1px solid red; */
}

.paging>button {
    padding: 5px;
    border: none;
    color: #fff;
    background-color: #1bce0b;
    font-size: 0.8rem;
    border-radius: 5px;
    margin-right: 10px;
}

.paging>button:nth-of-type(2) {
    margin-right: 0;
    margin-left: 10px;
}

.etc>.media {
    display: none;
}

/* 작은 화면에서 스타일 변경 */
@media (max-width: 600px) {
    .etc>button {
        display: none;
        /* 기본 텍스트 숨기기 */
    }

    .etc>.media {
        margin: 0;
        display: flex;
        /* 작은 화면에서 media 보이기 */
        align-items: center;
        justify-content: center;

    }

    .call_map button {
        width: 30%;
        /* 작은 화면에서는 비율을 조금 더 크게 설정 */
        max-width: 40px;
        /* 작은 화면에서의 최대 크기 제한 */
        max-height: 40px;

    }
}


@media (prefers-color-scheme: dark) {
  .btns div{
    color: #eee;
  }
}
</style>