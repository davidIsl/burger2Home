<template lang="pug">
b-container.m-0.p-0(fluid)
  introLoader.
  mainMenu.sticky-top.
  nuxt.
  mainFooter.
  scrollTop.bg-secondary
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import introLoader from '~/components/introLoader.vue';
import mainMenu from '~/components/mainMenu.vue';
import mainFooter from '~/components/mainFooter.vue';
import scrollTop from '~/components/scrollTop.vue';

@Component({
  components: {
    introLoader,
    mainMenu,
    mainFooter,
    scrollTop,
  },
})
export default class extends Vue {
  head() {
    return {
      script: [
        {
          src: 'https://js.stripe.com/v3/',
        },
      ],
    };
  }
}
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
</style>
