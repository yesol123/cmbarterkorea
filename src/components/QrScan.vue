<template>
   <div class="qrscanwrap" style="text-align: center; margin-top: 35%;">
        <!-- <div class="qr_scan_txt" style="font-size: 1.0rem; font-weight: bold; margin-bottom: 40px;">
            <p>QR 스캔</p>
        </div> -->
        <div class="contents_qr_scan" style="width: 90%; height: 400px; margin: 0 auto; border: 2px solid #000;">
            <div class="scan_box" style="width: 100%; height: 100%;">
                <video id="video" class="" width="100%" height="100%" style="object-fit:cover; background-color: #6e6b6b;"></video>
            </div>
        </div>
        <!-- <div class="qr_number">
            <form name="qrSendForm" id="qrSendForm">
                <input type="hidden" name="fran" id="fran" value="5">
                <input type="hidden" name="hash" id="hash" value="">
                <input type="text" name="num2" id="num2" placeholder="123456" maxlength="6" onkeyup="this.value=this.value.replace(/[^-0-9]/g,'');" inputmode="decimal"/>
            </form>
        </div> -->
    </div>
</template>

<script>
import router from '@/router/index.js';

export default {
    components : {
    },
    data() {
        return {
            result : ''
        }
    },
    mounted() {
        // QR스캔
        this.activateScanner();
    },
    methods : {
        /* eslint-disable */
        activateScanner() {
            (async () => {
                const codeReader = new ZXingBrowser.BrowserQRCodeReader();
                const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
                console.log(videoInputDevices.length);
                if(videoInputDevices.length) {

                    const selectedDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId;
                    // alert(`Started decode from camera with id ${selectedDeviceId}`);

                    const previewElem = document.querySelector('video');
                    console.log(selectedDeviceId);

                    try {
                        const controls = await codeReader.decodeFromVideoDevice(selectedDeviceId, previewElem, (result, error, controls) => {
                            if(result) {
                                alert('QR코드 스캔성공');
                                // alert(result);
                                // console.log(result);
                                // const hash = document.querySelector('#hash');
                                // hash.value = result.text;
                                // scan_ajax();

                                alert('123');

                                this.result = result;

                                this.callAPI();

                                alert('345')

                                controls.stop();
                            }
                        });

                        // if(!controls) {
                        //     alert('카메라 허용 실패');
                        // }

                    } catch (e) {
                        alert('카메라 접근 실패');
                        router.push({ path : '/main' });
                    }
                }
            })();
        },
        callAPI() {
            alert('77');
            const formData = new FormData();
            formData.append('type', 'send');
            formData.append('num', this.result);

            const url = process.env.VUE_APP_API_URL;

            alert('88');

            fetch(url + 'api/pay/Pay.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .catch((error) => alert(error))
            .then(data => {
                console.log(data);

                if(data.code == 404) {
                    alert(data.msg);
                    // return false;
                }
            })

            alert('99');
        }
    }
}
</script>

<style scoped>

</style>