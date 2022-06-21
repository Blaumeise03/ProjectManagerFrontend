export default (ctx) => {
  ctx.$axios.onError((error) => {
    const errorMsg = error.response ? error.response.data.message : 'Unknown error'
    const errorCode = error.response ? parseInt(error.response.status) : -1
    if (errorCode === 401 && ctx.route.name != "login") {
      console.log(errorCode + ' - ' + errorMsg + ' on: ' + ctx.route.path)
      //console.log(ctx.route)
      ctx.redirect('/login?redirect=' + ctx.route.path)
    } else {
      throw new Error(error)
    }
  })
}
