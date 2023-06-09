import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "$lib/server/prisma";
import Github from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET, DEV_GITHUB_ID, DEV_GITHUB_SECRET} from "$env/static/private"
import { sequence } from "@sveltejs/kit/hooks";
import { redirect } from "@sveltejs/kit";

let clientId;
let clientSecret;

if (process.env.NODE_ENV === "development") {
  clientId = DEV_GITHUB_ID
  clientSecret = DEV_GITHUB_SECRET
} else {
  clientId = GITHUB_ID
  clientSecret = GITHUB_SECRET
}



async function authorization({ event, resolve }) {
    // Protect any routes under /user
    if (event.url.pathname.startsWith("/user")) {
      const session = await event.locals.getSession();
      if (!session) {
        throw redirect(303, "/");
      }
    }
  
    // If the request is still here, just proceed as normally
    return resolve(event);
  }

  export const handle = sequence(
    SvelteKitAuth({
      trustHost: true,
      providers: [Github({ clientId: clientId, clientSecret: clientSecret })],
      adapter: PrismaAdapter(prisma)
    }),
    authorization
  );
