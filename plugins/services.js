import ToDoService from '~/assets/service/ToDoService'
import LoginService from '~/assets/service/LoginService'
import TransactionService from '~/assets/service/TransactionService'
import PlayerService from '~/assets/service/PlayerService'
import CorpService from '~/assets/service/CorpService'

export default (ctx, inject) => {
  const services = {
    login: new LoginService(ctx.$axios),
    todo: new ToDoService(ctx.$axios),
    transaction: new TransactionService(ctx.$axios),
    player: new PlayerService(ctx.$axios),
    corp: new CorpService(ctx.$axios)
  }

  inject('services', services)
}
