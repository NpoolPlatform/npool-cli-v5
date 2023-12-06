
export enum API {
  SIGNUP = '/appuser/v1/signup',
  LOGIN = '/appuser/v1/login',
  LOGIN_VERIFY = '/appuser/v1/loginverify',
  LOGOUT = '/appuser/v1/logout',
  UPDATE_USER = '/appuser/v1/update/user',
  RESET_USER = '/appuser/v1/reset/user',
  GET_LOGIN_HISTORIES = '/appuser/v1/get/loginhistories',
  UPDATE_USERKOL = '/appuser/v1/update/userkol',
  BIND_USER = '/appuser/v1/bind/user',
  // App admin
  GET_USERS = '/appuser/v1/get/users',
  UPDATE_APP_USER = '/appuser/v1/update/app/user',
  GET_ROLES = '/appuser/v1/get/roles',
  GET_ROLEUSERS = '/appuser/v1/get/roleusers',

  // Church admin
  GET_APP_USERS = '/appuser/v1/get/app/users',
  CREATE_APP_USER = '/appuser/v1/create/app/user',
}
