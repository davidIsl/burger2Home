<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-col.my-5.mx-auto(
    md='18'
    lg='12'
    xl='10'
    xxl='8'
  )
    b-container.p-2
      .content
        b-row
          b-col.pt-2.table-font-size
            .text-center
              b-img.logo.mb-2(
                fluid
                width=40
                height=40
                src='/img/logo-burger-white.png'
              )
              h3.font-weight-bold.title.text-primary {{ $t('pages.forgot.title1') }}
              span.text-secondary {{ $t('pages.forgot.text1') }}
        b-row.pb-3
          b-col.mx-auto(cols='18')
            form(ref='form' @submit.stop.prevent='onSubmit')
              b-row
                b-col
                  b-form-group.text-primary(
                    :label='$t("pages.forgot.label1")'
                    label-for='email'
                  )
                    b-form-input#email.input-form(
                      v-model='$v.email.$model'
                      :class='{ "is-invalid": $v.email.$error, "is-valid": !$v.email.$invalid }'
                      :placeholder='$t("pages.forgot.placeholder1")'
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
                    :label='$t("pages.forgot.label2")'
                    label-for='password'
                  )
                    b-input-group.password-group
                      b-form-input#password.input-form(
                        v-model='$v.password.$model'
                        :class='{ "is-invalid": $v.password.$error, "is-valid": !$v.password.$invalid }'
                        :placeholder='$t("pages.forgot.placeholder2")'
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
                    :label='$t("pages.forgot.label3")'
                    label-for='confirm-password'
                  )
                    b-input-group.password-group
                      b-form-input#confirmPassword.input-form(
                        v-model='$v.confirmPassword.$model'
                        :class='{ "is-invalid": $v.confirmPassword.$error, "is-valid": !$v.confirmPassword.$invalid }'
                        :placeholder='$t("pages.forgot.placeholder2")'
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
                  .mx-auto.pt-2.mb-2
                    b-button.w-100.button(
                      variant='secondary'
                      @click='onSubmit'
                    ) {{ $t('pages.forgot.button1') }}
</template>
<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required, email, helpers, sameAs } from 'vuelidate/lib/validators';

const passRegex = helpers.regex(
  'passRegex',
  /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/
);

@Component({
  components: {},
})
export default class extends mixins(validationMixin) {
  @Validate({ required, email }) email: string = '';
  @Validate({ required, passRegex }) password: string = '';
  @Validate({ required, passRegex, sameAsPassword: sameAs('password') })
  confirmPassword: string = '';

  error: boolean = false;
  secure: boolean = true;

  onSubmit() {
    this.$v.$touch();
    console.log('HELLO');
  }
}
</script>
<style scoped lang="scss">
.password-group {
  border: 1px solid var(--primary);
  border-radius: 0.5rem !important;
  padding-right: 10px;
}
</style>
