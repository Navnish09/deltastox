import { USER_ROLES } from "@/app/_globals/constant";
import { Authority } from "@/app/_globals/context/AuthContext";

export const isAdmin = (authorities: Array<Authority>) => {
  if (!authorities) return false;
  
  return authorities.some(({ authority }) => authority === USER_ROLES.ADMIN);
};
