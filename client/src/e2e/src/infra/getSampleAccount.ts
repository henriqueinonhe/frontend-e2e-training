import { readFile } from "node:fs/promises";
import { sample } from "lodash-es";

export const getSampleAccount = async () => {
  const serializedUsers = await readFile("../api/users.json", "utf-8");
  const users = JSON.parse(serializedUsers);

  return sample(users)!;
};
