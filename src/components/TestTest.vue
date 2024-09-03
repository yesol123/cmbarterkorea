<template>
    <h1>QR Scan Test</h1>
    <video style="width: 80%; height: 400px; border: 1px solid red;"></video>
    <br>
    <button @click="openCamera()">OPEN</button>
    <button>CLOSE</button>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {

    },
    methods : {
        openCamera() {
            const video = document.getElementsByTagName('video');

            if(navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
                    video.srcObject = stream;
                })
                .catch(function(error) {
                    alert(error);

                })
            }
        }
    }
}
</script>