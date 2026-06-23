import handler from "./dist/server/server.js";


Bun.serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url);

    // 2. 静态资源 fallback（非常关键）
    const filePath = `./dist/client${url.pathname}`;

    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    // 1. 先走 SSR handler（TanStack）
    try {
      const res = await handler.fetch(req);
      if (res) return res;
    } catch (e) {
      console.error("SSR error:", e);
    }

    return new Response(null, {
      status: 404,
    });
  },
});
