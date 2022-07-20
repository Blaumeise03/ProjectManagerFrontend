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
            <!--Error information-->
            <p>Ein Fehler ist aufgetreten: </p>
            <p class="code">{{ getMessage }}</p>
            <pre class="code" id="debugMsg">{{ getBody }}</pre>
            <!--Copy debug message button-->
            <p>
              Du kannst die Nachricht kopieren und an einen Administrator senden,
              falls Du der Ansicht bist, es handelt sich um einen Fehler der Website
            </p>
            <button class="btn btn-primary mt-2" @click="copyMsg">Kopieren</button>
            <!--FAQ-->
            <error-faq class="mt-4" :code="getStatusCode" />
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
  import ErrorFaq from '~/components/ErrorFaq.vue';

  export default {
    components: {
      ErrorFaq
    },
    props: {
      error: null,
      statusCode: -1
    },
    data() {
      return {
        active: false
      }
    },
    computed: {
      /**
       * Returns the header if the modal.
       */
      getHeader: function () {
        if (this.error == null || this.error == undefined) return "Fehler!";
        return this.error.message;
      },
      /**
       * Produces a well-formatted body for the error modal.
       */
      getBody: function () {
        if (this.error == null || this.error == undefined || this.error.response == undefined) return "";
        return JSON.stringify(this.error.response.data, null, 2);
      },
      /**
       * Returns the error message.
       */
      getMessage: function () {
        if (this.error == null || this.error == undefined) {
          //Unknown error
          return "Ein unerwarteter Fehler ist aufgetreten!"
        } else {
          //Returns the error message of the error
          if (this.error.response == undefined) {
            if (this.error.message == undefined) {
              return this.error.error;
            }
            return this.error.message;
          } else {
            return this.error.response.data.status + ': ' + this.error.response.data.message;
          }
        }
      },
      /**
       * Returns the error statuscode.
       */
      getStatusCode() {
        return (this.error && this.error.response ? this.error.response.status : -1);
      }
    },
    methods: {
      /**
       * Method to activate the error modal.
       *
       * @param error ignored
       */
      onError(error) {
        if (!this.active) {
          var modal = new bootstrap.Modal(document.getElementById("error-modal"), {});
          modal.show();
        }
      },
      /**
       * Saves the debug message into the clipboard
       */
      copyMsg() {
        // Get the text field
        var copyText = document.getElementById("debugMsg");

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.textContent);
        alert("Nachricht wurde kopiert!");
      }
    },
    watch: {
      /**
       * Watching error, when the error changes to a not-null object the modal has to be opened.
       *
       * @param newVal new error
       * @param oldVal old error
       */
      error: function (newVal, oldVal) {
        if (newVal != null) {
          this.onError(newVal);
        }
      }
    },
    mounted() {
      //Setting up modal
      var modal = document.getElementById("error-modal");
      modal.addEventListener("hidden.bs.modal", function (e) {
        //Makes sure that all backdrops are removed in case the modal got opened twice by accident
        document.querySelectorAll(".modal-backdrop").forEach((b) => {
          b.remove();
        })
      });
      //Open the modal in case there is already an error
      if (this.error != null) {
        this.onError(error);
      }
    }
  }
</script>

<style lang="scss">
</style>
