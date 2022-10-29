<template lang="pug">
b-container
  b-row
    b-col.py-3.text-center
      h2.mb-5.underline-title {{ $t('pages.account.editProfil.title') }}
      b-row
        b-col
          form(ref='form' @submit.stop.prevent='onSubmit')
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
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
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
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
            b-row(v-if='status === "professional"' data-aos='fade-right')
              b-col(sm='12')
                b-form-group(label-for='company-input')
                  b-form-input#company-input.form-control(
                    name='company'
                    :placeholder='$t("pages.account.editProfil.company.placeHolder")'
                    type='text'
                    v-model='company'
                  )
              b-col(sm='12')
                b-form-group(label-for='tva-input')
                  b-form-input#tva-input.form-control(
                    name='tva'
                    :placeholder='$t("pages.account.editProfil.vat.placeHolder")'
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
                    :placeholder='$t("pages.account.editProfil.lastName.placeHolder")'
                    type='text'
                    v-model='$v.lastName.$model'
                    @blur='$v.lastName.$touch()'
                    :class='{ "is-invalid": $v.lastName.$error, "is-valid": !$v.lastName.$invalid }'
                  )
                  .input-error(
                    v-if='$v.lastName.$error && $v.lastName.minLength'
                  )
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
                  .input-error(v-if='!$v.lastName.minLength')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.lastName.minLenght_start') }} {{ $v.lastName.$params.minLength.min }} {{ $t('pages.account.editProfil.lastName.minLenght_end') }}
              b-col(sm='12')
                b-form-group(label-for='firstName-input')
                  b-form-input#firstName-input.form-control(
                    name='firstname'
                    :placeholder='$t("pages.account.editProfil.firstName.placeHolder")'
                    type='text'
                    v-model='$v.firstName.$model'
                    @blur='$v.firstName.$touch()'
                    :class='{ "is-invalid": $v.firstName.$error, "is-valid": !$v.firstName.$invalid }'
                  )
                  .input-error(
                    v-if='$v.firstName.$error && $v.firstName.minLength'
                  )
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
                  .input-error(v-if='!$v.firstName.minLength')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.firstName.minLenght_start') }} {{ $v.firstName.$params.minLength.min }} {{ $t('pages.account.editProfil.firstName.minLenght_end') }}
            b-row
              b-col(sm='12')
                b-form-group(label-for='email-input')
                  b-form-input#email-input.form-control(
                    name='email'
                    :placeholder='$t("pages.account.editProfil.email.placeHolder")'
                    type='text'
                    disabled
                  )
              b-col(sm='12')
                b-form-group(label-for='phone-input')
                  b-form-input#phone-input.form-control(
                    name='phone'
                    :placeholder='$t("pages.account.editProfil.phone.placeHolder")'
                    type='tel'
                    v-model='$v.phone.$model'
                    @blur='$v.phone.$touch()'
                    :class='{ "is-invalid": $v.phone.$error, "is-valid": !$v.phone.$invalid }'
                  )
                  .input-error(v-if='$v.phone.$error && $v.phone.phoneRegex')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
                  .input-error(v-if='!$v.phone.phoneRegex')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.phone.error') }}
            b-row
              b-col(sm='24' md='24' lg='14')
                b-form-group(label-for='address-input')
                  b-form-input#address-input.form-control(
                    name='address'
                    :placeholder='$t("pages.account.editProfil.address.placeHolder")'
                    type='text'
                    v-model='$v.address.$model'
                    @blur='$v.address.$touch()'
                    :class='{ "is-invalid": $v.address.$error, "is-valid": !$v.address.$invalid }'
                  )
                  .input-error(
                    v-if='$v.address.$error && $v.address.minLength'
                  )
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
                  .input-error(v-if='!$v.address.minLength')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.address.minLenght_start') }} {{ $v.address.$params.minLength.min }} {{ $t('pages.account.editProfil.address.minLenght_end') }}
              b-col(sm='8' md='8' lg='5')
                b-form-group(label-for='streetNum-input')
                  b-form-input#streetNum-input.form-control(
                    name='streetnum'
                    :placeholder='$t("pages.account.editProfil.streetNum.placeHolder")'
                    type='text'
                    v-model='$v.number.$model'
                    @blur='$v.number.$touch()'
                    :class='{ "is-invalid": $v.number.$error, "is-valid": !$v.number.$invalid }'
                  )
                  .input-error(v-if='$v.number.$error && $v.number.numeric')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
                  .input-error(v-if='!$v.number.numeric')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.streetNum.error') }}
              b-col(sm='8' md='8' lg='5')
                b-form-group(label-for='box-input')
                  b-form-input#box-input.form-control(
                    name='box'
                    :placeholder='$t("pages.account.editProfil.box.placeHolder")'
                    type='text'
                    v-model='box'
                  )
              b-col(sm='8' md='8' lg='8')
                b-form-group(label-for='zipCode-input')
                  b-form-input#zipCode-input.form-control(
                    name='zipCode'
                    :placeholder='$t("pages.account.editProfil.zipCode.placeHolder")'
                    type='text'
                    v-model='$v.zipCode.$model'
                    @blur='$v.zipCode.$touch()'
                    :class='{ "is-invalid": $v.zipCode.$error, "is-valid": !$v.zipCode.$invalid }'
                  )
                  .input-error(
                    v-if='$v.zipCode.$error && $v.zipCode.alphaNum && $v.zipCode.minLength'
                  )
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
                  .input-error(v-if='!$v.zipCode.alphaNum')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.zipCode.error') }}
                  .input-error(v-if='!$v.zipCode.minLength')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.zipCode.minLenght_start') }} {{ $v.zipCode.$params.minLength.min }} {{ $t('pages.account.editProfil.zipCode.minLenght_end') }}
              b-col(sm='12' md='12' lg='8')
                b-form-group(label-for='city-input')
                  b-form-input#city-input.form-control(
                    name='city'
                    :placeholder='$t("pages.account.editProfil.city.placeHolder")'
                    type='text'
                    v-model='$v.city.$model'
                    @blur='$v.city.$touch()'
                    :class='{ "is-invalid": $v.city.$error, "is-valid": !$v.city.$invalid }'
                  )
                  .input-error(v-if='$v.city.$error && $v.city.minLength')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
                  .input-error(v-if='!$v.city.minLength')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.city.minLenght_start') }} {{ $v.city.$params.minLength.min }} {{ $t('pages.account.editProfil.city.minLenght_end') }}
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
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.account.editProfil.error.required') }}
            b-row.text-left
              b-col.mb-4.pl-5(cols='24')
                input#checkkoxNewsletter.custom-control-input(
                  name='checkkoxNewsletter'
                  type='checkbox'
                  value='true'
                  unchecked-value='false'
                )
                label.custom-control-label.default-font-size(
                  for='checkkoxNewsletter'
                ) 
                  span.ml-1 {{ $t('pages.account.editProfil.checkBox1') }}
              b-col.text-center(cols='24')
                b-alert.text-center(
                  show
                  variant='success'
                  v-if='submitStatus === "SUCCESS"'
                )
                  font-awesome-icon.mr-2.mr-2(:icon='["fa", "check-square"]')
                  | {{ $t('pages.account.editProfil.success') }}
                b-alert.text-center(
                  show
                  variant='warning'
                  v-if='submitStatus === "PENDING"'
                )
                  b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
                  | {{ $t('pages.account.editProfil.pending') }}
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
                  @click='changeChild("show-profil")'
                  block
                ) {{ $t('pages.account.editProfil.buttonCancel') }}
              b-col.text-center(cols='12')
                b-button(
                  variant='primary'
                  type='submit'
                  :disabled='this.submitStatus === "PENDING"'
                  block
                ) 
                  b-spinner.mr-2(v-if='this.submitStatus === "PENDING"' small)
                  | {{ $t('pages.account.editProfil.buttonSubmit') }}
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Component, mixins } from 'nuxt-property-decorator';
import { Validate } from 'vuelidate-property-decorators';
import { validationMixin } from 'vuelidate';
import {
  alphaNum,
  helpers,
  minLength,
  numeric,
  required,
} from 'vuelidate/lib/validators';

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

@Component({
  components: {},
})
export default class extends mixins(validationMixin) {
  changeChild(pageName: string) {
    this.$emit('childChange', pageName);
  }

  submitStatus: string | null = null;
  error?: string;

  sexeList: Sexe[] = [
    {
      value: null,
      text: this.$tc('pages.account.editProfil.gender.placeHolder'),
      disabled: true,
    },
    {
      value: 'man',
      text: this.$tc('pages.account.editProfil.gender.option1'),
      disabled: false,
    },
    {
      value: 'woman',
      text: this.$tc('pages.account.editProfil.gender.option2'),
      disabled: false,
    },
  ];

  statusList: Status[] = [
    {
      value: null,
      text: this.$tc('pages.account.editProfil.status.placeHolder'),
      disabled: true,
    },
    {
      value: 'individual',
      text: this.$tc('pages.account.editProfil.status.option1'),
      disabled: false,
    },
    {
      value: 'professional',
      text: this.$tc('pages.account.editProfil.status.option2'),
      disabled: false,
    },
  ];

  countryList: Country[] = [
    {
      value: null,
      text: this.$tc('pages.account.editProfil.country.placeHolder'),
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

  onSubmit() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitStatus = 'ERROR';
      this.error = this.$tc('pages.account.editProfil.error.form');
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
