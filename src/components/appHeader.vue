<template>
    <div>
        <div
            class="app-head"
            aria-label="app head"
        >
          <div class="container">
            <section class="section app-head-section">
              <div class="columns is-vcentered is-mobile">
                <div class="column is-narrow column-padding-reduce">
                    <figure class="image noselect">
                      <img src='../assets/header.gif' />
                    </figure>
                </div>
                <div class="column column-padding-reduce two-thirds"><!-- dummy div placed here to align other columns to right--></div>
                <div class="column column-padding-reduce is-narrow">
                  <login v-if="!isSignedIn && !isAdmin"/>
                  <span v-if="isSignedIn && !isAdmin" class="has-text-light is-size-8"> 
                     <span class="user-text">Hi {{ username }} </span>
                    <span class='logout' @click="logout"> 
                      <img class="noselect" src='../assets/logout.png' />
                    </span>
                  </span>
                  <span v-if="isSignedIn && isAdmin" class="has-text-light is-size-8"> 
                    <span class="user-text">Hi {{ username }} (Admin) </span>
                    <span class='logout' @click="logout"> 
                      <img class="noselect" src='../assets/logout.png' />
                     </span>
                  </span>
                </div>
                <div class="column column-padding-reduce is-narrow">
                    <figure class="image has-tooltip-bottom has-tooltip-success noselect" data-tooltip="whats this about" >
                        <a href="https://github.com/DivyenduDutta/spelunky-stats/blob/main/README.md"
                            onclick="window.open(this.href); return false;">
                          <img src='../assets/help.gif' />
                        </a>
                    </figure>
                </div>
              </div>
            </section>
          </div>
    </div>
  </div>
</template>

<script>
import Login from './login/login';
import { mapGetters } from 'vuex';
import { mapActions } from "vuex";
import { createBulmaToast } from '../helpers/toastHelper';

export default {
    name: 'appHeader',
    components: {
      'login' : Login
    },
    computed: {
    ...mapGetters("auth", [
        "username",
        "isAdmin", 
        "isSignedIn"
    ])
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    logout(){
      createBulmaToast('You have logged out', 'is-success', 'top-center');
      this.signOut();
    }
  }
}
</script>

<style scoped>
@font-face { 
    font-family: "Yusei Magic";
    src: url("../assets/fonts/YuseiMagic-Regular.ttf"); 
}

.app-head{
    background-color: #379683;
    font-family: "Yusei Magic";
}

.app-head-section{
  height: 60px;
  padding-top: 15px;
  padding-bottom: 18px;
}

.app-header-text{
    color: #05386B;
}

.column-padding-reduce{
  padding-top: 0px;
}

.logout{
  cursor: pointer;
}

.user-text{
  display: inline-block;
  position: relative;
  top: -10px;
  right: 10px
}
</style>