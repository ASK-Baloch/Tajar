import express from "express";
import { getPayloadClient } from "./get-playload";
import { nextApp, nextHandler } from "./next-utils";
import { appRouter } from "./trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebhookHandler } from "./webhooks";
import nextBuild from "next/dist/build";
import path from 'path'
import { PayloadRequest } from "payload/types";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext =
  () =>
    ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
      req,
      res,
    });

export type ExpressContext = inferAsyncReturnType<typeof createContext>;
export type WebhookRequest = IncomingMessage & { rawBody: Buffer };

const start = async () => {
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer
    },
  });

  app.post("/api/webhooks/stripe", webhookMiddleware, stripeWebhookHandler);
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  const cartRouter = express.Router();
  cartRouter.use(payload.authenticate);
  cartRouter.get("/", (req, res) => {
    const request = req as PayloadRequest


  })

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("Nextjs is building for production")
      //@ts-expect-error  
      await nextBuild(path.join(__dirname, "../"));
      process.exit()
    })
    return
  }


  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({ router: appRouter, createContext: createContext() })
  );

  app.use((req, res) => nextHandler(req, res));
  nextApp.prepare().then(() => {
    payload.logger.info("Next.js Started");
    app.listen(PORT, async () => {
      payload.logger.info(
        `Nextjs App URL:${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
