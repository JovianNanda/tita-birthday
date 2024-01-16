<script setup>
import SpecialWord from "@/components/SpecialWord.vue";
import TimeCountdown from "@/components/TimeCountdown.vue";
import { ref } from "vue";
import data from "@/assets/data.json";

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const birthdayDate = new Date(data.birthday);
let birthday = false;

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
    birthday = true;
  }
}, 1000);
</script>
<template>
  <div class="container p-6 sm:p-10 h-svh flex flex-col justify-center items-center">
    <SpecialWord :birthday="birthday" />

    <TimeCountdown
      :PropsDays="days"
      :PropsHours="hours"
      :PropsMinutes="minutes"
      :PropsSeconds="seconds"
    />
    <a href="birthday">
      <button
        v-show="birthday"
        class="btn transition-all duration-200 text-xl flex w-fit text-primary mt-6"
      >
        Pencet Aku 👀
      </button>
    </a>
  </div>
</template>
