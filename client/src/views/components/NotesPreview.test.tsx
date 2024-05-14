import NotesPreview from "./NotesPreview";
import { render } from "@/utils/testing/utils";
import {
  describe,
  afterEach,
  beforeEach,
  test,
  expect,
  afterAll,
  beforeAll,
} from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/utils/testing/msw";
import { testIds } from "../helpers/testIds";

describe("NotesPreview", () => {
  const notes = [
    {
      id: "1",
      title: "Test title",
      summary: "Test summary...",
    },
  ];

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    const handler = http.get(/\/notes\/preview$/, () => {
      return HttpResponse.json(notes);
    });

    server.use(handler);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test("renders note title", async () => {
    const screen = render(<NotesPreview />);
    const [{ id, title }] = notes;

    expect(
      await screen.findByTestId(testIds.notePreviewCard(id)),
    ).toHaveTextContent(title);
  });

  test("renders note summary", async () => {
    const screen = render(<NotesPreview />);
    const [{ id, summary }] = notes;

    expect(
      await screen.findByTestId(testIds.notePreviewCard(id)),
    ).toHaveTextContent(summary);
  });

  describe("loading", () => {
    beforeEach(() => {
      server.use(http.get("/notes", () => {}));
    });

    test("renders a loading state", async () => {
      const screen = render(<NotesPreview />);

      expect(await screen.findByText("Loading...")).toBeVisible();
    });
  });

  describe("empty state", () => {
    beforeEach(() => {
      server.use(
        http.get(/\/notes\/preview$/, () => {
          return HttpResponse.json([]);
        }),
      );
    });

    test("renders an empty state", async () => {
      const screen = render(<NotesPreview />);

      expect(await screen.findByText("Nothing to show")).toBeVisible();
    });
  });
});
