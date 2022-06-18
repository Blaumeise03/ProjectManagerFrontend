export default class Player {
  constructor(uid, name, ingameID, corpID, parent, user) {
    this.id = uid;
    this.name = name;
    this.ingameID = ingameID;
    this.corpID = corpID;
    this.user = user;
  }
}
