<template lang="pug">
b-container.p-5(fluid)
  b-row
    b-col.p-5(lg='12')
      div
        b-img(
          thumbnail
          fluid
          src='/img/inscription/burger_inscription.jpg'
          alt='Connection'
        )
    b-col(lg='12')
      b-container
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
                h2.font-weight-bold.title.text-primary {{ $t('pages.login.title1') }}
                span.text-primay {{ $t('pages.login.text1') }}
                nuxt-link.text-secondary(
                  :to='`/${$i18n.locale}/account/register/`'
                ) {{ $t('pages.login.text2') }}
          b-row.pb-3
            b-col.mx-auto(cols='18')
              form(ref='form' @submit.stop.prevent='onSubmit')
                .p-3.login-area
                  b-row
                    b-col
                      b-form-group.text-primary(
                        :label='$t("pages.login.label1")'
                        label-for='email'
                      )
                        b-form-input#email.mx-auto(
                          v-model='$v.email.$model'
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
                      b-form-group.text-primary(
                        :label='$t("pages.login.label2")'
                        label-for='password'
                      )
                        b-form-input#email(
                          v-model='$v.password.$model'
                          :placeholder='$t("pages.login.placeholder2")'
                          type='text'
                          name='password'
                          @blur='$v.password.$touch()'
                        )
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

  onSubmit() {
    this.$v.$touch();
    console.log('HELLO');
  }
}
</script>

<style lang="scss" scoped>
.logo {
  // left: 9em;
  width: 5em;
  height: 5em;
  // color: var(--secondary);
  // background-color: #1a1c1d;
}

.title {
  left: 0.5em;
}

// .content {
//   background-image: url('../../../static/img/chalkboard.jpg');
//   border: 1px #fff solid;
//   border-radius: 3%;
// }

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

// .button-social {
//   /* stylelint-disable */
//   &,
//   * {
//     color: var(--primary) !important;
//   }
//   border: 2px solid var(--primary) !important;
//   border-radius: 0.5rem;
// }

// .button-social:hover {
//   &,
//   * {
//     color: var(--secondary) !important;
//   }
//   border: 2px solid var(--secondary) !important;
// }
</style>
