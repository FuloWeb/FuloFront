import { User, UserAuth, UserRegisterAuth } from "@/entities";
import { createEndpointHook, endpointsMap } from "@/lib/api";


export const usePostRegister = createEndpointHook<UserRegisterAuth, User>(endpointsMap.auth.postRegister)

export const usePostLogin = createEndpointHook<UserAuth, User>(endpointsMap.auth.postLogin)

export const usePostLogout = createEndpointHook(endpointsMap.auth.postLogout)
