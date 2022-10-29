<template lang="pug">
div
  b-container.py-5(fluid)
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 {{ $t('pages.aos.title') }}
          a(
            href='https://michalsnik.github.io/aos/'
            target='_blank'
            rel='noopener'
          ) https://michalsnik.github.io/aos/
          br.
          a(
            href='https://github.com/michalsnik/aos/'
            target='_blank'
            rel='noopener'
          ) https://github.com/michalsnik/aos/
          .mt-4
            p.text-justify {{ $t('pages.aos.text') }}
    b-container.my-5
      b-row
        b-col(md='24')
          h1 FADE
    b-container.my-5(data-aos='fade')
      b-row
        b-col(md='24')
          h2 fade
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='fade-up')
      b-row
        b-col(md='24')
          h2 fade-up
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='fade-down')
      b-row
        b-col(md='24')
          h2 fade-down
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='fade-left')
      b-row
        b-col(md='24')
          h2 fade-left
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='fade-right')
      b-row
        b-col(md='24')
          h2 fade-right
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='fade-up-right')
      b-row
        b-col(md='24')
          h2 fade-up-right
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='fade-up-left')
      b-row
        b-col(md='24')
          h2 fade-up-left
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='fade-down-right')
      b-row
        b-col(md='24')
          h2 fade-down-right
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='fade-down-left')
      b-row
        b-col(md='24')
          h2 fade-down-left
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5
      b-row
        b-col(md='24')
          h1 FLIP
    b-container.my-5(data-aos='flip-up')
      b-row
        b-col(md='24')
          h2 flip-up
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='flip-down')
      b-row
        b-col(md='24')
          h2 flip-down
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='flip-left')
      b-row
        b-col(md='24')
          h2 flip-left
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='flip-right')
      b-row
        b-col(md='24')
          h2 flip-right
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5
      b-row
        b-col(md='24')
          h1 SLIDE
    b-container.my-5(data-aos='slide-up')
      b-row
        b-col(md='24')
          h2 slide-up
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='slide-down')
      b-row
        b-col(md='24')
          h2 slide-down
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='slide-left')
      b-row
        b-col(md='24')
          h2 slide-left
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='slide-right')
      b-row
        b-col(md='24')
          h2 slide-right
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5
      b-row
        b-col(md='24')
          h1 ZOOM
    b-container.my-5(data-aos='zoom-in')
      b-row
        b-col(md='24')
          h2 zoom-in
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='zoom-in-up')
      b-row
        b-col(md='24')
          h2 zoom-in-up
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='zoom-in-down')
      b-row
        b-col(md='24')
          h2 zoom-in-down
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='zoom-in-left')
      b-row
        b-col(md='24')
          h2 zoom-in-left
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='zoom-in-right')
      b-row
        b-col(md='24')
          h2 zoom-in-right
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='zoom-out')
      b-row
        b-col(md='24')
          h2 zoom-out
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='zoom-out-up')
      b-row
        b-col(md='24')
          h2 zoom-out-up
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='zoom-out-down')
      b-row
        b-col(md='24')
          h2 zoom-out-down
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='zoom-out-left')
      b-row
        b-col(md='24')
          h2 zoom-out-left
          .mt-4
            p.text-justify {{ $t('example.text') }}
    b-container.my-5(data-aos='zoom-out-right')
      b-row
        b-col(md='24')
          h2 zoom-out-right
          .mt-4
            p.text-justify {{ $t('example.text') }}
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
