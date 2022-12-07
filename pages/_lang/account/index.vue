<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-col.my-5.mx-auto(
    md='18'
    lg='12'
    xl='10'
    xxl='8'
  )
    b-container.p-0
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
              h3.font-weight-bold.title.text-primary {{ $t('pages.login.title1') }}
              span.text-primay {{ $t('pages.login.text1') }}
              nuxt-link.text-secondary(
                :to='`/${$i18n.locale}/account/register/`'
              ) {{ $t('pages.login.text2') }}
        b-row.pb-3
          b-col.mx-auto(cols='18')
            form(ref='form' @submit.stop.prevent='onSubmit')
              b-row
                b-col
                  b-form-group.pt-3.text-primary(
                    :label='$t("pages.login.label1")'
                    label-for='email'
                  )
                    b-form-input#email.input-form(
                      v-model='$v.email.$model'
                      :class='{ "is-invalid": $v.email.$error, "is-valid": !$v.email.$invalid }'
                      :placeholder='$t("pages.login.placeholder1")'
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
                    :label='$t("pages.login.label2")'
                    label-for='password'
                  )
                    b-input-group.password-group
                      b-form-input#password.input-form(
                        v-model='$v.password.$model'
                        :class='{ "is-invalid": $v.password.$error, "is-valid": !$v.password.$invalid }'
                        :placeholder='$t("pages.login.placeholder2")'
                        :type='secure ? "password" : "text"'
                        name='password'
                        @blur='$v.password.$touch()'
                      )
                      template
                        //- .bg-gray
                        font-awesome-icon.my-auto(
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
                  b-form-group.py-2
                    b-container.p-0
                      b-row(no-gutters)
                        b-col.text-left(cols='12')
                          b-form-checkbox(size='md' v-model='rememberMe') {{ $t('pages.login.remember') }}
                        b-col.text-right(cols='12')
                          nuxt-link.text-secondary(
                            :to='`/${$i18n.locale}/account/forgotPassword/`'
                          ) {{ $t('pages.login.forgot') }}
                  .mx-auto.pt-2
                    b-button.w-100.button(
                      variant='secondary'
                      @click='onSubmit'
                    ) {{ $t('pages.login.button1') }}
              b-row.pt-3
                b-col(lg='24')
                  .line 
                    span.text.text-faded {{ $t('pages.login.text3') }}
              b-row.pt-3
                b-col(cols='12')
                  b-button.button-social(
                    variant='white'
                    size='md'
                    @click='null'
                    block
                  ) 
                    font-awesome-icon(:icon='["fab", "facebook"]')
                b-col(cols='12')
                  b-button.button-social(
                    variant='white'
                    size='md'
                    href='https://accounts.google.com/o/oauth2/auth?scope=email&access_type=online&redirect_uri=http://meteortest.com:3000/en/account/&response_type=code&client_id=710718771372-vfrtdjkiv8nv5e04n93qp79cnua0ref7.apps.googleusercontent.com'
                    block
                  ) 
                    font-awesome-icon(:icon='["fab", "google"]')
        b-row.mt-5(align-h='center')
          b-col(sm='16' md='12' lg='14')
            b-container
              alert(
                :show='submitState === submitStateType.ERROR || submitState === submitStateType.SUCCESS'
                :variant='submitState === submitStateType.ERROR ? "error" : "success"'
                :icon='submitState === submitStateType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
              )
                h6.m-0.mb-2.text-center {{ error }}
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required, email, helpers } from 'vuelidate/lib/validators';
import { submitStateType } from '@/utils/utils';
import alert from '@/components/global/alert.vue';

const passRegex = helpers.regex(
  'passRegex',
  /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/
);

@Component({
  components: { alert },
})
export default class extends mixins(validationMixin) {
  @Validate({ required, email }) email: string = '';
  @Validate({ required, passRegex }) password: string = '';
  error?: string = '';
  submitStateType = submitStateType;
  submitState = submitStateType.NONE;
  secure: boolean = true;
  rememberMe: boolean = false;

  onSubmit() {
    this.$v.$touch();
    this.submitState = submitStateType.ERROR;
    this.error = this.$tc('ERROR Connected');
    console.log('HELLO');
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 5em;
  height: 5em;
}

.title {
  left: 0.5em;
}

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
  // #password {
  //   border: none;
  // }
}
</style>
