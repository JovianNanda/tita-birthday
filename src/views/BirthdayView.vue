<script>
import ThemeToggle from '@/components/ThemeToggle.vue'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import SplitType from 'split-type'
import { onMounted, ref, watch, onBeforeMount } from 'vue'
import Lenis from '@studio-freight/lenis'
import CakeView from '@/components/CakeView.vue'
import { confetti } from 'dom-confetti'
import imageGallery from '@/components/imageGallery.vue'
export default {
  components: {
    ThemeToggle,
    CakeView,
    imageGallery
  },
  data() {
    return {
      data: null
    }
  },
  setup() {
    const music = ref()
    const modalError = ref()
    const confettiConfig = {
      angle: 100,
      spread: 80,
      startVelocity: 100,
      elementCount: 250,
      dragFriction: 0.12,
      duration: 10000,
      stagger: 4,
      width: '10px',
      height: '10px',
      perspective: '800px'
    }
    const cakeBlown = ref(false)
    const loading = ref(0)
    const modalStatus = ref(true)
    onBeforeMount(() => {
      document.documentElement.style.margin = '0'
      document.documentElement.style.height = '100%'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.margin = '0'
      document.body.style.height = '100%'
      document.body.style.overflow = 'hidden'
    })
    onMounted(() => {
      gsap.registerPlugin(ScrollTrigger)

      const images = gsap.utils.toArray('img')
      const loader = document.querySelector('#progressbar')
      const updateProgress = (instance) => (
        (loader.textContent = `${Math.round((instance.progressedCount * 100) / images.length)}%`),
        loader.style.setProperty(
          '--value',
          `${Math.round((instance.progressedCount * 100) / images.length)}`
        ),
        (loading.value = `${Math.round((instance.progressedCount * 100) / images.length)}`)
      )

      const showDemo = () => {
        document.scrollingElement.scrollTo(0, 0)
        // gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });

        gsap.utils.toArray('section').forEach((section, index) => {
          const w = section.querySelector('.wrapper')
          const [x, xEnd] =
            index % 2
              ? ['100%', (w.scrollWidth - section.offsetWidth) * -1]
              : [w.scrollWidth * -1, 1]
          gsap.fromTo(
            w,
            { x },
            {
              x: xEnd,
              scrollTrigger: {
                trigger: section,
                scrub: 0.5
              }
            }
          )
        })
      }
      imagesLoaded(images).on('progress', updateProgress).on('always', showDemo)

      localStorage.setItem('confetti', false)

      window.addEventListener('cakeBlown-localstorage-changed', (event) => {
        cakeBlown.value = event.detail.storage
        if (cakeBlown.value && !JSON.parse(localStorage.getItem('confetti'))) {
          confetti(document.querySelector('.container-cake'), confettiConfig)
          localStorage.setItem('confetti', true)
        }
      })

      const balloonContainer = document.querySelector('#balloon-container')
      music.value = localStorage.getItem('music')

      if (music.value) {
        document
          .querySelector('#audio')
          .play()
          .catch(function (error) {
            if (error.code == 0) {
              document.querySelector('#my_modal_3').showModal()
              modalError.value = error.code
            }
          })
        document.querySelector('#my_modal_3').showModal()
      }

      new SplitType('#myText')
      gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

      gsap.to('.svg-cloud', {
        scrollTrigger: {
          scrub: true
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed + 10,
        ease: 'none'
      })

      gsap.to('.name-container', {
        scrollTrigger: {
          scrub: true
        },
        y: () => ScrollTrigger.maxScroll(window) * 0.35,
        ease: 'none'
      })

      const lenis = new Lenis()

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)

      function random(num) {
        return Math.floor(Math.random() * num)
      }

      function getRandomStyles() {
        var r = random(255)
        var g = random(255)
        var b = random(255)
        var mt = random(200)
        var ml = random(50)
        var dur = random(5) + 5
        return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7);
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `
      }

      function createBalloons(num) {
        for (var i = num; i > 0; i--) {
          let balloon = document.createElement('div')
          balloon.className = 'balloon'
          balloon.style.cssText = getRandomStyles()
          balloonContainer.append(balloon)
        }
      }

      window.addEventListener('load', () => {
        createBalloons(15)
      })
      // window.addEventListener("click", () => {
      //   removeBalloons();
      // });
    })
    function ToggleBalloons() {
      setTimeout(() => {
        let ballloons = document.querySelectorAll('.balloon')
        let balloons_array = [...ballloons]
        balloons_array.forEach((balloon) => {
          if (balloon.style.display == 'block') {
            balloon.style.display = 'none'
          } else {
            balloon.style.display = 'block'
          }
        })
      }, 500)
    }

    function playMusic() {
      localStorage.setItem('music', 'true')
      document.querySelector('#audio').play()
      modalStatus.value = false
    }
    function stopMusic() {
      localStorage.setItem('music', 'false')
      document.querySelector('#audio').pause()
      document.querySelector('#audio').currentTime = 0
      modalStatus.value = false
    }
    function lanjut() {
      let music = JSON.parse(localStorage.getItem('music'))
      if (music) {
        playMusic()
      } else {
        stopMusic()
      }
    }

    watch(loading, (newLoading) => {
      loading.value = newLoading
      watch(modalStatus, (newModalStatus) => {
        if (!newModalStatus) {
          setTimeout(() => {
            gsap.to('.char', {
              y: 0,
              stagger: 0.05,
              delay: 0.2,
              duration: 0.1
            })
          }, 500)
          setTimeout(() => {
            document.documentElement.style.margin = '0'
            document.documentElement.style.height = 'auto'
            document.documentElement.style.overflow = 'auto'
            document.body.style.margin = '0'
            document.body.style.height = 'auto'
            document.body.style.overflow = 'auto'
          }, 500)
        }
      })
    })

    return { playMusic, stopMusic, ToggleBalloons, loading, music, modalError, lanjut }
  }
}
</script>

<template>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box flex flex-col items-center">
      <h3 class="self-start text-lg text-primary font-bold mb-4">Tunggu Bentar!</h3>
      <div id="progressbar" class="radial-progress" style="--value: 0" role="progressbar"></div>
      <form method="dialog" class="flex mt-7" v-if="modalError != 0 && loading == 100">
        <button class="btn btn-md btn-success" @click="lanjut()">Lanjotttt</button>
      </form>
    </div>
    <div class="modal-box" v-if="loading == 100 && modalError == 0">
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
  <div class="birthday container overflow-hidden" ref="el">
    <div
      class="btn btn-circle bg-secondary text-secondary-content absolute top-4 right-6"
      @click="ToggleBalloons()"
    >
      <i class="fa-regular fa-balloons"></i>
    </div>
    <ThemeToggle />
    <audio id="audio" hidden loop>
      <source src="../assets/cahaya (mp3cut.net).mp3" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    <div id="balloon-container">
      <div class="name-container container flex min-h-svh justify-center items-center flex-col">
        <h1 class="char font-interTight text-4xl mb-4 font-extrabold">Happy Birthday!🎉</h1>
        <h1
          id="myText"
          class="char font-interTight text-[1.65rem] sm:text-4xl lg:text-7xl font-extrabold text-accent"
        >
          Ni Wayan Eka Jayaningtirta
        </h1>
      </div>
      <svg
        class="svg svg-cloud absolute -bottom-14 left-0 right-0 z-20 w-full text-base-200"
        viewBox="0 0 1732 112.5"
        width="1732"
        height="112.5"
      >
        <path
          d="M 0 112.5 L -50 55.26578452556002 Q -32.90673378112133 38.22706860483789 -15.86801786039921 55.32033482371656 Q 2.821572593757832 32.7171897743339 25.424717643140486 51.406780228490945 Q 30.178536968715775 39.13504332958979 42.45027386761693 43.888862655165084 Q 57.91428120001447 15.571179996038431 86.23196385914113 31.03518732843599 Q 100.24910895642807 16.372845611025628 114.91145067383843 30.389990708312567 Q 126.27164035905481 20.72692789279921 135.93470317456817 32.087117578015594 Q 141.40076542687467 26.417203436265396 147.07067956862485 31.883265688571882 Q 156.04078564921048 21.473711890881894 166.45033944690047 30.44381797146752 Q 179.7205346974198 16.97620043503438 193.18815223385292 30.246395685553686 Q 206.85361439638504 18.72776793774712 218.37224214419163 32.39323010027927 Q 240.56945427657521 18.318323553344378 254.6443608235101 40.51553568572797 Q 262.7849981806473 33.05757063073054 270.2429632356447 41.198207987867704 Q 288.024860774407 21.82453972711808 307.39852903515657 39.60643726588031 Q 326.52267758730983 14.024107108857265 352.1050077443329 33.14825566101055 Q 366.88489856041775 22.18760644108042 377.8455477803479 36.96749725716526 Q 394.8532889475097 23.0103717117247 408.81041449295026 40.018112878886505 Q 427.16335542950884 31.1950468015649 435.9864215068304 49.54798773812347 Q 461.10957186928835 24.713742932671238 485.94381667474056 49.83689329512914 Q 506.60903762003045 23.19756123078558 533.248369684374 43.86278217607544 Q 552.6365729680634 15.905022050586176 580.5943330935527 35.293225334275604 Q 584.193479025365 30.77250732803271 588.7141970316079 34.37165325984505 Q 598.4438868965973 24.365660047327893 608.4498801091145 34.095349912317296 Q 628.6961312508014 12.343422939699558 650.4480582234191 32.589674081386484 Q 661.0341335820597 9.67495667474601 683.9488509887002 20.2610320333866 Q 700.7595553745108 3.3849126536807432 717.6356747542166 20.195617039491236 Q 723.0339017393236 17.175697011357975 726.053821767457 22.57392399646512 Q 746.7349419047258 8.550787249185149 760.7580786520057 29.2319073864539 Q 783.0704679569321 4.960722688969938 807.3416526544162 27.273111993896475 Q 823.0852968875182 15.082410200227486 835.2759986811872 30.826054433329475 Q 841.6131420494573 27.051849297617537 845.3873471851693 33.38899266588779 Q 873.7085050469135 20.747158863070908 886.3503388497304 49.06831672481509 Q 907.9245861225766 26.21270122101955 930.7802016263721 47.78694849386571 Q 945.5871245584581 22.11786123008187 971.256211822242 36.924784162167924 Q 977.2438571060161 27.547815655017963 986.6208256131661 33.53546093879207 Q 1000.2383749964056 19.354321297165384 1014.4195146380323 32.971870680404926 Q 1023.838826869324 24.657882831487214 1032.1528147182416 34.07719506277884 Q 1043.4787116703847 21.438319352411042 1056.1175873807524 32.76421630455401 Q 1065.6587383885374 14.224814703560188 1084.198139989531 23.765965711344954 Q 1091.0285441025974 14.436546338938008 1100.3579634750042 21.266950452004288 Q 1111.4685491726004 11.125936142523827 1121.6095634820808 22.236521840119966 Q 1127.0424028419325 17.480229734581293 1131.798694947471 22.913069094432743 Q 1137.751040825653 17.28122959061965 1143.382880329466 23.23357546880154 Q 1161.274571447629 3.0852822466096654 1181.4228646698207 20.976973364772544 Q 1202.0845364611312 0.41935633781303494 1222.6421534880908 21.081028129123645 Q 1245.2580767031154 5.8249642978394895 1260.5141405343998 28.440887512864293 Q 1267.8281186238366 24.707386536997255 1271.5616195997036 32.02136462643405 Q 1282.4837123080215 25.604226540064616 1288.900850394391 36.526319248382585 Q 1299.98644400203 26.12617004467159 1310.386593205741 37.21176365231066 Q 1328.4662795331446 13.469609824624087 1352.2084333608311 31.54929615202758 Q 1359.7206016666873 21.996241857944458 1369.2736559607704 29.508410163800598 Q 1375.3156412304754 22.95717065745511 1381.8668807368208 28.999155927160043 Q 1397.8602809431593 13.656662214361724 1413.2027746559577 29.650062420700287 Q 1429.4575679408076 18.417925063585614 1440.6897052979223 34.67271834843554 Q 1458.9170377076623 19.695248770322834 1473.894507285775 37.92258118006289 Q 1487.7556994123033 22.386907171289423 1503.2913734210767 36.24809929781767 Q 1509.3392648129034 29.362597790811265 1516.2247663199098 35.41048918263793 Q 1529.6098420306728 17.028890868093455 1547.9914403452174 30.413966578856538 Q 1561.6578841781945 13.86334950734344 1578.2085012497075 27.529793340320495 Q 1598.0361232952546 7.562531283479107 1618.003385352096 27.39015332902627 Q 1628.1567230280273 16.787163836546043 1638.7597125205075 26.940501512477233 Q 1645.507644896779 19.330514357777442 1653.117632051479 26.07844673404911 Q 1667.404395546772 5.975442821955298 1687.5073994588658 20.262206317248385 Q 1698.4499255233704 9.043595922375317 1709.6685359182436 19.986121986880004 Q 1715.9655680265823 15.557508877176339 1720.394181136286 21.854540985515143 Q 1750.538436421489 4.862996365327376 1767.5299810416766 35.00725165053012 L 1732 112.5"
          fill="var(--fallback-b3,oklch(var(--b3)/var(--tw-text-opacity)))"
        ></path>
        <path
          d="M 0 112.5 L -50 65.22608434194704 Q -15.267860341152392 32.35764931516845 17.6005746856262 67.08978897401606 Q 31.742594845917367 42.92211276796503 55.910271051968394 57.0641329282562 Q 89.63089480117233 22.465382637619882 124.22964509180866 56.186006386823834 Q 148.20478858844623 28.50542683180555 175.88536814346452 52.48057032844313 Q 203.30221184454712 24.046212908522037 231.73656926446822 51.463056609604635 Q 249.37606564518236 38.46801030348855 262.3711119512985 56.10750668420272 Q 293.57116528673174 25.46325443929377 324.2154175316407 56.663307774727045 Q 328.76250910278753 49.09521970333552 336.33059717417905 53.64231127448235 Q 354.080004829035 35.27012355946442 372.45219254405293 53.01953121432038 Q 378.72242177532377 47.76699260261578 383.9749603870283 54.03722183388656 Q 394.5433276205946 44.33065243094124 404.2498970235399 54.89901966450751 Q 429.8939531288155 39.24716357340152 445.5458092199215 64.89121967867715 Q 474.6629959421986 37.442472623963 502.11174299691277 66.55965934624008 Q 521.7252881460073 43.020029574471636 545.2649179177757 62.63357472356614 Q 551.4332653566825 55.25847894553671 558.808361134712 61.4268263844435 Q 567.0788985061243 52.32129888145698 576.1844260091109 60.5918362528694 Q 599.005128054158 33.303222915535706 626.2937413914918 56.123924960582954 Q 631.1373641604971 47.04911470058664 640.2121744204935 51.89273746959201 Q 645.9741071178893 41.35309810120648 656.5137464862748 47.11503079860228 Q 667.2928006406715 28.076305622741202 686.3315258165326 38.85535977713786 Q 725.5700273019748 9.637957387216957 754.7874296918958 48.87645887265927 Q 761.515549555571 42.8230518180696 767.5689566101607 49.55117168174487 Q 784.8040980749173 31.94529823722246 802.4099715194398 49.180439701979054 Q 835.555346479738 26.225102954288147 858.5106832274289 59.37047791458639 Q 869.2005520789611 55.01258159378069 873.5584483997668 65.70245044531289 Q 902.4117333869706 37.90048998486199 930.2136938474215 66.75377497206577 Q 937.308724334471 54.373204881550635 949.6892944249862 61.46823536860022 Q 959.8990604728311 48.0076344178407 973.3596614235906 58.217400465685614 Q 993.9894319829561 37.213122221088426 1014.9937102275534 57.84289278045397 Q 1045.4177727858196 19.569920430471896 1083.6907451358018 49.9939829887382 Q 1095.6152828991487 36.25778006504497 1109.351485822842 48.182317828392016 Q 1128.1730681124877 31.13970305618632 1145.2156828846935 49.96128534583205 Q 1169.8849294441325 17.87488718997428 1201.9713275999902 42.54413374941325 Q 1221.260758838533 24.599753154455897 1239.2051394334903 43.88918439299866 Q 1261.5709397920516 29.59490888570125 1275.865215299349 51.96070924426259 Q 1308.4078794058353 24.711018144887888 1335.6575705052098 57.253682251373945 Q 1353.8856959494838 28.797612483885274 1382.3417657169725 47.0257379281593 Q 1386.8037418052477 40.364502886772385 1393.4649768466345 44.826478975047436 Q 1402.61143094636 35.94733649227827 1411.4905734291292 45.09379059200379 Q 1436.5144414999706 28.467873863303815 1453.1403582286707 53.49174193414536 Q 1470.29961846643 39.55580022482406 1484.2355601757515 56.71506046258356 Q 1493.0244758554682 48.12454136857514 1501.6149949494766 56.91345704829176 Q 1525.352837090902 24.627149501622043 1557.639144637572 48.364991643047674 Q 1591.0693275788194 15.0252039730781 1624.409115248789 48.45538691432563 Q 1639.8614321233217 28.358036737375713 1659.9587823002717 43.81035361190842 Q 1681.875676334421 20.267285517499772 1705.4187444288298 42.184179551649244 Q 1742.2706833425864 18.739684241205225 1765.7151786530303 55.59162315496174 L 1732 112.5"
          fill="var(--fallback-b2,oklch(var(--b2)/var(--tw-text-opacity)))"
        ></path>
        <path
          d="M 0 112.5 L -50 76.48286584592381 Q -37.07712180696148 68.60951629808118 -29.20377225911884 81.53239449111969 Q -4.484425344971495 56.84668472980705 20.201284416341135 81.5660316439544 Q 37.49278570185238 63.16572165122155 55.89309569458523 80.45722293673279 Q 93.94555022996434 47.71713995789893 126.68563320879821 85.76959449327806 Q 151.58619248527566 65.07882050103241 172.2769664775213 89.97937977750986 Q 195.54719851047682 62.72622147731529 222.80035681067142 85.99645351027081 Q 269.10639459235244 50.27603029617369 304.8268178064495 96.58206807785467 Q 334.87353645173704 43.405550089417346 388.0500544401744 73.4522687347049 Q 397.5787387824199 63.85107740485468 407.17993011227014 73.3797617471002 Q 422.44903019599536 59.9478650626952 435.88092688040035 75.21696514642042 Q 443.4738427450267 67.78212108948486 450.90868680196223 75.37503695411118 Q 489.68345800709625 40.70983214745607 524.3486628137514 79.48460335259011 Q 566.6170439744099 47.274286345820485 598.8273609811795 89.54266750647895 Q 612.4796477544389 62.85429202572959 639.1680232351883 76.50657879898911 Q 653.8050436404994 53.14330293260835 677.1683195068802 67.7803233379194 Q 691.67822821002 52.16529173191236 707.293259816027 66.67520043505216 Q 752.7136674701774 29.022660154184564 790.366207751045 74.44306780833492 Q 832.9308209991125 42.7427453463705 864.6311434610768 85.30735859443793 Q 896.9589240523134 59.194256508097 923.0720261386543 91.5220370993336 Q 938.7638111651767 72.35594693685326 957.9299013276569 88.0477319633755 Q 991.3707552077622 60.816036326045975 1018.6024508450917 94.25689020615118 Q 1025.4914992683568 87.30076678021888 1032.4476226942893 94.18981520348422 Q 1043.2005714985537 82.90653193740927 1054.4838547646286 93.65948074167366 Q 1071.0504213363847 72.14172107309213 1092.5681810049662 88.70828764484813 Q 1100.339098601721 80.88965370721054 1108.1577325393587 88.66057130396547 Q 1117.768312816474 80.71366499411832 1125.7152191263212 90.32424527123374 Q 1138.480625745156 80.0665124792021 1148.7383585371877 92.83191909803688 Q 1177.0488284567143 56.0952723716875 1213.7854751830637 84.40574229121415 Q 1248.1977511934629 42.33994566709168 1290.2635478175853 76.75222167749081 Q 1333.8055064045818 32.892433262155606 1377.6652948199169 76.434391849152 Q 1391.9459410918275 57.30744786480669 1411.0728850761727 71.58809413671723 Q 1448.5428472919173 47.43052718865454 1472.70041423998 84.9004894043992 Q 1498.7415288017137 59.813865721191945 1523.828152484921 85.85498028292564 Q 1559.2527819453649 52.5001064066862 1592.607655821604 87.92473586712985 Q 1603.828427665126 74.29422654129709 1617.4589369909588 85.51499838481902 Q 1626.9107345472328 68.36896362827588 1644.056769303776 77.82076118454994 Q 1653.0764267665975 67.7935125763957 1663.103675374752 76.81317003921733 Q 1695.7875051870633 47.06037853407298 1725.5402966922077 79.74420834638441 Q 1766.8949650586464 54.926845757183315 1791.7123276478474 96.28151412362189 L 1732 112.5"
          fill="var(--fallback-b1,oklch(var(--b1)/var(--tw-text-opacity)))"
        ></path>
      </svg>
    </div>
    <div class="cake-section">
      <div
        class="container flex min-h-svh justify-center items-center overflow-hidden flex-col gap-y-8 relative z-10"
      >
        <CakeView />
      </div>
    </div>
    <div class="">
      <imageGallery />
    </div>
    <div class="kata-kata">
      <div class="hero min-h-screen">
        <div class="hero-content text-center relative">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Halo Tita!</h1>
            <p class="py-6">
              Gimana websitenya bagus ga?, semoga kamu suka ya!, karena ngejar2 bikin websitenya jdi
              aga kurang maksimal, nanti deh aku buatin yang lebihh lagiii...
            </p>
            <p class="pt-4">
              Selamat Ulang Tahunn ya
              <span class="text-accent">Sayangg</span>, semoga di tahun ini diberi hal hal yang
              lebih baik dari tahun sebelumnya, diberi kesehatan, diberi rejeki, dan kebahagiaan
              selalu. semoga ulang tahun kedepannya aku juga masih bisa kaya gini ya!, kamu sukses
              selalu, jangan nakal2, semangat ngelewatin semua masalahnya, gaboleh nyerah!, karena
              akan selalu ada aku <3
              <span class="text-red-600">I Love You</span>
            </p>
          </div>

          <div id="position" class="sunflower">
            <div class="head">
              <div id="eye-1" class="eye"></div>
              <div id="eye-2" class="eye"></div>
              <div class="mouth"></div>
            </div>
            <div class="petals"></div>
            <div class="trunk">
              <div class="left-branch"></div>
              <div class="right-branch"></div>
            </div>
            <div class="vase"></div>
          </div>
          <div id="position2" class="sunflower">
            <div class="head">
              <div id="eye-1" class="eye"></div>
              <div id="eye-2" class="eye"></div>
              <div class="mouth"></div>
            </div>
            <div class="petals"></div>
            <div class="trunk">
              <div class="left-branch"></div>
              <div class="right-branch"></div>
            </div>
            <div class="vase"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#position2 {
  position: absolute;
  right: 20%;
  bottom: 0;
}
#position {
  position: absolute;
  left: 6%;
  bottom: 0;
}
.sunflower {
  position: relative;
  height: 30px;
  width: 30px;
}
.head {
  animation: hmove 2s infinite linear;
  height: 50px;
  width: 62px;
  position: relative;
  left: 8px;
  top: 39px;
  transform-origin: 50% -7px;
  user-select: none;
}
.head .eye {
  background: #43699a;
  border-radius: 10px;
  height: 5px;
  position: absolute;
  top: 30px;
  width: 5px;
}
.head .eye#eye-1 {
  left: 17px;
  animation: eye 4s linear infinite normal 0.5s;
}
.head .eye#eye-2 {
  right: 17px;
  animation: eye 4s linear infinite normal 0.5s;
}
.head .mouth {
  background: #ecf0f1;
  border-radius: 30px;
  bottom: 2px;
  clip: rect(8px, 15px, 16px, 0);
  height: 16px;
  margin-left: -7.5px;
  position: absolute;
  left: 50%;
  width: 15px;
}

.petals {
  z-index: -1;
  border-radius: 100%;
  display: inline-block;
  background-color: #faaa18;
  height: 50px;
  width: 50px;
  position: absolute;
  animation: petals 2s infinite linear;
  box-shadow:
    15px 17px #ffe000,
    -15px 17px #ffe000,
    -22px -7px #ffe000,
    0px -22px #ffe000,
    22px -7px #ffe000;
}
.trunk {
  height: 65px;
  width: 5px;
  background: #77b039;
  left: 37px;
  top: 100px;
  position: absolute;
  z-index: -2;
  animation: trunk 2s infinite linear;
}
.left-branch {
  background: #77b039;
  height: 35px;
  width: 9px;
  position: absolute;
  left: -12px;
  top: 24px;
  border-radius: 100% 0% 0% 0%;
  -webkit-border-radius: 100% 0% 0% 0%;
  -moz-border-radius: 100% 0% 0% 0%;
  -ms-border-radius: 100% 0% 0% 0%;
  -o-border-radius: 100% 0% 0% 0%;

  transform: rotate(-50deg);
  -webkit-transform: rotate(-50deg);
  -moz-transform: rotate(-50deg);
  -ms-transform: rotate(-50deg);
  -o-transform: rotate(-50deg);
}

.right-branch {
  background: #77b039;
  height: 35px;
  width: 9px;
  position: absolute;
  top: 24px;
  left: 10px;
  border-radius: 0% 100% 0% 0%;
  -webkit-border-radius: 0% 100% 0% 0%;
  -moz-border-radius: 0% 100% 0% 0%;
  -ms-border-radius: 0% 100% 0% 0%;
  -o-border-radius: 0% 100% 0% 0%;

  transform: rotate(50deg);
  -webkit-transform: rotate(50deg);
  -moz-transform: rotate(50deg);
  -ms-transform: rotate(50deg);
  -o-transform: rotate(50deg);
}
.vase {
  position: absolute;
  top: 165px;
  left: 13px;
  height: 0;
  width: 52px;
  border-top: 45px solid #faaa18;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.vase:before,
.vase:after {
  content: '';
  position: absolute;
  background: #faa118;
}
.vase:before {
  background: #f9a018;
  width: 58px;
  height: 20px;
  top: -50px;
  left: -10px;
  position: absolute;
  box-shadow: 0 5px 10px -9px black;
  -moz-transform: 0 5px 10px -9px black;
  -ms-transform: 0 5px 10px -9px black;
  -o-transform: 0 5px 10px -9px black;
}

@keyframes petals {
  0% {
    transform: rotate(0);
    left: 10px;
  }
  25% {
    left: 20px;
  }
  50% {
    left: 10px;
  }
  75% {
    left: 20px;
  }
  100% {
    transform: rotate(360deg);
    left: 10px;
  }
}
@keyframes hmove {
  0% {
    left: 5px;
  }
  25% {
    left: 15px;
  }
  50% {
    left: 5px;
  }
  75% {
    left: 15px;
  }
  100% {
    left: 5px;
  }
}
@keyframes eye {
  from {
  }
  79% {
    height: 5px;
  }
  80% {
    height: 0px;
  }
  85% {
    height: 5px;
  }
  to {
    height: 5px;
  }
}
@keyframes trunk {
  0% {
    left: 34px;
    transform: rotate(-5deg);
  }
  25% {
    left: 40px;
    transform: rotate(5deg);
  }
  50% {
    left: 34px;
    transform: rotate(-5deg);
  }
  75% {
    left: 40px;
    transform: rotate(5deg);
  }
  100% {
    left: 34px;
    transform: rotate(-5deg);
  }
}
body {
  text-align: center;
}
body {
  margin: 0;
}

.char {
  transform: translateY(115px);
  transition: transform 0.5s;
  clip-path: polygon(0 0, 100% 0, 100% 125%, 0% 100%);
}

#balloon-container {
  height: 100vh;
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  transition: opacity 500ms;
}

.balloon {
  height: 125px;
  width: 105px;
  border-radius: 75% 75% 70% 70%;
  position: relative;
  z-index: 10;
}

.balloon:before {
  content: '';
  height: 75px;
  width: 1px;
  padding: 1px;
  background-color: #fdfd96;
  display: block;
  position: absolute;
  top: 125px;
  left: 0;
  right: 0;
  margin: auto;
}

.balloon:after {
  content: '▲';
  text-align: center;
  display: block;
  position: absolute;
  color: inherit;
  top: 120px;
  left: 0;
  right: 0;
  margin: auto;
}

@keyframes float {
  from {
    transform: translateY(-10vh);
    opacity: 1;
  }
  to {
    transform: translateY(-150vh);
    opacity: 0;
  }
}
</style>
