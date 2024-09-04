<template>
   <div class="qrscanwrap">
        <!-- <div class="qr_scan_txt">
            <p>QR코드를 스캔하거나 인증코드를 입력하세요</p>
        </div> -->
        <div class="contents_qr_scan" style="border: 1px solid red; width: 100%; height: 100%;">
            <div class="scan_box" style="width: 100%; height: 100%;">
                <video id="video" class="" width="100%" height="100%" style="object-fit:cover"></video>
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

export default {
    components : {
    },
    data() {
        return {
            
        }
    },
    mounted() {
        // QR스캔
        this.activateScanner();
    },
    methods : {
        /* eslint-disable */
        activateScanner() {
            window.addEventListener('load', async () => {
                const codeReader = new ZXingBrowser.BrowserQRCodeReader();
                const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
                console.log(videoInputDevices.length);
                if(videoInputDevices.length) {

                    const selectedDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId;
                    alert(`Started decode from camera with id ${selectedDeviceId}`);

                    const previewElem = document.querySelector('video');
                    console.log(selectedDeviceId);

                    try {
                        const controls = await codeReader.decodeFromVideoDevice(selectedDeviceId, previewElem, (result, error, controls) => {
                            if(result) {
                                alert('QR코드 스캔성공');
                                // console.log(result);
                                // const hash = document.querySelector('#hash');
                                // hash.value = result.text;
                                // scan_ajax();
                                controls.stop();
                            }
                        });

                        // if(!controls) {
                        //     alert('카메라 허용 실패');
                        // }

                    } catch (e) {
                        alert('카메라 접근 실패');
                    }
                }
            });
        }
    }
}
</script>