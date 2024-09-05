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

    <div id="popup" class="popup">
        <div class="popup-content">
            <p class="header">결제 확인</p>
            <span style="font-weight: bold; font-size: 1.1rem;">{{ name }}</span><span style="font-weight: bold; font-size: 1.1rem;">({{ id }})</span> <span>님,</span>
            <p style="font-weight: bold; font-size: 1.3rem;">{{ cm }} CM</p>
            <p style="font-size: 1.0rem;">결제하시겠습니까?</p>

            <div class="btn_group">
                <button type="button">취소</button>
                <button type="button">확인</button>
            </div>
        </div>
    </div>

    <ModalPage ref="child" style="display: none;"/>
</template>

<script>
import router from '@/router/index.js';
import ModalPage from '@/components/ModalPage2.vue';

export default {
    components : {
        ModalPage
    },
    data() {
        return {
            name : '',
            id : '',
            cm : ''
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

                                const refs = this.$refs.child;

                                const formData = new FormData();
                                formData.append('type', 'send');
                                formData.append('num', result);

                                const url = process.env.VUE_APP_API_URL;

                                fetch(url + 'api/pay/Pay.php', {
                                method : 'POST',
                                body : formData
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);

                                    if(data.code == '000') {
                                        alert('결제 api 호출 성공');

                                        this.name = data.hash_mb.mb_name;
                                        this.id = data.hash_mb.mb_id;
                                        this.cm = data.price;

                                        this.openpopup();
                                    }
                                    if(data.code == '500') {
                                        alert(data.msg);
                                    }
                                    if(data.code == '404') {
                                        alert(data.msg);
                                    }
                                })
                                controls.stop();
                            }
                        });

                    } catch (e) {
                        alert('카메라 접근 실패');
                        router.push({ path : '/main' });
                    }
                }
            })();
        },
        openpopup() {
            document.getElementById('popup').style.display = 'flex';
        },
    }
}
</script>

<style scoped>
.popup {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}
/* 팝업내용 */
.popup-content {
    width: 90%; height: 70%;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    /* border: 1px solid red; */
    /* max-width: 90%; */
    /* max-height: 80%; */
    position: relative;
    overflow: scroll;
    color: #000;
}
.header {
    font-weight: bold;
    font-size: 1.25rem;
    margin-top: 70px;
    margin-bottom: 15%;
}
p {
    margin-top: 30px;
}
p:nth-of-type(3) {
    margin-top: 40px;
}
.btn_group {
    margin-top: 40px;
    /* border: 1px solid red; */
}
.btn_group > button {
    width: 55px; height: 35px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 7px;
    color: #000;
}
.btn_group > button:nth-of-type(2) {
    margin-left: 40px;
    background-color: rgba(0, 0, 255, 0.829);
    border: 1px solid rgba(0, 0, 255, 0.829);
    color: #fff;
}
</style>