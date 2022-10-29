<template lang="pug">
b-container
  b-row
    b-col.py-3.text-center
      h2.mb-4.underline-title {{ $t('pages.account.showProfil.title') }}
      p.mb-5 {{ $t('pages.account.showProfil.text') }}
      b-row
        b-col.pl-4(md='12')
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.gender') }} :
            span.ml-2.font-weight-normal Homme
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.company') }} :
            span.ml-2.font-weight-normal ///
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.lastName') }} :
            span.ml-2.font-weight-normal ///
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.firstName') }} :
            span.ml-2.font-weight-normal ///
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.phone') }} :
            span.ml-2.font-weight-normal ///
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.email') }} :
            span.ml-2.font-weight-normal ///
        b-col.pl-4.border-left(md='12')
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.status') }} :
            span.ml-2.font-weight-normal Professionel
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.vat') }} :
            span.ml-2.font-weight-normal ///
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.country') }} :
            span.ml-2.font-weight-normal ///
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.town') }} :
            span.ml-2.font-weight-normal ///
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.zipCode') }} :
            span.ml-2.font-weight-normal ///
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.address') }} :
            span.ml-2.font-weight-normal ///
          .mb-3.font-weight-bold {{ $t('pages.account.showProfil.box') }} :
            span.ml-2.font-weight-normal ///
      b-row.mt-4
        b-col(md='24')
          b-button(
            variant='primary'
            block
            @click='changeChild("update-profil")'
          ) {{ $t('pages.account.showProfil.buttonSubmit') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {
  changeChild(pageName: string) {
    this.$emit('childChange', pageName);
  }
}
</script>

<style lang="scss" scoped></style>
