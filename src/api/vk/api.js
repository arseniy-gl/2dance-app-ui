// @flow

import connect from "@vkontakte/vkui-connect-promise";

type VKApiMethod = "database.getCities" | 'database.getCitiesById';



export type GetCitiesRes = VKWebAppCallAPIMethodResult<DatabaseGetCitiesResponse>
export type PGetCitiesRes = Promise<GetCitiesRes>

export type GetCitiesByIdRes = VKWebAppCallAPIMethodResult<DatabaseGetCitiesByIdResponse>
export type PGetCitiesByIdRes = Promise<GetCitiesByIdRes>

async function vkRequest(method: VKApiMethod, access_token: string, params: any) {
  return connect.send("VKWebAppCallAPIMethod", {
    method,
    params: { ...params, v: "5.103", access_token }
  });
}

export async function getCities(token: string):PGetCitiesRes {
  const params = {
    country_id: 1,
    count: 32
  };
  return vkRequest('database.getCities', token, params);
}

export async function getCitiesById(id: number, token: string):PGetCitiesByIdRes {
  const params = {
    city_ids: id,
  };
  return vkRequest('database.getCitiesById', token, params);
}

export async function searchCities(q: string, token: string):PGetCitiesRes {
  const params = {
    q,
    country_id: 1,
    count: 32
  };
  return vkRequest('database.getCities', token, params);
}
