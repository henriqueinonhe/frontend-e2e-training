import Fastify from "fastify";
import { v4 as uuid } from "uuid";
import { readFile, writeFile } from "fs/promises";
import cors from "@fastify/cors";
import staticPlugin from "@fastify/static";
import { resolve } from "path";
import { z } from "zod";
import jwt from "@fastify/jwt";

const fastify = Fastify();

fastify.register(jwt, {
  secret: "secret",
});
fastify.register(cors);
fastify.register(staticPlugin, {
  root: resolve(new URL(import.meta.url).pathname, "../public/docs"),
  prefix: "/docs",
  redirect: true,
});

fastify.get("/notes/preview", async (req, res) => {
  if (!(await userIsLoggedIn(req))) {
    res.status(401).send({ message: "User is not logged in!" });
    return;
  }

  await randomDelay();

  const userId = getUserId(req);

  const notes = await retrieveNotes(userId);

  const preview = notes.map((note) => {
    const { text, ...noteWithoutText } = note;
    const noteWords = note.text.split(" ");
    const summarizedText =
      noteWords.length > 10
        ? noteWords.slice(0, 10).join(" ") + "..."
        : note.text;

    return {
      ...noteWithoutText,
      summary: summarizedText,
    };
  });

  const sortedPreview = [...preview].sort(
    (left, right) => left.createdAt - right.createdAt,
  );

  res.send(sortedPreview);
});

fastify.get("/notes/:noteId", async (req, res) => {
  await randomDelay();

  if (shouldFail()) {
    res.status(503).send({ message: "Service unavailable" });
    return;
  }

  if (!(await userIsLoggedIn(req))) {
    res.status(401).send({ message: "User is not logged in!" });
    return;
  }

  const userId = getUserId(req);

  const notes = await retrieveNotes(userId);

  const note = notes.find((note) => note.id === req.params.noteId);

  if (!note) {
    return res.status(404).send({ message: "Note not found" });
  }

  res.send(note);
});

const createNoteDtoSchema = z.object({
  title: z.string(),
  text: z.string(),
});

fastify.post("/notes", async (req, res) => {
  await randomDelay();

  if (shouldFail()) {
    res.status(503).send({ message: "Service unavailable" });
    return;
  }

  if (!(await userIsLoggedIn(req))) {
    res.status(401).send({ message: "User is not logged in!" });
    return;
  }

  // Maybe we should validate here
  const createNoteDtoCandidate = req.body;

  const result = createNoteDtoSchema.safeParse(createNoteDtoCandidate);

  if (result.error) {
    res.status(422).send(result.error.message);
    return;
  }

  const createNoteDto = result.data;

  const userId = getUserId(req);

  const notes = await retrieveNotes(userId);

  const note = {
    id: uuid(),
    ...createNoteDto,
    createdAt: Date.now(),
    userId,
  };

  const updatedNotes = [...notes, note];

  await storeNotes(userId, updatedNotes);

  res.status(201).send(note);
});

const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
});

const updateNoteSchema = z.object({
  title: z.string(),
  text: z.string(),
});

fastify.put("/notes/:noteId", async (req, res) => {
  await randomDelay();

  if (shouldFail()) {
    res.status(503).send({ message: "Service unavailable" });
    return;
  }

  if (!(await userIsLoggedIn(req))) {
    res.status(401).send({ message: "User is not logged in!" });
    return;
  }

  // Maybe we should validate here
  const id = req.params.noteId;
  const updatedNoteCandidate = req.body;

  const result = updateNoteSchema.safeParse(updatedNoteCandidate);

  if (result.error) {
    res.status(422).send(result.error.message);
    return;
  }

  const userId = getUserId(req);

  const updatedNote = {
    ...result.data,
    id,
    userId,
  };

  const notes = await retrieveNotes(userId);

  const noteExists = notes.some((note) => note.id === id);

  if (!noteExists) {
    res.status(404).send({ message: "Note not found" });
    return;
  }

  const updatedNotes = notes.map((note) =>
    note.id === id ? updatedNote : note,
  );

  await storeNotes(userId, updatedNotes);

  res.status(200).send(updatedNote);
});

fastify.delete("/notes/:noteId", async (req, res) => {
  await randomDelay();

  if (shouldFail()) {
    res.status(503).send({ message: "Service unavailable" });
    return;
  }

  if (!(await userIsLoggedIn(req))) {
    res.status(401).send({ message: "User is not logged in!" });
    return;
  }

  const userId = getUserId(req);

  const notes = await retrieveNotes(userId);

  const note = notes.find((note) => note.id === req.params.noteId);

  if (!note) {
    return res.status(404).send({ message: "Note not found" });
  }

  const updatedNotes = notes.filter((note) => note.id !== req.params.noteId);

  await storeNotes(userId, updatedNotes);

  res.status(200);
});

fastify.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = await retrieveUsers();

  const selectedUser = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!selectedUser) {
    res.status(401).send({ message: "Email or password incorrect!" });
    return;
  }

  res
    .status(200)
    .send({ token: fastify.jwt.sign({ userId: selectedUser.id }) });
});

fastify.get("/isLoggedIn", async (req, res) => {
  if (!(await userIsLoggedIn(req))) {
    res.status(200).send(false);
    return;
  }

  res.status(200).send(true);
});

fastify.listen({
  port: process.env.PORT ?? "3001",
});

const retrieveNotes = async (userId) => {
  const serializedNotes = await readFile("./storage.json", "utf-8");

  return JSON.parse(serializedNotes).filter((note) => note.userId === userId);
};

const storeNotes = async (userId, notes) => {
  const serializedNotes = await readFile("./storage.json", "utf-8");

  const existingNotes = JSON.parse(serializedNotes);

  const updatedNotes = existingNotes
    .filter((note) => note.userId !== userId)
    .concat(notes);

  await writeFile("./storage.json", JSON.stringify(updatedNotes, null, 2));
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () => wait(500 + Math.random() * 1000);

const shouldFail = () => {
  if (Math.random() > 0.9) {
    return true;
  }

  return false;
};

const retrieveUsers = async () => {
  const serializedUsers = await readFile("./users.json", "utf-8");

  return JSON.parse(serializedUsers);
};

const userIsLoggedIn = async (req) => {
  try {
    await req.jwtVerify();
    return true;
  } catch {
    return false;
  }
};

const getUserId = (req) => {
  return req.user.userId;
};
