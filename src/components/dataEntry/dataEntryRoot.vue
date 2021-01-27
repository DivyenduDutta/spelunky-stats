<template>
    <div>
        <data-entry-input />
    </div>
</template>

<script>
import dataEntryInput from './dataEntryInput';

export default {
    name: 'dataEntry',
    components : {
        'data-entry-input' : dataEntryInput 
    },
    data(){ 
        return {
            
        }
    },
    methods: { }
}
</script>

<style scoped>
@font-face { 
    font-family: "Yusei Magic";
    src: url("../../assets/fonts/YuseiMagic-Regular.ttf"); 

}
</style>