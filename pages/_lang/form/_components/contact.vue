<template lang="pug">
form(ref='form' @submit.stop.prevent='onSubmit')
  b-container
    b-row
      b-col(sm='12')
        b-form-group(
          label-for='lastName-input'
          :class='{ "form-group--error": $v.lastName.$error }'
        )
          b-form-input#lastName-input.form-control(
            name='lastname'
            :placeholder='$t("pages.contact.lastName.placeHolder")'
            type='text'
            v-model='$v.lastName.$model'
            @blur='$v.lastName.$touch()'
            :class='{ "is-invalid": $v.lastName.$error, "is-valid": !$v.lastName.$invalid }'
          )
          .input-error(v-if='$v.lastName.$error && $v.lastName.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.error.required') }}
          .input-error(v-if='!$v.lastName.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.lastName.minLenght_start') }} {{ $v.lastName.$params.minLength.min }} {{ $t('pages.contact.lastName.minLenght_end') }}
      b-col(sm='12')
        b-form-group(label-for='firstName-input')
          b-form-input#firstName-input.form-control(
            name='firstname'
            :placeholder='$t("pages.contact.firstName.placeHolder")'
            type='text'
            v-model='$v.firstName.$model'
            @blur='$v.firstName.$touch()'
            :class='{ "is-invalid": $v.firstName.$error, "is-valid": !$v.firstName.$invalid }'
          )
          .input-error(v-if='$v.firstName.$error && $v.firstName.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.error.required') }}
          .input-error(v-if='!$v.firstName.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.firstName.minLenght_start') }} {{ $v.firstName.$params.minLength.min }} {{ $t('pages.contact.firstName.minLenght_end') }}
    b-row
      b-col(sm='12')
        b-form-group(label-for='email-input')
          b-form-input#email-input.form-control(
            name='email'
            :placeholder='$t("pages.contact.email.placeHolder")'
            type='text'
            v-model='$v.email.$model'
            @blur='$v.email.$touch()'
            :class='{ "is-invalid": $v.email.$error, "is-valid": !$v.email.$invalid }'
          )
          .input-error(v-if='$v.email.$error && $v.email.email')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.error.required') }}
          .input-error(v-if='!$v.email.email')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.email.error') }}
      b-col(sm='12')
        b-form-group(label-for='phone-input')
          b-form-input#phone-input.form-control(
            name='phone'
            :placeholder='$t("pages.contact.phone.placeHolder")'
            type='tel'
            v-model='$v.phone.$model'
            @blur='$v.phone.$touch()'
            :class='{ "is-invalid": $v.phone.$error, "is-valid": !$v.phone.$invalid }'
          )
          .input-error(v-if='$v.phone.$error && $v.phone.phoneRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.error.required') }}
          .input-error(v-if='!$v.phone.phoneRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.phone.error') }}
    b-row
      b-col(sm='24')
        b-form-group(label-for='message-input')
          b-form-textarea#message-input(
            name='message'
            :placeholder='$t("pages.contact.message.placeHolder")'
            v-model='$v.message.$model'
            @blur='$v.message.$touch()'
            :class='{ "is-invalid": $v.message.$error, "is-valid": !$v.message.$invalid }'
          )
          .input-error(v-if='$v.message.$error && $v.message.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.error.required') }}
          .input-error(v-if='!$v.message.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.contact.message.minLenght_start') }} {{ $v.message.$params.minLength.min }} {{ $t('pages.contact.message.minLenght_end') }}
    b-row
      b-col(sm='24')
        b-alert.text-center(
          show
          variant='success'
          v-if='submitStatus === "SUCCESS"'
        )
          font-awesome-icon.mr-2(:icon='["fa", "check-square"]')
          | {{ $t('pages.contact.success') }}
        b-alert.text-center(
          show
          variant='warning'
          v-if='submitStatus === "PENDING"'
        )
          b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
          | {{ $t('pages.contact.pending') }}
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
          | {{ $t('pages.contact.buttonSubmit') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { mixins, Component } from 'nuxt-property-decorator';
import { Validate } from 'vuelidate-property-decorators';
import { validationMixin } from 'vuelidate';
import { required, email, minLength, helpers } from 'vuelidate/lib/validators';

const phoneRegex = helpers.regex(
  'phoneRegex',
  /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
);

@Component
export default class extends mixins(validationMixin) {
  submitStatus: string | null = null;
  error?: string;

  @Validate({ required, email }) email: string = '';
  @Validate({ required, minLength: minLength(3) }) lastName: string = '';
  @Validate({ required, minLength: minLength(3) }) firstName: string = '';
  @Validate({ required, phoneRegex }) phone: string = '';
  @Validate({ required, minLength: minLength(15) }) message: string = '';

  onSubmit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = 'ERROR';
      this.error = this.$tc('pages.contact.error.form');
    } else {
      this.submitStatus = 'PENDING';
      setTimeout(() => {
        this.submitStatus = 'SUCCESS';
      }, 1500);
    }
  }
}
</script>

<style lang="scss" scoped>
#message-input {
  height: 200px !important;
}
</style>
