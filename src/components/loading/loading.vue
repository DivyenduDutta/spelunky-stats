<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
            <div class="modal-content noselect">
                <p class="image modal-gif">
                    <img src="../../assets/loading.gif">
                </p>
            </div>
    </div>
</template>

<script>
export default {
    name: 'loading'
}
</script>

<style scoped>
.modal-gif{
    height: 480px;
    width:480px;
}

@media only screen and (max-width: 420px) {
  .modal-gif {
    height: 240px;
    width:240px;
  }
}
</style>