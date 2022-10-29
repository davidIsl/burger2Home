<template lang="pug">
form(ref='form' @submit.stop.prevent='onSubmit')
  b-container
    b-row
      b-col(cols='24')
        b-form-group(label-for='email-input')
          b-form-input#email-input.form-control(
            name='email'
            :placeholder='$t("pages.newsletter.email.placeHolder")'
            type='text'
            v-model='$v.email.$model'
            @blur='$v.email.$touch()'
            :class='{ "is-invalid": $v.email.$error, "is-valid": !$v.email.$invalid }'
          )
          .input-error(v-if='$v.email.$error && $v.email.email')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.login.error.required') }}
          .input-error(v-if='!$v.email.email')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.newsletter.email.error') }}
        b-alert.text-center(
          show
          variant='success'
          v-if='submitStatus === "SUCCESS"'
        )
          font-awesome-icon.mr-2(:icon='["fa", "check-square"]')
          | {{ $t('pages.newsletter.success') }}
        b-alert.text-center(
          show
          variant='warning'
          v-if='submitStatus === "PENDING"'
        )
          b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
          | {{ $t('pages.newsletter.pending') }}
        b-alert.text-center(
          show
          variant='danger'
          v-if='submitStatus === "ERROR"'
        )
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ error }}
        b-button(
          variant='primary'
          type='submit'
          :disabled='this.submitStatus === "PENDING"'
          block
        ) 
          b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
          | {{ $t('pages.newsletter.buttonSubmit') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Component, mixins } from 'nuxt-property-decorator';
import { Validate } from 'vuelidate-property-decorators';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

@Component
export default class extends mixins(validationMixin) {
  submitStatus: string | null = null;
  error?: string;

  @Validate({ required, email }) email: string = '';

  onSubmit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = 'ERROR';
      this.error = this.$tc('pages.newsletter.error.form');
    } else {
      this.submitStatus = 'PENDING';
      setTimeout(() => {
        this.submitStatus = 'SUCCESS';
      }, 1500);
      // this.error = this.$tc('pages.newsletter.error.mailAlreadyExist');
    }
  }
}
</script>

<style lang="scss" scoped></style>
