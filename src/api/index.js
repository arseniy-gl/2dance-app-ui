// 2flow

import axios            from "axios";
import { ticketCreate } from "../utils/yandex/metrics";

const baseUrl = "https://"+process.env.REACT_APP_HOSTNAME+"/api";

export async function getTickets(id?: string): Promise<Ticket[]> {
  if (id) {
    return (await axios.get(baseUrl + "/tickets/" + id)).data;
  } else {
    return (await axios.get(baseUrl + "/tickets")).data;
  }
}

export async function postTickets(ticket: $Rest<Ticket, { _id: string }>) {
  ticketCreate();
  return (await axios.post(baseUrl + "/tickets", ticket)).data;
}

export async function putTickets(ticket: Ticket) {
  await axios.put(baseUrl + "/tickets/" + ticket._id, ticket);
  return (await axios.get(baseUrl + "/tickets/" + ticket._id)).data;
}

export async function delTickets(ticket: Ticket) {
  return (await axios.delete(baseUrl + "/tickets/" + ticket._id)).data;
}

export async function getConfigs(id?: string): Promise<TwoDanceConfigs[]> {
  if (id) {
    return (await axios.get(baseUrl + "/configs/" + id)).data;
  } else {
    return (await axios.get(baseUrl + "/configs")).data;
  }
}

export async function postConfigs(config: $Rest<TwoDanceConfigs, { _id: string }>): Promise<TwoDanceConfigs> {
  return (await axios.post(baseUrl + "/configs", config)).data;
}

export async function putConfigs(config: TwoDanceConfigs) {
  await axios.put(baseUrl + "/configs/" + config._id, config);
  return (await axios.get(baseUrl + "/configs/" + config._id)).data;
}

export async function delConfigs(config: TwoDanceConfigs) {
  return (await axios.delete(baseUrl + "/configs/" + config._id)).data;
}

export async function getEvents(id?: string): Promise<DanceEvent[]> {
  if (id) {
    return (await axios.get(baseUrl + "/events/" + id)).data;
  } else {
    return (await axios.get(baseUrl + "/events")).data;
  }
}

export async function postEvents(obj: $Rest<DanceEvent, { _id: string }>) {
  return (await axios.post(baseUrl + "/events", obj)).data;
}

export async function putEvents(obj: DanceEvent) {
  await axios.put(baseUrl + "/events/" + obj._id, obj);
  return (await axios.get(baseUrl + "/events/" + obj._id)).data;
}

export async function delEvents(obj: DanceEvent) {
  return (await axios.delete(baseUrl + "/events/" + obj._id)).data;
}

export async function getUsers(id?: string): Promise<number[]> {
  if (id) {
    return (await axios.get(baseUrl + "/users/" + id)).data;
  } else {
    return (await axios.get(baseUrl + "/users")).data;
  }
}

export async function getUsersByParams(params: any): Promise<User[]> {
  return (await axios.get(baseUrl + "/users", {params})).data;
}

export async function postUsers(obj: $Rest<User, { _id: string }>): Promise<User> {
  return (await axios.post(baseUrl + "/users", obj)).data;
}

export async function putUsers(obj: User): Promise<User[]> {
  await axios.put(baseUrl + "/users/" + obj._id, obj);
  return (await axios.get(baseUrl + "/users/" + obj._id)).data;
}

export async function delUsers(obj: User): Promise<User[]> {
  return (await axios.delete(baseUrl + "/users/" + obj._id)).data;
}

export async function postNotify(req: NotifyRequest) {
  return (await axios.post(baseUrl + "/notifies", req)).data;
}

export async function getGroups(id?: string): Promise<VkGroup[]> {
  if (id) {
    return (await axios.get(baseUrl + "/groups/" + id)).data;
  } else {
    return (await axios.get(baseUrl + "/groups")).data;
  }
}

export async function postGroups(obj: $Rest<VkGroup, {|_id: string|}>) {
  return (await axios.post(baseUrl + "/groups", obj)).data;
}

export async function putGroups(obj: VkGroup) {
  await axios.put(baseUrl + "/groups/" + obj._id, obj);
  return (await axios.get(baseUrl + "/groups/" + obj._id)).data;
}

export async function postIdGroups(obj: number[]) {
  return (await axios.post(baseUrl + "/spider", obj));
}
