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
                <div class="column is-narrow">
                    <h1
                      class="title is-size-4 is-size-6-mobile"
                      style="letter-spacing: -2px"
                    >
                      <span class="has-text-nowrap app-header-text">
                        Spelunky
                        <span class="has-text-weight-normal">Stats</span>
                      </span>
                      
                      <!-- <figure class="image is-128x128">
                        <img src='../assets/mgs.gif' />
                    </figure> -->
                    </h1>
                </div>
                <div class="column two-thirds"><!-- dummy div placed here to align other columns to right--></div>
                <div class="column is-narrow">
                  <a
                  class="has-text-light is-size-8"
                  >divine-sense</a>
                </div>
                <div class="column is-narrow">
                  <a
                  class="has-text-light is-size-8"
                  >help</a>
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
    background-color: #5CDB95;
}

.app-head-section{
  height: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.app-header-text{
    color: #05386B;
}
</style>