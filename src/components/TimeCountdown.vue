<script>
export default {
  props: {
    PropsDays: Number,
    PropsHours: Number,
    PropsMinutes: Number,
    PropsSeconds: Number
  }
}
</script>

<template>
  <div class="container">
    <div
      class="grid grid-flow-col gap-8 sm:gap-10 md:gap-16 text-center auto-cols-max justify-center mt-8"
    >
      <div class="flex flex-col">
        <span class="countdown font-poppins text-5xl sm:text-6xl text-primary">
          <span :style="{ '--value': PropsDays }"></span>
        </span>
        days
      </div>
      <div class="flex flex-col">
        <span class="countdown font-poppins text-5xl sm:text-6xl text-primary">
          <span :style="{ '--value': PropsHours % 24 }"></span>
        </span>
        hours
      </div>
      <div class="flex flex-col">
        <span class="countdown font-poppins text-5xl sm:text-6xl text-primary">
          <span :style="{ '--value': PropsMinutes % 60 }"></span>
        </span>
        min
      </div>
      <div class="flex flex-col">
        <span class="countdown font-poppins text-5xl sm:text-6xl text-primary">
          <span :style="{ '--value': PropsSeconds % 60 }"></span>
        </span>
        sec
      </div>
    </div>
  </div>
</template>
