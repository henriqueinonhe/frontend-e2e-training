window.onload = function () {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: "StandaloneLayout",
    spec: {
      openapi: "3.1.0",
      "x-stoplight": {
        id: "y195z8hcl5t9f",
      },
      info: {
        title: "Don't Forget",
        version: "1.0",
      },
      servers: [
        {
          url: "http://localhost:3001",
        },
      ],
      paths: {
        "/notes/preview": {
          get: {
            summary: "Notes Preview",
            tags: [],
            responses: {
              200: {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/NotePreview",
                      },
                    },
                  },
                },
              },
            },
            operationId: "get-notes-preview",
            description: "Returns a preview of all existing notes.",
          },
        },
        "/notes": {
          post: {
            summary: "Create Note",
            operationId: "post-notes",
            responses: {
              201: {
                description: "Created",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Note",
                    },
                  },
                },
              },
            },
            description: "Creates a new note.",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CreateNoteDto",
                  },
                },
              },
            },
          },
        },
        "/notes/{noteId}": {
          get: {
            summary: "Get Note By Id",
            tags: [],
            operationId: "get-notes-:nodeId",
            description: "Gets a single note by id.",
            parameters: [],
            responses: {
              200: {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Note",
                    },
                  },
                },
              },
            },
          },
          put: {
            summary: "Update Note",
            operationId: "put-notes-:nodeId",
            responses: {
              200: {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Note",
                    },
                  },
                },
              },
            },
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UpdateNoteDto",
                  },
                },
              },
            },
            description: "Updates a note.",
          },
          delete: {
            summary: "Delete Note",
            operationId: "delete-notes-:nodeId",
            responses: {
              200: {
                description: "OK",
              },
            },
            description: "Deletes a note.",
          },
          parameters: [
            {
              schema: {
                type: "string",
              },
              name: "noteId",
              in: "path",
              required: true,
            },
          ],
        },
      },
      components: {
        schemas: {
          Note: {
            title: "Note",
            "x-stoplight": {
              id: "8gk444uskcr0j",
            },
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              title: {
                type: "string",
              },
              text: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
            },
            required: ["id", "title", "text", "createdAt"],
          },
          CreateNoteDto: {
            title: "CreateNoteDto",
            "x-stoplight": {
              id: "dvplw5hhz47gd",
            },
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              text: {
                type: "string",
              },
            },
            required: ["title", "text"],
          },
          NotePreview: {
            title: "NotePreview",
            "x-stoplight": {
              id: "nccke4t4m3p0h",
            },
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              title: {
                type: "string",
              },
              summary: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
            },
            required: ["id", "title", "summary", "createdAt"],
          },
          UpdateNoteDto: {
            title: "UpdateNoteDto",
            "x-stoplight": {
              id: "2oohb4faxt0b4",
            },
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              text: {
                type: "string",
              },
            },
          },
        },
      },
    },
  });
};
