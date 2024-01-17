<script>
export default {
  props: {
    birthday: Boolean,
  },
};
</script>

<template>
  <h1
    class="sm:text-center transition-all text-2xl font-light tracking-wide leading-normal relative flex flex-row items-center justify-center gap-3 gap-y-1 flex-wrap"
  >
    Something
    <span class="text-special transition-all text-4xl duration-300 font-medium"
      >Special</span
    >
    <span v-if="!birthday"> About to Happen </span>
    <span v-if="birthday"> Is Happening</span>
  </h1>
</template>

<style>
:root {
  --c-main: #004ef5;
  --c-secondary: #72c4fc;
}
.text-special {
  position: relative;
  background: var(--c-main);
  background: -webkit-repeating-linear-gradient(
    to right,
    var(--c-main) 0%,
    var(--c-secondary) 100%
  );
  background: -moz-repeating-linear-gradient(
    to right,
    var(--c-main) 0%,
    var(--c-secondary) 100%
  );
  background: repeating-linear-gradient(
    to right,
    var(--c-main) 0%,
    var(--c-secondary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  padding: 0;
  cursor: default;
}

.text-special::before {
  content: "";
  color: transparent;
  background: var(--c-main);
  background: -webkit-repeating-linear-gradient(
    to right,
    var(--c-main) 0%,
    var(--c-secondary) 100%
  );
  background: -moz-repeating-linear-gradient(
    to right,
    var(--c-main) 0%,
    var(--c-secondary) 100%
  );
  background: repeating-linear-gradient(
    to right,
    var(--c-main) 0%,
    var(--c-secondary) 100%
  );
  width: 0;
  height: 0.15rem;
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
