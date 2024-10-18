<template>
    
        <header>
            <button type="button" class="goback_btn" @click="toFindShop()"><img src="@/assets/go_back_btn.png"></button>
            <h3>가맹점 찾기</h3>
        </header>

        <section>
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

            <div id="map" style="width: 100%; height: 80vh; margin-top: 10px;"></div>

        </section>


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
            // map : null,
            // circle : null,
            // bounds : null,
            // radius : 0.5,
            // markers : [],
        }
    },
    mounted() {
        this.GetCategory();
        this.GetLocation(); // 지도보여주기
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

                navigator.geolocation.getCurrentPosition(async (position) => {
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

                    marker.setMap(map);  // 현재 내위치 마커

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

                    map.panTo(new window.kakao.maps.LatLng(lat, lon));

                    // 지도 영역 읽어오기
                    const bounds = circle.getBounds();
                    console.log('첫번째 bounds');
                    console.log(bounds);

                    await this.NearShop(bounds, map);

                    // 내 주변 가맹점 표시하기
                    // const formData = new FormData();
                    // formData.set('type', 'store_select2');
                    // formData.set('bounds', bounds);

                    // const url = process.env.VUE_APP_API_URL;

                    // fetch(url + 'api/store/store_map.php', {
                    // method : 'POST',
                    // body : formData
                    // })
                    // .then(response => response.json())
                    // .then(data => {
                    //     console.log('주변 가맹점 가져오기');
                    //     console.log(data);

                    //     data.msg.forEach((data_child) => {
                    //         const imageSize = new window.kakao.maps.Size(24, 35);
                    //         const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                    //         const pos = new window.kakao.maps.LatLng(data_child.pos_latitude,data_child.pos_longitude);
                    //         const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                    //         const marker = new window.kakao.maps.Marker({
                    //             map : map, // 마커를 표시할 지도
                    //             position : pos, // 마커를 표시할 위치
                    //             image : markerImage // 마커 이미지
                    //         })

                    //         marker.setMap(map); // 현재 위치 주변 가맹점에 마커 찍기


                    //     })
                    // })

                    window.kakao.maps.event.addListener(map, 'zoom_changed', async() => {
                        console.log('zoom changed!');
                        console.log(map.getLevel());
                        if(map.getLevel() == 6) {
                            // 내위치 주변으로 원생성
                            const circle = new window.kakao.maps.Circle({
                                center : new window.kakao.maps.LatLng(lat, lon),
                                radius : 1000,
                                strokeWeight : 2,
                                strokeColor : '#1749C2',
                                strokeOpacity : 0.8,
                                fillColor : '#98caff',
                                fillOpacity : 0.5,
                            });
                            const bounds = circle.getBounds();
                            console.log('두번째 bounds');
                            console.log(bounds);
                            map.panTo(new window.kakao.maps.LatLng(lat, lon)); // 지정한 좌표로 부드럽게 이동
                            await this.NearShop(bounds, map);
                        }
                        if(map.getLevel() == 7) {
                            // 내위치 주변으로 원생성
                            const circle = new window.kakao.maps.Circle({
                                center : new window.kakao.maps.LatLng(lat, lon),
                                radius : 2000,
                                strokeWeight : 2,
                                strokeColor : '#1749C2',
                                strokeOpacity : 0.8,
                                fillColor : '#98caff',
                                fillOpacity : 0.5,
                            });
                            const bounds = circle.getBounds();
                            console.log('세번째 bounds');
                            console.log(bounds);
                            map.panTo(new window.kakao.maps.LatLng(lat, lon)); // 지정한 좌표로 부드럽게 이동
                            await this.NearShop(bounds, map);
                        }
                        if(map.getLevel() > 7) {
                            map.setLevel(7);
                            // 내위치 주변으로 원생성
                            const circle = new window.kakao.maps.Circle({
                                center : new window.kakao.maps.LatLng(lat, lon),
                                radius : 2000,
                                strokeWeight : 2,
                                strokeColor : '#1749C2',
                                strokeOpacity : 0.8,
                                fillColor : '#98caff',
                                fillOpacity : 0.5,
                            });
                            const bounds = circle.getBounds();
                            console.log('네번째 bounds');
                            console.log(bounds);
                            map.panTo(new window.kakao.maps.LatLng(lat, lon)); // 지정한 좌표로 부드럽게 이동
                            await this.NearShop(bounds, map);
                        }

                    });


                })
            }
        },
        // 내주변 가맹점 찾고 표시하기
        async NearShop(bounds, map) {
            const formData = new FormData();
            formData.set('type', 'store_select2');
            formData.set('bounds', bounds);

            const url = process.env.VUE_APP_API_URL;

            await fetch(url + 'api/store/store_map.php', {
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
                        map : map, // 마커를 표시할 지도
                        position : pos, // 마커를 표시할 위치
                        image : markerImage // 마커 이미지
                    })
                    marker.setMap(map); // 현재 위치 주변 가맹점에 마커 찍기

                })

            })
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
</style>