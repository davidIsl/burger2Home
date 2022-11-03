<template lang="pug">
b-container.p-0(fluid)
  b-row
    b-col(lg='12')
      .p-3
        b-img(
          thumbnail
          fluid
          src='../../../static/img/inscription/burger_inscription.jpg'
          alt='Image 1'
        )
    b-col(lg='12')
      .text-center.pt-3
        b-img.position-absolute.logo(
          fluid
          width=40
          height=40
          src='../../../static/img/logo-burger-white.png'
        )
        h4.title.text-gray.position-relative {{ $t('account.title1') }}
      .p-3
        b-form-group.text-gray(:label='$t("account.label1")' label-for='email')
          b-form-input#email(
            v-model='$v.email.$model'
            type='text'
            name='email'
            @blur='$v.email.$touch()'
          )
        b-form-group.text-gray(
          :label='$t("account.label2")'
          label-for='password'
        )
          b-form-input#email(
            v-model='$v.password.$model'
            type='text'
            name='password'
            @blur='$v.password.$touch()'
          )
        .mx-auto 
          b-button-group
            b-button.m-2.button(variant='middleGray') {{ $t('account.button1') }}
            b-button.m-2.button.text-middleGray(variant='outline-middleGray') {{ $t('account.button2') }}
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
}
</script>

<style lang="scss" scoped>
.logo {
  left: 9em;
  width: 2em;
  height: 2em;
  background-color: #1a1c1d;
}

.title {
  left: 0.5em;
}
</style>
