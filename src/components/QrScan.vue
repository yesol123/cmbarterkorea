<template>
    <p>결제하기</p>
    <div>
        <qrcode-stream @detect ="onDetect()" style="border: 1px solid red;"></qrcode-stream>
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    components : {
        QrcodeStream,
    },
    data() {
        return {
        }
    },
    methods : {
        // QR 스캔
        onDetect (decodedString) {
            // this.qrCodeData = detectedCodes;
            // console.log(detectedCodes);
            alert(decodedString);
        },
    }
}
</script>