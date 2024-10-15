<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toMain()"><img src="@/assets/go_back_btn.png"></button>
            <p>가맹점 찾기</p>
        </header>

        <main>
            <div class="btns">
                <div :class="{ one : isOne }" @click="GetList()">목록검색</div>
                <div :class="{ two : isTwo }" @click="GetMap()">지도보기</div>
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
                    <li :value="0" :class="{ all : isAll }" @click="All()" >전체</li>
                    <li v-for="(c, i) in categories" :key="i" :value="c.store_category_index" @click="Selected(c.store_category_index)"  :class="{ select : selectedCategory === c.store_category_index }">{{ c.store_category_name }}</li>
                    <!-- <li>레저</li>
                    <li>미용/뷰티/위생</li>
                    <li>병원/약국</li>
                    <li>스포츠/헬스</li>
                    <li>식품</li>
                    <li>학원/교육</li>
                    <li>서비스업</li>
                    <li>가구/인테리어</li>
                    <li>디지털/가전</li>
                    <li>생활/주방용품</li>
                    <li>음식점/카페</li>
                    <li>패션잡화</li>
                    <li>기타 도소매</li> -->
                </ul>
            </div>

            <div class="search">
                <input type="text" placeholder="검색어를 입력하세요." v-model="value"><button type="button" @click="SearchStore(this.value)">검색</button>
            </div>

            <div class="list" v-for="(post, i) in showPosts" :key="i">
                <div class="img" :style="{ backgroundImage : `url(${post.store_image})`}"></div>
                <div class="info">
                    <p style="font-size: 0.9rem; font-weight: bold;">{{ post.store_name }}</p>
                    <p style="font-size: 0.7rem;">{{ post.store_address }}</p>
                    <p style="font-size: 0.7rem;">{{ post.store_category_name }}</p>
                </div>
                <div class="etc">
                    <button type="button">{{ post.user_cm_use }} CM 가능</button>
                    <div>
                        <button type="button"></button>
                        <button type="button"></button>
                    </div>
                </div>
            </div>

         

            <div class="paging">
                <button type="button" v-if="currentPage > 1" @click="currentPage--">이전 페이지</button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button type="button" v-if="currentPage < totalPages" @click="currentPage++" style="margin-left: 10px;">다음 페이지</button>
            </div>

        </main>
    </div>

    <Footer />
</template>

<script>
import Footer from '@/components/FooterPage.vue'
// import { useResponseStore } from '@/store/response.js'

export default {
    components: {
        Footer,
    },
    data() {
        return {
            isOne : true,
            isTwo : false,
            states : [],
            state_name : '',
            cities : [],
            posts : [],
            currentPage : 1,
            postsPerPage : 20,
            categories : [],
            isAll : true,
            selectedCategory : '',
            address1 : '',
            address2 : '',
            fran_type : '',
            value : ''
        }
    },
    mounted() {
        this.GetStates();
        this.GetCategory();
        this.GetStoreList();
    },
    methods : {
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
            this.$router.push({ path : '/main' });
        },
        GetList() {
            this.isTwo = false;
            this.isOne = true;
        },
        GetMap() {
            this.isOne = false;
            this.isTwo = true;
        },
        GetStates() {
            // let store = useResponseStore();

            const formData = new FormData();
            formData.append('type', 'category_select1');

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // this.cities = data.msg;

                for(let i=0; i<data.msg.length; i++) {
                    console.log(data.msg[i].address1);
                    this.states.push(data.msg[i].address1);
                    // console.log(this.cities);
                }
            })
        },
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
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                
                for(let i=0; i<data.msg.length; i++) {
                    // console.log(data.msg[i].address2);
                    this.cities.push(data.msg[i].address2);
                    // console.log(this.cities);
                }
            })

        },
        GetStoreList() {
            const formData = new FormData();
            formData.append('type', 'store_select');
            formData.append('address1', this.address1);
            formData.append('address2', this.address2);
            formData.append('fran_type', this.fran_type);
            formData.append('value', this.value);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                this.posts = [];

                for(let i=0; i<data.msg.length; i++) {
                    // console.log(data.msg[i].address2);
                    this.posts.push(data.msg[i]);
                    // console.log(typeof this.posts.length);
                }
            })
        },
        GetCategory() {
            const formData = new FormData();
            formData.append('type', 'category_select3');

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for(let i=0; i<data.msg.length; i++) {
                    // console.log(data.msg[i].address2);
                    this.categories.push(data.msg[i]);
                    // console.log(typeof this.posts.length);
                }
            })
        },
        SearchByCity(value){
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
        }
    },
    computed : {
        showPosts() {
            const startIndex = (this.currentPage - 1) * this.postsPerPage;
            const endIndex = startIndex + this.postsPerPage;
            return this.posts.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.posts.length/this.postsPerPage);
        }
    },
    
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
    width: 100%;
    margin-top: 40px;
    /* border: 1px solid red; */
}
.btns {
    display: flex;
    width: 100%;
    /* border: 1px solid blue; */
}
.btns > div {
    width: 50%; height: 50px;
    color: #ccc;
    text-align: center; line-height: 50px;
    border-bottom: 1px solid #ccc;
}
.btns > .one {
    color: #000;
    font-weight: bold;
    border-bottom: 2px solid #1bce0b;
}
.btns > .two {
    color: #000;
    font-weight: bold;
    border-bottom: 2px solid #1bce0b;
}
.option {
    width: 95%; height: 60px;
    margin: 10px auto 0;
    border-radius: 5px;
    padding: 15px 10px;
    border: 1px solid #ccc;
}
.option > select {
    width: 50%; height: 100%;
    border: 1px solid #ccc;
    border-radius: 7px;
}
.category {
    width: 100%; height: 70px;
    /* border: 1px solid red; */
    overflow: scroll;
    padding: 0 10px;
}
.category > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1700px;
}
.category li {
    height: 35px; line-height: 35px;
    padding: 0 15px; 
    list-style: none;
    font-size: 0.8rem;
    /* text-align: center; */
    font-weight: bold;
    margin-top: 15px;
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
    width: 95%;
    margin: 0 auto;
    padding: 5px;
    margin-top: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
.search > input {
    width: 80%; height: 35px;
    font-size: 0.8rem;
    padding: 0 5px;
    border: none;
}
.search > button {
    width: 15%; height: 35px;
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
    width: 100%; height: 150px;
    padding: 20px 15px;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
}
.img {
    width: 35%; height: 100px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-repeat: no-repeat;
    background-size: cover;
    margin-right: 10px;
}
.info {
    width: 35%; height: 100px;
    margin-right: 10px;
    /* border: 1px solid red; */
}
.info > p {
    margin-bottom: 5px;
}
.etc {
    width: 30%; height: 100px;
    /* border: 1px solid red; */
}
.etc > button {
    width: 100%; height: 30px;
    background-color: #1bce0b;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 0.8rem;
}
.etc > div {
    margin-top: 30px;
    text-align: right;
}
.etc > div button {
    width: 30px; height: 30px;
    border: 1px solid #ccc;
    border-radius: 50%;
    background-color: #fff;
    margin-left: 0;
    background-image: url(../assets/call.png);
    background-repeat: no-repeat;
    background-size: contain;
    padding: 5px;
}
.etc > div button:nth-of-type(2) {
    margin-left: 15px;
    background-image: url(../assets/location.png);
}
.paging {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    /* border: 1px solid red; */
}
.paging > button {
    padding: 5px;
    border: none;
    color: #fff;
    background-color: #1bce0b;
    font-size: 0.8rem;
    border-radius: 5px;
    margin-right: 10px;
}
.paging > button:nth-of-type(2) {
    margin-right: 0;
    margin-left: 10px;
}
</style>