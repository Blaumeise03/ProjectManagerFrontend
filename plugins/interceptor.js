import Vue from "vue"

export default (ctx, inject) => {
  //Event bus
  inject("eventHub", new Vue())

  //Axios error interceptor
  ctx.$axios.onError((error) => {
    const hasResponse = error.response != undefined && error.response != null;
    const errorMsg = error.response ? error.response.data.message : error.message
    const errorCode = error.response ? parseInt(error.response.status) : -1
    if (errorCode == 401 && ctx.route.name != "login") {
      //401 Unauthorized -> Redirecting to login page whilst adding redirect query param and preserving existing query params
      console.log("Auth Error at " + error.config.url + ":");
      console.warn(error);
      ctx.route.query.redirect = ctx.route.path;
      ctx.redirect("/login",  ctx.route.query);
    } else if (errorCode == 401 && ctx.route.name == "login") {
      //Ignore error because it's the login page
    } else {
      //Another error
      console.warn("Error at " + error.config.url + ":");
      console.warn(error);
      if (process.client) {
        //Client side error
        //Passing error into eventhub, it will be received by the default.vue layout and passed into the error modal
        ctx.app.$eventHub.$emit("axios-error", error);
      } else {
        //Server side error
        //Passing error to nuxt, will be handled by the error.vue layout
        if (!hasResponse) {
          ctx.error({
            statusCode: errorCode,
            message: error
          });
        } else {
          //Building error message
          var info = (error.response && error.response.data && error.response.data.message) ? ":\n" + error.response.data.message + "\n" : ""
          ctx.error({
            statusCode: errorCode,
            message: error.message + info + "\nResponse received from server:\n" + JSON.stringify(error.response.data, undefined, 2)
          });
        }
      }
    }
  })
}
