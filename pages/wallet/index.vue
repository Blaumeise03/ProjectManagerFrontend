<template>
  <div class="container-fluid p-0">
    <h1 class="title">
      Kontos von [{{ corp.tag }}]
    </h1>
    <div class="container-md box">Kontostände [{{ corp.tag }}] {{ corp.name }} (ID: {{ corp.cid }})</div>
    <wallet-list :wallets="wallets" />
  </div>
</template>

<script>
  import WalletList from '~/components/wallet/WalletList.vue'

  export default {
    components: {
      WalletList,
    },
    data() {
      return {
        //CorpID of this page
        corpID: null,
        //Corresponding corp object with future data
        corp: {
          type: Object,
          default() {
            return {
              tag: 'N/A',
              name: 'N/A',
              cid: null
            };
          }
        },
        //All wallets of this corp
        wallets: {
          type: Array,
          default() {
            return [];
          }
        }
      }
    },
    /**
     * Nuxt lifecycle hook -> https://nuxtjs.org/docs/concepts/nuxt-lifecycle/.
     * 
     * Validate the redirect to this page, if the user does not has a corp, the redirect will be declined and the user is redirected to the homepage.
     * 
     */
    validate({ params, query, store, redirect, app }) {
      if (store.state.user.user.cid == null) {
        app.$eventHub.$emit('general-error', {message: "No Corp found/not logged in!"})
        redirect('/');
        return false;
      };
      return true;
    },
    /**
     * Nuxt lifecycle hook -> https://nuxtjs.org/docs/concepts/nuxt-lifecycle/.
     *
     * Called before the components are loaded.
     * 
     * @param ctx nuxt context
     */
    async asyncData(ctx) {
      try {
        return {
          corpID: ctx.app.store.state.user.user.cid,
          wallets: await ctx.app.$services.player.findWalletsByCorp(ctx.app.store.state.user.user.cid),
          corp: await ctx.app.$services.corp.findByID(ctx.app.store.state.user.user.cid)
        }
      } catch (error) {

      }
    },
    /**
     * Nuxt lifecycle hook -> https://nuxtjs.org/docs/concepts/nuxt-lifecycle/.
     *
     * Called when the DOM is ready..
     */
    mounted() {
      
    },
  }
</script>
<style lang="scss">
  .negative {
    color: red;
  }

  .positive {
    color: green;
  }

  .balance {
    //right: 50px;
    position: relative;
    //left:100%;
    width:fit-content;
    margin-left:auto;
    height: max-content;
    padding: 4px;

    div {
      line-height: 50px;
      height: 50px;
      display: inline-block;
      width: 45px;
      text-align: center;
      padding: 0;
      cursor: pointer;
    }
  }
</style>
