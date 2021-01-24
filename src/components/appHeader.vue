<template>
    <!-- <div id="app-header-id"
         aria-label="main head">
        <span id="app-header-text">Spelunky Stats</span>
    </div> -->
    <div>
        <div
            class="has-background-black"
            aria-label="main head"
        >
      <div class="container">
        <section class="section">
          <div class="columns is-vcentered is-mobile">
            <div class="column is-narrow">
                <h1
                  class="title is-size-4 is-size-6-mobile"
                  style="letter-spacing: -2px"
                >
                  <span class="has-text-white-ter has-text-nowrap"
                    >Spelunky<span class="has-text-success">.</span
                    ><span class="has-text-weight-normal">Stats</span></span
                  >
                </h1>
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
#app-header-id{
    background-color: #c2b9b0;
    height: 50px;
}

#app-header-text{
    font-size: 25px;
}
</style>