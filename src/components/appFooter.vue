<template>
   <footer class="footer app-footer-main">
      <div class="content has-text-centered is-size-6 footer-sub">
        Developed by divine-sense out of boredom. Contributors: Music and caffeine.
        Open Source.
        <br /><br />
            <a class="has-text-black"
            href="https://github.com/DivyenduDutta/spelunky-stats">
                <img src='../assets/github.png' class="app-footer-icon"/>
                <span  class="is-size-6">Source Code</span>
            </a>&nbsp;&nbsp;&nbsp;
            <a class="has-text-black"
                href="https://twitter.com/sense_divine">
                <img src='../assets/twitter.png'/>
                <span  class="is-size-6">Twitter</span>
            </a>
    </div>
  </footer>
</template>

<script>
export default {
    name: 'appFooter'
}
</script>

<style scoped>
@font-face { 
    font-family: "Yusei Magic";
    src: url("../assets/fonts/YuseiMagic-Regular.ttf"); 
}

.app-footer-main{
    background-color: #eDF5E1;
    font-family: "Yusei Magic";
    padding-top: 30px;
    padding-bottom: 10px;

    /*Sticky header at bottom*/
    position: absolute;
    height: 150px;
    bottom: 0;
    /*Till here*/
    
    width: 100%;
    transition: height 0.5s;
}

@media only screen and (max-width: 426px) {
  .app-footer-main {
    height: 100px;
    padding-top: 10px;
    padding-bottom: 5px;
  }

  .footer-sub{
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 12px !important;
  }
}
</style>