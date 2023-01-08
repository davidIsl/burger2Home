<template lang="pug">
.intro-loader(:class='introClass' v-if='introExist')
  logoAntelope.intro-loader-logo.
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import logoAntelope from '~/components/svg/logoAntelope.vue';

@Component({
  components: { logoAntelope },
})
export default class extends Vue {
  introExist: boolean = true;
  introClass: string = '';
  mounted() {
    const that = this;
    setTimeout(function () {
      that.introClass = 'animation-disappear';
      setTimeout(function () {
        that.introExist = false;
      }, 500);
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

// Intro loader
.intro-loader {
  background: var(--backgroundIntro);
  display: flex;
  position: fixed;
  z-index: 999999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .intro-loader-logo {
    margin: auto;
    margin-top: -50px;
    max-width: 200px;
    @include from-phone-only {
      max-width: 300px;
    }
    @include from-tablet-only {
      max-width: 400px;
    }
  }
}

.animation-disappear {
  opacity: 0;
  animation: 0.5s disappear;
}

@keyframes disappear {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
