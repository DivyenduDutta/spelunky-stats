<template>
    <div>
        <div
            class="app-head"
            aria-label="app head"
        >
          <div class="app-container">
            <section class="section app-head-section">
              <div class="columns is-vcentered is-mobile">
                <div class="column column-padding-reduce logo-img">
                    <figure class="image header-img noselect">
                      <img src='../assets/header.gif' />
                    </figure>
                </div>
                <div class="column column-padding-reduce two-thirds"><!-- dummy div placed here to align other columns to right--></div>
                <div class="column column-padding-reduce is-narrow user-info">
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
                <div class="column column-padding-reduce is-narrow help-img">
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
.app-container{
  margin-left: 0px;
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

.user-info{
  font-size: 17px;
}

.header-img {
    height: 56px;
    width: 360px;
    transition: width 0.5s;
  }

@media only screen and (max-width: 716px) {
  .header-img {
    width: 250px;
    padding-top: 5px;
  }
}

@media only screen and (max-width: 608px) {
  .logo-img{
    padding-left: 0px;
    padding-right: 0px;
  }

  .header-img {
    width: 150px;
    padding-top: 15px;
  }

  .user-info{
    font-size: 10px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .help-img{
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>