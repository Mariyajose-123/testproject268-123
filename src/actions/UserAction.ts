import {Api,ApiAi} from '../api/index';
import URL from '../api/serviceUrl';

export const UserLogin = (params: any) => {
  return Api('post', URL.user.Login, params, null);
};

export const UserAuthentication = (params: any) => {
  return Api('post', URL.user.UserAuthentication, params, null);
};

export const  Extract = (params:any) => {
  return ApiAi('post',URL.details.Extract, null, params);
};
