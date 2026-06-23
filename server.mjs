import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import handler from "./dist/server/server.js";
import { serve } from "srvx";

const clientDir = path.resolve("./dist/client");

serve({
  port: 3000,

  async fetch(request) {
    const url = new URL(request.url);
    const filePath = path.join(clientDir, url.pathname);

    try {
      const stat = await fs.promises.stat(filePath);

      if (stat.isFile()) {
        const stream = fs.createReadStream(filePath);
        return new Response(Readable.toWeb(stream));
      }
    } catch {}

    return handler.fetch(request);
  },
});