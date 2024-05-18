# Services
All api call functions must be created inside this directory. 

example: 

```
import { UserTypes } from "models/user";
import { api } from "./api";

export async function createUser(payload: UserTypes.ReqCreateUser) {
  return api.post<UserTypes.ReqCreateUser, UserTypes.ResCreateUser>("/user", payload)
}

export async function getUser(userId: string) {
  return api.get<UserTypes.ResUser>(`/user/${userId}`)
}

export async function deleteUser(userId: string ) {
  return api.delete<UserTypes.ResUser>(`/user/${userId}`)
}

```
