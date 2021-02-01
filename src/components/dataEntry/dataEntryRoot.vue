<template>
    <div id="data-entry-root-id">
        <data-entry-input v-if="isSignedIn && isAdmin"/>
        <div v-else
             class="has-text-centered is-size-4 non-admin-text">
                Only Admin can add and update new death causes.
        </div>
        <data-entry-display />
    </div>
</template>

<script>
import dataEntryInput from './dataEntryInput';
import dataEntryDisplay from './dataEntryDisplay';
import { mapGetters } from 'vuex';

export default {
    name: 'dataEntry',
    components : {
        'data-entry-input' : dataEntryInput,
        'data-entry-display' : dataEntryDisplay
    },
    computed: {
    ...mapGetters("auth", [
        "isAdmin", 
        "isSignedIn"
    ])
  }
}
</script>

<style scoped>
@font-face { 
    font-family: "Yusei Magic";
    src: url("../../assets/fonts/YuseiMagic-Regular.ttf"); 

}

.non-admin-text{
    font-family: 'Yusei Magic';
    font-weight: bold;
    color: #05386B;
    padding: 2%;
}

@media only screen and (max-width: 716px) {
  .non-admin-text {
    font-size: 18px !important;
  }
}
</style>