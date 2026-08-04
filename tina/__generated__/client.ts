import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:3002/graphql', token: '', queries,  });
export default client;
  