<template>
    <h1>QR 테스트</h1>

    <div class="contents_qr_scan">
        <div class="scan_box">
            <video id="video" class="" width="100%" height="100%" style="object-fit:cover"></video>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    mounted() {
        // this.exit();
        window.addEventListener('beforeunload', this.unLoadEvent);
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.unLoadEvent);
    },
    methods : {
        // qrVideo() {
        //     window.addEventListener('load', async () => {
        //         const codeReader = new ZXingBrowser.BrowserQRCodeReader();
        //         const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
        //         console.log(videoInputDevices.length);

        //         if(videoInputDevices.length) {
        //             const selectedDeviceId = videoInputDevices[videoInputDevices.length - 1].deviceId;
                    
        //         }
        //     })
        // }
        // exit(e) {
        //     // window.addEventListener('beforeunload', () => {
        //     //     console.log('Are you sure?');
        //     // })
        //     e.preventDefault();
        //     e.returnValue = '';
        // },
        unLoadEvent: function (event) {
            if (this.canLeaveSite) return;
        
            event.preventDefault();
            event.returnValue = '';
        },
    }
}
</script>