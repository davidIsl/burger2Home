<template lang="pug">
b-container
  b-row
    b-col.py-3.text-center
      h2.mb-5.underline-title {{ $t('pages.account.passwordUpdate.title') }}
      b-row
        b-col
          form(ref='form' @submit.stop.prevent='onSubmit')
            b-row
              b-col(sm='24')
                b-form-group(label-for='password-input')
                  b-form-input#password-input.form-control(
                    name='password'
                    :placeholder='$t("pages.account.passwordUpdate.password.placeHolder")'
                    type='password'
                    v-model='$v.password.$model'
                    @blur='$v.password.$touch()'
                    :class='{ "is-invalid": $v.password.$error, "is-valid": !$v.password.$invalid }'
                  )
                  .input-error(
                    v-if='$v.password.$error && $v.password.passRegex'
                  )
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.passwordUpdate.error.required') }}
                  .input-error(v-if='!$v.password.passRegex')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.passwordUpdate.password.error') }}
              b-col(sm='24')
                b-form-group(label-for='passwordCheck-input')
                  b-form-input#passwordCheck-input.form-control(
                    name='passwordCheck'
                    :placeholder='$t("pages.account.passwordUpdate.password2.placeHolder")'
                    type='password'
                    v-model='$v.passwordCheck.$model'
                    @blur='$v.passwordCheck.$touch()'
                    :class='{ "is-invalid": $v.passwordCheck.$error, "is-valid": !$v.passwordCheck.$invalid }'
                  )
                  .input-error(
                    v-if='$v.passwordCheck.$error && $v.passwordCheck.sameAsPassword'
                  )
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.passwordUpdate.error.required') }}
                  .input-error(v-if='!$v.passwordCheck.sameAsPassword')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.passwordUpdate.password2.error') }}
              b-col.text-center(cols='24')
                b-alert.text-center(
                  show
                  variant='success'
                  v-if='submitStatus === "SUCCESS"'
                )
                  font-awesome-icon.mr-2.mr-2(:icon='["fa", "check-square"]')
                  | {{ $t('pages.account.passwordUpdate.success') }}
                b-alert.text-center(
                  show
                  variant='warning'
                  v-if='submitStatus === "PENDING"'
                )
                  b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
                  | {{ $t('pages.account.passwordUpdate.pending') }}
                b-alert.text-center(
                  show
                  variant='danger'
                  v-if='submitStatus === "ERROR"'
                )
                  font-awesome-icon.mr-2.mr-2(
                    :icon='["fa", "exclamation-triangle"]'
                  )
                  | {{ error }}
            b-row.text-left
              b-col.text-center(cols='24')
                b-button(
                  variant='primary'
                  type='submit'
                  :disabled='this.submitStatus === "PENDING"'
                  block
                ) 
                  b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
                  | {{ $t('pages.account.passwordUpdate.buttonEdit') }}
      b-row
        b-col.pt-3
          p {{ $t('pages.account.passwordUpdate.text[0]') }}
          .ml-2
            p {{ $t('pages.account.passwordUpdate.text[1]') }}
            p {{ $t('pages.account.passwordUpdate.text[2]') }}
            p {{ $t('pages.account.passwordUpdate.text[3]') }}
            p {{ $t('pages.account.passwordUpdate.text[4]') }}
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

@Component({
  components: {},
})
export default class extends mixins(validationMixin) {
  changeChild(pageName: string) {
    this.$emit('childChange', pageName);
  }

  submitStatus: string | null = null;
  error?: string;

  @Validate({ required, passRegex }) password: string = '';
  @Validate({ required, sameAsPassword: sameAs('password') })
  passwordCheck: string = '';

  onSubmit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = 'ERROR';
      this.error = this.$tc('pages.account.passwordUpdate.error.form');
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
