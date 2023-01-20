<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-row
    b-col.mx-auto(xl='20')
      .content.p-3.p-sm-5
        b-row
          b-col.py-3.mx-auto(lg='20' xl='18' xxl='14')
            h2.text-secondary.title {{ $t('pages.profile.title1') }}
        b-row
          b-col.mx-auto(lg='20' xl='18' xxl='14')
            h3.line.pb-2.text-secondary {{ $t('pages.profile.title2') }}
        b-row
          b-col.mx-auto(lg='20' xl='18' xxl='14')
            b-row
              b-col.mx-auto(md='12')
                b-form-group(
                  :label='$t("pages.profile.label1")'
                  label-for='firstname'
                )
                  b-form-input#firstname.input-form(
                    v-model='$v.firstname.$model'
                    :class='{ "is-invalid": $v.firstname.$error, "is-valid": !$v.firstname.$invalid }'
                    :placeholder='$t("pages.profile.placeholder1")'
                    type='text'
                    name='firstname'
                    @blur='$v.firstname.$touch()'
                  )
                  .input-error(v-if='$v.firstname.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
              b-col.mx-auto(md='12')
                b-form-group(
                  :label='$t("pages.profile.label2")'
                  label-for='lastname'
                )
                  b-form-input#lastname.input-form(
                    v-model='$v.lastname.$model'
                    :class='{ "is-invalid": $v.lastname.$error, "is-valid": !$v.lastname.$invalid }'
                    :placeholder='$t("pages.profile.placeholder2")'
                    type='text'
                    name='lastname'
                    @blur='$v.lastname.$touch()'
                  )
                  .input-error(v-if='$v.lastname.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
            b-row
              b-col.mx-auto(md='12')
                b-form-group(
                  :label='$t("pages.profile.label3")'
                  label-for='email'
                )
                  b-form-input#email.input-form(
                    v-model='$v.email.$model'
                    :class='{ "is-invalid": $v.email.$error, "is-valid": !$v.email.$invalid }'
                    :placeholder='$t("pages.profile.placeholder3")'
                    type='text'
                    name='email'
                    @blur='$v.email.$touch()'
                  )
                  .input-error(v-if='$v.email.$error && $v.email.email')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                  .input-error(v-if='!$v.email.email')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.invalidEmail') }}
              b-col.mx-auto(md='12')
                b-form-group(
                  :label='$t("pages.profile.label5")'
                  label-for='userName'
                )
                  b-form-input#userName.input-form(
                    v-model='$v.userName.$model'
                    :class='{ "is-invalid": $v.userName.$error, "is-valid": !$v.userName.$invalid }'
                    :placeholder='$t("pages.profile.placeholder5")'
                    type='text'
                    name='userName'
                    @blur='$v.userName.$touch()'
                  )
                  .input-error(v-if='$v.userName.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
        b-row.pt-3
          b-col.mx-auto(lg='20' xl='18' xxl='14')
            h3.line.pb-2.text-secondary {{ $t('pages.profile.title3') }}
        b-row
          b-col.mx-auto(lg='20' xl='18' xxl='14')
            b-row.pt-2
              b-col(md='12')
                b-form-group(
                  :label='$t("pages.profile.label12")'
                  label-for='addresses'
                )
                  b-form-select#addresses.input-form(
                    v-model='addresses'
                    :options='adds'
                    @change='handleChangeAddress'
                  )
            b-row.pt-2
              b-col.mx-auto(md='12')
                b-form-group(
                  :label='$t("pages.profile.label6")'
                  label-for='address'
                )
                  b-form-input#address.input-form(
                    v-model='$v.address.$model'
                    :class='{ "is-invalid": $v.address.$error, "is-valid": !$v.address.$invalid }'
                    :placeholder='$t("pages.profile.placeholder6")'
                    type='text'
                    name='address'
                    @blur='$v.address.$touch()'
                  )
                  .input-error(
                    v-if='$v.address.$error && $v.address.maxLength'
                  )
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                  .input-error(v-if='!$v.address.maxLength')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.MaxLength') }}
                b-form-group(
                  :label='$t("pages.profile.label7")'
                  label-for='number'
                )
                  b-form-input#number.input-form(
                    v-model='$v.number.$model'
                    :class='{ "is-invalid": $v.number.$error, "is-valid": !$v.number.$invalid }'
                    type='number'
                    name='number'
                    @blur='$v.number.$touch()'
                  )
                  .input-error(v-if='$v.number.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group(
                  :label='$t("pages.profile.label8")'
                  label-for='extension'
                )
                  b-form-input#extension.input-form(
                    v-model='$v.extension.$model'
                    :class='{ "is-invalid": $v.extension.$error, "is-valid": !$v.extension.$invalid }'
                    type='number'
                    name='extension'
                    @blur='$v.extension.$touch()'
                  )
                  .input-error(v-if='$v.extension.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
              b-col.mx-auto(md='12')
                b-form-group(
                  :label='$t("pages.profile.label9")'
                  label-for='zip'
                )
                  b-form-input#zip.input-form(
                    v-model='$v.zip.$model'
                    :class='{ "is-invalid": $v.zip.$error, "is-valid": !$v.zip.$invalid }'
                    :placeholder='$t("pages.profile.placeholder9")'
                    type='number'
                    name='zip'
                    @blur='$v.zip.$touch()'
                  )
                  .input-error(v-if='$v.zip.$error && $v.zip.zipRegex')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                  .input-error(v-if='!$v.zip.zipRegex')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.zipcode') }}
                b-form-group(
                  :label='$t("pages.profile.label10")'
                  label-for='city-input'
                )
                  b-form-input#city-input.input-form(
                    v-model='$v.city.$model'
                    :class='{ "is-invalid": $v.city.$error, "is-valid": !$v.city.$invalid }'
                    :placeholder='$t("pages.profile.placeholder10")'
                    type='text'
                    name='city'
                    @blur='$v.city.$touch()'
                  )
                  .input-error(v-if='$v.city.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
                b-form-group(
                  :label='$t("pages.profile.label11")'
                  label-for='label-input'
                )
                  b-form-input#label-input.input-form(
                    v-model='$v.label.$model'
                    :class='{ "is-invalid": $v.label.$error, "is-valid": !$v.label.$invalid }'
                    :placeholder='$t("pages.profile.placeholder11")'
                    type='text'
                    name='label'
                    @blur='$v.label.$touch()'
                  )
                  .input-error(v-if='$v.label.$error')
                    font-awesome-icon.mr-2(
                      :icon='["fa", "exclamation-triangle"]'
                    )
                    | {{ $t('pages.errors.required') }}
        b-row.pt-3
          b-col.mx-auto(lg='20' xl='18' xxl='14')
            alert(
              :show='submitState === submitStateType.ERROR || submitState === submitStateType.SUCCESS'
              :variant='submitState === submitStateType.ERROR ? "error" : "success"'
              :icon='submitState === submitStateType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
            )
              h6.m-0.mb-2 {{ errorMsg }}
            b-row.pt-3
              b-col.mx-auto(md='12')
                b-button.button(
                  variant='secondary'
                  block
                  @click='createAddress'
                ) {{ $t('pages.profile.button2') }}

              b-col.mx-auto.mt-2.mt-md-0(md='12')
                b-button.button(variant='secondary' block @click='save') {{ $t('pages.profile.button1') }}
</template>
<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import {
  required,
  email,
  helpers,
  minValue,
  maxLength,
} from 'vuelidate/lib/validators';
import { SelectOption, submitStateType } from '@/utils/utils';

import alert from '@/components/global/alert.vue';
import { API } from '~/utils/javaBack';

const zipRegex = helpers.regex('zipRegex', /^(?:(?:[1-9])(?:\d{3}))$/);

@Component({
  components: { alert },
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) avatar: string = '';
  @Validate({ required }) firstname: string = '';
  @Validate({ required }) lastname: string = '';
  @Validate({ required, email }) email: string = '';
  @Validate({ required }) userName: Date | null = null;
  @Validate({ required, maxLength: maxLength(45) }) address: string = '';
  @Validate({ required }) city: string = '';
  @Validate({ required }) label: string = '';
  @Validate({ required, zipRegex }) zip: number = 0;
  @Validate({ required, minValue: minValue(1) }) number: number = 0;
  @Validate({ required }) extension: number = 0;
  addresses: string = '0';
  adds: SelectOption[] = [];

  submitStateType = submitStateType;
  submitState = submitStateType.NONE;
  errorMsg: string = '';

  mounted() {
    this.getUser();
  }

  async getUser() {
    const responseUser = await API.getUserById(
      this.$store.state.users.currentUser.id
    );

    if (responseUser.status !== 200) {
      return;
    }

    console.log('USER', responseUser.data);

    this.firstname = responseUser.data.firstname;
    this.lastname = responseUser.data.lastname;
    this.email = responseUser.data.email;
    this.userName = responseUser.data.username;
    this.getAddressByUser();
  }

  async getAddressByUser() {
    const responseAddress = await API.getAddressByUser(
      this.$store.state.users.currentUser.id
    );

    if (responseAddress.status !== 200) {
      return;
    }

    this.adds = responseAddress.data.map((address) => ({
      value: address.id,
      text: address.label,
    }));
    this.adds.push({
      value: 0,
      text: 'Please, Select an Address',
    });
  }

  async handleChangeAddress() {
    const responseAddress = await API.getAddressById(parseInt(this.addresses));

    if (responseAddress.status !== 200) {
      return;
    }

    // this.isReadOnly = true;
    this.address = responseAddress.data.street;
    this.number = responseAddress.data.number;
    this.zip = responseAddress.data.zipcode;
    this.city = responseAddress.data.city;
    this.label = responseAddress.data.label;

    if (responseAddress.data.extension !== null) {
      this.extension = responseAddress.data.extension;
    }

    console.log('READ ONLY', responseAddress.data);
  }

  async createAddress() {
    if (parseInt(this.addresses) !== 0) {
      this.submitState = submitStateType.ERROR;
      this.errorMsg = this.$tc('pages.profile.errors.addressSelected');
      setTimeout(() => {
        this.submitState = submitStateType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }

    this.$v.address.$touch();
    this.$v.city.$touch();
    this.$v.zip.$touch();
    this.$v.number.$touch();
    this.$v.label.$touch();

    if (
      this.$v.address.$invalid ||
      this.$v.city.$invalid ||
      this.$v.zip.$invalid ||
      this.$v.number.$invalid ||
      this.$v.label.$invalid
    ) {
      this.submitState = submitStateType.ERROR;
      this.errorMsg = this.$tc('pages.profile.errors.fields');
      setTimeout(() => {
        this.submitState = submitStateType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }

    const responseCreateAddress = await API.addAddress(
      this.$store.state.users.currentUser.id,
      this.city,
      this.zip,
      this.address,
      this.number,
      this.label,
      this.extension
    );

    if (responseCreateAddress.status !== 200) {
      return;
    }

    this.submitState = submitStateType.SUCCESS;
    this.errorMsg = this.$tc('pages.profile.success.createAddress');
    setTimeout(() => {
      this.submitState = submitStateType.NONE;
      this.errorMsg = '';
    }, 4000);
    this.getAddressByUser();
  }

  async save() {
    if (parseInt(this.addresses) === 0) {
      this.submitState = submitStateType.ERROR;
      this.errorMsg = this.$tc('pages.profile.errors.noAddress');
      setTimeout(() => {
        this.submitState = submitStateType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }
    console.log('ADD START', this.addresses);

    this.$v.address.$touch();
    this.$v.city.$touch();
    this.$v.zip.$touch();
    this.$v.number.$touch();
    this.$v.label.$touch();

    if (
      this.$v.address.$invalid ||
      this.$v.city.$invalid ||
      this.$v.zip.$invalid ||
      this.$v.number.$invalid ||
      this.$v.label.$invalid
    ) {
      this.submitState = submitStateType.ERROR;
      this.errorMsg = this.$tc('pages.profile.errors.fields');
      setTimeout(() => {
        this.submitState = submitStateType.NONE;
        this.errorMsg = '';
      }, 4000);
      return;
    }

    const responseUpdateAddress = await API.updateAddress(
      parseInt(this.addresses),
      this.city,
      this.zip,
      this.address,
      this.number,
      this.extension,
      this.label,
      this.$store.state.users.currentUser.id
    );

    if (responseUpdateAddress.status !== 200) {
      return;
    }

    this.submitState = submitStateType.SUCCESS;
    this.errorMsg = this.$tc('pages.profile.success.update');
    setTimeout(() => {
      this.submitState = submitStateType.NONE;
      this.errorMsg = '';
    }, 4000);
    this.getAddressByUser();
    console.log('ADD', this.address);
  }
}
</script>
<style scoped lang="scss">
.line {
  border-bottom: 1px solid #d6c385;
}
</style>
