<template>
    <div id="app-data-entry-id">
        <div class="field has-addons">
            <div class="control data-display-root-input">
                <input class="input data-display-input" 
                    type="text" 
                    v-model="deathCause"
                    maxlength="44"
                    placeholder="Died because...">
            </div>
            <div class="control data-display-root-submit noselect" @click="submitDeathCause">
                <img id="submit-btn-id" src="../../assets/submit_btn.gif" />
            </div>
        </div>
    </div>
</template>

<script>
import * as CommonConstants from '../../constants/commonConstants';
import { createBulmaToast } from '../../helpers/toastHelper';

export default {
    name: 'dataEntryInput',
    data(){
        return {
            deathCause: ''
        }
    },
    methods: {
        validateInput(){
            return this.deathCause !== '';
        },
        submitDeathCause(){
            
            //handle buttom image first
            document.getElementById('submit-btn-id').src = require('../../assets/submit_btn_pressed.png');

            if(this.validateInput()){
            let death = {
                "cause" : this.deathCause,
                "deathCount" : 1,
                "color" : '#' + Math.random().toString().slice(2,8)
            };
            this.$store
                .dispatch('addNewDeathCause', death)
                .then((res) => {
                    if(res == CommonConstants.OK_200){
                        createBulmaToast('Successfully added', 'is-success', 'top-center');
                    }else{
                        createBulmaToast('Error adding death cause', 'is-danger', 'top-center');
                    }
                    this.deathCause = '';
                    document.getElementById('submit-btn-id').src = require('../../assets/submit_btn.gif');
                });
            }else{
                document.getElementById('submit-btn-id').src = require('../../assets/submit_btn.gif');
                createBulmaToast('Nothing entered!!', 'is-danger', 'top-center');
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

#app-data-entry-id{
    font-family: "Yusei Magic";
    background-color: #379683;
    margin-bottom: 20px;
}

.data-display-root-input{
    display: block;
    width: 50%;
    padding-bottom: 0px;
    padding-top: 2%;
    padding-left: 5%;
    padding-right: 5%;
    margin-left: 18%;
}

.data-display-input{
  appearance: none;
  border: none;
  outline: none;
  background: none;

  background-color:#eDF5E1;
  border-radius: 0px 16px 0px 16px;
  box-shadow: 0px 0px 8px  #21584d;

  font-size: 20px;
  transition: 0.4s;

  color: #05386B;
  font-weight: bolder;
}

.data-display-input:focus{
    border-radius: 16px 0px 16px 0px;
    box-shadow: 0px 0px 16px #21584d;
}

.data-display-root-submit{
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 0px;
    padding-left: 0;
    cursor: pointer;
}
</style>