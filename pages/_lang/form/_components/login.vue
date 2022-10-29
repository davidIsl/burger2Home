<template lang="pug">
form(ref='form' @submit.stop.prevent='onSubmit')
  b-container
    b-row
      b-col(cols='24')
        b-form-group(label-for='email-input')
          b-form-input#email-input.form-control.w-100(
            name='email'
            :placeholder='$t("pages.login.email.placeHolder")'
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
            | {{ $t('pages.login.email.error') }}
        b-form-group(label-for='password-input')
          b-form-input#password-input.form-control.w-100(
            name='password'
            :placeholder='$t("pages.login.password.placeHolder")'
            type='password'
            v-model='$v.password.$model'
            @blur='$v.password.$touch()'
            :class='{ "is-invalid": $v.password.$error, "is-valid": !$v.password.$invalid }'
          )
          .input-error(v-if='$v.password.$error && $v.password.passRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.login.error.required') }}
          .input-error(v-if='!$v.password.passRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.login.password.error') }}
        b-alert.text-center(
          show
          variant='success'
          v-if='submitStatus === "SUCCESS"'
        )
          font-awesome-icon.mr-2(:icon='["fa", "check-square"]')
          | {{ $t('pages.login.success') }}
        b-alert.text-center(
          show
          variant='warning'
          v-if='submitStatus === "PENDING"'
        )
          b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
          | {{ $t('pages.login.pending') }}
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
          | {{ $t('pages.login.buttonSubmit') }}
  b-container
    b-row
      b-col.mt-2.mt-sm-1.text-sm-left.text-right(cols='24' sm='12')
        nuxt-link(:to='`/${$i18n.locale}/register/`') {{ $t('pages.login.buttonRegister') }}
      b-col.mt-2.mt-sm-1.text-sm-right.text-right(cols='24' sm='12')
        nuxt-link(:to='`/${$i18n.locale}/forgot/`') {{ $t('pages.login.buttonForgotPassword') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { mixins, Component } from 'nuxt-property-decorator';
import { Validate } from 'vuelidate-property-decorators';
import { validationMixin } from 'vuelidate';
import { required, helpers, email } from 'vuelidate/lib/validators';

const passRegex = helpers.regex(
  'passRegex',
  /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/
);

@Component
export default class extends mixins(validationMixin) {
  submitStatus: string | null = null;
  error?: string;

  @Validate({ required, email }) email: string = '';
  @Validate({ required, passRegex }) password: string = '';

  onSubmit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = 'ERROR';
      this.error = this.$tc('pages.login.error.form');
    } else {
      this.submitStatus = 'PENDING';
      setTimeout(() => {
        this.submitStatus = 'SUCCESS';
      }, 1500);
      // this.error = this.$tc('pages.login.error.notMatch');
      // this.error = this.$tc('pages.login.error.mailNotExist');
      // this.error = this.$tc('pages.login.error.mailNotActive');
    }
  }
}
</script>

<style lang="scss" scoped></style>
