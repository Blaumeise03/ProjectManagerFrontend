import Project from '~/assets/data/Project.class'

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
      let project = new Project(p.id, p.corp, p.name, p.created, p.content, p.revenue);
      let content = []
      let childs = []
      for (let c of project.content) {
        c.childs = []
        c.isChild = false;
        c.auto = false;
        c.delete = false;
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
      this.orderProjectContent(project);
      return project;
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
