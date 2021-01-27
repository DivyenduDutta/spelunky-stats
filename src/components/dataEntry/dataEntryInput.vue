<template>
    <div id="app-data-entry-id">
        <div class="field has-addons">
            <div class="control data-display-root-input">
                <input class="input data-display-input" 
                    type="text" 
                    v-model="deathCause"
                    placeholder="Died because...">
            </div>
            <div class="control data-display-root-submit" @click="submitDeathCause">
                <a class="button data-display-submit">
                Submit
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import * as bulmaToast from 'bulma-toast';
import * as CommonConstants from '../../constants/commonConstants';

export default {
    name: 'dataEntryInput',
    data(){
        return {
            deathCause: ''
        }
    },
    methods: {
        submitDeathCause(){
            let death = {
                "cause" : this.deathCause,
                "deathCount" : 1
            };
            this.$store
                .dispatch('addNewDeathCause', death)
                .then((res) => {
                    if(res == CommonConstants.OK_200){
                        bulmaToast.toast({ 
                            message: 'Successfully added',
                            type: 'is-success',
                            position: "top-center",
                            dismissible: true,
                            duration: 3000
                        });
                    }
                    this.deathCause = '';
                });
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
}

.data-display-root-input{
    display: block;
    width: 100%;
    padding: 5%;
    padding-bottom: 2%;
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
    padding: 5%;
    padding-bottom: 2%;
    padding-left: 0;
}

.data-display-submit{
    font-size: 20px;
}
</style>