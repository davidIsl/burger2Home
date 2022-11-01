<template lang="pug">
.py-5
  b-container(fluid)
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 {{ $t('pages.bootstrap.title') }}
          a(
            href='https://bootstrap-vue.org/docs'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs
          br.
          a(
            href='https://bootstrap-vue.org/docs/reference/theming'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/reference/theming
          br.
          a(
            href='https://bootstrap-vue.org/docs/reference/color-variants'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/reference/color-variants
          .mt-4
            p.text-justify {{ $t('pages.bootstrap.text')[0] }}
            p.text-justify {{ $t('pages.bootstrap.text')[1] }}
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Font size reponsive example
          pre
            | // Defined in @/assets/scss/font-size.scss
            | $example-font-size: (
            | null: 5px,
            | sm: 10px,
            | md: 15px,
            | lg: 20px,
            | xl: 25px,
            | 1750px: 30px,
            | );
          .mt-4
            .example-font-size Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              |
              | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Alert
          a(
            href='https://bootstrap-vue.org/docs/components/alert'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/alert
          .mt-4
            b-alert(variant='primary' show dismissible) Primary Alert
            b-alert(variant='secondary' show dismissible) Secondary Alert
            b-alert(variant='success' show dismissible) Success Alert
            b-alert(variant='danger' show dismissible) Danger Alert
            b-alert(variant='warning' show dismissible) Warning Alert
            b-alert(variant='info' show dismissible) Info Alert
            b-alert(variant='light' show dismissible) Light Alert
            b-alert(variant='dark' show dismissible) Dark Alert
            b-alert(variant='grey' show dismissible) DarkGrey Alert
            b-alert(variant='darkRed' show dismissible) DarkRed Alert
          .mt-4
            b-alert(variant='success' show dismissible)
              h4.alert-heading Well done!
              p Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
              hr
              p.mb-0 Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Avatar
          a(
            href='https://bootstrap-vue.org/docs/components/avatar'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/avatar
          .mt-4
            b-avatar(src='https://placekitten.com/300/300')
            b-avatar(src='https://placekitten.com/300/300' size='6rem')
            br.
            br.
            b-avatar(variant='secondary')
            b-avatar(variant='primary')
            b-avatar(variant='dark')
            b-avatar(variant='light')
            b-avatar(variant='success')
            b-avatar(variant='danger')
            b-avatar(variant='warning')
            b-avatar(variant='info')
            br.
            br.
            b-avatar(badge)
            b-avatar(
              badge
              badge-variant='danger'
              src='https://placekitten.com/300/300'
            )
            b-avatar(badge badge-variant='warning' icon='people-fill')
            b-avatar(
              badge
              badge-variant='success'
              src='https://placekitten.com/300/300'
            )
            b-avatar(badge badge-variant='dark' text='BV')
            b-avatar(
              square
              badge
              badge-variant='dark'
              text='BV'
            )
            br.
            br.
            b-avatar(badge)
            b-avatar(badge badge-left)
            b-avatar(badge badge-top)
            b-avatar(badge badge-left badge-top)
            br.
            br.
            b-avatar(badge)
            b-avatar(badge badge-offset='-0.5em')
            b-avatar(badge badge-offset='-2px')
            b-avatar(badge badge-offset='2px')
            b-avatar(badge badge-top)
            b-avatar(badge badge-top badge-offset='-0.5em')
            b-avatar(badge badge-top badge-offset='-2px')
            b-avatar(badge badge-top badge-offset='2px')
            br.
            br.
            b-avatar-group(size='60px')
              b-avatar
              b-avatar(text='BV' variant='primary')
              b-avatar(src='https://placekitten.com/300/300' variant='info')
              b-avatar(text='OK' variant='danger')
              b-avatar(variant='warning')
              b-avatar(src='https://placekitten.com/320/320' variant='dark')
              b-avatar(icon='music-note' variant='success')
            br.
            b-avatar-group(size='5rem')
              b-avatar
              b-avatar
              b-avatar
              b-avatar
              b-avatar
            br.
            b-avatar-group(variant='success')
              b-avatar
              b-avatar(variant='info')
              b-avatar
              b-avatar
              b-avatar
            br.
            b-avatar-group(rounded='lg')
              b-avatar
              b-avatar
              b-avatar
              b-avatar
              b-avatar
            br.
            b-avatar-group(overlap='0.65')
              b-avatar
              b-avatar
              b-avatar
              b-avatar
              b-avatar
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Badge
          a(
            href='https://bootstrap-vue.org/docs/components/badge'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/badge
          .mt-4
            b-badge.mr-2.mb-2(variant='primary') Primary
            b-badge.mr-2.mb-2(variant='secondary') Secondary
            b-badge.mr-2.mb-2(variant='success') Success
            b-badge.mr-2.mb-2(variant='danger') Danger
            b-badge.mr-2.mb-2(variant='warning') Warning
            b-badge.mr-2.mb-2(variant='info') Info
            b-badge.mr-2.mb-2(variant='light') Light
            b-badge.mr-2.mb-2(variant='dark') Dark
            br.
            b-badge.mr-2.mb-2(variant='primary' pill) Primary
            b-badge.mr-2.mb-2(variant='secondary' pill) Secondary
            b-badge.mr-2.mb-2(variant='success' pill) Success
            b-badge.mr-2.mb-2(variant='danger' pill) Danger
            b-badge.mr-2.mb-2(variant='warning' pill) Warning
            b-badge.mr-2.mb-2(variant='info' pill) Info
            b-badge.mr-2.mb-2(variant='light' pill) Light
            b-badge.mr-2.mb-2(variant='dark' pill) Dark
            br.
            b-badge.mr-2.mb-2(href='#' variant='primary') Primary
            b-badge.mr-2.mb-2(href='#' variant='secondary') Secondary
            b-badge.mr-2.mb-2(href='#' variant='success') Success
            b-badge.mr-2.mb-2(href='#' variant='danger') Danger
            b-badge.mr-2.mb-2(href='#' variant='warning') Warning
            b-badge.mr-2.mb-2(href='#' variant='info') Info
            b-badge.mr-2.mb-2(href='#' variant='light') Light
            b-badge.mr-2.mb-2(href='#' variant='dark') Dark
            br.
            h2 Example heading
              b-badge.ml-2 New
            h3 Example heading
              b-badge.ml-2 New
            h4 Example heading
              b-badge.ml-2 New
            h5 Example heading
              b-badge.ml-2 New
            h6 Example heading
              b-badge.ml-2 New
            br.
            b-button(variant='primary') Notifications
              b-badge.ml-2(variant='light') 4
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Button
          a(
            href='https://bootstrap-vue.org/docs/components/button'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/button
          .mt-4
            b-button.mr-2 Button
            b-button.mr-2.mb-2(variant='primary') Primary
            b-button.mr-2.mb-2(variant='secondary') Secondary
            b-button.mr-2.mb-2(variant='success') Success
            b-button.mr-2.mb-2(variant='danger') Danger
            b-button.mr-2.mb-2(variant='warning') Warning
            b-button.mr-2.mb-2(variant='info') Info
            b-button.mr-2.mb-2(variant='light') Light
            b-button.mr-2.mb-2(variant='dark') Dark
            b-button.mr-2.mb-2(variant='gray') DarkGrey
            b-button.mr-2.mb-2(variant='darkRed') Dark REd
            br.
            b-button.mr-2.mb-2(variant='outline-primary') Primary
            b-button.mr-2.mb-2(variant='outline-secondary') Secondary
            b-button.mr-2.mb-2(variant='outline-success') Success
            b-button.mr-2.mb-2(variant='outline-danger') Danger
            b-button.mr-2.mb-2(variant='outline-warning') Warning
            b-button.mr-2.mb-2(variant='outline-info') Info
            b-button.mr-2.mb-2(variant='outline-light') Light
            b-button.mr-2.mb-2(variant='outline-dark') Dark
            b-button.mr-2.mb-2(variant='outline-gray') Dark Grey
            b-button.mr-2.mb-2(variant='outline-darkRed') Dark REd
            br.
            b-button.mr-2.mb-2(variant='primary' size='sm') Small Button
            b-button.mr-2.mb-2(variant='primary' size='md') Default Button
            b-button.mr-2.mb-2(variant='primary' size='lg') Large Button
            br.
            b-button.mb-2(variant='primary' block) Block Level Button
            b-button.mr-2.mb-2(variant='primary' pill) Button pill
            b-button.mr-2.mb-2(variant='primary' squared) Button squared
            b-button.mr-2.mb-2(variant='primary' disabled) Button disabled
            br.
            b-button.mr-2.mb-2(variant='primary' disabled)
              b-spinner(small)
              span.sr-only Loading...
            b-button.mr-2.mb-2(variant='primary' disabled)
              b-spinner(small type='grow')
              span.ml-2 Loading...
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Breadcrumb
          a(
            href='https://bootstrap-vue.org/docs/components/breadcrumb'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/breadcrumb
          .mt-4
            b-breadcrumb
              b-breadcrumb-item(href='javascript:void(0);') Home
              b-breadcrumb-item(href='javascript:void(0);') Foo
              b-breadcrumb-item(href='javascript:void(0);') Bar
              b-breadcrumb-item(active) Baz
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Calendar
          a(
            href='https://bootstrap-vue.org/docs/components/calendar'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/calendar
          .mt-4
            b-calendar(block locale='en-US')
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Card
          a(
            href='https://bootstrap-vue.org/docs/components/card'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/card
          .mt-4
            b-card-group(deck)
              b-card(
                header='featured'
                header-tag='header'
                footer='Card Footer'
                footer-tag='footer'
                title='Title'
                header-bg-variant='primary'
                footer-bg-variant='primary'
                text-variant='dark'
                img-src='https://picsum.photos/300/300/?image=41'
                img-alt='Image card exemple'
              )
                b-card-text Header and footers using props.
                b-button.text-light(href='#' variant='primary') Go somewhere
              b-card(
                title='Title'
                header-tag='header'
                footer-tag='footer'
                header-bg-variant='success'
                footer-bg-variant='warning'
                text-variant='dark'
                img-src='https://picsum.photos/300/300/?image=41'
                img-alt='Image card exemple'
              )
                template(#header) featured
                b-card-text Header and footers using slots.
                b-button.text-light(href='#' variant='primary') Go somewhere
                template(#footer) Card Footer
          .mt-4
            b-card-group(deck)
              b-card.text-center(
                bg-variant='primary'
                text-variant='white'
                header='Primary'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card.text-center(
                bg-variant='secondary'
                text-variant='white'
                header='Secondary'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card.text-center(
                bg-variant='success'
                text-variant='white'
                header='Success'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          .mt-4
            b-card-group(deck)
              b-card.text-center(
                bg-variant='info'
                text-variant='white'
                header='Info'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card.text-center(
                bg-variant='warning'
                text-variant='white'
                header='Warning'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card.text-center(
                bg-variant='danger'
                text-variant='white'
                header='Danger'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          .mt-4
            b-card-group(deck)
              b-card.text-center(
                bg-variant='light'
                header='Light'
                text-variant='dark'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card.text-center(
                bg-variant='dark'
                header='Dark'
                text-variant='white'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card.text-center(header='Default' text-variant='dark')
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          .mt-4
            b-card-group(deck)
              b-card(
                border-variant='primary'
                header='Primary'
                header-bg-variant='primary'
                header-text-variant='white'
                text-variant='dark'
                align='center'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card(
                border-variant='secondary'
                header='Secondary'
                header-border-variant='secondary'
                header-text-variant='dark'
                text-variant='dark'
                align='center'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card(
                border-variant='success'
                header='Success'
                header-text-variant='dark'
                text-variant='dark'
                align='center'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          .mt-4
            b-card-group(deck)
              b-card(
                border-variant='info'
                header='Info'
                header-text-variant='dark'
                text-variant='dark'
                align='center'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card(
                border-variant='warning'
                header='Warning'
                header-bg-variant='transparent'
                header-text-variant='dark'
                text-variant='dark'
                align='center'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card(
                border-variant='danger'
                header='Danger'
                header-border-variant='danger'
                header-text-variant='danger'
                text-variant='danger'
                align='center'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          .mt-4
            b-card-group.mb-3(deck)
              b-card.text-center(
                border-variant='light'
                header='Light'
                header-text-variant='dark'
                text-variant='dark'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              b-card(
                border-variant='dark'
                header='Dark'
                align='center'
                header-text-variant='dark'
                text-variant='dark'
              )
                b-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Carousel
          a(
            href='https://bootstrap-vue.org/docs/components/carousel'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/carousel
          .mt-4
            b-carousel#carousel-fade(
              style='text-shadow: 0px 0px 2px #000'
              fade
              indicators
              img-width='1024'
              img-height='480'
            )
              b-carousel-slide(
                caption='First slide'
                img-src='https://picsum.photos/1024/480/?image=10'
                img-alt='First slide'
              )
              b-carousel-slide(
                caption='Second Slide'
                img-src='https://picsum.photos/1024/480/?image=12'
                img-alt='Second Slide'
              )
              b-carousel-slide(
                caption='Third Slide'
                img-src='https://picsum.photos/1024/480/?image=22'
                img-alt='Third Slide'
              )
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Collapse
          a(
            href='https://bootstrap-vue.org/docs/components/collapse'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/collapse
          .mt-4
            b-button(v-b-toggle.collapse-1 variant='primary') Toggle Collapse
            b-collapse#collapse-1.mt-2
              b-card
                p.card-text.text-dark Collapse contents Here
                b-button(v-b-toggle.collapse-1-inner size='sm') Toggle Inner Collapse
                b-collapse#collapse-1-inner.mt-2
                  b-card.text-dark Hello!
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Dropdowns
          a(
            href='https://bootstrap-vue.org/docs/components/dropdown'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/dropdown
          .mt-4
            b-dropdown#dropdown-1.m-md-2(
              text='Dropdown Button'
              variant='primary'
              size='lg'
            )
              b-dropdown-item First Action
              b-dropdown-item Second Action
              b-dropdown-item Third Action
              b-dropdown-item(active style='color: white !important') Active action
              b-dropdown-item(disabled) Disabled action
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Responsive Embeds
          a(
            href='https://bootstrap-vue.org/docs/components/embed'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/embed
          .mt-4
            b-embed(
              title='Youtube embed exemple'
              type='iframe'
              aspect='16by9'
              src='https://www.youtube.com/embed/-DyKeMa5tYY'
              allowfullscreen
            )
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Images
          a(
            href='https://bootstrap-vue.org/docs/components/image'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/image
          .mt-4
            b-img(
              src='https://picsum.photos/1024/400/?image=40'
              fluid
              alt='Responsive image'
            )
            br.
            br.
            b-img-lazy(
              src='https://picsum.photos/1024/400/?image=41'
              fluid
              alt='Responsive image'
            )
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Jumbotron
          a(
            href='https://bootstrap-vue.org/docs/components/jumbotron'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/jumbotron
          .mt-4
            b-jumbotron(
              bg-variant='primary'
              text-variant='white'
              border-variant='light'
            )
              template(#header) BootstrapVue
              template(#lead) This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
              hr.my-4
              p It uses utility classes for typography and spacing to space content out within the larger container.
              b-button.mr-2(variant='warning' href='javascript:void(0);') Do Something
              b-button(variant='success' href='javascript:void(0);') Do Something Else
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Layout and Grid System
          a(
            href='https://bootstrap-vue.org/docs/components/layout'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/layout
          b-container.mt-4
            b-row
              b-col.col-example 1 of 2
              b-col.col-example 2 of 2
          b-container.mt-4
            b-row
              b-col.col-example 1 of 3
              b-col.col-example 2 of 3
              b-col.col-example 3 of 3
          b-container.mt-4
            b-row
              b-col.col-example 1 of 3
              b-col.col-example(cols='16') 2 of 3 (wider)
              b-col.col-example 3 of 3
          b-container.mt-4
            b-row
              b-col.col-example(cols='16') col-8
              b-col.col-example(cols='8') col-4
          b-container.mt-4
            b-row
              b-col.col-example(cols='24' md='16') cols="24" md="16"
              b-col.col-example(cols='12' md='8') cols="12" md="8"
          b-container.mt-4
            b-row
              b-col.col-example(cols='12' md='8') cols="6" md="4"
              b-col.col-example(cols='12' md='8') cols="12" md="8"
              b-col.col-example(cols='12' md='8') cols="12" md="8"
          b-container.mt-4
            b-row
              b-col.col-example(cols='12') cols="12"
              b-col.col-example(cols='12') cols="12"
          b-container.mt-4
            b-row.col-canvas-example(align-v='start')
              b-col.col-example One of three columns
              b-col.col-example One of three columns
              b-col.col-example One of three columns
          b-container.mt-4
            b-row.col-canvas-example(align-v='center')
              b-col.col-example One of three columns
              b-col.col-example One of three columns
              b-col.col-example One of three columns
          b-container.mt-4
            b-row.col-canvas-example(align-v='end')
              b-col.col-example One of three columns
              b-col.col-example One of three columns
              b-col.col-example One of three columns
          b-container.mt-4
            b-row.col-canvas-example(align-v='baseline')
              b-col.col-example(style='font-size: 0.75rem') One of three columns
              b-col.col-example One of three columns
              b-col.col-example(style='font-size: 1.25rem') One of three columns
          b-container.mt-4
            b-row.col-canvas-example(align-v='stretch')
              b-col.col-example One of three columns
              b-col.col-example One of three columns
              b-col.col-example One of three columns
          b-container.mt-4
            b-row.col-canvas-example(align-h='start')
              b-col.col-example(cols='8') One of two columns
              b-col.col-example(cols='8') One of two columns
          b-container.mt-4
            b-row.col-canvas-example(align-h='center')
              b-col.col-example(cols='8') One of two columns
              b-col.col-example(cols='8') One of two columns
          b-container.mt-4
            b-row.col-canvas-example(align-h='end')
              b-col.col-example(cols='8') One of two columns
              b-col.col-example(cols='8') One of two columns
          b-container.mt-4
            b-row.col-canvas-example(align-h='around')
              b-col.col-example(cols='8') One of two columns
              b-col.col-example(cols='8') One of two columns
          b-container.mt-4
            b-row.col-canvas-example(align-h='between')
              b-col.col-example(cols='8') One of two columns
              b-col.col-example(cols='8') One of two columns
          b-container.mt-4
            b-row.mb-3
              b-col.col-example First in DOM, no order applied
              b-col.col-example(order='10') Second in DOM, with a larger order
              b-col.col-example(order='2') Third in DOM, with an order of 1
            b-row.mb-3
              b-col.col-example(order='12') First in DOM, with order of 6
              b-col.col-example(order='2') Second in DOM, with an order of 1
              b-col.col-example Third in DOM, no order applied
          b-container.mt-4
            b-row
              b-col.col-example(md='8') md="8"
              b-col.col-example(md='8' offset-md='8') md="8" offset-md="8"
            b-row
              b-col.col-example(md='6' offset-md='6') md="6" offset-md="6"
              b-col.col-example(md='6' offset-md='6') md="6" offset-md="6"
            b-row
              b-col.col-example(md='12' offset-md='6') md="12" offset-md="6"
          b-container.mt-4
            b-row(cols='4')
              b-col.col-example Column
              b-col.col-example Column
              b-col.col-example Column
              b-col.col-example Column
              b-col.col-example Column
              b-col.col-example Column
              b-col.col-example Column
              b-col.col-example Column
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 List group
          a(
            href='https://bootstrap-vue.org/docs/components/list-group'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/list-group
          .mt-4
            b-list-group
              b-list-group-item.text-dark Morbi leo risus
              b-list-group-item(variant='primary') Cras justo odio
              b-list-group-item(href='javascript:void(0);') Dapibus ac facilisis in
              b-list-group-item(href='javascript:void(0);' active) Dapibus ac facilisis in
              b-list-group-item(href='javascript:void(0);') Dapibus ac facilisis in
              b-list-group-item.d-flex.justify-content-between.align-items-center.text-dark Morbi leo risus
                b-badge(variant='primary' pill) 14
              b-list-group-item.text-dark Porta ac consectetur ac
              b-list-group-item.text-dark Vestibulum at eros
          .mt-4
            b-list-group(horizontal)
              b-list-group-item.text-dark Cras justo odio
              b-list-group-item.text-dark Dapibus ac facilisis in
              b-list-group-item.text-dark Morbi leo risus
          .mt-4
            b-list-group
              b-list-group-item.flex-column.align-items-start(href='#' active)
                .d-flex.w-100.justify-content-between
                  h5.mb-1 List group item heading
                  small 3 days ago
                p.mb-1 Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                small Donec id elit non mi porta.
              b-list-group-item.flex-column.align-items-start(href='#')
                .d-flex.w-100.justify-content-between
                  h5.mb-1 List group item heading
                  small.text-muted 3 days ago
                p.mb-1 Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                small.text-muted Donec id elit non mi porta.
              b-list-group-item.flex-column.align-items-start(
                href='#'
                disabled
              )
                .d-flex.w-100.justify-content-between
                  h5.mb-1 Disabled List group item
                  small.text-muted 3 days ago
                p.mb-1 Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                small.text-muted Donec id elit non mi porta.
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Modals
          a(
            href='https://bootstrap-vue.org/docs/components/modal'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/modal
          .mt-4
            b-button(v-b-modal.modal-1 variant='primary') Launch demo modal
            b-modal#modal-1(
              title='BootstrapVue'
              header-bg-variant='light'
              body-bg-variant='light'
              footer-bg-variant='light'
              header-text-variant='dark'
              body-text-variant='dark'
              footer-text-variant='dark'
            )
              p.my-4 Hello from modal!
          .mt-4
            b-button.mr-2(v-b-modal.modal-xl variant='primary') xl modal
            b-button.mr-2(v-b-modal.modal-lg variant='primary') lg modal
            b-button.mr-2(v-b-modal.modal-sm variant='primary') sm modal
            b-button.mr-2(v-b-modal.modal-center variant='primary') Launch centered modal
            b-modal#modal-xl(
              size='xl'
              header-bg-variant='light'
              body-bg-variant='light'
              footer-bg-variant='light'
              header-text-variant='dark'
              body-text-variant='dark'
              footer-text-variant='dark'
            )
              template(#modal-title) Title
              //- template(#modal-header) Header
              template(#default) Default
              //- template(#modal-footer) Footer
            b-modal#modal-lg(
              size='lg'
              header-bg-variant='light'
              body-bg-variant='light'
              footer-bg-variant='light'
              header-text-variant='dark'
              body-text-variant='dark'
              footer-text-variant='dark'
            )
              template(#modal-title) Title
              //- template(#modal-header) Header
              template(#default) Default
              //- template(#modal-footer) Footer
            b-modal#modal-sm(
              size='sm'
              header-bg-variant='light'
              body-bg-variant='light'
              footer-bg-variant='light'
              header-text-variant='dark'
              body-text-variant='dark'
              footer-text-variant='dark'
            )
              template(#modal-title) Title
              //- template(#modal-header) Header
              template(#default) Default
              //- template(#modal-footer) Footer
            b-modal#modal-center(
              centered
              size='lg'
              header-bg-variant='light'
              body-bg-variant='light'
              footer-bg-variant='light'
              header-text-variant='dark'
              body-text-variant='dark'
              footer-text-variant='dark'
            )
              template(#modal-title) Title
              //- template(#modal-header) Header
              template(#default) Default
              //- template(#modal-footer) Footer
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Overlay
          a(
            href='https://bootstrap-vue.org/docs/components/overlay'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/overlay
          .mt-4
            div
              b-overlay(:show='showOverlay' rounded='sm' variant='primary')
                b-card(
                  title='Card with overlay'
                  text-variant='dark'
                  :aria-hidden='showOverlay ? "true" : null'
                )
                  b-card-text Laborum consequat non elit enim exercitation cillum.
                  b-card-text Click the button to toggle the overlay:
                  b-button(
                    :disabled='showOverlay'
                    @click='showOverlay = true'
                    variant='primary'
                  ) Show overlay
              b-button.mt-3(
                @click='showOverlay = !showOverlay'
                variant='primary'
              ) Toggle overlay
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Pagination
          a(
            href='https://bootstrap-vue.org/docs/components/pagination'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/pagination
          br.
          a(
            href='https://bootstrap-vue.org/docs/components/pagination-nav'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/pagination-nav
          .mt-4
            .overflow-auto
              div
                h6 Small
                b-pagination(
                  v-model='currentPagePagination'
                  :total-rows='rowsPagination'
                  size='sm'
                  align='left'
                )
              .mt-3
                h6 Default pills
                b-pagination(
                  v-model='currentPagePagination'
                  :total-rows='rowsPagination'
                  size='md'
                  pills
                  align='left'
                )
              .mt-3
                h6 Large
                b-pagination(
                  v-model='currentPagePagination'
                  :total-rows='rowsPagination'
                  size='lg'
                  align='left'
                )
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Popover
          a(
            href='https://bootstrap-vue.org/docs/components/popover'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/popover
          .mt-4
            b-button#popover-target-1(variant='primary') Hover Me
            b-popover(
              target='popover-target-1'
              triggers='hover'
              placement='top'
            )
              template(#title)
                span.text-dark I am popover
                  b component
                  |
                  | content!
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Progress
          a(
            href='https://bootstrap-vue.org/docs/components/progress'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/progress
          .mt-4
            b-progress.mb-2(
              variant='primary'
              value='20'
              max='100'
              show-value
            )
            b-progress.mb-2(
              variant='secondary'
              value='30'
              max='100'
              show-value
            )
            b-progress.mb-2(
              variant='success'
              value='40'
              max='100'
              show-value
            )
            b-progress.mb-2(
              variant='danger'
              value='50'
              max='100'
              show-value
            )
            b-progress.mb-2(
              variant='warning'
              value='60'
              max='100'
              show-value
            )
            b-progress.mb-2(
              variant='info'
              value='70'
              max='100'
              show-value
            )
            b-progress(
              variant='dark'
              value='80'
              max='100'
              show-value
            )
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Sidebar
          a(
            href='https://bootstrap-vue.org/docs/components/sidebar'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/sidebar
          .mt-4
            b-button(variant='primary' v-b-toggle.sidebar-1) Toggle Sidebar
            b-sidebar#sidebar-1(
              title='Sidebar'
              width='40%'
              right
              shadow
              backdrop
            )
              .px-3.py-2
                p Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                b-img(
                  src='https://picsum.photos/500/500/?image=54'
                  fluid
                  thumbnail
                  alt='Responsive image'
                )
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Skeleton
          a(
            href='https://bootstrap-vue.org/docs/components/skeleton'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/skeleton
          .mt-4
            h5 Wave (default)
            b-card
              b-skeleton(animation='wave' width='85%')
              b-skeleton(animation='wave' width='55%')
              b-skeleton(animation='wave' width='70%')
            h5.mt-3 Fade
            b-card
              b-skeleton(animation='fade' width='85%')
              b-skeleton(animation='fade' width='55%')
              b-skeleton(animation='fade' width='70%')
            h5.mt-3 Throb
            b-card
              b-skeleton(animation='throb' width='85%')
              b-skeleton(animation='throb' width='55%')
              b-skeleton(animation='throb' width='70%')
            h5.mt-3 None
            b-card
              b-skeleton(animation width='85%')
              b-skeleton(animation width='55%')
              b-skeleton(animation width='70%')
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Spinners
          a(
            href='https://bootstrap-vue.org/docs/components/spinner'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/spinner
          .mt-4
            b-spinner(label='Spinning')
            b-spinner(type='grow' label='Spinning')
            br.
            b-spinner(variant='primary' label='Spinning')
            b-spinner(variant='secondary' label='Spinning')
            b-spinner(variant='success' label='Spinning')
            b-spinner(variant='danger' label='Spinning')
            b-spinner(variant='warning' label='Spinning')
            b-spinner(variant='info' label='Spinning')
            b-spinner(variant='light' label='Spinning')
            b-spinner(variant='dark' label='Spinning')
            br.
            b-spinner(variant='primary' type='grow' label='Spinning')
            b-spinner(variant='secondary' type='grow' label='Spinning')
            b-spinner(variant='success' type='grow' label='Spinning')
            b-spinner(variant='danger' type='grow' label='Spinning')
            b-spinner(variant='warning' type='grow' label='Spinning')
            b-spinner(variant='info' type='grow' label='Spinning')
            b-spinner(variant='light' type='grow' label='Spinning')
            b-spinner(variant='dark' type='grow' label='Spinning')
            br.
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Switch (Checkbox)
          a(
            href='https://bootstrap-vue.org/docs/components/form-checkbox#switch-style-checkboxes'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/form-checkbox#switch-style-checkboxes
          .mt-4
            b-form-checkbox(switch size='sm') Small
            b-form-checkbox(switch) Default
            b-form-checkbox(switch size='lg') Large
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Tabs
          a(
            href='https://bootstrap-vue.org/docs/components/tabs'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/tabs
          .mt-4
            b-card(no-body)
              b-tabs(pills card)
                b-tab(title='Tab 1' active)
                  b-card-text.text-dark Tab contents 1
                b-tab(title='Tab 2')
                  b-card-text.text-dark Tab contents 2
    b-container.mb-5
      b-row
        b-col(md='24')
          h2 Toasts
          a(
            href='https://bootstrap-vue.org/docs/components/toast'
            target='_blank'
            rel='noopener'
          ) https://bootstrap-vue.org/docs/components/toast
          .mt-4
            b-button.mb-2.mr-2.mb-2(@click='makeToast()') Default
            b-button.mb-2.mr-2.mb-2(
              variant='primary'
              @click='makeToast("primary")'
            ) Primary
            b-button.mb-2.mr-2.mb-2(
              variant='secondary'
              @click='makeToast("secondary")'
            ) Secondary
            b-button.mb-2.mr-2.mb-2(
              variant='success'
              @click='makeToast("success")'
            ) Danger
            b-button.mb-2.mr-2.mb-2(
              variant='danger'
              @click='makeToast("danger")'
            ) Warning
            b-button.mb-2.mr-2.mb-2(
              variant='warning'
              @click='makeToast("warning")'
            ) Success
            b-button.mb-2.mr-2.mb-2(variant='info' @click='makeToast("info")') Info
            b-button.mb-2.mr-2.mb-2(
              variant='light'
              @click='makeToast("light")'
            ) Light
            b-button.mb-2.mr-2.mb-2(variant='dark' @click='makeToast("dark")') Dark
</template>

<script lang="ts">
// https://github.com/nuxt-community/nuxt-property-decorator
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class extends Vue {
  showOverlay: boolean = false;
  rowsPagination: number = 100;
  currentPagePagination: number = 1;
  $bvToast: any;
  makeToast(variant: any = null) {
    this.$bvToast.toast('Toast body content', {
      title: `Variant ${variant || 'default'}`,
      variant,
      solid: true,
    });
  }
}
</script>

<style lang="scss" scoped>
.col-example {
  background: #d1d1d185;
  border: 2px solid #ff6;
  height: 40px;
  padding: 5px;
  text-align: center;
}
.col-canvas-example {
  background: #d1d1d185;
  border: 2px solid #f66;
  height: 80px;
}
</style>
