var nextUUID = 0;

export default class UUIDGenerator {
  constructor() {

  }

  getUUID() {
    return nextUUID++;
  }
}
