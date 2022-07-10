const rootApi = '/ge-service';
export const environment = {
  production: true,
  api: {
    root: rootApi + '/',
    endpoint: rootApi + '/api/students/',
    refresh: rootApi + '/api/refreshtoken/',
    courselink: rootApi + '/api/link/'
  }

};
