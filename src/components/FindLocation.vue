<template>
    <h1>Kakao Map Test</h1>
    <div id="map" style="width:500px;height:400px;"></div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.GetLocation();

    },
    methods : {
        GetLocation() {
            const container = document.getElementById('map');
            
            // 지도생성
            const options = {
                center : new window.kakao.maps.LatLng(33.450701, 126.570667),
                level : 3
            };

            // 마커생성
            const map = new window.kakao.maps.Map(container, options);
            const marker = new window.kakao.maps.Marker({
                position : map.getCenter()
            });

            marker.setMap(map);

            // 클릭시 마커생성
            window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                const latlng = mouseEvent.latLng;
                marker.setPosition(latlng);
                
                const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ', 경도는 ' + latlng.getLng() + ' 입니다.';
                console.log(message);
            })

            // 내위치 주변으로 원생성
            const circle = new window.kakao.maps.Circle({
                center : new window.kakao.maps.LatLng(33.450701, 126.570667),
                radius : 100,
                strokeWeight : 1,
                strokeColor : 'blue',
                strokeOpacity : 1,
                strokeStyle : 'solid',
                fillColor : '#3572EF',
                fillOpacity : 0.3,
            });

            circle.setMap(map);

        },
    }
}

</script>