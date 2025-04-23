import { HttpMethods } from "./constants/HttpMethods";
import { API_PATHS } from "./constants/ApiPaths";
import { ROLES } from "./constants/Roles";

export const RolePermission: Record<string, any> = {

    [HttpMethods.POST]: {

      [API_PATHS.ADD_PLAYER_PATH]: [
         ROLES.ADMIN
      ],
      [API_PATHS.ADD_PLAYER_IMAGE_PATH]: [
        ROLES.ADMIN,
        ROLES.USER
      ],
      [API_PATHS.ADD_TEAM_PATH]: [
        ROLES.ADMIN
      ]
    },

   [HttpMethods.GET]: {

      [API_PATHS.GET_ALL_PLAYERS_PATH]: [
        ROLES.ADMIN,
        ROLES.USER
      ],
      [API_PATHS.GET_PLAYER_PATH_ID]: [
        ROLES.ADMIN,
        ROLES.USER
      ],
      [API_PATHS.GET_PLAYER_IMAGE_PATH]: [
        ROLES.ADMIN,
        ROLES.USER
      ],
      [API_PATHS.GET_ALL_TEAMS_PATH]: [
        ROLES.ADMIN,
        ROLES.USER
      ],
      [API_PATHS.GET_TEAM_PATH_ID]: [
        ROLES.ADMIN,
        ROLES.USER
      ]
    }
  };
  