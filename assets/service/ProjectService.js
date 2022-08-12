import Project from '~/assets/data/Project.class'
import Item from '~/assets/data/Item.class'

export default class CorpService {
  constructor($axios) {
    this.axios = $axios
  }

  findByID(id) {
    if (id == null || id == -1) return null;
    //API call
    return this.axios({
      method: 'get',
      url: 'project/' + id,
      withCredentials: true
    }).then((response) => {
      const p = response.data;
      for (let c of p.content) {
        if (c.item) {
          c.item = Item.parseFullItem(c.item);
        }
      }
      let project = new Project(p.id, p.corp, p.name, p.created, p.content, p.revenue);
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
      this.orderProjectContent(project);
      return project;
    }).catch(() => {
      return null;
    })
  }

  save(project) {
    let data = {};
    data.id = project.id;
    data.corp = project.corpID;
    data.name = project.name;
    data.created = project.created;
    data.revenue = project.revenue;
    data.content = [];
    for (let c of project.content) {
      data.content.push({
        id: c.id,
        project: data.id,
        itemID: c.itemID,
        order: c.order,
        amount: c.amount,
        build: c.build,
        efficiency: c.efficiency,
        parent: c.parent
      });
    }
    return this.axios({
      method: 'post',
      url: 'project',
      data: data,
      withCredentials: true
    }).then((response) => {
      return true;
    }).catch(() => {
      return false;
    })
  }

  orderProjectContent(project) {
    let childs = project.content.filter(c => c.isChild);
    for (let c of childs) {
      project.content.splice(project.content.indexOf(c), 1);
    }

    function compare(a, b) {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    }

    project.content.sort(compare);

    for (let c of project.content) {
      let cs = c.childs;
      if (cs.length > 0) {
        cs.sort(compare);
        let i = project.content.indexOf(c) + 1;
        for (let d of cs) {
          project.content.splice(i, 0, d);
          i++;
        }
      }
    }
  }
}
