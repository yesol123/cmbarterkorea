<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn" @click="toShopIn()"><img src="@/assets/go_back_btn.png"></button>
            <p>가맹점 신청</p>
        </header>

        <main>
            <div class="index">
                <div>1</div><span></span><div>2</div><span></span><div>3</div>
            </div>
            <p style="font-weight: bold;">지금 바로 씨엠바더를 시작해 보세요!</p>
            <p style="font-size: 0.9rem; margin: 20px 0;">모두 동의해주셔야 다음 페이지로 이동 가능합니다.</p>

            <div style="margin-top: 50px;">
                <Checkbox v-model="AllCheck" :binary="true" inputId="all_agreed" @click="checkAll()"></Checkbox>
                <label for="all_agreed"> 모든 약관 동의 </label>
                <p style="font-size: 0.8rem; margin-top: 10px;">
                    전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다. 선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
                </p>

                <div class="underline"></div>
            </div>            

            <div>
                <Checkbox v-model="service" :binary="true" inputId="service_agreed"></Checkbox>
                <label for="service_agreed" style="font-size: 0.9rem;"> [필수] CMBarter 가맹점 이용약관 동의</label>
                <button type="button" @click="ServiceAgreement()"><img src="@/assets/go_for_btn.png"></button>
            </div>
            <div>
                <Checkbox v-model="privacy" :binary="true" inputId="privacy_agreed"></Checkbox>
                <label for="privacy_agreed" style="font-size: 0.9rem;"> [필수] 개인정보 수집 및 이용 동의</label>
                <button type="button" @click="PrivacyAgreement()"><img src="@/assets/go_for_btn.png"></button>
            </div>
            <div>
                <Checkbox v-model="marketing" :binary="true" inputId="marketing_agreed"></Checkbox>
                <label for="marketing_agreed" style="font-size: 0.9rem;"> [선택] 마케팅 정보 수집 및 이용 동의</label>
                <button type="button" @click="MarketingAgreement()"><img src="@/assets/go_for_btn.png"></button>
            </div>
            <div>
                <Checkbox v-model="advertise" :binary="true" inputId="advertise_agreed"></Checkbox>
                <label for="advertise_agreed" style="font-size: 0.9rem;"> [선택] 광고성 정보 수신 동의</label>
                <button type="button" @click="AdvertiseAgreement()"><img src="@/assets/go_for_btn.png"></button>
            </div>
            <div>
                <Checkbox v-model="location" :binary="true" inputId="location_agreed"></Checkbox>
                <label for="location_agreed" style="font-size: 0.9rem;"> [필수] 위치기반서비스 이용약관 동의</label>
                <button type="button" @click="LocationAgreement()"><img src="@/assets/go_for_btn.png"></button>
            </div>

            <button type="button" class="confirm_btn" @click="confirmCheck()" :style="{ backgroundColor : buttonColor, color : fontColor}">확인</button>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            AllCheck : false,
            service : false,
            privacy : false,
            marketing : false,
            advertise : false,
            location : false
        }
    },
    mounted() {

    },
    methods : {
        toShopIn() {
            this.$router.push({ path : '/shopin' });
        },
        checkAll() {
            const allChecked = !this.AllCheck;
            this.service = allChecked;
            this.privacy = allChecked;
            this.marketing = allChecked;
            this.advertise = allChecked;
            this.location = allChecked;
        },
        confirmCheck() {
            if(this.service === false || this.privacy === false || this.location === false) {
                alert('필수항목을 체크해주세요.');
                return false;
            } else {
                this.$router.push({ path : '/shopin3' });
            }
        },
        ServiceAgreement() {
            this.$router.push({ path : '/service' });
        },
        PrivacyAgreement() {
            this.$router.push({ path : '/privacy' });
        },
        MarketingAgreement() {
            this.$router.push({ path : '/marketing' });
        },
        AdvertiseAgreement() {
            this.$router.push({ path : '/advertise' });
        },
        LocationAgreement() {
            this.$router.push({ path : '/locate' });
        }
    },
    computed: {
        buttonColor() {
            return this.AllCheck || (this.service && this.privacy && this.location) ? '#1bce0b' : '#ccc';
        },
        fontColor() {
            return this.AllCheck || (this.service && this.privacy && this.location) ? '#fff' : '#000';
        }
    },
}

</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 1rem;
    color: hsl(0, 0%, 0%);
}
.wrap {
    position: relative;
    width: 100%;
    background-color: #fff;
    /* border: 1px solid red; */
    margin-bottom: 70px;
}
header {
    position: fixed;
    top: 0; left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; height: 40px;
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid #ccc;
}
header > p {
    line-height: 40px;
    color: blue;
    /* border: 1px solid red; */
    margin: 0 auto;
}
.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
main {
    width: 100%;
    margin-top: 50px;
    padding: 10px;
    /* border: 1px solid red; */
}
main > div {
    position: relative;
    width: 100%;
    margin: 30px 0;
    padding: 0 10px;
    /* border: 1px solid blue; */
}
main button {
    position: absolute;
    right: 15px;
}
main button, img {
    width: 20px; height: 20px;
    border: none;
    background-color: #fff;
}
.underline {
    width: 100%; height: 1px;
    background-color: #ccc;
    margin-top: 20px
}
.confirm_btn {
    bottom: -50px;
    width: 90%; height: 35px;
    border-radius: 15px;
    color: #ccc;
    border: 1px solid #ccc;
}
.index {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0 50px 0;
    padding: 0 150px;
    /* border: 1px solid blue; */
}
.index > div {
    width: 25px; height: 25px;
    margin: 0 auto;
    border-radius: 50px;
    text-align: center; line-height: 25px;
    color: #ccc;
    border: 1px solid #ccc;
}
.index > div:nth-of-type(1) {
    background-color: #1bce0b;
    color: #fff;
    border: none;
}
.index > span {
    width: 20px; height: 1px;
    border: 1px solid #ccc;
}
</style>