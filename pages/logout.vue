<template>
  <div class="container">
    <h1 class="title">
      Logout
    </h1>
    <form @submit.prevent="performLogout" action="post">
      <button type="submit">
        Logout
      </button>
    </form>
    <div id="success"></div>
  </div>
</template>
<script>

  export default {
    data() {
      return {

      }
    },
    methods: {
      async performLogout() {
        let successDiv = document.getElementById("success");
        if (await this.$services.login.performLogout()) {
          successDiv.textContent = "Logout successfull";
        } else {
          successDiv.textContent = "Logout failed";
        }
      }
    }
  }
</script>
<style>
  form {
    width: 200px;
    margin: auto;
    text-align: center;
  }

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
</style>
