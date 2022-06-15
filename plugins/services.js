import ToDoService from '~/assets/service/ToDoService'
import LoginService from '~/assets/service/LoginService'
import TransactionService from '~/assets/service/TransactionService'

export default (ctx, inject) => {
  const services = {
    login: new LoginService(ctx.$axios),
    todo: new ToDoService(ctx.$axios),
    transaction: new TransactionService(ctx.$axios)
  }

  inject('services', services)
}
