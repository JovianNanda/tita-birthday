<script>
import { ref, watch, onMounted } from "vue";
// import SplitType from "split-type";
// import gsap from "gsap/gsap-core";

export default {
  setup() {
    onMounted(() => {});

    const cakeCandle = ref(false);
    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let count = ref(0);
    localStorage.setItem("cakeBlown", false);
    window.dispatchEvent(
      new CustomEvent("cakeBlown-localstorage-changed", {
        detail: {
          storage: localStorage.getItem("cakeBlown"),
        },
      })
    );

    watch(count, (newCount) => {
      if (newCount > randomInteger(3, 8)) {
        cakeCandle.value = true;
        localStorage.setItem("cakeBlown", true);
        window.dispatchEvent(
          new CustomEvent("cakeBlown-localstorage-changed", {
            detail: {
              storage: localStorage.getItem("cakeBlown"),
            },
          })
        );

        document.querySelector(".candle").classList.add("removed");
        document.querySelector(".flame").classList.add("removed");
      }
    });

    return {
      count,
      cakeCandle,
    };
  },
};
</script>

<template>
  <div class="container-cake mt-64 sm:mt-60">
    <div class="cake">
      <div class="tier tier-1">
        <div class="filling"></div>
        <div class="icing-group">
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
        </div>
      </div>
      <div class="tier tier-2">
        <div class="filling"></div>
        <div class="icing-group">
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
        </div>
      </div>
      <div class="tier tier-3">
        <div class="filling"></div>
        <div class="icing-group">
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
          <div class="icing"></div>
        </div>
      </div>
      <div class="candles">
        <div class="candle">
          <div class="flame" @click="count++">
            <div class="flame-in"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h1 class="text-xl sm:text-3xl">
    A Cake For You, <span class="text-red-500">Tita</span> ❤️
  </h1>
  <!-- <div class="text-wrapper"> -->
  <div class="title-wrapper mt-44 sm:mt-16">
    <h1 id="hbd" class="sweet-title">
      <span id="hbd" data-text="19th">19th</span>
      <span id="hbd" data-text="Birthday">Birthday</span>
    </h1>
  </div>
  <!-- <h1
    id="hbd"
    class="text-[8rem] sm:text-[10rem] top-[12rem] gap-y-0 text-accent -z-10 flex absolute h-full"
  >
    19th Birthday
  </h1> -->
  <!-- </div> -->
  <h1 class="text-sm mt-0">
    <kbd class="kbd"><i class="fa-solid fa-computer-mouse-scrollwheel"></i></kbd> click
    the candle
  </h1>
</template>
<style>
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

.title-wrapper {
  display: grid;
  align-items: center;
  justify-content: center;
  transform: skew(0, -5deg);
  position: absolute;
  z-index: -10;
  top: 10rem;
}

.sweet-title {
  order: 2;
  color: #fde9ff;
  font-weight: 900;
  text-transform: uppercase;
  font-size: clamp(3rem, 10vw, 6rem);
  line-height: 0.75em;
  text-align: center;
  text-shadow: 3px 1px 1px #4af7ff, 2px 2px 1px #165bfb, 4px 2px 1px #4af7ff,
    3px 3px 1px #165bfb, 5px 3px 1px #4af7ff, 4px 4px 1px #165bfb, 6px 4px 1px #4af7ff,
    5px 5px 1px #165bfb, 7px 5px 1px #4af7ff, 6px 6px 1px #165bfb, 8px 6px 1px #4af7ff,
    7px 7px 1px #165bfb, 9px 7px 1px #4af7ff;

  span {
    display: block;
    position: relative;

    &:before {
      content: attr(data-text);
      position: absolute;
      text-shadow: 2px 2px 1px #e94aa1, -1px -1px 1px #c736f9, -2px 2px 1px #e94aa1,
        1px -1px 1px #f736f9;
      z-index: 1;
    }

    &:nth-child(1) {
      padding-right: 2.25rem;
    }

    &:nth-child(2) {
      padding-left: 2.25rem;
    }
  }
}

.container-cake {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cake {
  width: 80%;
  height: 80%;
  left: 10%;
  bottom: 15%;
}
.filling {
  position: absolute;

  height: 10px;
  width: 100%;
  background-color: rgba(black, 0.1);
  top: 50%;
}

.tier {
  position: absolute;
  left: 10%;
  width: 80%;
  height: 50px;
  border-radius: 5px;

  .icing-group {
    position: absolute;
    width: 100%;
    height: 30px;
    overflow: hidden;
    .icing {
      position: absolute;
      border-radius: 0 0 20px 20px;
      width: 40px;
      height: 20px;
      background-color: #f4f5fb;
    }
  }
  &:after {
    position: absolute;
    border-radius: 0 5px 5px 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: rgba(black, 0.05);
  }
}
.tier-1 {
  position: absolute;
  background-color: #f2b1ab;
  bottom: 0;
  .filling {
    background-color: #eb7f7f;
  }
}
.tier-2 {
  position: absolute;
  bottom: 50px;
  width: 60%;
  height: 45px;
  left: 20%;
  background-color: #b59fec;
  .filling {
    background-color: #a874e4;
  }
}
.tier-3 {
  position: absolute;
  bottom: 95px;
  width: 40%;
  height: 40px;
  left: 30%;
  background-color: #86e197;
  .filling {
    background-color: #5dd767;
  }
}
.icing:nth-child(1) {
  left: -20px;
}
.icing:nth-child(2) {
  left: 10px;
}
.icing:nth-child(3) {
  left: 40px;
}
.icing:nth-child(4) {
  left: 70px;
}
.icing:nth-child(5) {
  left: 100px;
}
.icing:nth-child(6) {
  left: 130px;
}
.icing:nth-child(7) {
  left: 160px;
}
.icing:nth-child(8) {
  left: 190px;
}
.icing:nth-child(9) {
  left: 220px;
}

.candles {
  position: absolute;
  width: 40%;
  left: 30%;
  height: 30px;
  bottom: 135px;
  .candle {
    position: absolute;
    background-color: #f2abe7;
    left: 45px;
    width: 10px;
    height: 25px;
    bottom: 0;
    &.removed::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 2px;
      top: 2px;
      background-color: rgb(151, 149, 149);
    }
    &.removed::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 2px;
      top: 0;
      background-color: rgb(66, 65, 65);
    }
    &:after {
      position: absolute;
      width: 50%;
      height: 100%;
      right: 0;
      background-color: rgba(black, 0.1);
    }
    .flame {
      position: absolute;
      width: 15px;
      height: 15px;
      bottom: 30px;
      left: -3px;
      transition: all 200ms ease-in;
      &.removed {
        animation: opacity 1s linear;
        animation-fill-mode: forwards;
      }
      .flame-in {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fec31e;
        border-radius: 0 50% 50%;
        transform: rotate(45deg);
        animation: flame 2s linear infinite;
      }
    }
  }
}
@keyframes opacity {
  20% {
    opacity: 80;
  }
  40% {
    opacity: 60;
  }
  60% {
    opacity: 40;
  }
  80% {
    opacity: 15;
  }
  100% {
    opacity: 0;
  }
}
@keyframes flame {
  50% {
    transform: scale(0.75) rotate(45deg);
  }
}
</style>
