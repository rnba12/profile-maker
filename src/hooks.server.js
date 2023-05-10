import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Github from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private"
import { sequence } from "@sveltejs/kit/hooks";
import { redirect } from "@sveltejs/kit";

const prisma = new PrismaClient();

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
      providers: [Github({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
      adapter: PrismaAdapter(prisma)
    }),
    authorization
  );
