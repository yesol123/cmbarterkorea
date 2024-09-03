<!-- <template>
    <p>결제하기</p>
    <div>
        <qrcode-stream @detect="onDetect" @error="onError" style="border: 1px solid red;"></qrcode-stream>
    </div>
    <p></p>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    components : {
        QrcodeStream,
    },
    data() {
        return {
            whatError : ''
        }
    },
    methods : {
        // QR 스캔
        onDetect (detectedCodes) {
            // this.qrCodeData = detectedCodes;
            // console.log(detectedCodes);
            alert(detectedCodes);
        },
        onError(error) {
            // alert(error);
            alert(JSON.stringify(error));
        }
    }
}
</script> -->

<template>
    <div class="scan_wrap">
        <p>QR Scanner</p>
        <p>QR코드를 스캔하거나 인증코드를 입력하세요.</p>
        <p>카메라 빨간버튼을 QR코드 정중앙에 위치해주세요.</p>
        <div style="width: 90%; height: 350px; overflow: hidden;">
            <StreamQrcodeBarcodeReader
                capture="shoot"
                @loaded="onLoaded"
                @onloading="onLoading"
                @result="onResult"
                @error="onError"
            style="border: 1px solid #000; width: 100%; height: 100%; margin: 0 auto;"/>
            <!-- @loaded="onLoaded" -->
            <!-- @onloading="onLoading" -->
        </div>
        <!-- <p>Detected Code : {{ detectedCode }}</p> -->
        <input type="number" placeholder="QR코드 6자리를 입력해주세요.">
        <button type="button" class="inserqr">확인</button>


        <ModalPage ref="child" style="display: none;"/>
    </div>
</template>

<script setup>
// import { ref } from 'vue';
// import { StreamQrcodeBarcodeReader } from 'vue3-barcode-qrcode-reader';

// const detectedCode = ref('');

// const onLoaded = () => {
//     alert('Stream loaded');
// };

// const onLoading = () => {
//     alert('Stream loading');
// };

// const onResult = (result) => {
//     detectedCode.value = result;
//     alert('Result:', result);
// };

</script>

<script>
import { StreamQrcodeBarcodeReader } from 'vue3-barcode-qrcode-reader';
import ModalPage from '@/components/ModalPage2.vue';
// import router from '@/router/index.js';

export default {
    components : {
        ModalPage
    },
    data() {
        return {
            detectedCode : ''
        }
    },
    mounted() {
        // const btn = document.querySelector('.btn-stream');
        // btn.style.display = 'none';
        // this.toScan();
    },
    methods : {
        // clickButton() {
        //     // await new Promise(resolve => {
        //     //     btn.addEventListener('click', resolve, { once : true });
        //     //     btn.click();
        //     // });

        //     // this.callAPI();
        // },
        toScan() {

            

            // btn.addEventListener('click', function() {
            //     if(navigator.mediaDevices.getUserMedia) {
            //         navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
            //             btn.srcObject = stream;
            //         })
            //         .catch(function(error) {
            //             alert(error);
            //             router.push({ path : '/' });
            //         })
            //     }
            // })
            // btn.click();

            // try {
            //     throw new Error('에러발생');
            // } catch(err) {
            //     console.log(111);
            //     console.log(err);
            //     alert('에러가 발생함!');
            //     // this.$router.push({ path : '/' });
            // }

            // const video = document.getElementsByTagName('video');

            // if(navigator.mediaDevices.getUserMedia) {
            //     navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
            //         btn.srcObject = stream;
            //     })
            //     .catch(function(error) {
            //         alert(error);
            //         // router.push({ path : '/' });
            //     })
            // }

        },
        onLoaded(loaded) {
            alert(loaded);
        },
        onLoading(onloading) {
            // if(onloading == false) {
                alert(onloading);
                
            // }
        },
        onResult(result) {
            this.detectedCode = result;

            if(this.detectedCode != undefined) {
                this.callAPI();
            }
        },
        callAPI() {
            const refs = this.$refs.child;

            let formData = new FormData();
            formData.append('type', 'send');
            formData.append('num', this.detectedCode);

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/pay/Pay.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // alert('QR 코드 6자리 : ' + this.detectedCode);
                if(data.code == '000') {
                    refs.mode = 'qrpay';
                    refs.openModal();
                }
            })
        },
        onError(error) {
            alert('에러임', error);
        }
    }
}
</script>

<style scoped>
* {
    background-color: #fff;
}
.scan_wrap {
    width: 100%; height: 100vh;
    border: 1px solid red;
    text-align: center;
    background-color: #fff;
}
.scan_wrap > div {
    margin: 0 auto;
    /* border: 1px solid red; */
}
.scan_wrap > p {
    width: 90%;
    font-size: 1.1rem;
    font-weight: bold;
    color: #000;
    /* border: 1px solid red; */
}
.scan_wrap > p:nth-of-type(1) {
    text-align: left;
    margin-left: 25px;
}
.scan_wrap > p:nth-of-type(2), p:nth-of-type(3) {
    font-weight: normal;
    font-size: 0.9rem;
    text-align: left;
    margin-left: 25px;
}
input {
    width: 200px; height: 35px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: 20px;
    text-align: center;
    background-color: #fff;
    color: #000;
}
.inserqr {
    display: block;
    width: 90%; height: 40px;
    margin: 20px auto 0;
    background-color: #1bce0b;
    color: #fff;
    border-radius: 10px;
    border: none;
}
button {
    display: none;
}
</style>