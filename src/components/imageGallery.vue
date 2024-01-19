<script>
// import { onMounted } from "vue";
// import { gsap } from "gsap/gsap-core";
// import { ScrollTrigger } from "gsap/all";
// import imagesLoaded from "imagesLoaded";
</script>
<template>
  <!-- <div class="loader df aic jcc">
    <div>
      <h1>Loading</h1>
      <h2 class="loader--text">{{ loadingProgress.value }}</h2>
    </div>
  </div> -->
  <div class="demo-wrapper mt-[5rem]">
    <header></header>
    <section class="demo-text">
      <div class="wrapper text">HAPPY BIRTHDAY TITA❤️</div>
    </section>
    <section class="demo-gallery">
      <ul class="wrapper">
        <li>
          <img height="874" src="../assets/photo/tita-1.jpeg" width="1240" />
        </li>
        <li>
          <img height="874" src="../assets/photo/tita-2.jpeg" width="1240" />
        </li>
        <li>
          <img height="874" src="../assets/photo/tita-3.jpeg" width="1240" />
        </li>
        <li>
          <img height="874" src="../assets/photo/tita-4.jpeg" width="1240" />
        </li>
      </ul>
    </section>
    <section class="demo-gallery">
      <ul class="wrapper">
        <li>
          <img height="874" src="../assets/photo/us-1.jpeg" width="1240" />
        </li>
        <li>
          <img height="874" src="../assets/photo/us-5.jpeg" width="1240" />
        </li>
        <li>
          <img height="874" src="../assets/photo/us-3.jpeg" width="1240" />
        </li>
        <li>
          <img height="874" src="../assets/photo/us-4.jpeg" width="1240" />
        </li>
      </ul>
    </section>

    <section class="demo-gallery">
      <ul class="wrapper">
        <li>
          <img height="800" src="../assets/photo/tita-5.jpeg" width="1240" />
        </li>
        <li>
          <img height="874" src="../assets/photo/tita-6.jpeg" width="1240" />
        </li>
        <li>
          <img height="874" src="../assets/photo/tita-7.jpeg" width="1240" />
        </li>
        <li>
          <img height="874" src="../assets/photo/tita-9.jpeg" width="1240" />
        </li>
      </ul>
    </section>
    <section class="demo-text">
      <div class="wrapper text">CANTIK <3</div>
    </section>
    <footer class="df aic jcc"></footer>
  </div>
</template>
<style>
:root {
  font-size: 16px;
}
@media (max-width: 500px) {
  :root {
    font-size: 14px;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-moz-selection {
  background: #87cd33;
  color: white;
}

::selection {
  background: #87cd33;
  color: white;
}

h1 {
  font-size: 5rem;
}
h2 {
  font-size: 2rem;
}

img {
  width: 1024px !important;
  height: 1048px !important;
  background: #f0f0f0;
}

ul {
  padding-left: 1rem;
  list-style: none;
}

li {
  flex-shrink: 0;
  width: clamp(500px, 60vw, 800px);
  padding-right: 1rem;
}
header {
  height: 75vh;
}
footer {
  height: 75vh;
}

:-webkit-any-link {
  color: #4e9815;
}

:-moz-any-link {
  color: #4e9815;
}

:any-link {
  color: #4e9815;
}

.df {
  display: flex;
}
.aic {
  align-items: center;
}
.jcc {
  justify-content: center;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  color: white;
}

.demo-wrapper {
  overflow-x: hidden;
}

.wrapper {
  display: flex;
}

.demo-gallery:not(.last) {
  padding-bottom: 1rem;
}

.demo-text .text {
  font-size: clamp(8rem, 13vw, 16rem);
  line-height: 1;
  font-weight: 900;
}
</style>
