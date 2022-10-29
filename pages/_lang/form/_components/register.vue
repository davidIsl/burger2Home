<template lang="pug">
form(ref='form' @submit.stop.prevent='onSubmit')
  b-container
    b-row
      b-col(cols='12')
        b-form-group(label-for='sexe-input')
          b-form-select#sexe-input.form-control(
            name='sexe'
            :options='sexeList'
            v-model='$v.sexe.$model'
            @blur='$v.sexe.$touch()'
            :class='{ "is-invalid": $v.sexe.$error, "is-valid": !$v.sexe.$invalid }'
          )
          .input-error(v-if='$v.sexe.$error')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
      b-col(cols='12')
        b-form-group(label-for='status-input')
          b-form-select#status-input.form-control(
            name='status'
            :options='statusList'
            v-model='$v.status.$model'
            @blur='$v.status.$touch()'
            :class='{ "is-invalid": $v.status.$error, "is-valid": !$v.status.$invalid }'
          )
          .input-error(v-if='$v.status.$error')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
    b-row(v-if='status === "professional"' data-aos='fade-right')
      b-col(sm='12')
        b-form-group(label-for='company-input')
          b-form-input#company-input.form-control(
            name='company'
            :placeholder='$t("pages.register.company.placeHolder")'
            type='text'
            v-model='company'
          )
      b-col(sm='12')
        b-form-group(label-for='tva-input')
          b-form-input#tva-input.form-control(
            name='tva'
            :placeholder='$t("pages.register.vat.placeHolder")'
            type='text'
            v-model='tva'
          )
    b-row
      b-col(sm='12')
        b-form-group(
          label-for='lastName-input'
          :class='{ "form-group--error": $v.lastName.$error }'
        )
          b-form-input#lastName-input.form-control(
            name='lastname'
            :placeholder='$t("pages.register.lastName.placeHolder")'
            type='text'
            v-model='$v.lastName.$model'
            @blur='$v.lastName.$touch()'
            :class='{ "is-invalid": $v.lastName.$error, "is-valid": !$v.lastName.$invalid }'
          )
          .input-error(v-if='$v.lastName.$error && $v.lastName.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.lastName.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.lastName.minLenght_start') }} {{ $v.lastName.$params.minLength.min }} {{ $t('pages.register.lastName.minLenght_end') }}
      b-col(sm='12')
        b-form-group(label-for='firstName-input')
          b-form-input#firstName-input.form-control(
            name='firstname'
            :placeholder='$t("pages.register.firstName.placeHolder")'
            type='text'
            v-model='$v.firstName.$model'
            @blur='$v.firstName.$touch()'
            :class='{ "is-invalid": $v.firstName.$error, "is-valid": !$v.firstName.$invalid }'
          )
          .input-error(v-if='$v.firstName.$error && $v.firstName.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.firstName.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.firstName.minLenght_start') }} {{ $v.firstName.$params.minLength.min }} {{ $t('pages.register.firstName.minLenght_end') }}
    b-row
      b-col(sm='12')
        b-form-group(label-for='email-input')
          b-form-input#email-input.form-control(
            name='email'
            :placeholder='$t("pages.register.email.placeHolder")'
            type='text'
            v-model='$v.email.$model'
            @blur='$v.email.$touch()'
            :class='{ "is-invalid": $v.email.$error, "is-valid": !$v.email.$invalid }'
          )
          .input-error(v-if='$v.email.$error && $v.email.email')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.email.email')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.email.error') }}
      b-col(sm='12')
        b-form-group(label-for='phone-input')
          b-form-input#phone-input.form-control(
            name='phone'
            :placeholder='$t("pages.register.phone.placeHolder")'
            type='tel'
            v-model='$v.phone.$model'
            @blur='$v.phone.$touch()'
            :class='{ "is-invalid": $v.phone.$error, "is-valid": !$v.phone.$invalid }'
          )
          .input-error(v-if='$v.phone.$error && $v.phone.phoneRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.phone.phoneRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.phone.error') }}
    b-row
      b-col(sm='24' md='24' lg='14')
        b-form-group(label-for='address-input')
          b-form-input#address-input.form-control(
            name='address'
            :placeholder='$t("pages.register.address.placeHolder")'
            type='text'
            v-model='$v.address.$model'
            @blur='$v.address.$touch()'
            :class='{ "is-invalid": $v.address.$error, "is-valid": !$v.address.$invalid }'
          )
          .input-error(v-if='$v.address.$error && $v.address.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.address.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.address.minLenght_start') }} {{ $v.address.$params.minLength.min }} {{ $t('pages.register.address.minLenght_end') }}
      b-col(sm='8' md='8' lg='5')
        b-form-group(label-for='streetNum-input')
          b-form-input#streetNum-input.form-control(
            name='streetnum'
            :placeholder='$t("pages.register.streetNum.placeHolder")'
            type='text'
            v-model='$v.number.$model'
            @blur='$v.number.$touch()'
            :class='{ "is-invalid": $v.number.$error, "is-valid": !$v.number.$invalid }'
          )
          .input-error(v-if='$v.number.$error && $v.number.numeric')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.number.numeric')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.streetNum.error') }}
      b-col(sm='8' md='8' lg='5')
        b-form-group(label-for='box-input')
          b-form-input#box-input.form-control(
            name='box'
            :placeholder='$t("pages.register.box.placeHolder")'
            type='text'
            v-model='box'
          )
      b-col(sm='8' md='8' lg='8')
        b-form-group(label-for='zipCode-input')
          b-form-input#zipCode-input.form-control(
            name='zipCode'
            :placeholder='$t("pages.register.zipCode.placeHolder")'
            type='text'
            v-model='$v.zipCode.$model'
            @blur='$v.zipCode.$touch()'
            :class='{ "is-invalid": $v.zipCode.$error, "is-valid": !$v.zipCode.$invalid }'
          )
          .input-error(
            v-if='$v.zipCode.$error && $v.zipCode.alphaNum && $v.zipCode.minLength'
          )
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.zipCode.alphaNum')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.zipCode.error') }}
          .input-error(v-if='!$v.zipCode.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.zipCode.minLenght_start') }} {{ $v.zipCode.$params.minLength.min }} {{ $t('pages.register.zipCode.minLenght_end') }}
      b-col(sm='12' md='12' lg='8')
        b-form-group(label-for='city-input')
          b-form-input#city-input.form-control(
            name='city'
            :placeholder='$t("pages.register.city.placeHolder")'
            type='text'
            v-model='$v.city.$model'
            @blur='$v.city.$touch()'
            :class='{ "is-invalid": $v.city.$error, "is-valid": !$v.city.$invalid }'
          )
          .input-error(v-if='$v.city.$error && $v.city.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.city.minLength')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.city.minLenght_start') }} {{ $v.city.$params.minLength.min }} {{ $t('pages.register.city.minLenght_end') }}
      b-col(sm='12' md='12' lg='8')
        b-form-group(label-for='country-input')
          b-form-select#country-input.form-control(
            name='country'
            :options='countryList'
            v-model='$v.country.$model'
            @blur='$v.country.$touch()'
            :class='{ "is-invalid": $v.country.$error, "is-valid": !$v.country.$invalid }'
          )
          .input-error(v-if='$v.country.$error')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
    b-row
      b-col(sm='12')
        b-form-group(label-for='password-input')
          b-form-input#password-input.form-control(
            name='password'
            :placeholder='$t("pages.register.password.placeHolder")'
            type='password'
            v-model='$v.password.$model'
            @blur='$v.password.$touch()'
            :class='{ "is-invalid": $v.password.$error, "is-valid": !$v.password.$invalid }'
          )
          .input-error(v-if='$v.password.$error && $v.password.passRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.password.passRegex')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.password.error') }}
      b-col(sm='12')
        b-form-group(label-for='passwordCheck-input')
          b-form-input#passwordCheck-input.form-control(
            name='passwordCheck'
            :placeholder='$t("pages.register.password2.placeHolder")'
            type='password'
            v-model='$v.passwordCheck.$model'
            @blur='$v.passwordCheck.$touch()'
            :class='{ "is-invalid": $v.passwordCheck.$error, "is-valid": !$v.passwordCheck.$invalid }'
          )
          .input-error(
            v-if='$v.passwordCheck.$error && $v.passwordCheck.sameAsPassword'
          )
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.error.required') }}
          .input-error(v-if='!$v.passwordCheck.sameAsPassword')
            font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
            | {{ $t('pages.register.password2.error') }}
    b-row.text-left
      b-col.mb-2.pl-5(cols='24')
        input#checkkoxRGPD.custom-control-input(
          name='checkkoxRGPD'
          type='checkbox'
          v-model='$v.checkboxRGPD.$model'
          value='true'
          unchecked-value='false'
          :class='{ "is-invalid": $v.checkboxRGPD.$error, "is-valid": !$v.checkboxRGPD.$invalid }'
        )
        label.custom-control-label.default-font-size(for='checkkoxRGPD') 
        span.ml-1 {{ $t('pages.register.checkBox1') }}
          nuxt-link(:to='`/${$i18n.locale}/privacy/`') {{ $t('pages.register.checkBox1_link') }}
      b-col.mb-2.pl-5(cols='24')
        input#checkkoxCGU.custom-control-input(
          name='checkkoxCGU'
          type='checkbox'
          v-model='$v.checkboxCGU.$model'
          value='true'
          unchecked-value='false'
          :class='{ "is-invalid": $v.checkboxCGU.$error, "is-valid": !$v.checkboxCGU.$invalid }'
        )
        label.custom-control-label.default-font-size(for='checkkoxCGU') 
        span.ml-1 {{ $t('pages.register.checkBox2') }}
          nuxt-link(:to='`/${$i18n.locale}/privacy/`') {{ $t('pages.register.checkBox2_link') }}
      b-col.mb-2.pl-5(cols='24')
        input#checkkoxCGV.custom-control-input(
          name='checkkoxCGV'
          type='checkbox'
          v-model='$v.checkboxCGV.$model'
          value='true'
          unchecked-value='false'
          :class='{ "is-invalid": $v.checkboxCGV.$error, "is-valid": !$v.checkboxCGV.$invalid }'
        )
        label.custom-control-label.default-font-size(for='checkkoxCGV') 
        span.ml-1 {{ $t('pages.register.checkBox3') }}
          nuxt-link(:to='`/${$i18n.locale}/privacy/`') {{ $t('pages.register.checkBox3_link') }}
      b-col.mb-4.pl-5(cols='24')
        input#checkkoxNewsletter.custom-control-input(
          name='checkkoxNewsletter'
          type='checkbox'
          value='true'
          unchecked-value='false'
        )
        label.custom-control-label.default-font-size(for='checkkoxNewsletter') 
        span.ml-1 {{ $t('pages.register.checkBox4') }}
      b-col.text-center(cols='24')
        b-alert.text-center(
          show
          variant='success'
          v-if='submitStatus === "SUCCESS"'
        )
          font-awesome-icon.mr-2.mr-2(:icon='["fa", "check-square"]')
          | {{ $t('pages.register.success') }}
        b-alert.text-center(
          show
          variant='warning'
          v-if='submitStatus === "PENDING"'
        )
          b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
          | {{ $t('pages.register.pending') }}
        b-alert.text-center(
          show
          variant='danger'
          v-if='submitStatus === "ERROR"'
        )
          font-awesome-icon.mr-2.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ error }}
        b-button(
          variant='primary'
          type='submit'
          :disabled='this.submitStatus === "PENDING"'
          block
        ) 
          b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
          | {{ $t('pages.register.buttonSubmit') }}
  b-container
    b-row
      b-col.mt-2.mt-sm-1.text-right
        nuxt-link(:to='`/${$i18n.locale}/login/`') {{ $t('pages.register.buttonCancel') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Component, mixins } from 'nuxt-property-decorator';
import { Validate } from 'vuelidate-property-decorators';
import { validationMixin } from 'vuelidate';
import {
  alphaNum,
  email,
  helpers,
  minLength,
  numeric,
  required,
  sameAs,
} from 'vuelidate/lib/validators';

const passRegex = helpers.regex(
  'passRegex',
  /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/
);
const phoneRegex = helpers.regex(
  'phoneRegex',
  /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
);

export interface Sexe {
  value: string | null;
  text: string;
  disabled: boolean;
}

export interface Status {
  value: string | null;
  text: string;
  disabled: boolean;
}

export interface Country {
  value: string | null;
  text: string;
  disabled: boolean;
}

@Component
export default class extends mixins(validationMixin) {
  submitStatus: string | null = null;
  error?: string;

  sexeList: Sexe[] = [
    {
      value: null,
      text: this.$tc('pages.register.gender.placeHolder'),
      disabled: true,
    },
    {
      value: 'man',
      text: this.$tc('pages.register.gender.option1'),
      disabled: false,
    },
    {
      value: 'woman',
      text: this.$tc('pages.register.gender.option2'),
      disabled: false,
    },
  ];

  statusList: Status[] = [
    {
      value: null,
      text: this.$tc('pages.register.status.placeHolder'),
      disabled: true,
    },
    {
      value: 'individual',
      text: this.$tc('pages.register.status.option1'),
      disabled: false,
    },
    {
      value: 'professional',
      text: this.$tc('pages.register.status.option2'),
      disabled: false,
    },
  ];

  countryList: Country[] = [
    {
      value: null,
      text: this.$tc('pages.register.country.placeHolder'),
      disabled: true,
    },
    {
      value: 'BE',
      text: this.$tc('country.belgium'),
      disabled: false,
    },
    {
      value: 'FR',
      text: this.$tc('country.france'),
      disabled: false,
    },
    {
      value: 'NL',
      text: this.$tc('country.netherlands'),
      disabled: false,
    },
    {
      value: 'DE',
      text: this.$tc('country.germany'),
      disabled: false,
    },
    {
      value: 'ES',
      text: this.$tc('country.spain'),
      disabled: false,
    },
    {
      value: 'IT',
      text: this.$tc('country.italy'),
      disabled: false,
    },
  ];

  @Validate({ required, email }) email: string = '';
  @Validate({ required }) sexe: string | null = null;
  @Validate({ required }) status: string | null = null;
  company?: string;
  tva?: string;
  @Validate({ required, minLength: minLength(3) }) lastName: string = '';
  @Validate({ required, minLength: minLength(3) }) firstName: string = '';
  @Validate({ required, phoneRegex }) phone: string = '';
  @Validate({ required, minLength: minLength(5) }) address: string = '';
  @Validate({ required, numeric }) number: string = '';
  box: string = '';
  @Validate({ required, alphaNum, minLength: minLength(4) })
  zipCode: string = '';

  @Validate({ required, minLength: minLength(3) }) city: string = '';
  @Validate({ required }) country: string | null = null;
  @Validate({ required, passRegex }) password: string = '';
  @Validate({ required, sameAsPassword: sameAs('password') })
  passwordCheck: string = '';

  @Validate({ required, sameAsRGPD: sameAs(() => true) })
  checkboxRGPD: boolean = false;

  @Validate({ required, sameAsCGU: sameAs(() => true) })
  checkboxCGU: boolean = false;

  @Validate({ required, sameAsCGV: sameAs(() => true) })
  checkboxCGV: boolean = false;

  onSubmit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = 'ERROR';
      this.error = this.$tc('pages.register.error.form');
    } else {
      this.submitStatus = 'PENDING';
      setTimeout(() => {
        this.submitStatus = 'SUCCESS';
      }, 1500);
      // this.error = this.$tc('pages.register.error.mailAlreadyExist');
      // this.error = this.$tc('pages.register.error.mailNotActive');
    }
  }
}
</script>

<style lang="scss" scoped></style>
