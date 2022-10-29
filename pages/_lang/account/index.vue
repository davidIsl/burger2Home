<template lang="pug">
b-container.py-5(fluid)
  b-row
    b-col.text-center(md='24')
      h2.mb-4.underline-title {{ $t('pages.account.title') }}
      p.mb-5 {{ $t('pages.account.text') }}
      b-container
        b-row
          b-col.border(md='7')
            accountMenu(
              v-bind:currentAnchor='currentAnchor'
              v-on:childChange='onChildChange'
            ).
          b-col.border.mt-4.mt-md-0(md='16' offset-md='1')
            transition(name='fade' mode='out-in')
              component(
                v-bind:is='currentChild'
                v-on:childChange='onChildChange'
                v-bind:params='currentParams'
              )
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
import accountMenu from './_components/accountMenu.vue';

import profilShow from './_components/profilShow.vue';
import profilUpdate from './_components/profilUpdate.vue';

import deliveryShow from './_components/deliveryShow.vue';
import deliveryUpdate from './_components/deliveryUpdate.vue';
import deliveryAdd from './_components/deliveryAdd.vue';

import paymentShow from './_components/paymentShow.vue';
import paymentAdd from './_components/paymentAdd.vue';

import passwordUpdate from './_components/passwordUpdate.vue';

import orderShow from './_components/orderShow.vue';

@Component({
  components: {
    accountMenu,
    profilShow,
    profilUpdate,
    deliveryShow,
    deliveryUpdate,
    deliveryAdd,
    paymentShow,
    paymentAdd,
    passwordUpdate,
    orderShow,
  },
})
export default class extends Vue {
  childs: Record<string, any> = {
    'show-profil': profilShow,
    'update-profil': profilUpdate,
    'show-delivery': deliveryShow,
    'update-delivery': deliveryUpdate,
    'add-delivery': deliveryAdd,
    'show-payment': paymentShow,
    'add-payment': paymentAdd,
    'update-password': passwordUpdate,
    'show-orders': orderShow,
  };

  currentAnchor: string = 'show-profil';
  currentChild: any = profilShow;
  currentParams: any = null;

  mounted() {
    const that = this;
    const hash = this.$route.hash;

    this.currentChild = this.childs.profils;
    this.onChildChange(hash.substring(1, hash.length));

    window.onpopstate = function () {
      that.onChildChange(
        that.$route.hash.substring(1, that.$route.hash.length)
      );
    };
  }

  onChildChange(anchor: any, params?: any) {
    if (!anchor) {
      anchor = 'show-profil';
    }

    this.currentParams = params;

    const child: any = this.childs[anchor];

    if (!child) {
      return;
    }

    this.currentAnchor = anchor;
    this.currentChild = child;
    if (this.$route.hash !== `#${anchor}`) {
      this.$router.push({ hash: anchor });
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-leave-active {
  opacity: 0;
  transition: 0.2s;
}
.fade-leave {
  opacity: 1;
}

.fade-enter-active {
  opacity: 1;
  transition: 0.2s;
}
.fade-enter {
  opacity: 0;
}
</style>
