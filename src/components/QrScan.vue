<template>
    <p>결제하기</p>
    <qrcode-stream @detect="onDetect()" style="border: 1px solid red;"></qrcode-stream>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    components : {
        QrcodeStream,
    },
    methods : {
        // QR 스캔
        onDetect (detectedCodes) {
            // this.qrCodeData = detectedCodes;
            // console.log(detectedCodes);
            alert(detectedCodes);
        },
    }
}
</script>