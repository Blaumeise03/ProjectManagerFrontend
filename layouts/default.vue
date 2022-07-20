<template>
  <div class="container-fluid p-0">
    <!--Error modal-->
    <error-modal :error="error" />
    <!--Navigation bar, key has to be set to ensure it updates when navigation through the sites-->
    <navbar :key="$route.path" />
    <!--Page content-->
    <nuxt />

    <!--Cookie consent modal-->
    <div class="modal" id="cookieConsent">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Diese Website verwendet Cookies</h4>
            <!--button type="button" class="btn-close">You will never close this modal without accepting it!
              And don't even think about trying "bootstrap.Modal.getOrCreateInstance(document.querySelector('#cookieConsent')).hide();"
              inside the browser's console, that definetly won't work!!!
              -->
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            Diese Website nutzt funktionelle Cookies. Sollten Sie ein Problem damit haben, können sie hier eine Löschung durchführen und werden automatisch
            weitergeleitet. Sollte die Weiterleitung nicht funktionieren, schließen sie die Seite bitte eigenständig. Wenn sie die Seite nutzen wollen, müssen
            sie die Cookies akzeptieren.
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="acceptCookies">Akzeptieren</button>
            <button type="button" class="btn btn-danger" @click="declineCookies">Ablehnen</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import ErrorModal from '~/components/ErrorModal.vue'

  export default {
    components: {
      Navbar,
      ErrorModal
    },
    props: {

    },
    data() {
      return {
        error: null,
        cookieModal: null,
      }
    },
    created() {
      //Listener for erros
      this.$nuxt.$eventHub.$on('axios-error', (error) => {
        this.error = error;
      });
      this.$nuxt.$eventHub.$on('general-error', (error) => {
        this.error = error;
      })
    },
    methods: {
      /**
       * Saves a cookie.
       * 
       * @param cname the name of the cookie
       * @param cvalue the value of the cookie
       * @param exdays the amount of days after which the cookie expires
       */
      setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;sameSite=Lax";
      },
      /**
       * Gets the value of a cooke.
       * 
       * @param cname the name of the cookie
       * @return the value of the cookie
       */
      getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return null;
      },
      /**
       * onClick method for the Cookie Modal.
       *
       * The method hides the cookie modal and sets a 'cookiesAccepted'-Cookie to true to remember the settings.
       */
      acceptCookies() {
        this.setCookie("cookiesAccepted", true, 30);
        this.cookieModal.hide();
      },
      /**
       * Method to delete all cookies, after that the client gets redirected to www.google.com because if the
       * user doesn't want to accept the functional cookies, he can't use the website.
       */
      declineCookies() {
        //Delete all cookies
        document.cookie.split(";").forEach(function (c) {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        //Redirect to www.google.com
        window.location.href = "http://www.google.com";
      }
    },
    mounted() {
      //Get the value of the cookie 
      let cookieConsent = this.getCookie("cookiesAccepted");
      //Get the modal
      this.cookieModal = new bootstrap.Modal(document.getElementById('cookieConsent'), { backdrop: false, keyboard: false });
      if (!cookieConsent) {
        //If not accepted, open modal
        this.cookieModal.show();
      }

    }
  }
</script>


<style>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .box {
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2), 0px -2px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 64px;
    color: #35495e;
    letter-spacing: 1px;
    margin-top: 20px;
    text-align: center;
  }
</style>

