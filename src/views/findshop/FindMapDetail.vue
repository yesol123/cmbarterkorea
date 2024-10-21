<template>
   
        <header>
            <button type="button" class="goback_btn" @click="toFindShop()"><img src="@/assets/go_back_btn.png"></button>
            <h3>가맹점 찾기</h3>
        </header>

        <section>
            <div class="btns">
                <div :class="{ one : isOne }" @click="GetList()">목록검색</div>
                <div :class="{ two : isTwo }">지도보기</div>
            </div>

            <div class="category">
                <ul>
                    <li :value="0" :class="{ all : isAll }" @click="All()" >내 주변</li>
                    <li v-for="(c, i) in categories" :key="i" :value="c.store_category_index" @click="Selected(c.store_category_index)"  :class="{ select : selectedCategory === c.store_category_index }">{{ c.store_category_name }}</li>
                </ul>
            </div>

            <div class="standard">

                <div id="map" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>

                <div class="shop_info">
                    <div class="img" :style="{ backgroundImage : `url(${info.store_image})`}"></div>
                    <div class="info">
                        <p>{{ info.store_name }}</p>
                        <p>{{ info.store_address }}</p>
                        <div class="btns">
                            <button type="button"><img src="@/assets/call.png" alt=""></button>
                            <button type="button"><img src="@/assets/location.png" alt=""></button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
</template>

<script>
import { useResponseStore } from '@/store/response.js'

export default {
 
    data() {
        return {
            isOne : false,
            isTwo : true,
            categories : [],
            isAll : true,
            selectedCategory : '',
            info : ''
        }
    },
    mounted() {
        this.GetCategory();
        this.GetInfo();
    },
    methods : {
        toFindShop() {
            this.$router.push({ path : '/findshop' });
        },
        GetList() {
            this.isTwo = false;
            this.isOne = true;
            this.$router.push({ path : '/findshop' });
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
                    this.categories.push(data.msg[i]);
                }
            })
        },
        All() {
            this.isAll = true;
            this.selectedCategory = '';
        },
        Selected(value) {
            console.log(value);
            this.isAll = false;
            this.selectedCategory = '';
            this.selectedCategory = value;
        },
        GetInfo() {
            let store = useResponseStore();
            const formData = new FormData();
            formData.append('type', 'store_get');
            formData.append('store_index', store.store_index);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/store/store_map.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('지도상세');
                console.log(data);
                
                for(let i=0; i<data.msg.length; i++) {
                    // console.log(data.msg[i]);
                    this.info = data.msg[i];
                    // console.log(this.info.store_index);
                    console.log(this.info.store_image);

                    this.GetLocation();
                }
            })

        },
        GetLocation() {
            const container = document.getElementById('map');

            // 지도생성
            const options = {
                center : new window.kakao.maps.LatLng(this.info.store_pos2, this.info.store_pos1),
                level : 3
            };

            // 마커생성
            const map = new window.kakao.maps.Map(container, options);
            const imageSize = new window.kakao.maps.Size(24, 35);
            const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            const pos = new window.kakao.maps.LatLng(this.info.store_pos2,this.info.store_pos1);
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
            const marker = new window.kakao.maps.Marker({
                map : map, // 마커를 표시할 지도
                position : pos, // 마커를 표시할 위치
                image : markerImage // 마커 이미지
            });

            marker.setMap(map);

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
section {
    position: relative;
    width: 100%;
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
.category {
    width: 100%;
    padding: 15px;
    /* border: 1px solid red; */
    overflow-x: auto;
    padding: 0 10px;
}
.category > ul {
    margin: 8px 0;
    padding: 5px;
    display: flex;
    gap: 5px;
    white-space: nowrap; /* 리스트 항목이 가로로 배치되도록 설정 */
    flex-shrink: 0;
    overflow-x: auto;
    justify-content: space-between;
    scrollbar-width: none; /* Firefox: 스크롤바 숨기기 */
    -ms-overflow-style: none; /* IE and Edge: 스크롤바 숨기기 */
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
.standard {
    position: relative;
    width: 100%; 
    height: calc(100vh - 60px); /* 뷰포트 전체 높이에서 header 높이(60px)를 제외 */
    /* border: 5px solid blue; */
}
.shop_info {
    position: fixed;
    bottom: 30px; left: 0;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    width: 100%; 
    background-color: #fff;
    padding: 30px 10px;
    border: none;
   
}
.img {
    width: 35%; height: 100px;
    background-repeat: no-repeat;
    background-size: cover;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
.info {
    width: 60%;
    /* border: 1px solid red; */
}
.info > p {
    width: 100%;
    font-weight: bold;
    color: #000;
    margin: 0;
}
.info > p:nth-of-type(2) {
    font-weight: 300;
    font-size: 0.9rem;
    margin-top: 5px;
    color: #ccc;
}
.info > div {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    /* border: 1px solid red; */
}

.btns{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}


.btns>button {
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


.btns button img {
    width: 80%;
    }

    @media (max-width:600px) {
        
    .btns button {
        width: 30%;
        /* 작은 화면에서는 비율을 조금 더 크게 설정 */
        max-width: 40px;
        /* 작은 화면에서의 최대 크기 제한 */
        max-height: 40px;

    }
        
    }
</style>