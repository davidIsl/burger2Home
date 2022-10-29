<template lang="pug">
.main-footer
  b-container(fluid)
    b-row
      b-col
        p.mb-0(style='font-size: 12px !important') {{ $t('copyright') }}
          nuxt-link(
            :to='`/${$i18n.locale}/privacy/`'
            style='font-size: 12px !important'
          ) {{ $t('privacy_link') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.main-footer {
  background: var(--backgroundFooter);
  transition: background 0.5s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07);
  bottom: 0;
  height: 80px;
  left: 0;
  padding: 30px 0;
  position: relative;
  text-align: center;
  width: 100%;
}
</style>
