import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const videoUrl = typeof body?.video_url === 'string' && body.video_url ? body.video_url : null;
    const imageUrl = typeof body?.image_url === 'string' && body.image_url ? body.image_url : null;
    const brandName = typeof body?.brand_name === 'string' ? body.brand_name.trim() : '';
    const productType = typeof body?.product_type === 'string' ? body.product_type.trim() : '';

    if (!videoUrl && !imageUrl) {
      return Response.json({ error: 'Upload a short video or a reference image to analyze.' }, { status: 400 });
    }

    const file_urls = [videoUrl, imageUrl].filter(Boolean);
    const parts = [];
    if (videoUrl) parts.push('the uploaded short video');
    if (imageUrl) parts.push('the uploaded reference image');

    const prompt = `You are a world-class creative director for a glam brand model campaign studio.
Analyze ${parts.join(' and ')}${brandName ? ` for the brand "${brandName}"` : ''}${productType ? ` (product category: ${productType})` : ''}.

Write a single, vivid, production-ready image-generation prompt for a high-end glam campaign photo.
Describe in detail: the model's look, styling, pose and expression, hair and makeup, wardrobe, lighting, setting, mood, camera angle, lens, and color grade.
Keep it under 120 words. Return ONLY the prompt text — no preamble, no quotes, no bullet points.`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      file_urls,
      response_json_schema: {
        type: 'object',
        properties: {
          prompt: { type: 'string' }
        },
        required: ['prompt']
      }
    });

    const campaignPrompt = result?.prompt?.trim();
    if (!campaignPrompt) return Response.json({ error: 'Could not generate a campaign prompt.' }, { status: 500 });

    return Response.json({ prompt: campaignPrompt });
  } catch (error) {
    return Response.json({ error: error.message || 'Something went wrong.' }, { status: 500 });
  }
}