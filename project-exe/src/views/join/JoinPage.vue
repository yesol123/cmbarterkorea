<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn"><router-link to="/"><img src="@/assets/go_back_btn.png"></router-link></button>
            <p>회원가입</p>
        </header>

        <main>
            <div class="img_holder">
                <img src="@/assets/cmblogo.png">
            </div>

            <div class="join_content">
                <p>고객님</p>
                <p>환영합니다!</p>

                <div class="agreement">
                    <div>
                        <Checkbox v-model="AllCheck" :binary="true" inputId="all_agreed" @click="checkAll()"/>
                        <label for="all_agreed"> 약관 전체 동의 </label>

                        <div class="underline"></div>
                    </div>
 
                    <div >
                        <Checkbox v-model="service" :binary="true" inputId="service_agreed" name="service_agreed"  @change="handleChange()"/>
                        <label for="service_agreed"> [필수] 이용약관 동의 </label>
                        <button type="button"><img src="@/assets/go_for_btn.png"></button>
                    </div>
                    <div>
                        <Checkbox v-model="privacy" :binary="true" inputId="privacy_agreed" name="privacy_agreed" @change="handleChange()"/>
                        <label for="privacy_agreed"> [필수] 개인정보 수집 및 이용 동의 </label>
                        <button type="button"><img src="@/assets/go_for_btn.png"></button>
                    </div>
                    <div>
                        <Checkbox v-model="marketing" :binary="true" inputId="marketing_agreed" name="marketing_agreed" @change="handleChange()"/>
                        <label for="marketing_agreed"> [선택] 마케팅 정보 수집/이용 동의 </label>
                        <button type="button"><img src="@/assets/go_for_btn.png"></button>
                    </div>
                    <div>
                        <Checkbox v-model="advertise" :binary="true" inputId="advertise_agreed" name="advertise_agreed" @change="handleChange()"/>
                        <label for="advertise_agreed"> [선택] 광고성 정보 수신 동의 </label>
                        <button type="button"><img src="@/assets/go_for_btn.png"></button>
                    </div>
                    <div>
                        <Checkbox v-model="location" :binary="true" inputId="location_agreed" name="location_agreed" @change="handleChange()"/>
                        <label for="location_agreed"> [선택] 위치기반 서비스 이용 약관 동의 </label>
                        <button type="button"><img src="@/assets/go_for_btn.png"></button>
                    </div>
                </div>
            </div>

            <div class="confirm_btn_holder" @click="[confirmCheck(), checkAfter()]">
                <button type="button" class="confirm_btn" :style="{ backgroundColor : buttonColor, color : fontColor }">확인</button>
            </div>
        </main>
    </div>
</template>

<!-- <script setup>
import { ref } from "vue";

const all = ref(false);

</script> -->


<script>
// import Checkbox from 'primevue/checkbox';
import { useResponseStore } from '@/store/response.js';

export default {
    name : 'JoinPage',
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
    methods: {
        checkAll() {
            const allChecked = !this.AllCheck;
            this.service = allChecked;
            this.privacy = allChecked;
            this.marketing = allChecked;
            this.advertise = allChecked;
            this.location = allChecked;
        },
        confirmCheck() {
            if(this.service === false || this.privacy === false) {
                alert('필수항목을 체크해주세요.');
                return false;
            } else {
                this.$router.push({ path : 'auth' });
            }
        },
        handleChange() {
            if (this.service && this.privacy && this.marketing && this.advertise && this.location) {
                this.AllCheck = true;
            } else {
                this.AllCheck = false;
            }
        },
        // 약관체크 전
        checkBefore() {
            let jsonArr = [];

            jsonArr.push({
                service_agreed : 'N',
                privacy_agreed : 'N',
                marketing_agreed : 'N',
                advertise_agreed : 'N',
                location_agreed : 'N'
            })

            console.log(jsonArr);
       
        },
        // 약관체크 후
        checkAfter() {
            let jsonArr = [];

            // 약관 전체 동의 체크안되었을 경우
            if(this.AllCheck == false) {
                jsonArr.push({ service_agreed: this.service ? 'Y' : 'N' });
                jsonArr.push({ privacy_agreed: this.privacy ? 'Y' : 'N' });
                jsonArr.push({ marketing_agreed: this.marketing ? 'Y' : 'N' });
                jsonArr.push({ advertise_agreed: this.advertise ? 'Y' : 'N' });
                jsonArr.push({ location_agreed: this.location ? 'Y' : 'N' });

            } else {
                // 약관 전체 동의 체크되었을 경우
                jsonArr.push({
                    service_agreed : 'Y',
                    privacy_agreed : 'Y',
                    marketing_agreed : 'Y',
                    advertise_agreed : 'Y',
                    location_agreed : 'Y'
                });
            }

            console.log(jsonArr);

            const store = useResponseStore();
            store.setResponseData(jsonArr);

            console.log(111);
            console.log(store.datas);
        }
    },
    computed: {
        buttonColor() {
            return this.AllCheck || (this.service && this.privacy) ? '#1bce0b' : '#ccc';
        },
        fontColor() {
            return this.AllCheck || (this.service && this.privacy) ? '#fff' : '#000';
        }
    },
    mounted() {
       this.checkBefore();
    },
}
</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 1rem;
    color: #000;
}
.wrap {
    position: relative;
    width: 100%; height: 100vh;
    border: 1px solid red;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; height: 40px;
    padding: 0 10px;
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
.img_holder {
    /* width: 233px; height: 226px; */
    padding: 15px;
    /* border: 1px solid #000; */
}
.img_holder > img {
    width: 120px; height: 100px;
}
.join_content {
    width: 100%;
    padding: 20px;
    /* border: 1px solid orange; */
}
.join_content > p {
    font-size: 2rem;
    font-weight: 500;
}
.agreement {
    /* border: 1px solid red; */
}
.agreement > div {
    position: relative;
    margin: 30px 0;
    font-size: 1rem;
    /* border: 1px solid blue; */
}
.agreement button {
    position: absolute;
    right: 5px;
}
.agreement button, img {
    width: 20px; height: 20px;
    border: none;
    background-color: #fff;
}
.underline {
    width: 100%; height: 1px;
    background-color: #ccc;
    margin-top: 20px
}
.confirm_btn_holder {
    position: absolute;
    left: 50%; bottom: 10px;
    transform: translateX(-50%);
    width: 95%; height: 40px;
    border-radius: 25px;
    /* border: 1px solid blue; */
}
.confirm_btn {
    width: 100%; height: 100%;
    border: none; border-radius: 10px;
    /* border: 1px solid red; */
}
</style>