import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: Request) {
    const { paramsToSign } = await req.json();

    if (!paramsToSign) {
        return new Response(JSON.stringify({ error: 'Invalid parameters' }), { status: 400 });
    }

    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET as string
    );

    return new Response(JSON.stringify({ signature }));
}
