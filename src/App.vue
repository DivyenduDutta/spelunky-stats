<template>
  <div>
    <app-header />
    <data-entry />
    <data-display />
    <app-footer />
  </div>
</template>
<script>
import appHeader from './components/appHeader';
import appFooter from './components/appFooter';
import dataEntry from './components/dataEntry';
import dataDisplay from './components/dataDisplay';

export default {
  name: 'app',
  components: {
    'app-header': appHeader,
    'app-footer': appFooter,
    'data-entry': dataEntry,
    'data-display': dataDisplay
  }
}
</script>
<style>
@import '../node_modules/bulma/css/bulma.css';

html, body{
  /*CSS resets to override default browser behaviour*/
  margin: 0;
  padding: 0;
}
</style>
