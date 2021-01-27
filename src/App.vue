<template>
  <div>
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

export default {
  name: 'app',
  components: {
    'app-header': appHeader,
    'app-footer': appFooter,
    'data-entry-root': dataEntryRoot,
    'data-display': dataDisplay
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
}
</style>
