import LoginService from '~/assets/service/LoginService'
import TransactionService from '~/assets/service/TransactionService'
import PlayerService from '~/assets/service/PlayerService'
import CorpService from '~/assets/service/CorpService'
import ItemService from '~/assets/service/ItemService'
import ProjectService from '~/assets/service/ProjectService'
import ContractService from '~/assets/service/ContractService'

export default (ctx, inject) => {
  const services = {
    login: new LoginService(ctx.$axios),
    transaction: new TransactionService(ctx.$axios),
    player: new PlayerService(ctx.$axios),
    corp: new CorpService(ctx.$axios),
    item: new ItemService(ctx.$axios),
    project: new ProjectService(ctx.$axios),
    contract: new ContractService(ctx.$axios)
  }

  inject('services', services)
}
