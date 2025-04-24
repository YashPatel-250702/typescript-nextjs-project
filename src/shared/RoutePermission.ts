import { HttpMethods } from "./constants/HttpMethods";
import { API_PATHS } from "./constants/ApiPaths";
import { ROLES } from "./constants/Roles";
import { HTTP_METHODS } from "next/dist/server/web/http";
import { Role } from "@prisma/client";

export const RolePermission: Record<string, any> = {
  [HttpMethods.POST]: {
    [API_PATHS.ADD_PLAYER_PATH]: [
      ROLES.ADMIN,
    ],
    [API_PATHS.ADD_PLAYER_IMAGE_PATH]: [
      ROLES.ADMIN,
    ],
    [API_PATHS.ADD_TEAM_PATH]: [
      ROLES.ADMIN,
    ],
  },

  [HttpMethods.GET]: {
    [API_PATHS.GET_USER_BYID]: [
      ROLES.ADMIN,
      ROLES.USER,
    ],
    
    [API_PATHS.GET_ALL_PLAYERS_PATH]: [
      ROLES.ADMIN,
      ROLES.USER,
    ],
    [API_PATHS.GET_PLAYER_PATH_ID]: [
      ROLES.ADMIN,
      ROLES.USER,
    ],
    [API_PATHS.GET_PLAYER_IMAGE_PATH]: [
      ROLES.ADMIN,
      ROLES.USER,
    ],
    [API_PATHS.GET_ALL_TEAMS_PATH]: [
      ROLES.ADMIN,
      ROLES.USER,
    ],
    [API_PATHS.GET_TEAM_PATH_ID]: [
      ROLES.ADMIN,
      ROLES.USER,
    ],

    
  },

  [HttpMethods.DELETE]: {
    [API_PATHS.DELETE_PLAYER_BYID]: [
      ROLES.ADMIN,
    ],
    [API_PATHS.DELETE_TEAM_BYID]: [
      ROLES.ADMIN,
    ],
  },
  [HttpMethods.PUT]:{
    [API_PATHS.UPDATE_USER_BYID]: [
      ROLES.ADMIN,
      ROLES.USER
    ],

    [API_PATHS.UPDATE_PLAYER_BYID]:[
      ROLES.ADMIN,
    ],
    [API_PATHS.UPDATE_TEAM_BYID]:[
      ROLES.ADMIN
    ]

    
  }
};
