<script></script>

<template>
  <h1
    class="sm:text-center transition-all mb-2 text-2xl font-light tracking-wide leading-normal relative flex flex-row items-center justify-center gap-3 gap-y-1 flex-wrap"
  >
    Something
    <span class="text-special transition-all text-4xl duration-300 font-medium"
      >Special</span
    >
    About to Happen
  </h1>
</template>

<style>
.text-special {
  position: relative;
  background: oklch(var(--p));
  background: -webkit-repeating-linear-gradient(to right, #004ef5 0%, #72c4fc 100%);
  background: -moz-repeating-linear-gradient(to right, #004ef5 0%, #72c4fc 100%);
  background: repeating-linear-gradient(to right, #004ef5 0%, #72c4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  padding: 0;
}

.text-special::before {
  content: "";
  color: transparent;
  background: #004ef5;
  background: -webkit-repeating-linear-gradient(to right, #004ef5 0%, #72c4fc 100%);
  background: -moz-repeating-linear-gradient(to right, #004ef5 0%, #72c4fc 100%);
  background: repeating-linear-gradient(to right, #004ef5 0%, #72c4fc 100%);
  width: 0;
  height: 0.105vw;
  display: flex;
  position: absolute;
  bottom: -1%;
  left: 2%;
  border-radius: 0.25rem;
  z-index: -1;
  transition: all 200ms ease-in-out;
}
.text-special:hover::before {
  width: 97%;
}
</style>
