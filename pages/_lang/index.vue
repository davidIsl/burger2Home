<template lang="pug">
div
  mainHero.
  b-container.py-5(fluid)
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 {{ $t('pages.index.title') }}
          .mt-4
            p.text-justify {{ $t('pages.index.text')[0] }}
            p.text-justify {{ $t('pages.index.text')[1] }}
            p.text-justify {{ $t('pages.index.text')[2] }}
    b-container.mb-5
      b-row
        b-col(lg='15')
          h2 {{ $t('pages.index.structure.title') }}
          p {{ $t('pages.index.structure.text') }}
          a(
            href='https://fr.nuxtjs.org/docs/2.x/directory-structure/nuxt'
            target='_blank'
            rel='noopener'
          ) https://fr.nuxtjs.org/docs/2.x/directory-structure/nuxt
          .mt-4
            ul
              li {{ $t('pages.index.structure.subtitle')[0] }}
                ul.mb-4
                  li.mt-4 {{ $t('pages.index.structure.subtext1')[0] }}
                  li.mt-4 {{ $t('pages.index.structure.subtext1')[1] }}
                  li.mt-4 {{ $t('pages.index.structure.subtext1')[2] }}
              li {{ $t('pages.index.structure.subtitle')[1] }}
                ul.mb-4
                  li.mt-4 {{ $t('pages.index.structure.subtext2')[0] }}
              li {{ $t('pages.index.structure.subtitle')[2] }}
                ul.mb-4
                  li.mt-4 {{ $t('pages.index.structure.subtext3')[0] }}
              li {{ $t('pages.index.structure.subtitle')[3] }}
                ul.mb-4
                  li.mt-4 {{ $t('pages.index.structure.subtext4')[0] }}
              li {{ $t('pages.index.structure.subtitle')[4] }}
                ul.mb-4
                  li.mt-4 {{ $t('pages.index.structure.subtext5')[0] }}
                  li.mt-4 {{ $t('pages.index.structure.subtext5')[1] }}
              li {{ $t('pages.index.structure.subtitle')[5] }}
                ul.mb-4
                  li.mt-4 {{ $t('pages.index.structure.subtext6')[0] }}
                  li.mt-4 {{ $t('pages.index.structure.subtext6')[1] }}
                  li.mt-4 {{ $t('pages.index.structure.subtext6')[2] }}
        b-col.d-none.d-lg-block(lg='9')
          b-img-lazy(
            src='/img/structure.png'
            alt='Nuxt Structure preview'
            width='397'
            height='1665'
            fluid
          ).
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import mainHero from '~/components/mainHero.vue';

@Component({
  components: { mainHero },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped></style>
