<template lang="pug">
.main-hero
  b-container(fluid)
    b-container
      b-row(align-v='center')
        b-col(lg='12')
          h2.mt-2.font-title Antelope NuxtJS Static Template
            br.d-none.d-sm-block.
            |
            | and Bootstrap-Vue Best Practice,
            br.d-none.d-sm-block.
            |
            | and Plugins Common Use.
          p.mt-4.font-subtitle {{ $t('hero.text') }}
        b-col(lg='12')
          LogoAntelope.logo-hero.
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import LogoAntelope from '~/components/svg/logoAntelope.vue';

@Component({
  components: { LogoAntelope },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

.main-hero {
  background: var(--backgroundHero);
  transition: background 0.5s;
  margin-bottom: 100px;
  background-size: cover;
  padding: 110px 0px 110px 0px;
  @include for-phone-only {
    padding: 30px 0px 50px 0px;
  }
  @include for-tablet-only {
    padding: 50px 0px 70px 0px;
  }
  .font-title {
    font-size: 35px;
    font-weight: 600;
    line-height: 50px;
    @include for-phone-only {
      font-size: 30px;
      font-weight: 600;
      line-height: 45px;
    }
  }
  .font-subtitle {
    font-size: 20px;
  }
  .logo-hero {
    border-radius: 7px;
    width: 100%;
    margin-top: 50px;
    @include from-phone-only {
      width: 100%;
      margin-top: 50px;
    }
    @include from-md-desktop-only {
      width: 110%;
      margin-top: 0px;
    }
  }
}
</style>
