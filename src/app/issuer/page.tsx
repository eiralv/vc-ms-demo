'use client'

import { useState } from "react";
import QRCode from "react-qr-code";


export default function Issuer() {

    const [pin, setPin] = useState('');
    const [qrCode, setQrCode] = useState('');

    async function issueCredentials() {
        const issue = await ( await fetch('api/issuer') ).json();

        setPin(issue.pin);
        setQrCode(issue.url);
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>Issuer</h1>
            <button className="bg-orange-500 p-3 mt-5" onClick={() => issueCredentials()}>
                Issue credz
            </button>

            {
                pin && qrCode ? 
                <>
                    <h1>
                        {pin}
                    </h1>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qrCode}
                    viewBox={`0 0 256 256`}
                    />
                </>
                : null
            }
        </main>
    )
}