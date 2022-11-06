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
          caption='First slide'
          text='Nulla vitae elit libero, a pharetra augue mollis interdum.'
          img-src='../../static/img/accueil/burger_accueil1.jpg'
        )
        b-carousel-slide.slide(
          caption='First slide'
          text='Nulla vitae elit libero, a pharetra augue mollis interdum.'
          img-src='../../static/img/accueil/burger_accueil2.jpg'
        )
        b-carousel-slide.slide(
          caption='First slide'
          text='Nulla vitae elit libero, a pharetra augue mollis interdum.'
          img-src='../../static/img/accueil/burger_accueil3.jpg'
        )
  b-row
    b-col
      div
        b-carousel.w-100(
          v-model='slide1'
          :interval='8000'
          controls
          indicators
          background='#ababab'
          style='text-shadow: 1px 1px 2px #333'
          @sliding-start='onSecondSlideStart'
          @sliding-end='onSecondSlideEnd'
        )
          b-carousel-slide
            template(slot='img')
              b-row
                b-col.p-3.mx-auto(
                  v-for='(product, index) in products'
                  :key='index'
                  md='4'
                  cols='12'
                )
                  b-card.mb-2.m-2.text-center.card(
                    :title='product.name'
                    :img-src='product.image'
                    img-alt='Image'
                    img-top
                    tag='article'
                    text-variant='secondary'
                    bg-variant='gray'
                  )
                    b-card-text.text-muted.text-center {{ product.description }}
  b-row
    b-col
      div
        VueSlickCarousel.w-100(
          v-if='products.length > 0'
          v-for='(product, index) in products'
          v-bind='carouselOptions'
          ref='carousel'
        )
          b-card.mb-2.m-2.text-center.card(
            :title='product.name'
            :img-src='product.image'
            img-alt='Image'
            img-top
            tag='article'
            text-variant='secondary'
            bg-variant='gray'
          )
            b-card-text.text-muted.text-center {{ product.description }}
        //- .p-2(v-for='(product, index) in products' :key='index')
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';
// import VueSlickCarousel from 'vue-slick-carousel';

interface Product {
  name: string;
  image: string;
  description: string;
  price: number;
}

@Component({
  components: {
    // VueSlickCarousel,
  },
})
export default class extends Vue {
  VueSlickCarousel = require('vue-slick-carousel');
  // carouselOptions = [];
  slide: number = 0;
  slide1: number = 0;

  firstSliding: boolean = false;
  secondSliding: boolean = false;

  carouselOptions: any = {
    dots: false,
    arrows: false,
    infinite: false,
    draggable: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          draggable: true,
        },
      },
      {
        breakpoint: 789,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
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

  onSecondSlideStart() {
    this.secondSliding = true;
  }

  onSecondSlideEnd() {
    this.secondSliding = false;
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
}
.card {
  width: 18em;
  height: 32em;
  font-size: 0.8em;
  text-shadow: 1px 1px 1px var(--darkRed);
}
</style>
