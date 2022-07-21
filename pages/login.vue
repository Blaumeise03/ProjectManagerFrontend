<template>
  <div class="container">
    <h1 class="title">
      Login
    </h1>
    <!--Login form-->
    <form @submit.prevent="performLogin" action="post" class="login-form">
      <p>
        <input id="username"
               v-model="username"
               type="text"
               name="username"
               placeholder="Username"
               required
               autofocus>
      </p>
      <p>
        <input id="password"
               v-model="password"
               type="password"
               name="password"
               placeholder="Password"
               required>
      </p>
      <p>
        <input v-model="remember" type="checkbox" class="rememberMe" name="remember" /> Remember Me
      </p>
      <button type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        username: '',
        password: '',
        remember: false
      }
    },
    methods: {
      /**
       * Method for login in.
       *
       * Sends an api request to the api with the user credentials from the page. If successfull,
       * the client will be redirected to the URL query param 'redirect'. If it doesn't exist, the
       * client will be redirected to the home page. In both cases all query params except for the
       * redirect path will be preserved.
       */
      async performLogin() {
        //Send login and wait for response
        if (await this.$services.login.performLogin(this.username, this.password, this.remember)) {
          //Login successfull
          //Retrieving session details and storing them
          var u = await this.$services.login.getSessionDetails();
          if (u != null) {
            this.$store.commit('user/set', u);
          }
          //Redirecting client
          if (this.$route.query.redirect != null) {
            //Query param found, redirecting to this page
            let q = this.$route.query;
            let target = q.redirect;
            //Deleting redirect query param
            delete q.redirect;
            this.$router.push({ path: target, query: q });
          } else {
            //Redirecting to the homepage
            this.$router.push({ path: '/', query: this.$route.query })
          }
        } else {
          //Login failed, reseting input fields
          this.username = ''
          this.password = ''
        }
      }
    }
  }
</script>
<style lang="scss">
  .login-form {
    width: 200px;
    margin: auto;
    text-align: center;

    input {
      width: 100%;
      border: none;
      border-bottom: 1px black solid;
      background: none;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-weight: 300;
      margin-top: 20px;
      margin-bottom: 20px;
      outline: none;
    }

    .rememberMe {
      width: auto;
      height: auto;
    }

    button {
      width: 100%;
      height: 50px;
      border: none;
      background-color: #f0c808;
      font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      outline: none;
      margin-top: 20px;
      border-radius: 10px;
    }
  }
</style>
