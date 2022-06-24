<template>
  <div class="container p-5 mt-5 box">
    <h1>Ein Fehler ist aufgetreten. Statuscode: {{ error.statusCode }}</h1>
    <div class="alert alert-danger">
      <strong>Fehler!</strong>
      <span v-if="error.statusCode === 404">Die angegebene Seite konnte nicht geladen werden!</span>
      <span v-else-if="error.statusCode === 401">
        Unautorisierter Zugang, bitte die Anmeldung prüfen!<br />
        <i>Dieser Fehler bedeutet vermutlich, dass kein Nutzer aktuell angemeldet ist.</i>
      </span>
      <span v-else-if="error.statusCode === 403">
        Unzureichende Berechtigungen!<br />
        <i>Dieser Fehler bedeutet, dass Sie keinen Zugriff auf die gewünschte Ressource haben</i>
      </span>
      <span v-else>Unbekannter Fehler.</span>
    </div>


    <h2>Fehlermeldung:</h2>
    <div class="container box code p-2 mb-1">
      <pre class="m-0" id="debugMessage">{{ error.message }}</pre>
      <button class="btn btn-primary mt-4" @click="copyMsg">Kopieren</button>
    </div>
    <p class="mb-4">Sie können diese Fehlermeldung kopieren und an einen Administrator senden wenn Sie der Ansicht sind, es handle sich um einen vom Server verschuldeten Fehler.</p>
    <h2>Weitere Hilfe</h2>
    <p>Sie können den Status Code in der MDN Dokumentation nachlesen:</p>
    <p><a :href="getLink">{{ getLink }}</a></p>
    <p>Zusätzlich gibt es hier für alle häufigen Fehler eine Erklärung:</p>
    <error-faq :code="error.statusCode" />
    <NuxtLink to="/" class="btn btn-warning mt-5">Zurück zur Home Page</NuxtLink>
  </div>
</template>

<script>
  import ErrorFaq from '~/components/ErrorFaq.vue';
  import devalue from '@nuxt/devalue';

  export default {
    components: {
      ErrorFaq
    },
    props: {
      error: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        originalError: null,
      }
    },
    computed: {
      getResponseData() {
        if (this.isReal(this.error.response) && this.isReal(this.error.response.data)) {
          //console.log("t1")
          return devalue(this.error.response.data);
        } else {
          //console.log(this.error)
          return null;
        }
      },
      getLink() {
        //console.log((typeof this.error.statusCode) + ' ' + (typeof this.error.statusCode) == Number)
        if (parseInt(this.error.statusCode) != NaN) {
          return 'https://developer.mozilla.org/de/docs/Web/HTTP/Status/' + this.error.statusCode;
        }
        return 'https://developer.mozilla.org/de/docs/Web/HTTP/Status';
      }
    },
    created() {
      //console.log(this.error)
    },
    methods: {
      isReal(obj) {
        return obj !== undefined && obj !== null;
      },
      copyMsg() {
        /* Get the text field */
        var copyText = document.getElementById("debugMessage");

        /* Select the text field */
        //copyText.select();
        //copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.textContent);

        /* Alert the copied text */
        alert("Nachricht wurde kopiert!");
      }
    },
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

<style lang="scss">
  .box {
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2), 0px -2px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
</style>
