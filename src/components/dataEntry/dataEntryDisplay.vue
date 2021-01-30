<template>
    <div class="data-entry-display-root">
        <div class="section is-small data-entry-display-section">
            <div v-if="initialLoadError" class="has-text-centered is-size-4 data-display-empty">
                <p>Error retrieving your death causes</p>
            </div>
            <div v-if="Object.keys(causesOfDeaths).length === 0 && !initialLoadError" class="has-text-centered is-size-4 data-display-empty">
                <p>Apparently you dont have any cause of death in-game yet? Hmmm.....</p>
            </div>
            <div v-if="Object.keys(causesOfDeaths).length > 0 && !initialLoadError">
                <div class="tile is-ancestor deaths-root">
                    <div class="tile">
                        <ul class="death-items-cause">
                            <li v-for="deathKey of Object.keys(causesOfDeaths)" 
                                :key="deathKey"
                                v-rainbow="causesOfDeaths[deathKey].color">
                                    <span v-if="isSignedIn && isAdmin" 
                                           class="plus-icon-img noselect"
                                           @click="updateDeathCount(deathKey, causesOfDeaths[deathKey], 'plus')">
                                        <img src='../../assets/plus.png'/>
                                     </span>
                                    <span v-if="isSignedIn && isAdmin"
                                           class="minus-icon-img noselect"
                                           @click="updateDeathCount(deathKey, causesOfDeaths[deathKey], 'minus')">
                                        <img src='../../assets/minus.png'/>
                                    </span>
                                    &nbsp;
                                    <span class="death-item-cause">{{ causesOfDeaths[deathKey].cause }}</span>
                                    <span v-html="generateTallyMarks(causesOfDeaths[deathKey].deathCount)"
                                        class="tally-marks-root noselect"
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
import { createBulmaToast } from '../../helpers/toastHelper';

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
        },
        updateDeathCount(deathKey, updatedDeath, action){
            let myUpdatedDeath = {... updatedDeath}; //shallow copy. making changes to state here reflects in store
            if(action === 'plus'){
                myUpdatedDeath.deathCount += 1;
                this.$store.dispatch('updateDeathCount', {deathKey, updatedDeath: myUpdatedDeath})
                    .then((res) => {
                        if(res.errorCode !== '') createBulmaToast(res.errorCode, 'is-danger', 'top-center');
                    });
            }else{
                if(myUpdatedDeath.deathCount === 1){
                    this.$store.dispatch('deleteDeathCause', deathKey)
                        .then((res) => {
                            if(res.errorCode !== '') createBulmaToast(res.errorCode, 'is-danger', 'top-center');
                        });
                }else{
                    myUpdatedDeath.deathCount -= 1;
                    this.$store.dispatch('updateDeathCount', {deathKey, updatedDeath: myUpdatedDeath})
                        .then((res) => {
                            if(res.errorCode !== '') createBulmaToast(res.errorCode, 'is-danger', 'top-center');
                        });
                }
            }
        }
    },
    computed: {
    ...mapGetters([
      'causesOfDeaths',
      'initialLoadError'
    ]),
    ...mapGetters("auth",[
      'isSignedIn',
      'isAdmin'
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
    max-height: 240px;
    overflow-y: auto;
}

.death-items-cause{
    font-weight: bold;
    padding-left: 4%;
    font-size: 20px;
}

.death-item-cause{
    display: inline-block;
    position: relative;
    top: -8px;
    width: 550px;
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

.plus-icon-img{
    cursor: pointer;
}

.minus-icon-img{
    cursor: pointer;
}
</style>