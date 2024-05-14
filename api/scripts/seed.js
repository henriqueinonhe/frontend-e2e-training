import { writeFile } from "node:fs/promises";
import { faker, fakerKO } from "@faker-js/faker";

const main = async () => {
  const initialUsers = Array.from({ length: 1000 }).map(() => ({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));

  const initialNotes = initialUsers.flatMap((user) =>
    Array.from({ length: 4 }).map(() => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      text: faker.lorem.sentences(),
      userId: user.id,
    })),
  );

  await Promise.all([
    writeFile("./storage.json", JSON.stringify(initialNotes, null, 2)),
    writeFile("./users.json", JSON.stringify(initialUsers, null, 2)),
  ]);
};

main();
