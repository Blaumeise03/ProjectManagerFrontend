import Vue from 'vue'

export default (ctx, inject) => {
  inject('eventHub', new Vue())

  ctx.$axios.onError((error) => {
    //console.log(error.response)
    const errorMsg = error.response ? error.response.data.message : 'Unknown error'
    const errorCode = error.response ? parseInt(error.response.status) : -1
    if (errorCode == 401 && ctx.route.name != "login") {
      //console.log(errorCode + ' - ' + errorMsg + ' on: ' + ctx.route.path)
      ctx.redirect('/login?redirect=' + ctx.route.path);
    } else if (errorCode == 401 && ctx.route.name == "login") {
      //Ingnore error
    } else {
      if (process.client) {
        ctx.app.$eventHub.$emit('axios-error', error);
      } else {
        console.log("erroooor2 " + errorCode + " on " + ctx.route.name)
        console.log(ctx.route.name != "login")
        //ctx.redirect('/axiosError', );
        console.warn(error)
        if (errorMsg == undefined) {
          ctx.error({
            statusCode: errorCode
          });
        } else {
          var info = (error.response && error.response.data && error.response.data.message) ? ':\n' + error.response.data.message + '\n' : ''
          ctx.error({
            statusCode: errorCode,
            message: error.message + info + '\nResponse received from server:\n' + JSON.stringify(error.response.data, undefined, 2)
          });
        }
      }
      //console.log("send")
      //throw new Error(error);
    }
  })
}
