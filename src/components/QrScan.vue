<template>
  
        <header>
            <button type="button" class="goback_btn" @click="toMain()"><img src="@/assets/go_back_btn.png"></button>
            <h3>결제</h3>
        </header>
<section>
    <div class="qrscanwrap" style="text-align: center; margin-top: 30%;">
            <!-- <div class="qr_scan_txt" style="font-size: 1.0rem; font-weight: bold; margin-bottom: 40px;">
                <p>QR 스캔</p>
            </div> -->
            <div class="contents_qr_scan" style="width: 90%; height: 400px; margin: 0 auto; border: 2px solid #000;">
                <div class="scan_box" style="width: 100%; height: 100%;">
                    <video id="video" class="" width="100%" height="100%" style="object-fit:cover; background-color: #6e6b6b;"></video>
                </div>
            </div>
            <div>
                <input type="number" placeholder="QR 6자리 코드를 적어주세요." v-model="confirm">
                <button type="button" class="confirm" @click="payment()">확인</button>
            </div>
            <!-- <div class="qr_number">
                <form name="qrSendForm" id="qrSendForm">
                    <input type="hidden" name="fran" id="fran" value="5">
                    <input type="hidden" name="hash" id="hash" value="">
                    <input type="text" name="num2" id="num2" placeholder="123456" maxlength="6" onkeyup="this.value=this.value.replace(/[^-0-9]/g,'');" inputmode="decimal"/>
                </form>
            </div> -->
        </div>
 

    <!-- 결제확인창 -->
    <div id="popup" class="popup">
        <div class="popup-content">
            <div class="center">
            <p class="header">결제 하시겠습니까?</p>
            <span style="font-weight: bold; font-size: 1.0rem;">{{ name }}</span><span style="font-weight: bold; font-size: 1.0rem;">({{ id }})</span> <span>님,</span>
            <p style="font-weight: bold; font-size: 1.2rem;">{{ cm }} CM</p>
            <!-- <p style="font-size: 1.0rem;">결제하시겠습니까?</p> -->

            <div class="btn_group">
                <button type="button" @click="notPaying()">취소</button>
                <button type="button" @click="Paying()">확인</button>
            </div>
            </div>
        </div>
    </div>

    <!-- 결제취소창 -->
    <div id="popup2" class="popup2">
        <div class="popup-content">
            <div class="center">
            <p class="header">결제취소 하시겠습니까?</p>
            <span style="font-weight: bold; font-size: 1.0rem;">{{ name }}</span><span style="font-weight: bold; font-size: 1.0rem;">({{ id }})</span> <span>님,</span>
            <p style="font-weight: bold; font-size: 1.2rem;">{{ cm }} CM</p>
            <!-- <p style="font-size: 1.0rem;">결제하시겠습니까?</p> -->

            <div class="btn_group">
                <button type="button" @click="notPaying()">취소</button>
                <button type="button" @click="Paying()">확인</button>
            </div>
            </div>
        </div>
    </div>



</section>
   
    <ModalPage ref="child" style="display: none;"/>
</template>

<script>
import router from '@/router/index.js';
import ModalPage from '@/components/ModalPage2.vue';
import { useResponseStore } from '@/store/response.js';

export default {
    components : {
        ModalPage
    },
    data() {
        return {
            name : '',
            id : '',
            cm : '',
            mb_index : '',
            result : '',
            confirm : '',
            qrCode : null
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
                                // alert('QR코드 스캔성공');

                                this.qrCode = false;
                                this.result = result;

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
                                        // alert('결제 api 호출 성공');

                                        this.name = data.hash_mb.mb_name;
                                        this.id = data.hash_mb.mb_id;
                                        this.cm = data.price;
                                        this.mb_index = data.hash_mb.mb_index;

                                        // 결제취소
                                        if(data.qr_state == 'C') {
                                            this.openpopup2();
                                        }
                                        // 결제확인
                                        if(data.qr_state == 'O') {
                                            this.openpopup();
                                        }
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
                        router.push({ path : '/qrscan' });
                    }
                }
            })();
        },
        // 결체확인창 불러오기
        openpopup() {
            document.getElementById('popup').style.display = 'flex';
        },
         // 결체취소창 불러오기
         openpopup2() {
            document.getElementById('popup2').style.display = 'flex';
        },
        // 결제확인
        Paying() {
            console.log("결제 시도");
            let store = useResponseStore();

            const formData = new FormData();
            formData.append('type', 'scan');

            if(this.qrCode == false) {
                formData.append('user_qr_code', this.result);
            }
            if(this.qrCode == true) {
                formData.append('user_qr_code', this.confirm);
            }
            formData.append('store_user_index', store.user_index);
            formData.append('customer_user_index', this.mb_index);

            if(store.member == 6)
                formData.append('user_role_index', 3);
            else
                formData.append('user_role_index', store.member);

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const url = process.env.VUE_APP_API_URL;

            fetch(url + 'api/pay/Pay.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if(data.code == '200') {
                    alert(data.msg);
                    router.push({ path : '/cmlist' });
                    return false;
                }
                if(data.code == '500') {
                    alert(data.msg);
                    return false;
                }
                                  
            })
        },
        // 결제취소
        notPaying() {
            this.$router.push({ path : '/main'});
        },
        // QR코드 직접입력
        payment() {
            this.qrCode = true;

            if(this.confirm == '') {
                alert('QR 6자리 코드를 작성해주세요.');
                return false;
            } 
            else {
                const formData = new FormData();
                formData.append('type', 'send');
                formData.append('num', this.confirm);

                const url = process.env.VUE_APP_API_URL;

                fetch(url + 'api/pay/Pay.php', {
                method : 'POST',
                body : formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    if(data.code == '000') {
                        // alert('QR 코드 직접입력 api 호출 성공');

                        this.name = data.hash_mb.mb_name;
                        this.id = data.hash_mb.mb_id;
                        this.cm = data.price;
                        this.mb_index = data.hash_mb.mb_index;

                        if(data.qr_state == 'C') {
                            this.openpopup2();
                        }
                        if(data.qr_state == 'O') {
                            this.openpopup();
                        }
                    }
                    if(data.code == '500') {
                        alert(data.msg);
                    }
                    if(data.code == '404') {
                        alert(data.msg);
                    }
                })
            }
        },
        toMain() {
            this.$router.push({ path : '/main' });
        }
    }
}
</script>

<style scoped>


.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
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
.popup2 {
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
    position: relative;
    width: 90%; height: 30%;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    position: relative;
    overflow: scroll;
    color: #000;
}
.center {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
}
.header {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 0;
}
.btn_group > button {
    width: 65px; height: 35px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 7px;
    color: #000;
}
.btn_group > button:nth-of-type(2) {
    margin-left: 40px;
    background-color: #1bce0b;
    border: 1px solid #1bce0b;
    color: #fff;
}
input {
    width: 220px; height: 35px;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 0 10px;
    color: #000;
    background-color: #fff;
}
.confirm {
    width: 55px; height: 35px;
    border: 1px solid #1bce0b;
    border-radius: 7px;
    margin-left: 10px;
    background-color: #1bce0b;
    color: #fff;
    vertical-align: middle;
}
</style>