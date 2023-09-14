
export enum API {
  GET_ROLES = '/appuser/v1/get/roles',
  GET_ROLEUSERS = '/appuser/v1/get/roleusers',
  CREATE_ROLEUSER = '/appuser/v1/create/roleuser',
  DELETE_ROLEUSER = '/appuser/v1/delete/roleuser',
  UPDATE_ROLE = '/appuser/v1/update/role',

  GET_APP_USERS = '/appuser/v1/get/app/users',
  GET_APP_ROLES = '/appuser/v1/get/app/roles',
  CREATE_APP_ROLE = '/appuser/v1/create/app/role',
  GET_APP_ROLE_USERS = '/appuser/v1/get/app/roleusers',
  CREATE_APP_ROLE_USER = '/appuser/v1/create/app/roleuser',
  DELETE_APP_ROLE_USER = '/appuser/v1/delete/app/roleuser',
}
