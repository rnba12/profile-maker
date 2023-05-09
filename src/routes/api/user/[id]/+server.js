import { json } from "@sveltejs/kit"
import { dbConnect } from "$lib/db/db"
import { dbDisconnect } from "$lib/db/db"

export const GET = async () => {
    await dbConnect();
    await dbDisconnect();
    return json({message: "user"},{ status: 201})
}
