<template>
    <p>결제하기</p>
    <div>
        <qrcode-stream @decode="onDecode" style="border: 1px solid red;"></qrcode-stream>
    </div>
    <p v-if="result">QR Code result : {{ result }}</p>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    components : {
        QrcodeStream,
    },
    data() {
        return {
            result : null,
        }
    },
    methods : {
        // QR 스캔
        onDecode (decodedString) {
            // this.qrCodeData = detectedCodes;
            // console.log(detectedCodes);
            alert(decodedString);
            this.result = decodedString;
        },
    }
}
</script>