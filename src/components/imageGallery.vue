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
    <section class="demo-text">
      <div class="wrapper text">HAPPY BIRTHDAY TITA</div>
    </section>
    <section class="demo-gallery">
      <ul class="wrapper">
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=87"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=16"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=191"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=16"
            width="1240"
          />
        </li>
      </ul>
    </section>
    <section class="demo-gallery">
      <ul class="wrapper">
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=158"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=104"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=173"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=50"
            width="1240"
          />
        </li>
      </ul>
    </section>
    <section class="demo-gallery">
      <ul class="wrapper">
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=118"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=182"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=80"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=96"
            width="1240"
          />
        </li>
      </ul>
    </section>
    <section class="demo-gallery">
      <ul class="wrapper">
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=107"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=118"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=82"
            width="1240"
          />
        </li>
        <li>
          <img
            height="874"
            src="https://source.unsplash.com/random/1240x874?sig=130"
            width="1240"
          />
        </li>
      </ul>
    </section>
    <section class="demo-text">
      <div class="wrapper text">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
    </section>
    <footer class="df aic jcc">
      <p>Images from <a href="https://unsplash.com/">Unsplash</a></p>
    </footer>
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
  width: 100%;
  height: auto;
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

footer {
  height: 25vh;
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
