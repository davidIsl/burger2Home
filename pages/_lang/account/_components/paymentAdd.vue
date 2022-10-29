<template lang="pug">
b-container
  b-row
    b-col.py-3.text-center
      h2.mb-5.underline-title {{ $t('pages.account.addPayment.title') }}
      b-row
        b-col
          form(ref='form' @submit.stop.prevent='onSubmit')
            b-row
              b-col(sm='24')
                b-form-group(
                  label-for='cardHolder-input'
                  :class='{ "form-group--error": $v.cardHolder.$error }'
                )
                  b-form-input#cardHolder-input.form-control(
                    name='cardHolder'
                    :placeholder='$t("pages.account.addPayment.cardHolder.placeHolder")'
                    type='text'
                    v-model='$v.cardHolder.$model'
                    @blur='$v.cardHolder.$touch()'
                    :class='{ "is-invalid": $v.cardHolder.$error, "is-valid": !$v.cardHolder.$invalid }'
                  )
                  .input-error(
                    v-if='$v.cardHolder.$error && $v.cardHolder.minLength'
                  )
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.addPayment.error.required') }}
                  .input-error(v-if='!$v.cardHolder.minLength')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.addPayment.cardHolder.minLenght_start') }} {{ $v.cardHolder.$params.minLength.min }} {{ $t('pages.account.addPayment.cardHolder.minLenght_end') }}
            b-row
              b-col(sm='24')
                b-form-group(
                  label-for='stripe-input'
                  :class='{ "form-group--error": $v.cardHolder.$error }'
                )
                  b-form-input#stripe-input.form-control(
                    name='stripe'
                    placeholder='Input Stripe CB'
                    type='text'
                  )
            b-row.text-left
              b-col.mb-4.pl-5(cols='24')
                input#checkkoxPaymentDefault.custom-control-input(
                  name='checkkoxPaymentDefault'
                  type='checkbox'
                  value='true'
                  unchecked-value='false'
                )
                label.custom-control-label.default-font-size(
                  for='checkkoxPaymentDefault'
                ) 
                  span.ml-1 {{ $t('pages.account.addPayment.checkBox1') }}
              b-col.text-center(cols='24')
                b-alert.text-center(
                  show
                  variant='success'
                  v-if='submitStatus === "SUCCESS"'
                )
                  font-awesome-icon.mr-2.mr-2(:icon='["fa", "check-square"]')
                  | {{ $t('pages.account.addPayment.success') }}
                b-alert.text-center(
                  show
                  variant='warning'
                  v-if='submitStatus === "PENDING"'
                )
                  b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
                  | {{ $t('pages.account.addPayment.pending') }}
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
              b-col.text-center(cols='12')
                b-button(
                  variant='secondary'
                  @click='changeChild("show-payment")'
                  block
                ) {{ $t('pages.account.addPayment.buttonCancel') }}
              b-col.text-center(cols='12')
                b-button(
                  variant='primary'
                  type='submit'
                  :disabled='this.submitStatus === "PENDING"'
                  block
                ) 
                  b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
                  | {{ $t('pages.account.addPayment.buttonSubmit') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Component, mixins } from 'nuxt-property-decorator';
import { Validate } from 'vuelidate-property-decorators';
import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';

@Component({
  components: {},
})
export default class extends mixins(validationMixin) {
  changeChild(pageName: string) {
    this.$emit('childChange', pageName);
  }

  submitStatus: string | null = null;
  error?: string;

  @Validate({ required, minLength: minLength(4) }) cardHolder: string = '';

  onSubmit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = 'ERROR';
      this.error = this.$tc('pages.account.addPayment.error.form');
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
