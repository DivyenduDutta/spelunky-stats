<template>
    <!-- <div id="app-header-id"
         aria-label="main head">
        <span id="app-header-text">Spelunky Stats</span>
    </div> -->
    <div>
        <div
            class="app-head"
            aria-label="app head"
        >
          <div class="container">
            <section class="section app-head-section">
              <div class="columns is-vcentered is-mobile">
                <div class="column is-narrow column-padding-reduce">
                    <figure class="image">
                      <img src='../assets/header.gif' />
                    </figure>
                </div>
                <div class="column column-padding-reduce two-thirds"><!-- dummy div placed here to align other columns to right--></div>
                <div class="column column-padding-reduce is-narrow">
                  <a
                  class="has-text-light is-size-8"
                  >divine-sense</a>
                </div>
                <div class="column column-padding-reduce is-narrow">
                    <figure class="image has-tooltip-bottom has-tooltip-success" data-tooltip="whats this about" >
                        <a href="https://github.com/DivyenduDutta/spelunky-stats/blob/main/README.md">
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
export default {
    name: 'appHeader'
}
</script>

<style scoped>
.app-head{
    /* background-color: #5CDB95; */
    background-color: #379683;
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
</style>