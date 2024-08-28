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

<!-- <template>
    <p>결제하기 - QR 스캔</p>
    <video ref="video" width="90%" height="200" style="border: 1px solid red" autoplay></video>
    <p v-if="result">Result: {{ result }}</p>
    <p v-if="error">Error: {{ error }}</p>
</template> -->
<!-- 
<script>
// import { BrowserQRCodeReader } from '@zxing/browser';
import { BrowserMultiFormatReader } from '@zxing/browser';

export default {
    data() {
        return {
            // imageUrl: '',
            // result: '',
            // error: ''
            result : null,
            codeReader : null,
            error : ''
        }
    },
    async mounted() {
        // this.decodeQRCode();
        this.codeReader = new BrowserMultiFormatReader();
        this.StartScanner();
    },
    methods : {
        // async decodeQRCode() {
            
        //     this.result = '';
        //     this.error = '';

        //     try {
        //         const codeReader = new BrowserQRCodeReader();
        //         const result = await codeReader.decodeFromImageUrl(this.imageUrl);
        //         this.result = result.text;
        //     } catch (err) {
        //         console.log(err);
        //         this.error = err.message;
        //     }
        // }
        async StartScanner() {
            try {
                const videoElement = this.$refs.video;
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                videoElement.srcObject = stream;

                this.codeReader.decodeFromVideoDevice(null, videoElement, (result, err) => {
                    if(result) {
                        this.result = result.text;
                    }
                    if(err) {
                        this.error = err;
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    },
    beforeUnmount() {
        if (this.codeReader) {
            this.codeReader.reset();
        }
    }
}
</script> -->

<template>
    <p>QR Scanner</p>
    <div style="width: 90%; height: 300px; border: 1px solid red;">
        <StreamQrcodeBarcodeReader
            capture="shoot"
            @loaded="onLoaded"
            @onloading="onLoading"
            @result="onResult"
        />
    </div>
    <p>Detected Code: {{ detectedCode }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { StreamQrcodeBarcodeReader } from 'vue3-barcode-qrcode-reader';

const detectedCode = ref('');

const onLoaded = () => {
    alert('Stream loaded');
};

const onLoading = () => {
    alert('Stream loading');
};

const onResult = (result) => {
    detectedCode.value = result;
    alert('Result:', result);
};

</script>

<script>

</script>