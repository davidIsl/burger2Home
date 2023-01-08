<template lang="pug">
.container-full-center
  b-container
    b-row
      b-col(md='24')
        h1.text-center {{ $t('pages.privacy.title') }}
        .mt-5
          p {{ $t('pages.privacy.text')[0] }}
          p {{ $t('pages.privacy.text')[1] }}
          p {{ $t('pages.privacy.text')[2] }}
          p {{ $t('pages.privacy.text')[3] }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {}
</script>

<style lang="scss" scoped></style>
