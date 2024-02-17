import { buildConfig } from "payload/config";
import { mongooseAdapter} from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/Product_Files";
import { Orders } from "./collections/Orders";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users , Products , Media , ProductFiles , Orders],
    routes:{
        admin: '/sell'
      },
      admin:{
        user:"users",
        bundler:webpackBundler(),
        meta:{
            titleSuffix:" - Tajar",
            favicon:"/tajar_icon.ico",
            ogImage:"/tajar.png",
        }
      },
      rateLimit:{
        max:2000,
      },
      editor: slateEditor({}),
      db:mongooseAdapter({
        url:process.env.MONGO_URL!,
      }),
      typescript:{
        outputFile: path.resolve(__dirname, "payload-types.ts"),
      },
    }
    // plugins: [],
    // hooks: {},
    // upload: {},
    // locales: [],
    // i18n: {},
    // navigation: [],
    // customRoutes: [],
    // customViews: [],
    // customActions

)