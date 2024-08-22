import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// pages/api/shipment.js
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const clientPostalCode = reqBody.customerPostalCode

        const payload = {
            from: { postal_code: '86700090' }, // CEP da Loja Junior Baby
            to: { postal_code: clientPostalCode }, // CEP de destino
            package: {
                height: 4,
                width: 12,
                length: 17,
                weight: 0.3
            }
        }

        const response = await axios.post('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', payload, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.shipping_token}`,
            },
        });

        return NextResponse.json({
            shippingOptions: response.data
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        })
    }
}
