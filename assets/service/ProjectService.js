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
      let project = Project.parseData(response.data);
      this.orderProjectContent(project);
      return project;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return null;
    })
  }

  findAll() {
    return this.axios({
      method: 'get',
      url: 'project/all',
      withCredentials: true
    }).then((response) => {
      let res = [];
      for (let data of response.data) {
        res.push(Project.parseData(data));
      }
      return res;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return [];
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
      let project = Project.parseData(response.data);
      this.orderProjectContent(project);
      return project;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
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
