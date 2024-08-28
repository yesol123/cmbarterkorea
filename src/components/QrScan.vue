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
    <p>결제하기 - QR 스캔</p>
    <!-- <button @click="decodeQRCode()">Decode QR Code</button> -->
    <p v-if="result">Result: {{ result }}</p>
    <p v-if="error">Error: {{ error }}</p>
</template>

<script>
import { BrowserQRCodeReader } from '@zxing/browser';

export default {
    data() {
        return {
            imageUrl: '',
            result: '',
            error: ''
        }
    },
    mounted() {
        this.decodeQRCode();
    },
    methods : {
        async decodeQRCode() {
            
            this.result = '';
            this.error = '';

            try {
                const codeReader = new BrowserQRCodeReader();
                const result = await codeReader.decodeFromImageUrl(this.imageUrl);
                this.result = result.text;
            } catch (err) {
                console.log(err);
                this.error = err.message;
            }
        }
    }
}
</script>