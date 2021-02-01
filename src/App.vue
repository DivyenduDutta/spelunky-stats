<template>
  <div>
    <loading v-if="loading"/>
    <app-header />
    <data-entry-root />
    <data-display />
    <app-footer />
  </div>
</template>
<script>
import appHeader from './components/appHeader';
import appFooter from './components/appFooter';
import dataEntryRoot from './components/dataEntry/dataEntryRoot';
import dataDisplay from './components/dataDisplay';
import loading from './components/loading/loading';
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    'app-header': appHeader,
    'app-footer': appFooter,
    'data-entry-root': dataEntryRoot,
    'data-display': dataDisplay,
    'loading' : loading
  },
  computed: {
      ...mapGetters([
      'loading'
      ])
  }
}
</script>
<style>
@import '../node_modules/bulma/css/bulma.css';
@import '../node_modules/bulma-tooltip/dist/css/bulma-tooltip.min.css';

html, body{
  /*CSS resets to override default browser behaviour*/
  margin: 0;
  padding: 0;
  overflow: hidden;
  
  cursor: url('./assets/cursor.png'), auto;
  background-color: #379683;
  
  /*Sticky header at bottom */
  min-height: 100%;
}

::selection {
  /*Text selection highlight through out changes*/
  color: #05386B;
  background: #8EE4AF;
}

.noselect {
  /*Avoid selection of images*/
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
