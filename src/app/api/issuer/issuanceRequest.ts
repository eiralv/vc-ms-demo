import { NextApiRequest } from 'next';
import * as msal from "@azure/msal-node";
import config from '../../../app/issuance_request_config.json';


export async function issuanceRequest(req: NextApiRequest): Promise<string> {
    config.pin.value = genereatePin();
    config.authority = process.env.ISSUER_AUTHORITY ?? '';

    config.callback.url = setCallbackUrl(req);
    config.manifest = process.env.CREDENTIAL_MANIFEST ?? '';

    config.claims.given_name = 'bob'
    config.claims.family_name = 'dylan'

    const token = await getAccessToken()

    const request = await fetch('https://verifiedid.did.msidentity.com/v1.0/verifiableCredentials/createIssuanceRequest', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token?.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(config)


    })

    const issue = await request.json();

    issue.pin = config.pin.value
    return issue;
}

function genereatePin(): string {

    let pin = "";
    for (let i = 0; i < config.pin.length; i++) {
        pin += Math.floor(Math.random() * 10).toString();
    }
    return pin;
}
function setCallbackUrl(req: NextApiRequest): string {
    // @ts-ignore
    return `https://${req.headers.get('host')}/api/issuer/issuanceCallback`;
}

async function getAccessToken() {
    const clientConfig = {
        auth: {
            clientId: process.env.CLIENT_ID ?? '',
            clientSecret: process.env.CLIENT_SECRET ?? '',
            authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`
        }
    }
    
    const pca = new msal.ConfidentialClientApplication(clientConfig);

    return await pca.acquireTokenByClientCredential({ scopes: ['3db474b9-6a0c-4840-96ac-1fceb342124f/.default'] })
}

