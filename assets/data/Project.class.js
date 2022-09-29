import Item from "~/assets/data/Item.class"

export default class Project {
  constructor(id, corp, name, created, content, revenue) {
    this.id = id;
    this.corpID = corp;
    this.name = name;
    this.created = created
    if (content)
      this.content = content;
    else this.content = [];
    if (revenue)
      this.revenue = revenue;
    else this.revenue = [];
  }

  static parseData(data) {
    if (data.content) {
      for (let c of data.content) {
        if (c.item) {
          c.item = Item.parseFullItem(c.item);
        }
      }
    }
    let project = new Project(data.id, data.corp, data.name, data.created, data.content, data.revenue);
    let content = []
    let childs = []
    for (let c of project.content) {
      c.childs = []
      c.isChild = false;
      c.auto = false;
      if (c.parent == null) {
        content.push(c);
      } else {
        childs.push(c);
      }
    }
    for (let child of childs) {
      for (let c of content) {
        if (c.id == child.parent) {
          c.childs.push(child);
          child.isChild = true;
          child.auto = true;
          break;
        }
      }
    }
    project.content = content;
    project.defaultPrice = "MARKET_LOWEST_SELL";
    return project;
  }
}
