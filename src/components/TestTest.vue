<template>
    <p>QR Scan Test</p>
    <!-- <video autoplay="true" style="width: 80%; height: 400px; border: 1px solid red;" id="videoElement"></video>
    <br>
    <button @click="openCamera()">OPEN</button>
    <button>CLOSE</button> -->

    <!-- <iframe src="https://www.cmbarter.com/pages/payment/payment.php" width="800" height="600"></iframe> -->

    <div class="qrscanwrap">
        <div class="qr_scan_txt">
            <p>QR코드를 스캔하거나 인증코드를 입력하세요</p>
        </div>
        <div class="contents_qr_scan" style="border: 1px solid red; width: 80%; height: 300px;">
            <div class="scan_box">
                <video id="video" class="" width="100%" height="100%" style="object-fit:cover"></video>
            </div>
        </div>
        <div class="qr_number">
            <form name="qrSendForm" id="qrSendForm">
                <input type="hidden" name="fran" id="fran" value="5">
                <input type="hidden" name="hash" id="hash" value="">
                <input type="text" name="num2" id="num2" placeholder="123456" maxlength="6" onkeyup="this.value=this.value.replace(/[^-0-9]/g,'');" inputmode="decimal"/>
            </form>
        </div>
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

        this.activateScanner();
        // const date = new Date();
        // console.log(date.setTime(date.getTime()));

        // const video = document.querySelector('#videoElement');
        // if(navigator.mediaDevices.getUserMedia) {
        //     alert(111);
        //     navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
        //         alert(222);
        //         video.srcObject = stream;
        //     })
        //     .catch(function(error) {
        //         alert(error);
        //     })
        // }
    },
    methods : {
        // openCamera() {
        //     // const video = document.getElementsByTagName('video');

        //     if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //         // eslint-disable-next-line
        //         navigator.mediaDevices.getUserMedia({video:true}).then(function(stream) {
        //             // video.srcObject = stream;
        //         })
        //         .catch(function(error) {
        //             alert(error.name);

        //         })
        //     }
        // }
        /* eslint-disable */
        activateScanner() {
            window.addEventListener('load', async () => {
                const codeReader = new ZXingBrowser.BrowserQRCodeReader();
                const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
                console.log(videoInputDevices.length);
                if(videoInputDevices.length) {
                    const selectedDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId;
                    alert(`Started decode from camera with id ${selectedDeviceId}`);
                    // const qr_area_off = document.querySelector('.qr_area_off');
                    // qr_area_off.classList.add("d_none");

                    const previewElem = document.querySelector('video');
                    console.log(selectedDeviceId);
                    const controls = await codeReader.decodeFromVideoDevice(selectedDeviceId, previewElem, (result, error, controls) => {
                        if(result) {
                            alert('QR코드 스캔성공');
                            console.log(result);
                            const hash = document.querySelector('#hash');
                            hash.val(result.text);
                            scan_ajax();
                            controls.stop();
                        }
                        // if(error) {
                        //     alert('QR코드 스캔실패');
                        // }
                    });
                }
            });
        }
    }
}
</script>