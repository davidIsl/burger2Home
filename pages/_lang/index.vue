<template lang="pug">
b-container.p-0(fluid)
  b-row.bg-gray.p-3
    b-col
      b-carousel.carousel-1.mx-auto(
        v-model='slide'
        :interval='8000'
        controls
        indicators
        style='text-shadow: 1px 1px 2px #333'
        @sliding-start='onFirstSlideStart'
        @sliding-end='onFirstSlideEnd'
      )
        b-carousel-slide.slide(
          :text='$t("pages.home.text1")'
          img-src='/img/accueil/burger_accueil1.jpg'
        )
        b-carousel-slide.slide(
          :text='$t("pages.home.text2")'
          img-src='/img/accueil/burger_accueil4.jpg'
        )
        b-carousel-slide.slide(
          :text='$t("pages.home.text3")'
          img-src='/img/accueil/burger_accueil3.jpg'
        )
  b-row.bg-gray.p-3
    b-col.mx-auto(lg='22' xl='20')
      .text-secondary.text-center.p-2.m-2.content
        h4 {{ $t('pages.home.title1') }}
  b-row.bg-gray.p-3
    b-col.mx-auto(lg='22' xl='20')
      .p-0
        VueSlickCarousel.w-100(
          v-if='products.length > 0'
          v-bind='carouselOptions'
          ref='carousel'
        )
          b-card.p-2.text-center.card(
            v-for='(product, index) in products'
            :title='product.name'
            :img-src='product.image'
            img-alt='Image'
            img-top
            tag='article'
            text-variant='secondary'
            bg-variant='gray'
          )
            b-card-text.text-muted.text-center {{ product.description }}
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
const VueSlickCarousel = require('vue-slick-carousel');

interface Product {
  name: string;
  image: string;
  description: string;
  price: number;
}

@Component({
  components: {
    VueSlickCarousel,
  },
})
export default class extends Vue {
  // carouselOptions = [];
  slide: number = 0;

  firstSliding: boolean = false;

  carouselOptions: any = {
    dots: true,
    dotsClass: 'slick-dots custom-dot-class',
    edgeFriction: 0.35,
    arrows: false,
    infinite: false,
    speed: 1000,
    draggable: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    // autoplay: 2000,

    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 789,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  onFirstSlideStart() {
    this.firstSliding = true;
  }

  onFirstSlideEnd() {
    this.firstSliding = false;
  }

  products: Product[] = [
    {
      name: 'Le classico',
      image: '../../img/produits/classico.jpg',
      description:
        'Viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 10.5,
    },
    {
      name: 'Smokey Bacon',
      image: '../../img/produits/smokey-bacon.jpg',
      description:
        'Viande de Boeuf hachée, tranches de bacon, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 11,
    },
    {
      name: 'Habibi',
      image: '../../img/produits/habibi.jpg',
      description:
        "Viande d'agneau hachée, laitue iceberg, houmous, concombre mariné, sauce tomate épicée",
      price: 11.5,
    },
    {
      name: 'Double Decker',
      image: '../../img/produits/double-dekker.jpg',
      description:
        'Double Hamburger de viande de Boeuf hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, cornichons, opignons frits, sauce barbecue',
      price: 13,
    },
    {
      name: 'El Sombrero',
      image: '../../img/produits/el-sombrero.jpg',
      description:
        'Viande de poulet hachée, fromage cheddar, laitue iceberg, fines tranches de tomates, salsa verde, oignons rouges, guacamole et crème aigre',
      price: 12,
    },
  ];
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/bt-custom.scss';

.carousel-1 {
  // @include for-phone-only {
  //   width: 200px;
  //   height: 300px;
  // }
  width: 1200px;
  height: 600px;
}

.slide {
  width: 1200px;
  height: 600px;
  font-size: 25px;
  @include for-phone-only {
    width: 300px;
    height: 150px;
    font-size: 15px;
  }
  @include for-tablet-only {
    width: 430px;
    height: 250px;
    font-size: 17px;
  }
  @include for-md-desktop-only {
    width: 760px;
    height: 350px;
    font-size: 20px;
  }
  @include for-xl-desktop-only {
    width: 1000px;
    height: 440px;
    font-size: 22px;
  }
}
// .card {
//   width: 18em;
//   height: 50em;
//   font-size: 0.8em;
//   text-shadow: 1px 1px 1px var(--darkRed);
//   @include for-xxl-desktop-only {
//     width: 1000px;
//     height: 740px;
//     font-size: 16px;
//   }
// }
</style>
