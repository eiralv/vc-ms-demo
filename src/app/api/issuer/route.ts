import { NextApiRequest, NextApiResponse } from "next";
import { issuanceRequest } from "./issuanceRequest";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const issuance = await issuanceRequest(req);

    return new Response(JSON.stringify(issuance))
}