<template lang="pug">
form(ref='form' @submit.stop.prevent='onSubmit')
  b-container
    b-row
      b-col(sm='12')
        b-form-group(label-for='password-input')
          b-form-input#password-input.form-control(
            name='password'
            :placeholder='$t("pages.forgotPasswordSecure.password.placeHolder")'
            type='password'
            v-model='$v.password.$model'
            @blur='$v.password.$touch()'
            :class='{ "is-invalid": $v.password.$error, "is-valid": !$v.password.$invalid }'
          )
          .input-error(v-if='$v.password.$error && $v.password.passRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.forgotPasswordSecure.error.required') }}
          .input-error(v-if='!$v.password.passRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.forgotPasswordSecure.password.error') }}
      b-col(sm='12')
        b-form-group(label-for='passwordCheck-input')
          b-form-input#passwordCheck-input.form-control(
            name='passwordCheck'
            :placeholder='$t("pages.forgotPasswordSecure.password2.placeHolder")'
            type='password'
            v-model='$v.passwordCheck.$model'
            @blur='$v.passwordCheck.$touch()'
            :class='{ "is-invalid": $v.passwordCheck.$error, "is-valid": !$v.passwordCheck.$invalid }'
          )
          .input-error(
            v-if='$v.passwordCheck.$error && $v.passwordCheck.sameAsPassword'
          )
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.forgotPasswordSecure.error.required') }}
          .input-error(v-if='!$v.passwordCheck.sameAsPassword')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.forgotPasswordSecure.password2.error') }}
      b-col(sm='24')
        b-alert.text-center(
          show
          variant='success'
          v-if='submitStatus === "SUCCESS"'
        )
          font-awesome-icon.mr-2(:icon='["fa", "check-square"]')
          | {{ $t('pages.forgotPasswordSecure.success') }}
        b-alert.text-center(
          show
          variant='warning'
          v-if='submitStatus === "PENDING"'
        )
          b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
          | {{ $t('pages.forgotPasswordSecure.pending') }}
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
          | {{ $t('pages.forgotPasswordSecure.buttonSubmit') }}
  b-container
    b-row
      b-col.mt-2.mt-sm-1.text-right
        nuxt-link(:to='`/${$i18n.locale}/login/`') {{ $t('pages.forgotPasswordSecure.buttonCancel') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Component, mixins } from 'nuxt-property-decorator';
import { Validate } from 'vuelidate-property-decorators';
import { validationMixin } from 'vuelidate';
import { required, helpers, sameAs } from 'vuelidate/lib/validators';

const passRegex = helpers.regex(
  'passRegex',
  /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/
);

@Component
export default class extends mixins(validationMixin) {
  submitStatus: string | null = null;
  error?: string;

  @Validate({ required, passRegex }) password: string = '';
  @Validate({ required, sameAsPassword: sameAs('password') })
  passwordCheck: string = '';

  onSubmit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = 'ERROR';
      this.error = this.$tc('pages.forgotPasswordSecure.error.form');
    } else {
      this.submitStatus = 'PENDING';
      setTimeout(() => {
        this.submitStatus = 'SUCCESS';
      }, 1500);
    }
  }
}
</script>

<style lang="scss" scoped></style>
