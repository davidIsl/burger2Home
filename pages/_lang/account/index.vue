<template lang="pug">
b-container.p-5.bg-gray(fluid)
  b-row
    b-col.p-5(lg='12')
      div
        b-img(
          thumbnail
          width=650
          height=450
          src='/img/inscription/burger_inscription.jpg'
          alt='Connection'
        )
    b-col.mt-5(lg='12')
      b-container.p-0
        .content
          b-row
            b-col.table-font-size
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
                      b-form-input#email.input-form(
                        v-model='$v.password.$model'
                        :class='{ "is-invalid": $v.password.$error, "is-valid": !$v.password.$invalid }'
                        :placeholder='$t("pages.login.placeholder2")'
                        type='text'
                        name='password'
                        @blur='$v.password.$touch()'
                      )
                      .input-error(v-if='$v.password.$error')
                        font-awesome-icon.mr-2(
                          :icon='["fa", "exclamation-triangle"]'
                        )
                        | {{ $t('pages.errors.required') }}

                    .mx-auto.pt-2
                      b-button.w-100(variant='secondary' @click='onSubmit') {{ $t('pages.login.button1') }}
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
                      @click='null'
                      block
                    ) 
                      font-awesome-icon(:icon='["fab", "google"]')
          b-row.mt-5(align-h='center')
            b-col(
              sm='14'
              md='10'
              lg='8'
              xl='6'
            )
              b-alert(
                :show='submitState === submitStateType.ERROR || submitState === submitStateType.SUCCESS'
                :variant='submitState === submitStateType.ERROR ? "error" : "success"'
                :icon='submitState === submitStateType.ERROR ? ["fa", "exclamation-triangle"] : ["fa", "check-circle"]'
              )
                h6.m-0.mb-2 {{ error }}
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { validationMixin } from 'vuelidate';
import { Validate } from 'vuelidate-property-decorators';
import { required, email } from 'vuelidate/lib/validators';
import { submitStateType } from '@/utils/utils';

// enum submitStateType {
//   NONE,
//   SUCCESS,
//   PENDING,
//   ERROR,
// }
@Component({
  components: {},
})
export default class extends mixins(validationMixin) {
  @Validate({ required, email }) email: string = '';
  @Validate({ required }) password: string = '';
  error?: boolean = false;
  submitStateType = submitStateType;
  submitState = submitStateType.NONE;

  onSubmit() {
    this.$v.$touch();
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
</style>
