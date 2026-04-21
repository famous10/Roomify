import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import type { Connect } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    {
      name: "ignore-chrome-devtools",
      configureServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
          if (req.url === "/.well-known/appspecific/com.chrome.devtools.json") {
            res.writeHead(204);
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
