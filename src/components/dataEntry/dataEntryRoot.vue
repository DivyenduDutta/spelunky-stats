<template>
    <div>
        <data-entry-input />
        <data-entry-display />
    </div>
</template>

<script>
import dataEntryInput from './dataEntryInput';
import dataEntryDisplay from './dataEntryDisplay';

export default {
    name: 'dataEntry',
    components : {
        'data-entry-input' : dataEntryInput,
        'data-entry-display' : dataEntryDisplay
    }
}
</script>

<style scoped>
@font-face { 
    font-family: "Yusei Magic";
    src: url("../../assets/fonts/YuseiMagic-Regular.ttf"); 

}
</style>