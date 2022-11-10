<script setup>
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const displayHint = async (text) => {
  const el = document.querySelector('div.install .inner-text')
  el.innerText = text
  el.parentElement.style.color = '#00c96f'
  await sleep(1500)
  el.parentElement.style.color = '#aac8e4'
  el.innerText = 'npm i v3-infinite-loading'
}

const copyText = () => {
  navigator.clipboard
    .writeText('npm i v3-infinite-loading')
    .then(() => {
      displayHint('Copied to clipboard')
    })
    .catch(() => {
      displayHint('Failed to copy 😞')
    })
}
</script>

<template>
  <section id="hero">
    <h1 class="tagline">
      Vue.js 3
      <span class="accent">Infinite</span>
      <br />loading Component
    </h1>
    <p class="description">
      An infinite scroll component compatible with vue.js 3 and vite
      <br />
      to help you implement an infinite scroll list more easily.
    </p>
    <div class="actions">
      <a class="get-started" href="/guide/introduction.html">
        Get Started
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
          <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
        </svg>
      </a>
      <div @click="copyText" class="install">
        <span class="inner-text">npm i v3-infinite-loading</span>
        <svg width="16" height="19" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>Layer 1</title>
            <path fill="#666666" stroke="null" id="svg_1" opacity="0.35"
              d="m2.50926,14.0668l0,-11.0873c0,-1.53097 1.24085,-2.77183 2.77182,-2.77183l4.61971,0l5.54365,5.54365l0,8.31548c0,1.53097 -1.24085,2.77182 -2.77182,2.77182l-7.39154,0c-1.53097,0 -2.77182,-1.24085 -2.77182,-2.77182z" />
            <path stroke="null" fill="#666666" id="svg_2"
              d="m9.84788,3.95635l0,-3.69577l5.54365,5.54365l-3.69577,0c-1.02096,0 -1.84788,-0.82693 -1.84788,-1.84788z" />
            <path stroke="null" fill="#757575" id="svg_3"
              d="m5.22817,16.89153c-1.53097,0 -2.77183,-1.24085 -2.77183,-2.77183l0,-11.0873c-1.02096,0 -1.84788,0.82693 -1.84788,1.84788l0,11.0873c0,1.53097 1.24085,2.77183 2.77183,2.77183l7.39153,0c1.02096,0 1.84788,-0.82693 1.84788,-1.84788l-7.39153,0z" />
          </g>
        </svg>
      </div>
    </div>
  </section>

  <section id="highlights" class="vt-box-container">
    <div class="vt-box text-center">
      <h2>Light and Simple</h2>
      <p>
        Light weight, Simple and easy to use api and a built in spinner
      </p>
    </div>
    <div class="vt-box text-center">
      <h2>2-directions support</h2>
      <p>Support top and bottom directions</p>
    </div>
    <div class="vt-box text-center">
      <h2>Result display</h2>
      <p>Fully configurable load result display</p>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 42px 32px;
}

#hero {
  padding: 96px 32px;
  text-align: center;
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.actions a {
  font-size: 16px;
  display: inline-block;
  background-color: var(--vt-c-bg-mute);
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
}

.actions .get-started {
  font-weight: 600;
  background-color: #42b883;
  color: #213547;
  transition-duration: 0.2s;
}

.actions .icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.actions .get-started:hover .icon {
  transform: translateX(2px);
}
.actions .get-started:hover {
  background-color: #42d392;
}

.actions .install {
  width: 254px;
  color: #aac8e4;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #2f2f2f;
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
  cursor: pointer;
}

.actions .install svg {
  margin-left: 8px;
}

#highlights {
  max-width: 960px;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
}

#highlights h2 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
  max-width: 200px;
  color: rgba(60, 60, 60, .7);
}

.dark #highlights p {
  color: rgba(235, 235, 235, .6);
}

#highlights .vt-box {
  background-color: transparent;
}

.text-center {
  text-align: center;
}

@media (max-width: 960px) {
  .tagline {
    font-size: 64px;
    letter-spacing: -0.5px;
  }

  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
}

@media (max-width: 768px) {
  .tagline {
    font-size: 48px;
    letter-spacing: -0.5px;
  }
}

@media (max-width: 576px) {
  #hero {
    padding: 64px 32px;
  }

  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }

  #highlights h3 {
    margin-bottom: 0.6em;
  }

  #highlights .vt-box {
    padding: 20px 36px;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}
</style>
