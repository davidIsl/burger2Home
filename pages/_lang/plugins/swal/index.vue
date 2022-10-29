<template lang="pug">
div
  b-container.py-5(fluid)
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 SweetAlert
          a(
            href='https://github.com/avil13/vue-sweetalert2'
            target='_blank'
            rel='noopener'
          ) https://github.com/avil13/vue-sweetalert2
          .mt-4
            p.text-justify A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes with Zero dependencies.
    b-container.my-5
      b-row
        b-col(md='24')
          h1 Swal Examples
    b-container.my-5
      b-row
        b-col(md='24')
          h2 Simple
          .mt-4
            b-button(variant='primary' size='sm' @click='alertSimple') Show popup !
    b-container.my-5
      b-row
        b-col(md='24')
          h2 Custom
          .mt-4
            b-button(variant='primary' size='sm' @click='alertCustom') Show popup !
    b-container.my-5
      b-row
        b-col(md='24')
          h2 Footer html + style danger
          .mt-4
            b-button(variant='primary' size='sm' @click='alertFooterHtml') Show popup !
    b-container.my-5
      b-row
        b-col(md='24')
          h2 Confirm + i18n
          .mt-4
            b-button(variant='primary' size='sm' @click='alertConfirmDelete') Show popup !
    b-container.my-5
      b-row
        b-col(md='24')
          h2 Custom position + timer
          .mt-4
            b-button(variant='primary' size='sm' @click='alertCustomPosition') Show popup !
    b-container.my-5
      b-row
        b-col(md='24')
          h2 Custom with image
          .mt-4
            b-button(variant='primary' size='sm' @click='alertCustomImage') Show popup !
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {
  alertSimple() {
    this.$swal('You clicked the button!');
  }

  alertCustom() {
    this.$swal('The Internet?', 'That thing is still around?', 'question');
  }

  alertFooterHtml() {
    this.$swal({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer:
        '<a href="https://www.google.com/" target="_blank">Why do I have this issue?</a>',
    });
  }

  alertConfirmDelete() {
    this.$swal({
      title: this.$tc('swal.confirmDelete.title'),
      text: this.$tc('swal.confirmDelete.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7479f3',
      cancelButtonColor: '#6c757d',
      confirmButtonText: this.$tc('swal.confirmDelete.confirButton'),
      cancelButtonText: this.$tc('swal.confirmDelete.cancelButton'),
    }).then((result) => {
      if (result.isConfirmed) {
        this.$swal(
          this.$tc('swal.confirmDelete.nextTitle'),
          this.$tc('swal.confirmDelete.nextText'),
          'success'
        );
      }
    });
  }

  alertCustomPosition() {
    this.$swal({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  alertCustomImage() {
    this.$swal({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });
  }
}
</script>

<style lang="scss" scoped></style>
