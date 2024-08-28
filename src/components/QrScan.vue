<template>
    <p>결제하기</p>
    <div>
        <qrcode-stream @decode="onDecode" @error="onError" style="border: 1px solid red;"></qrcode-stream>
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
        onDecode (decodedString) {
            // this.qrCodeData = detectedCodes;
            // console.log(detectedCodes);
            alert(decodedString);
        },
        onError(error) {
            alert(error);
        }
    }
}
</script>