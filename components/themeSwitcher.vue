<template lang="pug">
.toggle-core(@click='toggle')
  .toggle-button
    img(src='@/assets/img/theme-switcher/empy20px.png' alt='themeSwitcher')
  .toggle-text
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class extends Vue {
  $colorMode: any;

  toggle() {
    this.$colorMode.preference =
      this.$colorMode.preference === 'light' ||
      this.$colorMode.preference === 'system'
        ? 'dark'
        : 'light';
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

$image-light: '@/assets/img/theme-switcher/theme_light.svg';
$image-dark: '@/assets/img/theme-switcher/theme_dark.svg';

$text-light: 'Light';
$text-dark: 'Dark';

$bg-color-dark: #14171f;
$bg-color-light: #676cdd;

$btn-color-dark: #202533;
$btn-color-light: #fff;

$width: 70px;
$height: 25px;

$margin: 3px;
$btn-radius: $height - $margin * 2;

$fontsize: 15px;
$speed: 300ms;

.toggle-core {
  text-transform: capitalize;
  display: block;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  width: $width;
  height: $height;
  border-radius: 15px;
  border: none;
  font-size: $fontsize;
  margin-top: 5px;
  @include for-phone-only {
    margin-bottom: 15px;
  }
  @include for-tablet-only {
    margin-bottom: 15px;
  }
}

.toggle-button {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $btn-radius;
  height: $btn-radius;
  border-radius: 100%;
  img {
    box-sizing: border-box;
    width: $btn-radius * 0.85;
    height: $btn-radius * 0.85;
  }
}

.toggle-text {
  position: absolute;
  top: 50%;
  transform: translateY(-55%);
  color: #fff;
}

.light-mode {
  .toggle-core {
    background: $bg-color-light;
  }

  .toggle-button {
    transition: transform $speed;
    transform: translate($margin, $margin);
    background: $btn-color-light;
  }

  .toggle-text {
    visibility: hidden;
    right: 10px;

    &::after {
      content: $text-light;
      visibility: visible;
    }
  }

  img {
    background: url($image-light) no-repeat;
  }
}

.dark-mode {
  .toggle-core {
    background: $bg-color-dark;
  }

  .toggle-button {
    transition: transform $speed;
    transform: translate($width - $height + $margin, $margin);
    background: $btn-color-dark;
  }

  .toggle-text {
    visibility: hidden;
    left: 10px;

    &::before {
      content: $text-dark;
      visibility: visible;
    }
  }

  img {
    background: url($image-dark) no-repeat;
  }
}
</style>
