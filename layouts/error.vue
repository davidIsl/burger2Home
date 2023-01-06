<template lang="pug">
.container-full-center
  b-container
    b-row
      b-col.text-center
        h1 {{ $t('pages.error.label') }} {{ error.statusCode }}
        br.
        h2(v-if='error.statusCode == 404') {{ $t('pages.error.404') }}
        br.
        nuxt-link(:to='`/${$i18n.locale}/`')
          b-button(variant='darkRed') {{ $t('pages.error.buttonBack') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class extends Vue {
  @Prop({ default: {} }) readonly error!: Object;
  head() {
    return {
      title: this.$t('pages.error.buttonBack'),
    };
  }
}
</script>

<style lang="scss" scoped></style>
