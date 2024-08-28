<template>
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
</script>