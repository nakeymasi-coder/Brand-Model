import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
    if (!prompt) return Response.json({ error: 'A prompt is required.' }, { status: 400 });
    if (prompt.length > 2000) return Response.json({ error: 'Prompt is too long (max 2000 characters).' }, { status: 400 });

    const result = await base44.asServiceRole.integrations.Core.GenerateImage({
      prompt
    });

    const url = result?.url;
    if (!url) return Response.json({ error: 'Image generation failed.' }, { status: 500 });

    return Response.json({ url });
  } catch (error) {
    return Response.json({ error: error.message || 'Something went wrong.' }, { status: 500 });
  }
}