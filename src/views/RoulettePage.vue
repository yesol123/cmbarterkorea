<template>
  <header>
    <h2>CM GAME</h2>
  </header>
  <section class="roulette_area">
    <div class="container-fluid">
      <div class="game">
        <div class="pinset"></div>
        <canvas ref="roulette" id="roulette" width="380" height="380"></canvas>
        <button class="roulette_spin" @click="spin_start">
          <span>가즈아</span>
        </button>
      </div>
    </div>
  </section>
  <div v-if="resultPopup" class="result_popup">
    <div class="popup_content">
      <p>{{ resultMessage }}</p>
      <button @click="closePopup">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'roulettePage',
  data() {
    return {
      angle: 0, // 현재 각도
      spinning: false, // 회전 중인지 여부
      resultPopup: false, // 팝업 표시 여부
      resultMessage: '' // 팝업에 표시될 메시지
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.canvas = this.$refs.roulette;
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
        if (this.ctx) {
          this.loadRouletteImage();
        }
      }
    });
  },
  methods: {
    loadRouletteImage() {
      this.rouletteImage = new Image();
      this.rouletteImage.src = require('@/assets/roulette.png');
      this.rouletteImage.onload = () => {
        this.drawRoulette();
      };
    },
    drawRoulette() {
      if (!this.ctx || !this.canvas) return;
      const { ctx, rouletteImage, angle } = this;
      const canvas = this.canvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((Math.PI / 180) * angle);
      ctx.drawImage(rouletteImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
      ctx.restore();
    },
    spin_start() {
      if (this.spinning) return; // 이미 회전 중이면 무시

      this.spinning = true;
      const spinDuration = 4000; // 회전 지속 시간 (밀리초)
      const targetAngle = Math.floor(Math.random() * 360) + 1440; // 최소 4바퀴(1440도) 이상 회전 후 멈출 각도
      const startAngle = this.angle;
      const angleDelta = targetAngle - startAngle;

      let start;
      const spin = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const easing = Math.min(progress / spinDuration, 1);
        this.angle = startAngle + angleDelta * easing; // 회전 각도 계산

        this.drawRoulette();

        if (progress < spinDuration) {
          requestAnimationFrame(spin);
        } else {
          this.spinning = false;
          this.showResult();
        }
      };

      requestAnimationFrame(spin);
    },
    showResult() {
      // 각도에 따라 결과 메시지를 결정 (6칸, 각 60도)
      const normalizedAngle = (360 - (this.angle % 360)) % 360; // 시계 방향으로 각도 변환

      if (normalizedAngle >= 0 && normalizedAngle < 60) {
        this.resultMessage = '꽝! 다음 기회를 노려보세요.';
      } else if (normalizedAngle >= 60 && normalizedAngle < 120) {
        this.resultMessage = '1000CM 획득! 축하드립니다!';
      } else if (normalizedAngle >= 120 && normalizedAngle < 180) {
        this.resultMessage = '5000CM 획득! 대박입니다!';
      } else if (normalizedAngle >= 180 && normalizedAngle < 240) {
        this.resultMessage = '꽝! 아쉽네요!';
      } else if (normalizedAngle >= 240 && normalizedAngle < 300) {
        this.resultMessage = '10000CM 획득! 축하드립니다!';
      } else if (normalizedAngle >= 300 && normalizedAngle < 360) {
        this.resultMessage = '3000CM 획득! 잘하셨어요!';
      }
      this.resultPopup = true;
    },
    closePopup() {
      this.resultPopup = false;
    }
  }
};
</script>

<style scoped>
.roulette_area {
  width: 95%;
  margin: 0 auto;
}
.container-fluid {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game {
  width: 100%;
  max-width: 380px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.pinset {
  display: block;
  z-index: 999;
  position: absolute;
  width: 12.5%;
  height: 40%;
  margin: auto;
  left: 0;
  right: 0;
  top: 0%;
  background-image: url(@/assets/pinset.png);
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100%;
}

#roulette {
  width: 100%;
  height: auto;
  max-width: 380px;
  aspect-ratio: 1;
  background-size: cover;
}

.roulette_spin {
  display: block;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  border-radius: 100%;
  width: 27%;
  height: 27%;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  background-image: url(@/assets/roulette_btn.png);
  background-size: 100%;
  cursor: pointer;
}

.result_popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.popup_content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.popup_content button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>