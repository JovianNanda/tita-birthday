<script>
import SpecialWord from '@/components/SpecialWord.vue'
import TimeCountdown from '@/components/TimeCountdown.vue'
// import { themeChange } from "theme-change";
import ThemeToggle from '@/components/ThemeToggle.vue'
import { ref, onMounted, watch } from 'vue'
import ConfettiExplosion from 'vue-confetti-explosion'
import { confetti } from 'dom-confetti'
import data from '@/assets/data.json'

export default {
  components: {
    SpecialWord,
    TimeCountdown,
    ConfettiExplosion,
    ThemeToggle
  },
  setup() {
    // const theme = ref();
    const days = ref(0)
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)
    const birthdayDate = new Date(data.birthday)
    const birthdayStatus = ref(false)
    const tenSecondStatus = ref(false)
    const loading = ref(false)

    const confettiConfigLeft = {
      angle: 75,
      spread: 45,
      startVelocity: 80,
      elementCount: 300,
      dragFriction: 0.12,
      duration: 3000,
      stagger: 4,
      width: '10px',
      height: '10px',
      perspective: '800px'
    }
    const confettiConfigRight = {
      angle: 105,
      spread: 45,
      startVelocity: 80,
      elementCount: 300,
      dragFriction: 0.12,
      duration: 3000,
      stagger: 4,
      width: '10px',
      height: '10px',
      perspective: '800px'
    }
    const modalStatus = ref(false)

    onMounted(() => {
      document.querySelector('#my_modal_3').showModal()
      // themeChange(false);
      // theme.value = localStorage.getItem("theme");

      // if (theme.value == "night") {
      //   document.documentElement.style.setProperty("--c-main", "#72c4fc");
      //   document.documentElement.style.setProperty("--c-secondary", "#004ef5");
      // } else if (theme.value == "winter") {
      //   document.documentElement.style.setProperty("--c-main", "#004ef5");
      //   document.documentElement.style.setProperty("--c-secondary", "#72c4fc");
      // }
    })

    // function setLittleTheme() {
    //   theme.value = localStorage.getItem("theme");

    //   // pas dia mencet itu msih winter tpi krna dipencet jdi berubah ke night\
    //   // jdi ini yg night
    //   if (theme.value != "night") {
    //     document.documentElement.style.setProperty("--c-main", "#72c4fc");
    //     document.documentElement.style.setProperty("--c-secondary", "#004ef5");
    //   } else if (theme.value == "night") {
    //     document.documentElement.style.setProperty("--c-main", "#004ef5");
    //     document.documentElement.style.setProperty("--c-secondary", "#72c4fc");
    //   }
    // }
    function playMusic() {
      localStorage.setItem('music', 'true')
      modalStatus.value = true
      bottomConfetti()
    }
    function stopMusic() {
      localStorage.setItem('music', 'false')
      document.querySelector('#audio').pause()
      document.querySelector('#audio').currentTime = 0
      modalStatus.value = true
      bottomConfetti()
    }

    setInterval(() => {
      const currentDate = new Date()
      const birthTime = birthdayDate - currentDate

      seconds.value = parseInt(birthTime / 1000)
      minutes.value = parseInt(seconds.value / 60)
      hours.value = parseInt(minutes.value / 60)
      days.value = parseInt(hours.value / 24)

      if (currentDate >= birthdayDate) {
        seconds.value = 0
        minutes.value = 0
        hours.value = 0
        days.value = 0
      }

      if (currentDate.toISOString() >= birthdayDate.toISOString()) {
        birthdayStatus.value = true
      }

      loading.value = true

      if (
        days.value == 0 &&
        hours.value % 24 == 0 &&
        minutes.value % 60 == 0 &&
        seconds.value % 60 == 8 &&
        seconds.value % 60 > 0
      ) {
        tenSecondStatus.value = true
      } else {
        tenSecondStatus.value = false
      }
    }, 1000)

    function bottomConfetti() {
      watch(birthdayStatus, (newBirthdayStatus) => {
        if (newBirthdayStatus) {
          if (JSON.parse(localStorage.getItem('music'))) {
            document.querySelector('#audio-confetti').play()
          }
          setTimeout(() => {
            confetti(document.querySelector('.right-bottom'), confettiConfigRight)
            confetti(document.querySelector('.left-bottom'), confettiConfigLeft)
          }, 1500)
        }
      })
      // pas dia langsung mencet, dan semua waktu sudah 00
      if (birthdayStatus.value) {
        if (JSON.parse(localStorage.getItem('music'))) {
          document.querySelector('#audio-confetti').play()
        }
        setTimeout(() => {
          confetti(document.querySelector('.right-bottom'), confettiConfigRight)
          confetti(document.querySelector('.left-bottom'), confettiConfigLeft)
        }, 1500)
      }
    }

    watch(tenSecondStatus, (newTenSecondStatus) => {
      if (newTenSecondStatus) {
        if (JSON.parse(localStorage.getItem('music'))) {
          document.querySelector('#audio').play()
        }
      }
    })

    return {
      // setLittleTheme,
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
      loading
    }
  }
}
</script>
<template>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box flex flex-col items-center" v-if="!loading">
      <h3 class="self-start text-lg text-primary font-bold mb-4">Tunggu Bentar!</h3>
      <span class="loading loading-ball text-primary pt-12 pb-16 w-20"></span>
    </div>
    <div class="modal-box" v-if="loading">
      <h3 class="font-bold text-lg text-primary">Selamat Datang!</h3>
      <p class="py-6">
        Izinkan Menghidupkan <span class="text-primary">Musik/Suara</span> Pada Website Ini?
      </p>
      <form method="dialog" class="flex">
        <button class="btn btn-md btn-error text-white ml-auto" @click="stopMusic()">
          Taknok!
        </button>
        <button class="btn btn-md btn-primary ml-5" @click="playMusic()">Iya Boleeeeh</button>
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
      afterTextDefault="About to Happen in..."
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
      <source src="../assets/confetti_2.mp3" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <ThemeToggle />
    <div class="absolute left-bottom left-12 sm:left-20 bottom-0"></div>
    <div class="absolute right-bottom right-12 sm:right-20 bottom-0"></div>
  </div>
</template>
