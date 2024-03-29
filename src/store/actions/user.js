// @flow

import { createAction } from "redux-actions";

const actions: UserActions = {
  setToken: createAction('USER_SET_TOKEN'),
  setGroupName: createAction('USER_SET_GROUP_NAME'),
  setCurrent: createAction('USER_SET_CURRENT')
};

export default actions

