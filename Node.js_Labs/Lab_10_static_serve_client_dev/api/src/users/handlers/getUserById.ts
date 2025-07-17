import { users } from "../index";
export function getUserById(id: number) {
  return users.find((u) => u.id === id);
}
