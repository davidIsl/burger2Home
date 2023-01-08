<template lang="pug">
.scroll-top(
  @click='scrollTop'
  v-if='scrolled'
  data-aos='fade-up-left'
  :class='{ "scroll-top-gdpr": gdprAccepted }'
)
  font-awesome-icon(icon='angle-double-up')
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {
  scrolled: boolean = false;
  gdprAccepted: string | null = 'false';

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  mounted() {
    const that = this;
    // GDPR
    if (process.browser) {
      this.gdprAccepted = window.localStorage.getItem('gdpr.accepted');
    }

    // Scroll to top
    window.addEventListener(
      'scroll',
      function () {
        const y = window.scrollY;
        that.scrolled = y > 250;
      },
      { passive: true }
    );
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

.scroll-top {
  color: var(--colorScrollTop);
  background: var(--backgroundScrollTop);
  width: 50px;
  height: 50px;
  font-size: 30px;
  bottom: 50px;
  right: 15px;
  border-radius: 25px;
  text-align: center;
  cursor: pointer;
  position: fixed;
  @include for-tablet-only {
    bottom: 75px;
  }
  @include for-phone-only {
    width: 40px;
    height: 40px;
    font-size: 23.5px;
    bottom: 90px;
  }
}

.scroll-top-gdpr {
  bottom: 15px;
  right: 15px;
}
</style>
