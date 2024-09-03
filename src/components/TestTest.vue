<template>
    <h1>QR Scan Test</h1>
    <video autoplay="true" style="width: 80%; height: 400px; border: 1px solid red;" id="videoElement"></video>
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
        const video = document.querySelector('#videoElement');
        if(navigator.mediaDevices.getUserMedia) {
            alert(111);

            navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
                alert(222);
                video.srcObject = stream;
            })
            .catch(function(error) {
                alert(error);
            })
        }
    },
    methods : {
        // openCamera() {
        //     // const video = document.getElementsByTagName('video');

        //     if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //         // eslint-disable-next-line
        //         navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
        //             // video.srcObject = stream;
        //         })
        //         .catch(function(error) {
        //             alert(error.name);

        //         })
        //     }
        // }
    }
}
</script>