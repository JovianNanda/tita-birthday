<script>
import SpecialWord from "@/components/SpecialWord.vue";
import TimeCountdown from "@/components/TimeCountdown.vue";
import { themeChange } from "theme-change";
import { ref, onMounted, watch } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";
import { confetti } from "dom-confetti";
import data from "@/assets/data.json";

export default {
  components: {
    SpecialWord,
    TimeCountdown,
    ConfettiExplosion,
  },

  setup() {
    const theme = ref();
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const birthdayDate = new Date(data.birthday);
    const birthdayStatus = ref(false);
    const tenSecondStatus = ref(false);
    const loading = ref(false);

    const confettiConfigLeft = {
      angle: 75,
      spread: 45,
      startVelocity: 80,
      elementCount: 300,
      dragFriction: 0.12,
      duration: 3000,
      stagger: 4,
      width: "10px",
      height: "10px",
      perspective: "800px",
    };
    const confettiConfigRight = {
      angle: 105,
      spread: 45,
      startVelocity: 80,
      elementCount: 300,
      dragFriction: 0.12,
      duration: 3000,
      stagger: 4,
      width: "10px",
      height: "10px",
      perspective: "800px",
    };
    const modalStatus = ref(false);

    onMounted(() => {
      document.querySelector("#my_modal_3").showModal();
      themeChange(false);

      theme.value = localStorage.getItem("theme");

      if (theme.value == "night") {
        document.documentElement.style.setProperty("--c-main", "#72c4fc");
        document.documentElement.style.setProperty("--c-secondary", "#004ef5");
      } else if (theme.value == "winter") {
        document.documentElement.style.setProperty("--c-main", "#004ef5");
        document.documentElement.style.setProperty("--c-secondary", "#72c4fc");
      }
    });

    function setLittleTheme() {
      theme.value = localStorage.getItem("theme");

      // pas dia mencet itu msih winter tpi krna dipencet jdi berubah ke night\
      // jdi ini yg night
      if (theme.value != "night") {
        document.documentElement.style.setProperty("--c-main", "#72c4fc");
        document.documentElement.style.setProperty("--c-secondary", "#004ef5");
      } else if (theme.value == "night") {
        document.documentElement.style.setProperty("--c-main", "#004ef5");
        document.documentElement.style.setProperty("--c-secondary", "#72c4fc");
      }
    }
    function playMusic() {
      localStorage.setItem("music", "true");
      modalStatus.value = true;
      document.querySelector("#audio-confetti").play();
      bottomConfetti();
    }
    function stopMusic() {
      localStorage.setItem("music", "false");
      document.querySelector("#audio").pause();
      document.querySelector("#audio").currentTime = 0;
      modalStatus.value = true;
      bottomConfetti();
    }

    setInterval(() => {
      const currentDate = new Date();
      const birthTime = birthdayDate - currentDate;

      seconds.value = parseInt(birthTime / 1000);
      minutes.value = parseInt(seconds.value / 60);
      hours.value = parseInt(minutes.value / 60);
      days.value = parseInt(hours.value / 24);

      if (currentDate >= birthdayDate) {
        seconds.value = 0;
        minutes.value = 0;
        hours.value = 0;
        days.value = 0;
      }

      if (currentDate.toISOString() >= birthdayDate.toISOString()) {
        birthdayStatus.value = true;
      }

      loading.value = true;

      if (
        days.value == 0 &&
        hours.value % 24 == 0 &&
        minutes.value % 60 == 0 &&
        seconds.value % 60 == 8 &&
        seconds.value % 60 > 0
      ) {
        tenSecondStatus.value = true;
      } else {
        tenSecondStatus.value = false;
      }
    }, 1000);

    function bottomConfetti() {
      watch(birthdayStatus, (newBirthdayStatus) => {
        if (newBirthdayStatus) {
          setTimeout(() => {
            confetti(document.querySelector(".right-bottom"), confettiConfigRight);
            confetti(document.querySelector(".left-bottom"), confettiConfigLeft);
          }, 1500);
        }
      });
      // pas dia langsung mencet, dan semua waktu sudah 00
      if (birthdayStatus.value) {
        setTimeout(() => {
          confetti(document.querySelector(".right-bottom"), confettiConfigRight);
          confetti(document.querySelector(".left-bottom"), confettiConfigLeft);
        }, 1500);
      }
    }

    watch(tenSecondStatus, (newTenSecondStatus) => {
      if (newTenSecondStatus) {
        if (JSON.parse(localStorage.getItem("music"))) {
          document.querySelector("#audio").play();
        }
      }
    });

    return {
      setLittleTheme,
      days,
      hours,
      minutes,
      seconds,
      birthdayStatus,
      tenSecondStatus,
      playMusic,
      stopMusic,
      modalStatus,
      bottomConfetti,
      loading,
    };
  },
};
</script>
<template>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box flex flex-col items-center" v-if="!loading">
      <h3 class="self-start text-lg text-primary font-bold mb-4">Tunggu Bentar!</h3>
      <span class="loading loading-spinner pt-12 pb-16 w-20"></span>
    </div>
    <div class="modal-box" v-if="loading">
      <h3 class="font-bold text-lg text-primary">Selamat Datang!</h3>
      <p class="py-6">
        Izinkan Menghidupkan <span class="text-primary">Musik/Suara</span> Pada Website
        Ini?
      </p>
      <form method="dialog" class="flex">
        <button class="btn btn-md btn-error text-white ml-auto" @click="stopMusic()">
          Taknok!
        </button>
        <button class="btn btn-md btn-primary ml-5" @click="playMusic()">
          Iya Boleeeeh
        </button>
      </form>
    </div>
  </dialog>
  <div
    class="p-6 sm:p-10 h-svh flex flex-col justify-center items-center overflow-hidden relative"
    id="container"
  >
    <SpecialWord
      :birthday="birthdayStatus"
      beforeText="Something"
      specialText="Special"
      afterTextDefault="About to Happen"
      afterTextTrue="Is Happening"
    />
    <ConfettiExplosion
      v-if="birthdayStatus && modalStatus"
      :force="0.8"
      :duration="2000"
      :particleCount="250"
    />
    <TimeCountdown
      :PropsDays="days"
      :PropsHours="hours"
      :PropsMinutes="minutes"
      :PropsSeconds="seconds"
    />
    <a href="birthday">
      <button
        id="btn-pencet"
        v-show="birthdayStatus"
        class="btn transition-all duration-200 text-xl flex w-fit text-primary mt-6"
      >
        Pencet Aku 👀
      </button>
    </a>
    <audio id="audio" hidden>
      <source src="../assets/10sec.mp3" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <audio id="audio-confetti" hidden v-if="birthdayStatus">
      <source src="../assets/confetti.mp3" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <label class="swap swap-rotate absolute top-4 left-6">
      <!-- this hidden checkbox controls the state -->
      <input
        type="checkbox"
        class="theme-controller"
        data-toggle-theme="night,winter"
        data-act-class="active"
        @click="setLittleTheme()"
      />
      <!-- sun icon -->
      <svg
        class="swap-on fill-current w-10 h-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
        />
      </svg>

      <!-- moon icon -->
      <svg
        class="swap-off fill-current w-10 h-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
        />
      </svg>
    </label>
    <div class="absolute left-bottom left-12 sm:left-20 bottom-0"></div>
    <div class="absolute right-bottom right-12 sm:right-20 bottom-0"></div>
  </div>
</template>
