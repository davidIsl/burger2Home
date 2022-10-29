<template lang="pug">
.gdpr-alert(v-if='!gdprAccepted')
  div {{ $t('gdpr.text') }}
    nuxt-link.ml-3(:to='`/${$i18n.locale}/privacy/`') {{ $t('gdpr.readMore') }}
    b-button.ml-3(variant='primary' size='sm' @click='gdprAccept') {{ $t('gdpr.button') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {
  gdprAccepted: string | null = 'false';

  mounted() {
    if (process.browser) {
      this.gdprAccepted = window.localStorage.getItem('gdpr.accepted');
    }
  }

  gdprAccept() {
    window.localStorage.setItem('gdpr.accepted', 'true');
    this.gdprAccepted = 'true';
  }
}
</script>

<style lang="scss" scoped>
.gdpr-alert {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  padding: 10px;
  color: var(--colorGDPR);
  background: var(--backgroundGDPR);
  box-shadow: var(--shadowMenu);
  transition: background 0.5s;
  text-align: center;
  font-size: 12px;
  button {
    font-size: 10px;
    padding: 2px 7px 2px 7px;
  }
}
</style>
