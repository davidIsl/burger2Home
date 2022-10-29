<template lang="pug">
b-container.m-0.p-0(fluid)
  introLoader.
  mainMenu.sticky-top.
  nuxt.
  mainFooter.
  scrollTop.
  gdprAlert.
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import introLoader from '~/components/introLoader.vue';
import mainMenu from '~/components/mainMenu.vue';
import mainFooter from '~/components/mainFooter.vue';
import scrollTop from '~/components/scrollTop.vue';
import gdprAlert from '~/components/gdprAlert.vue';

@Component({
  components: {
    introLoader,
    mainMenu,
    mainFooter,
    scrollTop,
    gdprAlert,
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
// Page transition
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

// Page transition 2
// .page-enter-active,
// .page-enter-active::before,
// .page-enter-active::after,
// .page-leave-active,
// .page-leave-active::before,
// .page-leave-active::after {
//   transition: transform 500ms;
// }

// .page-enter-active::before,
// .page-leave-active::before {
//   left: 0px;
// }

// .page-enter-active::after,
// .page-leave-active::after {
//   content: '';
//   position: fixed;
//   z-index: 0;
//   top: 0;
//   left: 0;
//   height: 100vh;
//   width: 100vw;
//   background: var(--backgroundIntro);
// }

// .page-leave::after {
//   transform: translate3d(calc(-100%), calc(-100%), 0);
// }

// .page-enter-to::before,
// .page-enter-to::after {
//   transform: translate3d(calc(-100%), 0, 0);
// }
</style>
