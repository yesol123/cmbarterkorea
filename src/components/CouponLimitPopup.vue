<template>

    <div v-if="showModal" class="modal-overlay">
        <div class="modal" @click.stop>
            <div class="caution">
                <img src="" alt="">
                <p>기간 만료 예정 쿠폰</p>
            </div>
           <ul>
            <li>
                <div>
                    <p>1일 뒤 만료 예정</p> 
                    <p>대한민국</p>
                </div>
                <div>
                    <p>2024/10/29</p>
                    <p>씨엠바더 코리아</p>
                </div>
            </li>
           </ul>
            <button @click="confirm">확인</button>
        </div>
    </div>

</template>

<script>

export default{

    data(){
        return{
            showModal: false
        }
    },
    methods:{
        confirm(){
            this.showModal = false
        }
    }
}

</script>

<style>

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}



.modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    /* 고정 위치 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    /* 화면의 중앙에 위치 */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    width: 400px;
    max-width: 90%;
    padding: 30px 20px;
    text-align: center;
    box-sizing: border-box;
}

.modal-overlay ul {

}

.modal-overlay ul li {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #b1b1b1;
}

.caution {
    display: flex;
    flex-direction: column;
}



</style>