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
        <div style="width: 90%;">
            <StreamQrcodeBarcodeReader
                capture="shoot"
                @result="onResult"
            style="border: 1px solid #000; width: 100%; height: 300px; margin: 0 auto;"/>
            <!-- @loaded="onLoaded" -->
            <!-- @onloading="onLoading" -->
        </div>
        <p>Detected Code : {{ detectedCode }}</p>
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

export default {
    data() {
        return {
            detectedCode : ''
        }
    },
    mounted() {
        const btn = document.querySelector('.btn-stream');
        btn.style.display = 'none';
        btn.click();
        // this.callAPI();
        // this.clickButton();
    },
    methods : {
        // clickButton() {
        //     const btn = document.querySelector('.btn-stream');
        //     btn.style.display = 'none';
        //     console.log(444);
        //     console.log(222);
        //     // this.callAPI();
        //     btn.click();

        //     // if(this.detectedCode != '') {
        //     //     console.log(222)
        //     // }

        //     // await this.callAPI();


        //     // await new Promise(resolve => {
        //     //     btn.addEventListener('click', resolve, { once : true });
        //     //     btn.click();
        //     // });

        //     // this.callAPI();
        // },
        onResult(result) {
            this.detectedCode = result;
            this.callAPI();
        },
        callAPI() {
            if(this.detectedCode != '') {
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
                    alert('api data : ' + data.code + ',' + this.detectedCode);
                })
            } else {
                alert('실패했음..');
            }
        }
    }
}
</script>

<style>
.scan_wrap {
    width: 100%;
    border: 1px solid red;
}
.scan_wrap > div {
    margin: 0 auto;
    /* border: 1px solid red; */
}
.scan_wrap > p {
    padding-left: 20px;
    font-size: 1.1rem;
    font-weight: bold;
    /* border: 1px solid red; */
}
.scan_wrap > p:nth-of-type(2) {
    font-weight: normal;
}
</style>