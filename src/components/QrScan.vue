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
    <p>QR Scanner</p>
    <div style="width: 90%;">
        <StreamQrcodeBarcodeReader
            capture="shoot"
            @result="onResult"
        />
        <!-- @loaded="onLoaded" -->
            <!-- @onloading="onLoading" -->
    </div>
    <p>Detected Code: {{ detectedCode }}</p>
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
    },
    methods : {
        onResult(result) {
            this.detectedCode = result;
        },
    }
}
</script>