import LoginService from '~/assets/service/LoginService'
import TransactionService from '~/assets/service/TransactionService'
import PlayerService from '~/assets/service/PlayerService'
import CorpService from '~/assets/service/CorpService'
import ItemService from '~/assets/service/ItemService'
import UUIDService from '~/assets/service/UUIDService'

export default (ctx, inject) => {
  const services = {
    login: new LoginService(ctx.$axios),
    transaction: new TransactionService(ctx.$axios),
    player: new PlayerService(ctx.$axios),
    corp: new CorpService(ctx.$axios),
    item: new ItemService(ctx.$axios),
    uuid: new UUIDService()
  }

  inject('services', services)
}
