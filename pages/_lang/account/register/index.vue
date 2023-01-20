<template lang="pug">
b-container.bg-gray(fluid)
  b-row.p-5
    b-col.my-5.mx-auto
      .content
        b-row
          b-col.pt-2
            .text-center
              b-img.logo.mb-2(
                fluid
                width=40
                height=40
                src='/img/logo-burger-white.png'
              )
              h2.font-weight-bold.title.text-primary {{ $t('pages.register.title1') }}
              span.text-primay {{ $t('pages.register.text1') }}
              nuxt-link.text-secondary(:to='`/${$i18n.locale}/account/`') {{ $t('pages.register.text2') }}
        b-row.mt-2(align-h='center')
          b-col(
            cols='18'
            md='12'
            lg='10'
            xl='8'
          )
            b-container.mt-2.p-0.p-md-2(
              v-if='stepState === stepStateType.STEP1'
            )
              form(ref='form' @submit.stop.prevent='onSubmit')
                b-row.mb-2 
                  b-col
                    .line
                      span.text.text-faded {{ $t('pages.register.text3') }}
                b-row.mb-4
                  b-col(cols='12')
                    b-button.button-social.text-faded(
                      variant='white'
                      size='md'
                      @click='null'
                      block
                    ) 
                      font-awesome-icon(:icon='["fab", "facebook"]')
                  b-col(cols='12')
                    b-button.button-social.text-faded(
                      variant='white'
                      size='md'
                      href='https://accounts.google.com/o/oauth2/auth?scope=email&access_type=online&redirect_uri=http://localhost:3000/en/&response_type=code&client_id=710718771372-vfrtdjkiv8nv5e04n93qp79cnua0ref7.apps.googleusercontent.com'
                      @click='null'
                      block
                    ) 
                      font-awesome-icon(:icon='["fab", "google"]')
                b-row
                  b-col
                    .line 
                      span.text.text-faded {{ $t('pages.register.text4') }}
        b-row
          b-col.mx-auto(
            cols='18'
            md='12'
            lg='10'
            xl='8'
          )
            b-container.p-0(v-if='stepState === stepStateType.STEP1')
              b-row
                b-col
                  b-form-group.text-primary(
                    :label='$t("pages.register.label1")'
                    label-for='email'
                  )
                    b-form-input#email.input-form(
                      v-model='$v.email.$model'
                      :class='{ "is-invalid": $v.email.$error, "is-valid": !$v.email.$invalid }'
                      :placeholder='$t("pages.register.placeholder1")'
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
                  b-form-group.text-primary(
                    :label='$t("pages.register.label2")'
                    label-for='password'
                  )
                    b-input-group.password-group
                      b-form-input#password.input-form(
                        v-model='$v.password.$model'
                        :class='{ "is-invalid": $v.password.$error, "is-valid": !$v.password.$invalid }'
                        :placeholder='$t("pages.register.placeholder2")'
                        :type='secure ? "password" : "text"'
                        name='password'
                        @blur='$v.password.$touch()'
                      )
                      template
                        font-awesome-icon.mt-auto.mb-auto.mr-2(
                          :icon='secure ? ["fa", "eye"] : ["fa", "eye-slash"]'
                          @click='secure = !secure'
                        )
                    .input-error(
                      v-if='$v.password.$error && $v.password.passRegex'
                    )
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                    .input-error(v-if='!$v.password.passRegex')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.invalidPasswordFormat') }}
                  b-form-group.text-primary(
                    :label='$t("pages.register.label3")'
                    label-for='confirm-password'
                  )
                    b-input-group.password-group
                      b-form-input#confirmPassword.input-form(
                        v-model='$v.confirmPassword.$model'
                        :class='{ "is-invalid": $v.confirmPassword.$error, "is-valid": !$v.confirmPassword.$invalid }'
                        :placeholder='$t("pages.register.placeholder2")'
                        :type='secure ? "password" : "text"'
                        name='confirmPassword'
                        @blur='$v.confirmPassword.$touch()'
                      )
                      template
                        font-awesome-icon.mt-auto.mb-auto.mr-2(
                          :icon='secure ? ["fa", "eye"] : ["fa", "eye-slash"]'
                          @click='secure = !secure'
                        )
                    .input-error(
                      v-if='$v.confirmPassword.$error && $v.confirmPassword.passRegex'
                    )
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.required') }}
                    .input-error(v-if='!$v.confirmPassword.passRegex')
                      font-awesome-icon.mr-2(
                        :icon='["fa", "exclamation-triangle"]'
                      )
                      | {{ $t('pages.errors.invalidConfirmPassword') }}
              b-row(v-if='stepState === stepStateType.STEP1')
              b-col.p-0.mx-auto(sm='16' md='12' lg='10')
                .p-3.pb-5
                  b-button.w-100.button(variant='secondary' @click='nextStep') {{ $t('pages.register.button2') }}
        b-row
          b-col
            b-container(v-if='stepState === stepStateType.STEP2')
              b-row
                b-col.mt-3.mx-auto(cols='18')
                  .line
                    span.text.text-faded {{ $t('pages.register.text5') }}
                  b-row
                    b-col(md='12')
                      b-form-group.text-primary(
                        :label='$t("pages.register.label4")'
                        label-for='lastname'
                      )
                        b-form-input#lastname.input-form(
                          v-model='$v.lastname.$model'
                          :class='{ "is-invalid": $v.lastname.$error, "is-valid": !$v.lastname.$invalid }'
                          :placeholder='$t("pages.register.placeholder3")'
                          type='text'
                          name='lastname'
                          @blur='$v.lastname.$touch()'
                        )
                        .input-error(v-if='$v.lastname.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
                    b-col 
                      b-form-group.text-primary(
                        :label='$t("pages.register.label5")'
                        label-for='firstname'
                      )
                        b-form-input#firstname.input-form(
                          v-model='$v.firstname.$model'
                          :class='{ "is-invalid": $v.firstname.$error, "is-valid": !$v.firstname.$invalid }'
                          :placeholder='$t("pages.register.placeholder4")'
                          type='text'
                          name='firstname'
                          @blur='$v.firstname.$touch()'
                        )
                        .input-error(v-if='$v.firstname.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
                  b-row
                    b-col(md='12')
                      b-form-group.text-primary(
                        :label='$t("pages.register.label6")'
                        label-for='username'
                      )
                        b-form-input#username.input-form(
                          v-model='$v.username.$model'
                          :class='{ "is-invalid": $v.username.$error, "is-valid": !$v.username.$invalid }'
                          :placeholder='$t("pages.register.placeholder5")'
                          type='text'
                          name='username'
                          @blur='$v.username.$touch()'
                        )
                        .input-error(v-if='$v.username.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
              b-row
                b-col.mt-3.mx-auto(cols='18')
                  .pb-2
                  .line
                    span.text.text-faded {{ $t('pages.register.text6') }}
                  b-row
                    b-col(md='12')
                      b-form-group.text-primary(
                        :label='$t("pages.register.label7")'
                        label-for='address'
                      )
                        b-form-input#address.input-form(
                          v-model='$v.address.$model'
                          :class='{ "is-invalid": $v.address.$error, "is-valid": !$v.address.$invalid }'
                          :placeholder='$t("pages.register.placeholder6")'
                          type='text'
                          name='address'
                          @blur='$v.address.$touch()'
                        )
                        .input-error(v-if='$v.address.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
                      b-form-group.text-primary(
                        :label='$t("pages.register.label8")'
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
                      b-form-group.text-primary(
                        :label='$t("pages.register.label9")'
                        label-for='extension'
                      )
                        b-form-input#extension.input-form(
                          v-model='extension'
                          type='number'
                          name='extension'
                        )
                        //- .input-error(v-if='$v.extension.$error')
                        //-   font-awesome-icon.mr-2(
                        //-     :icon='["fa", "exclamation-triangle"]'
                        //-   )
                        //-   | {{ $t('pages.errors.required') }}
                    b-col(md='12')
                      b-form-group.text-primary(
                        :label='$t("pages.register.label10")'
                        label-for='zip'
                      )
                        b-form-input#zip.input-form(
                          v-model='$v.zip.$model'
                          :class='{ "is-invalid": $v.zip.$error, "is-valid": !$v.zip.$invalid }'
                          type='number'
                          name='zip'
                          @blur='$v.zip.$touch()'
                        )
                        .input-error(v-if='$v.zip.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
                      b-form-group.text-primary(
                        :label='$t("pages.register.label11")'
                        label-for='city'
                      )
                        b-form-input#city.input-form(
                          v-model='$v.city.$model'
                          :class='{ "is-invalid": $v.city.$error, "is-valid": !$v.city.$invalid }'
                          :placeholder='$t("pages.register.placeholder7")'
                          type='text'
                          name='city'
                          @blur='$v.city.$touch()'
                        )
                        .input-error(v-if='$v.city.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}
                      b-form-group.text-primary(
                        :label='$t("pages.register.label12")'
                        label-for='label'
                      )
                        b-form-input#label.input-form(
                          v-model='$v.label.$model'
                          :class='{ "is-invalid": $v.label.$error, "is-valid": !$v.label.$invalid }'
                          :placeholder='$t("pages.register.placeholder8")'
                          type='text'
                          name='label'
                          @blur='$v.label.$touch()'
                        )
                        .input-error(v-if='$v.label.$error')
                          font-awesome-icon.mr-2(
                            :icon='["fa", "exclamation-triangle"]'
                          )
                          | {{ $t('pages.errors.required') }}

            b-row(v-if='stepState === stepStateType.STEP2')
              b-col.mx-auto(sm='6')
                .mx-auto.p-3.pb-5
                  b-button.w-100.button(
                    variant='secondary'
                    @click='createUser'
                  ) {{ $t('pages.register.button1') }}
        b-row.mt-5(align-h='center')
          b-col(
            cols='18'
            md='12'
            lg='10'
            xl='8'
          )
            b-container
              alert(
                :show='submitState === submitStateType.ERROR || submitState === submitStateType.SUCCESS'
                :variant='submitState === submitStateType.ERROR ? "error" : "success"'
                :icon='submitState === submitStateType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
              )
                h6.m-0.mb-2.text-center {{ error }}
</template>
<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required, email, helpers, sameAs } from 'vuelidate/lib/validators';
import { submitStateType } from '@/utils/utils';
import alert from '@/components/global/alert.vue';
import { API } from '~/utils/javaBack';

const passRegex = helpers.regex(
  'passRegex',
  /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/
);

enum stepStateType {
  STEP1,
  STEP2,
}

@Component({
  components: { alert },
})
export default class extends mixins(validationMixin) {
  @Validate({ required, email }) email: string = '';
  @Validate({ required, passRegex }) password: string = '';
  @Validate({ required, passRegex, sameAsPassword: sameAs('password') })
  confirmPassword: string = '';

  @Validate({ required }) lastname: string = '';
  @Validate({ required }) firstname: string = '';
  @Validate({ required }) username: string = '';
  @Validate({ required }) label: string = '';
  @Validate({ required }) address: string = '';
  @Validate({ required }) number: number = 0;
  @Validate({ required }) zip: number = 0;
  @Validate({ required }) city: string = '';
  extension: number = 0;

  submitStateType = submitStateType;
  submitState = submitStateType.NONE;
  stepStateType = stepStateType;
  stepState = stepStateType.STEP1;
  secure: boolean = true;
  error: string = '';

  nextStep() {
    if (this.stepState === stepStateType.STEP1) {
      this.$v.email.$touch();
      this.$v.password.$touch();
      this.$v.confirmPassword.$touch();

      if (
        this.$v.email.$invalid ||
        this.$v.password.$invalid ||
        this.$v.confirmPassword.$invalid
      ) {
        this.submitState = submitStateType.ERROR;
        this.error = this.$tc('pages.register.errors.fields');
        setTimeout(() => {
          this.submitState = submitStateType.NONE;
          this.error = '';
        }, 4000);
        return;
      }

      // TODO checkmail

      this.stepState = stepStateType.STEP2;
    }
  }

  async createUser() {
    // this.submitState = submitStateType.SUCCESS;
    // this.error = this.$tc('ERROR Connected');

    // return;
    this.$v.lastname.$touch();
    this.$v.firstname.$touch();
    this.$v.username.$touch();
    this.$v.address.$touch();
    this.$v.number.$touch();
    this.$v.zip.$touch();
    this.$v.city.$touch();
    this.$v.label.$touch();

    if (
      this.$v.lastname.$invalid ||
      this.$v.firstname.$invalid ||
      this.$v.username.$invalid ||
      this.$v.address.$invalid ||
      this.$v.number.$invalid ||
      this.$v.zip.$invalid ||
      this.$v.city.$invalid ||
      this.$v.label.$invalid
    ) {
      this.submitState = submitStateType.ERROR;
      this.error = this.$tc('pages.register.errors.fields');
      setTimeout(() => {
        this.submitState = submitStateType.NONE;
        this.error = '';
      }, 4000);
      return;
    }

    const responseCreateUser = await API.addUser(
      this.email,
      this.firstname,
      this.lastname,
      this.password,
      this.username
    );

    if (responseCreateUser.status !== 200) {
      return;
    }
    console.log('USER CREATED');

    const responseCreateAddress = await API.addAddress(
      responseCreateUser.data.id,
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
    console.log('ADDRESS CREATED');

    this.submitState = submitStateType.SUCCESS;
    this.error = this.$tc('pages.register.success.create');
    setTimeout(() => {
      this.submitState = submitStateType.NONE;
      this.error = '';
    }, 4000);
    console.log('REGISTER');
  }
}
</script>
<style lang="scss" scoped>
.line {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--primary);
  line-height: 0.1em;
  margin: 10px 0 20px;
  .text {
    color: var(--gray);
    background: var(--primary);
    padding: 0 10px;
  }
}

.password-group {
  border: 1px solid var(--primary);
  border-radius: 0.5rem !important;
  padding-right: 10px;
  // #password,
  // #confirmPassword {
  //   border: none;
  // }
}
</style>
