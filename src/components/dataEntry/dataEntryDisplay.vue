<template>
    <div class="data-entry-display-root">
        <div class="section is-small data-entry-display-section">
            <div v-if="Object.keys(causesOfDeaths).length === 0" class="has-text-centered is-size-4 data-display-empty">
                <p>Apparently you dont have any cause of death in-game yet? Hmmm.....</p>
            </div>
            <div v-if="Object.keys(causesOfDeaths).length > 0">
                <div class="tile is-ancestor deaths-root">
                    <div class="tile">
                        <ul class="death-items-cause">
                            <li v-for="deathKey of Object.keys(causesOfDeaths)" 
                                :key="deathKey"
                                v-rainbow="causesOfDeaths[deathKey].color">
                                    <span class="death-item-cause">{{ causesOfDeaths[deathKey].cause }}</span>
                                    <span v-html="generateTallyMarks(causesOfDeaths[deathKey].deathCount)"
                                        class="tally-marks-root"
                                    ></span>
                            </li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'dataEntryDisplay',
    created(){
        this.$store.dispatch('getAllDeaths');
    },
    methods: {
        generateTallyMarks(deathCount){
            let tallyMarksMarkup = '';
            let counter = 0;
            while((counter+5)<=deathCount){
                let pathToImg = require('../../assets/tally_marks_all.png');
                tallyMarksMarkup += "<img src="+pathToImg+ " class='tally-marks-img'/>&nbsp";
                counter += 5;
            }
            for(let i=counter; i<deathCount; i++){
                let tally_mark_img_num = Math.floor(Math.random() * 5)+1;
                let pathToImg = require('../../assets/tally_mark' + tally_mark_img_num + '.png');
                tallyMarksMarkup += "<img src="+pathToImg+ " class='tally-marks-img'/>";
            }
            
            return tallyMarksMarkup;
        }
    },
    computed: {
    ...mapGetters([
      'causesOfDeaths',
      'errorCode'
    ])
  },
  directives: {
        'rainbow' : {
            beforeMount(el, binding, vnode, prevVnode){
                el.style.color = binding.value;
            }
        }
    }
}
</script>

<style scoped>
@font-face { 
    font-family: "Yusei Magic";
    src: url("../../assets/fonts/YuseiMagic-Regular.ttf"); 
}

.data-entry-display-root{
    font-family: 'Yusei Magic';
    background-color: #379683;
    max-height: 240px;
    overflow-y: auto;
}

.data-entry-display-section{
    padding-bottom: 20px;
    padding-top: 20px;
}

.data-display-empty{
    /*For the text thats displayed when no deaths*/
    font-weight: bold;
    color: #05386B;
}
.deaths-root{
    background-color: #eDF5E1;
    border-radius: 10px;
}

.death-items-cause{
    font-weight: bold;
    padding-left: 9%;
    font-size: 20px;
}

.death-items-cause>li{
    border-bottom: 2px solid #379683;
}

.death-item-cause{
    position: relative;
    top: -8px;
}

.tally-marks-root{
    display: inline-block;
    padding-top: 8px;
    padding-left: 15px;
}

.tally-marks-img .tally-marks-all-img{
    width: 60px;
    height: 32px;
}
</style>