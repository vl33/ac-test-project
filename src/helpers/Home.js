import * as dataJSON from '../state/stateJson.json';

export const getInitialData = () => {
  let projectList = [];

  const {
    companies,
    config,
    favorites: {Project: favorites},
    projects,
    project_labels: labels,
    users,
  } = dataJSON;

  Object.values(projects).forEach(projectVal => {
    let projectItem = {
      id: projectVal.id,
      name: projectVal.name,
      favorite: favorites.includes(projectVal.id),
    };

    if ('company_id' in projectVal) {
      Object.values(companies).forEach(companiesVal => {
        if (projectVal.company_id === companiesVal.id) {
          projectItem.company = companiesVal.name;
        }
      });
    }

    if ('label_id' in projectVal) {
      Object.values(labels).forEach(labelVal => {
        if (projectVal.label_id === labelVal.id) {
          projectItem.labelName = labelVal.name;
          projectItem.labelColor = labelVal.color;
        }
      });
    }

    if ('created_by_id' in projectVal) {
      Object.values(users).forEach(usersVal => {
        if (projectVal.created_by_id === usersVal.id) {
          projectItem.user = usersVal.display_name;
          projectItem.userLogged = usersVal.id === config.logged_user_id;
        }
      });
    }
    projectList.push(projectItem);
  });

  sortData(projectList);
  return sortData(projectList);
};

export const sortData = list => {
  const favoritesList = list
    .filter(item => item.favorite)
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

  const otherItemsList = list
    .filter(item => item.favorite === false)
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

  return favoritesList.concat(otherItemsList);
};
