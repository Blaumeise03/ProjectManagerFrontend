<template>
  <div>
    <div class="modal" id="error-modal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">{{ getHeader }}</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <p>Ein Fehler ist aufgetreten: </p>
            <p class="code">{{ getMessage }}</p>
            <pre class="code">{{ getBody }}</pre>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      error: null,
    },
    data() {
      return {

      }
    },
    computed: {
      getHeader: function () {
        if (this.error == null || this.error == undefined) return "Fehler!";
        return this.error.message;
      },
      getBody: function () {
        if (this.error == null || this.error == undefined || this.error.response == undefined) return "";
        return JSON.stringify(this.error.response.data, null, 2);
      },
      getMessage: function () {
        if (this.error == null || this.error == undefined ) {
          return "Ein unerwarteter Fehler ist aufgetreten!"
        } else {
          if (this.error.response == undefined) {
            if (this.error.message == undefined) {
              return this.error.error;
            }
            return this.error.message;
          } else {
            return this.error.response.data.status + ': ' + this.error.response.data.message;
          }
        }
        return "Error!"
      }
    },
    methods: {
      onError(error) {
        var modal = new bootstrap.Modal(document.getElementById("error-modal"), {});
        //console.log(modal)
        modal.show();
      }
    },
    watch: {
      error: function (newVal, oldVal) {
        //console.log("changed");
        if (newVal != null) {
          this.onError(newVal);
        }
      }
    },
    mounted() {
      //console.log(this.error)
      if (this.error != null) {
        this.onError(error);
      }
    },
    async asyncData() {
      
    }
  }
</script>

<style lang="scss">
  
</style>
