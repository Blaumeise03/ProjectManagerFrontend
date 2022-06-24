<template>
  <div class="container-fluid p-0">
    <error-modal :error="error" />
    <navbar :key="$route.fullPath" />
    <nuxt />
  </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import ErrorModal from '~/components/ErrorModal.vue'
  var loadedError = null;

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
      }
    },
    created() {
      //console.log("receiver1 online")
      
      this.$nuxt.$eventHub.$on('axios-error', (error) => {
        this.error = error;
        //console.log("receive1")
      });
      this.$nuxt.$eventHub.$on('general-error', (error) => {
        this.error = error;
      })

      if (loadedError != null) {
        this.$nuxt.$eventHub.$emit('axios-error', loadedError)
        //this.error = loadedError;
        //console.log("send2")
      }
    },
    mounted() {
      //console.log(this.loadedError)
    },
    middleware(ctx) {
      /*console.log(ctx.route)
      ctx.$eventHub.$on('axios-error', (error) => {
        loadedError = error;
        //console.log("receive2")
      });
      ctx.$eventHub.$on('general-error', (error) => {
        loadedError = error;
      })*/
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

