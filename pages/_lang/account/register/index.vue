<template lang="pug">
b-container(fluid)
  b-row.p-5
    b-col(lg='12')
      .content
        b-row
          b-col
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
          b-col(md='18')
            form(ref='form' @submit.stop.prevent='onSubmit')
              b-container.mt-2
                b-row.mb-2 
                  b-col
                    h6 {{ $t('pages.register.text3') }}
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
                      @click='null'
                      block
                    ) 
                      font-awesome-icon(:icon='["fab", "google"]')
                b-row
                  b-col
                    .line 
                      span.text.text-faded {{ $t('pages.register.text4') }}
        b-row
          b-col.mx-auto(cols='18')
            form(ref='form' @submit.stop.prevent='onSubmit')
              .p-3.login-area
                b-row
                  b-col
                    b-form-group.text-primary(
                      :label='$t("pages.register.label1")'
                      label-for='email'
                    )
                      b-form-input#email.mx-auto(
                        v-model='$v.email.$model'
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
                    b-form-group.text-primary(
                      :label='$t("pages.register.label2")'
                      label-for='password'
                    )
                      b-form-input#email.mx-auto(
                        v-model='$v.password.$model'
                        :placeholder='$t("pages.register.placeholder2")'
                        type='text'
                        name='password'
                        @blur='$v.password.$touch()'
                      )
                      .input-error(
                        v-if='$v.password.$error && $v.password.passRegex'
                      )
                        font-awesome-icon.mr-2(
                          :icon='["fa", "exclamation-triangle"]'
                        )
                        | {{ $t('pages.errors.required') }}
                    b-form-group.text-primary(
                      :label='$t("pages.register.label3")'
                      label-for='confirm-password'
                    )
                      b-form-input#email.mx-auto(
                        v-model='$v.confirmPassword.$model'
                        :placeholder='$t("pages.register.placeholder2")'
                        type='text'
                        name='confirmPassword'
                        @blur='$v.confirmPassword.$touch()'
                      )
                      .input-error(
                        v-if='$v.confirmPassword.$error && $v.confirmPassword.passRegex'
                      )
                        font-awesome-icon.mr-2(
                          :icon='["fa", "exclamation-triangle"]'
                        )
                        | {{ $t('pages.errors.required') }}
                    .mx-auto.pt-2.pb-3
                      b-button.w-100(variant='secondary' @click='onSubmit') {{ $t('pages.register.button1') }}

    b-col.p-5(lg='12')
      div
        b-img(
          thumbnail
          fluid
          src='/img/inscription/burger_register.jpg'
          alt='Inscription'
        )
</template>
<script lang="ts">
import { mixins, Component } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';

@Component({
  components: {},
})
export default class extends mixins(validationMixin) {
  @Validate({ required }) email: string = '';
  @Validate({ required }) password: string = '';
  @Validate({ required }) confirmPassword: string = '';

  onSubmit() {
    this.$v.$touch();
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
</style>
