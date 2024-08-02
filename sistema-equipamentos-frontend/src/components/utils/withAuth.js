import { redirect } from "next/dist/server/api-utils";
import { parseCookies } from "nookies";

export function withAuth(fn) {
  return async (ctx) => {
    const cookies = parseCookies(ctx);
    const tokenCookie = cookies["authtoken"];
    
    if (!tokenCookie) {
      return {
        redirect: {
          destination: "/Login",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
