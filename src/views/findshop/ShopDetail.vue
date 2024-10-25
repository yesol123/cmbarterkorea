<template>
    <header>
        <button type="button" class="goback_btn" @click="toFindShop()">
            <img src="@/assets/go_back_btn.png"></button>
        <h3>가맹점 상세정보</h3>
    </header>

    <section>
        <div class="img">
            <div :style="{ backgroundImage: `url(${currentBanner})` }"></div>
            <p>{{ shopinfo.store_business_state_value }}</p>
        </div>
        <div class="info">
            <div class="name">
                <p>{{ shopinfo.store_name }}</p>
                <p>{{ shopinfo.store_category_name }}</p>
            </div>
            <div class="call_map">
                <p>{{ shopinfo.user_cm_use }} CM 가능</p>
                <button type="button"><a :href="`tel:${shopinfo.store_phone}`"><img src="@/assets/call.png"
                            alt="전화이미지"></a></button>
                <button type="button" @click="GetStoreIndex(shopinfo.store_index)"><img src="@/assets/location.png"
                        alt="위치이미지"></button>
            </div>
        </div>
        <div class="space">
            정보
        </div>
        <div class="etc">
            <p style="margin-bottom: 30px;">{{ shopinfo.store_name }}</p>

            <p>주소</p>
            <p style="margin-bottom: 30px;">{{ shopinfo.store_address }}</p>

            <p>연락처</p>
            <p style="margin-bottom: 30px;">{{ shopinfo.store_phone }}</p>

            <p>홈페이지</p>
            <p style="margin-bottom: 30px;">{{ shopinfo.store_site }}</p>

            <p>영업시간</p>
            <p style="margin-bottom: 30px;">{{ shopinfo.store_business_hour }}</p>

            <p>소개</p>
            <p>{{ shopinfo.store_memo }}</p>

            <p>매장 이미지</p>

            <ul class="imgbox_ul">
                <li v-for="(image, index) in imglist2" :key="index">
                    <div class="imgbox">
                        <img :src="image.store_image" :alt="'Image ' + index">
                    </div>
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
            shopinfo: '',
            imglist: [],
            bannerIndex: 0,
            imglist2:[]
        }
    },
    mounted() {
        this.GetShopInfo();
        this.GetImage();
        this.bannerSliding();
        this.getShowImg()
    },
    methods: {
        toFindShop() {
            this.$router.push({ path: '/findshop' });
        },
        // 가맹점정보 불러오기
        GetShopInfo() {
            let store = useResponseStore();
            const formData = new FormData();
            formData.append('type', 'store_view');
            formData.append('store_index', store.store_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data.msg[0].store_name);
                    this.shopinfo = data.msg[0];
                })
        },
        // 가맹점이미지 불러오기
        GetImage() {
            let store = useResponseStore();
            const formData = new FormData();
            formData.append('type', 'store_img');
            formData.append('store_index', store.store_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.msg);
                    for (let i = 0; i < data.msg.length; i++) {
                        this.imglist.push(data.msg[i].store_image);
                        console.log(this.imglist);
                    }
                })
        },
        // 이미지 슬라이드
        bannerSliding() {
            this.timeOne = setInterval(() => {
                this.bannerIndex = (this.bannerIndex + 1) % this.imglist.length;
            }, 3000);
        },
        // 가맹점위치찾기
        GetStoreIndex(store_index) {
            let store = useResponseStore();
            store.store_index = '';
            store.store_index = store_index;
            console.log(store_index);

            this.$router.push({ path: '/mapdetail' });
        },
        //매장 이미지 보여주기
        getShowImg(){
        let store = useResponseStore();
        const formData= new FormData();
        formData.append('type', 'store_image_select2');
        formData.append('store_index', store.store_index);
        
        const url = process.env.VUE_APP_API_URL;
        fetch(url + 'api/store/store_update.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                console.log('222 ', result);
                console.log('222 ', result.msg);
                this.imglist2 = result.msg
            })
        }
    },
    computed: {
        currentBanner() {
            return this.imglist[this.bannerIndex];
        },
    }
}
</script>

<style scoped>
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

section {
    width: 100%;
    margin-top: 60px;
    padding: 0 15px;
    margin-bottom: 100px;
    /* border: 1px solid red; */
}

.img {
    position: relative;
    width: 100%;
    height: 250px;
    /* border: 1px solid blue; */
}

.img>div {
    display: inline-block;
    width: 100%;
    height: 100%;
    /* background-image: url(/src/assets/1.jpg); */
    background-repeat: no-repeat;
    background-size: contain;
}

.img>p {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-weight: bold;
    border-radius: 15px;
    background-color: rgb(225, 244, 196);
    border: none;
}

.info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 130px;
    padding: 0 15px;
    /* border: 1px solid blue; */
}

.name {
    width: 50%;
}

.name>p {
    font-weight: bold;
    font-size: 1.2rem;
}

.name>p:nth-of-type(2) {
    font-weight: normal;
    font-size: 1rem;
    color: #ccc;
}

.call_map {
    width: 50%;
    text-align: right;
}

.call_map>p {
    width: 80%;
    height: 25%;
    text-align: center;
    line-height: 33px;
    color: #fff;
    font-size: 0.8rem;
    margin-left: 30%;
    border-radius: 15px;
    border: none;
    background-color: #1bce0b;
}

.call_map>button {
    width: 20%;
    padding: 5px;
    border: 1px solid #1bce0b;
    border-radius: 50%;
    background-color: transparent;
    max-width: 50px;
    /* 최대 크기 제한 */
    max-height: 50px;
    /* 최대 높이 제한 */
    margin-left: 10px;
}

.call_map button img {
    width: 80%;
}

.space {
    width: 100%;
    height: 50px;
    font-weight: bold;
    text-align: center;
    line-height: 50px;
    border-bottom: 2px solid #1bce0b;
}

.etc {
    width: 100%;
}

.etc>p {
    width: 100%;
}

.imgbox_ul{
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.imgbox_ul li{
    border: 1px solid #ccc;
    border-radius: 5px;
}

.imgbox{
    display: flex;
    align-items: center;
    justify-content: center;
}


.imgbox img{
    width: 100%;
}
</style>