<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toFindShop()"><img src="@/assets/go_back_btn.png"></button>
            <p>가맹점 찾기</p>
        </header>

        <main>
            <div class="btns">
                <div :class="{ one : isOne }" @click="GetList()">목록검색</div>
                <div :class="{ two : isTwo }" @click="GetMap()">지도보기</div>
            </div>

                
            <div class="category">
                <ul>
                    <li :value="0" :class="{ all : isAll }" @click="All()" >내 주변</li>
                    <li v-for="(c, i) in categories" :key="i" :value="c.store_category_index" @click="Selected(c.store_category_index)"  :class="{ select : selectedCategory === c.store_category_index }">{{ c.store_category_name }}</li>
                </ul>
            </div>

            <div id="map" style="width: 100%; height: 100vh; margin-top: 10px;"></div>

        </main>
    </div>

    <Footer style="z-index: 10;" />
</template>

<script>
import Footer from '@/components/FooterPage.vue'

export default {
    components: {
        Footer,
    },
    data() {
        return {
            isOne : false,
            isTwo : true,
            categories : [],
            isAll : true,
            selectedCategory : '',
            // x : '',
            // y : '',
        }
    },
    mounted() {
        this.GetCategory();
        this.GetLocation();
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
        GetMap() {
            this.isOne = false;
            this.isTwo = true;
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
        GetLocation() {
            const container = document.getElementById('map');

            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    console.log(lat, lon);

                    // 지도생성
                    const options = {
                        center : new window.kakao.maps.LatLng(lat, lon),
                        level : 5
                    };

                    // 마커생성
                    const map = new window.kakao.maps.Map(container, options);
                    const marker = new window.kakao.maps.Marker({
                        position : map.getCenter()
                    });

                    marker.setMap(map);

                    // 내위치 주변으로 원생성
                    const circle = new window.kakao.maps.Circle({
                        center : new window.kakao.maps.LatLng(lat, lon),
                        radius : 500,
                        strokeWeight : 2,
                        strokeColor : '#1749C2',
                        strokeOpacity : 0.8,
                        // strokeStyle : 'solid',
                        fillColor : '#98caff',
                        fillOpacity : 0.5,
                    });

                    circle.setMap(map);

                    // 지도 영역 읽어오기
                    const bounds = circle.getBounds();
                    // console.log(777);
                    // console.log(bounds);

                    const formData = new FormData();
                    formData.set('type', 'store_select2');
                    formData.set('bounds', bounds);

                    const url = process.env.VUE_APP_API_URL;

                    fetch(url + 'api/store/store_map.php', {
                    method : 'POST',
                    body : formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('주변 가맹점 가져오기');
                        console.log(data);

                        data.msg.forEach((data_child) => {
                            const imageSize = new window.kakao.maps.Size(24, 35);
                            const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                            const pos = new window.kakao.maps.LatLng(data_child.pos_latitude,data_child.pos_longitude);
                            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                            const marker = new window.kakao.maps.Marker({
                                map : map,
                                position : pos,
                                image : markerImage
                            })

                            marker.setMap(map);

                        })
                    })

                })

            }
        
        },
        // BoundLocation(bounds) {
        //     const formData = new FormData();
        //     formData.set('type', 'store_select2');
        //     formData.set('bounds', bounds);

        //     const url = process.env.VUE_APP_API_URL;

        //     fetch(url + 'api/store/store_map.php', {
        //     method : 'POST',
        //     body : formData
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(123);
        //         console.log(data);

                
        //     })
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
    width: 1500px;
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
</style>