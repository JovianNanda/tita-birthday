<script>
import { ref } from "vue";
import data from "../data.json";
export default {
  setup() {
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    if (!data.birthdayDate) data.birthdayDate = "20 January 2024";
    const birthdayDate = new Date(data.birthdayDate);

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
    }, 1000);

    return { days, hours, minutes, seconds };
  },
};
</script>

<template>
  <div class="container">
    <div
      class="grid grid-flow-col gap-8 sm:gap-10 md:gap-16 text-center auto-cols-max justify-center mt-8"
    >
      <div class="flex flex-col">
        <span class="countdown font-poppins text-5xl sm:text-6xl text-primary">
          <span :style="{ '--value': days }"></span>
        </span>
        days
      </div>
      <div class="flex flex-col">
        <span class="countdown font-poppins text-5xl sm:text-6xl text-primary">
          <span :style="{ '--value': hours % 24 }"></span>
        </span>
        hours
      </div>
      <div class="flex flex-col">
        <span class="countdown font-poppins text-5xl sm:text-6xl text-primary">
          <span :style="{ '--value': minutes % 60 }"></span>
        </span>
        min
      </div>
      <div class="flex flex-col">
        <span class="countdown font-poppins text-5xl sm:text-6xl text-primary">
          <span :style="{ '--value': seconds % 60 }"></span>
        </span>
        sec
      </div>
    </div>
  </div>
</template>
