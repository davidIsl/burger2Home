<template lang="pug">
b-container.bg-gray(fluid)
  b-row
    b-col.py-3
      h2.text-secondary.title {{ $t('pages.profile.title1') }}
  b-row
    b-col.mx-auto(lg='20')
      h3.line.pb-2.text-secondary.text-center.text-sm-left {{ $t('pages.profile.title2') }}
  b-row
    b-col.d-md-block.d-flex.align-items-center.justify-content-center.mx-auto.p-0(
      md='6'
      xl='4'
    )
      .pl-3
        uploadAvatar(
          :preview='$v.avatar.$model'
          :error='$v.avatar.$error'
          @change='$v.avatar.$model = $event'
        )
    b-col.mx-auto(md='12' xl='10')
      b-row
        b-col
          b-form-group(
            :label='$t("pages.profile.label1")'
            label-for='firstname'
          )
            b-form-input#firstname.input-form(
              v-model='$v.firstname.$model'
              :class='{ "is-invalid": $v.firstname.$error, "is-valid": !$v.firstname.$invalid }'
              type='text'
              name='firstname'
              @blur='$v.firstname.$touch()'
            )
            .input-error(v-if='$v.firstname.$error')
              font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
              | {{ $t('pages.errors.required') }}
      b-row
        b-col
          b-form-group(
            :label='$t("pages.profile.label2")'
            label-for='lastname'
          )
            b-form-input#lastname.input-form(
              v-model='$v.lastname.$model'
              :class='{ "is-invalid": $v.lastname.$error, "is-valid": !$v.lastname.$invalid }'
              type='text'
              name='lastname'
              @blur='$v.lastname.$touch()'
            )
            .input-error(v-if='$v.lastname.$error')
              font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
              | {{ $t('pages.errors.required') }}
  b-row
    b-col.mx-auto(md='8' lg='6')
      b-form-group(:label='$t("pages.profile.label3")' label-for='email')
        b-form-input#email.input-form(
          v-model='$v.email.$model'
          :class='{ "is-invalid": $v.email.$error, "is-valid": !$v.email.$invalid }'
          type='text'
          name='email'
          @blur='$v.email.$touch()'
        )
        .input-error(v-if='$v.email.$error && $v.email.email')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
        .input-error(v-if='!$v.email.email')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.invalidEmail') }}
    b-col.mx-auto(md='8' lg='6')
      b-form-group(:label='$t("pages.profile.label4")' label-for='phone')
        b-form-input#phone.input-form(
          v-model='$v.phone.$model'
          :class='{ "is-invalid": $v.phone.$error, "is-valid": !$v.phone.$invalid }'
          type='text'
          name='phone'
          @blur='$v.phone.$touch()'
        )
        .input-error(v-if='$v.phone.$error && $v.phone.phoneRegex')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
        .input-error(v-if='!$v.phone.phoneRegex')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.invalidPhoneNumber') }}
    b-col.mx-auto(md='8' lg='6')
      b-form-group(:label='$t("pages.profile.label5")' label-for='dateOfBirth')
        b-form-input#dateOfBirth.input-form(
          v-model='$v.dateOfBirth.$model'
          :class='{ "is-invalid": $v.dateOfBirth.$error, "is-valid": !$v.dateOfBirth.$invalid }'
          type='date'
          name='dateOfBirth'
          @blur='$v.dateOfBirth.$touch()'
        )
        .input-error(v-if='$v.dateOfBirth.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
  b-row
    b-col.mx-auto(lg='20')
      h3.line.pb-2.text-secondary {{ $t('pages.profile.title3') }}
  b-row
    b-col.mx-auto(md='12' lg='10')
      b-form-group(:label='$t("pages.profile.label6")' label-for='address')
        b-form-input#address.input-form(
          v-model='$v.address.$model'
          :class='{ "is-invalid": $v.address.$error, "is-valid": !$v.address.$invalid }'
          type='text'
          name='address'
          @blur='$v.address.$touch()'
        )
        .input-error(v-if='$v.address.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
    b-col.mx-auto(md='12' lg='10')
      b-form-group(:label='$t("pages.profile.label7")' label-for='city-input')
        b-form-input#city-input.input-form(
          v-model='$v.city.$model'
          :class='{ "is-invalid": $v.city.$error, "is-valid": !$v.city.$invalid }'
          type='text'
          name='city'
          @blur='$v.city.$touch()'
        )
        .input-error(v-if='$v.city.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
  b-row
    b-col.mx-auto(md='12' lg='10')
      b-form-group(:label='$t("pages.profile.label8")' label-for='zip')
        b-form-input#zip.input-form(
          v-model='$v.zip.$model'
          :class='{ "is-invalid": $v.zip.$error, "is-valid": !$v.zip.$invalid }'
          type='text'
          name='zip'
          @blur='$v.zip.$touch()'
        )
        .input-error(v-if='$v.zip.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
    b-col.mx-auto(md='12' lg='10')
      b-form-group(:label='$t("pages.profile.label9")' label-for='country')
        b-form-input#country.input-form(
          v-model='$v.country.$model'
          :class='{ "is-invalid": $v.country.$error, "is-valid": !$v.country.$invalid }'
          type='text'
          name='country'
          @blur='$v.country.$touch()'
        )
        .input-error(v-if='$v.country.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
  b-row
    b-col.mx-auto(lg='20')
      h3.line.pb-2.text-secondary.text-center.text-sm-left {{ $t('pages.profile.title4') }}
  b-row
    b-col.mx-auto(md='12' lg='10')
      b-form-group(:label='$t("pages.profile.label10")' label-for='cardNumber')
        b-form-input#cardNumber.input-form(
          v-model='$v.cardNumber.$model'
          :class='{ "is-invalid": $v.cardNumber.$error, "is-valid": !$v.cardNumber.$invalid }'
          type='text'
          name='cardNumber'
          @blur='$v.cardNumber.$touch()'
        )
        .input-error(v-if='$v.cardNumber.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
    b-col.mx-auto(md='12' lg='10')
      b-form-group(:label='$t("pages.profile.label11")' label-for='cardName')
        b-form-input#cardName.input-form(
          v-model='$v.cardName.$model'
          :class='{ "is-invalid": $v.cardName.$error, "is-valid": !$v.cardName.$invalid }'
          type='text'
          name='cardName'
          @blur='$v.cardName.$touch()'
        )
        .input-error(v-if='$v.cardName.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
  b-row
    b-col.mx-auto(md='12' lg='10')
      b-form-group(
        :label='$t("pages.profile.label12")'
        label-for='validityDate'
      )
        date-picker.w-100(
          v-model='$v.validityDate.$model'
          type='month'
          format='YYYY-MM'
          input-class='datePicker'
          @blur='$v.validityDate.$touch()'
        )
      .input-error(v-if='$v.validityDate.$error')
        font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
        | {{ $t('pages.errors.required') }}
    b-col.mx-auto(md='12' lg='10')
      b-form-group(
        :label='$t("pages.profile.label13")'
        label-for='securityCode'
      )
        b-form-input#cardName.input-form(
          v-model='$v.securityCode.$model'
          :class='{ "is-invalid": $v.securityCode.$error, "is-valid": !$v.securityCode.$invalid }'
          type='text'
          name='securityCode'
          @blur='$v.securityCode.$touch()'
        )
        .input-error(v-if='$v.securityCode.$error')
          font-awesome-icon.mr-2(:icon='["fa", "exclamation-triangle"]')
          | {{ $t('pages.errors.required') }}
  b-row
    b-col.mx-auto.p-0(lg='20')
      alert(
        :show='submitState === submitStateType.ERROR || submitState === submitStateType.SUCCESS'
        :variant='submitState === submitStateType.ERROR ? "error" : "success"'
        :icon='submitState === submitStateType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
      )
        h6.m-0.mb-2 {{ error }}
  b-row.pb-3
    b-col.mx-auto(md='12' lg='10')
      b-button.button(variant='secondary' block @click='resetData') {{ $t('pages.profile.button3') }}
    b-col.mx-auto(md='12' lg='10')
      b-button.button(variant='secondary' block @click='handleSave') {{ $t('pages.profile.button4') }}
  b-row.pb-3
    b-col.mx-auto(md='12' lg='10')
      b-button.button(variant='secondary' block @click='resetData') {{ $t('pages.profile.button2') }}
    b-col.mx-auto(md='12' lg='10')
      b-button.button(variant='secondary' block @click='save') {{ $t('pages.profile.button1') }}
</template>
<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required, email, helpers } from 'vuelidate/lib/validators';
import { submitStateType } from '@/utils/utils';

import alert from '@/components/global/alert.vue';
import uploadAvatar from '@/components/global/uploadAvatar.vue';

const phoneRegex = helpers.regex(
  'phoneRegex',
  /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/
);

@Component({
  components: { alert, uploadAvatar },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) avatar: string = '';
  @Validate({ required }) firstname: string = '';
  @Validate({ required }) lastname: string = '';
  @Validate({ required, email }) email: string = '';
  @Validate({ required, phoneRegex }) phone: string = '';
  @Validate({ required }) dateOfBirth: Date | null = null;
  @Validate({ required }) address: string = '';
  @Validate({ required }) city: string = '';
  @Validate({ required }) zip: string = '';
  @Validate({ required }) country: string = '';
  @Validate({ required }) cardNumber: string = '';
  @Validate({ required }) cardName: string = '';
  @Validate({ required }) validityDate: Date | null = null;
  @Validate({ required }) securityCode: string = '';

  submitStateType = submitStateType;
  submitState = submitStateType.NONE;
  error: string = '';

  save() {
    console.log('SUBMIT B4', this.submitState);

    this.$v.$touch();
    if (this.$v.$invalid) {
      this.submitState = submitStateType.ERROR;
      this.error = this.$tc('error.invalidFields');
      console.log('SUBMIT AFTER', this.submitState);
    } else {
      this.submitState = submitStateType.SUCCESS;
      this.error = this.$tc('pages.alert.success');
    }
  }
}
</script>
<style scoped lang="scss">
.line {
  border-bottom: 1px solid #d6c385;
}
</style>
