<template lang="pug">
b-container(fluid)
  b-container.pt-5
    b-row
      b-col(md='24')
        h1.mb-3.text-center {{ $t('pages.login.title') }}
        p.mb-4.text-center {{ $t('pages.login.text') }}
        login.
  b-container.pt-5
    b-row
      b-col(md='24')
        h1.mb-3.text-center {{ $t('pages.register.title') }}
        p.mb-4.text-center {{ $t('pages.register.text') }}
        register.
  b-container.pt-5.pb-5
    b-row
      b-col(md='24')
        h1.mb-3.text-center {{ $t('pages.forgotPassword.title') }}
        p.mb-4.text-center {{ $t('pages.forgotPassword.text') }}
        forgot.
  b-container.pt-5.pb-5
    b-row
      b-col(md='24')
        h1.mb-3.text-center {{ $t('pages.forgotPasswordSecure.title') }}
        p.mb-4.text-center {{ $t('pages.forgotPasswordSecure.text') }}
        forgotSecure.
  b-container.pt-5.pb-5
    b-row
      b-col(md='24')
        h1.mb-3.text-center {{ $t('pages.contact.title') }}
        p.mb-4.text-center {{ $t('pages.contact.text') }}
        contact.
  b-container.pt-5.pb-5
    b-row
      b-col(md='24')
        h1.mb-3.text-center {{ $t('pages.newsletter.title') }}
        p.mb-4.text-center {{ $t('pages.newsletter.text') }}
        newsletter.
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import login from './_components/login.vue';
import register from './_components/register.vue';
import forgot from './_components/forgot.vue';
import forgotSecure from './_components/forgotSecure.vue';
import contact from './_components/contact.vue';
import newsletter from './_components/newsletter.vue';

@Component({
  components: { login, register, forgot, forgotSecure, contact, newsletter },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped></style>
