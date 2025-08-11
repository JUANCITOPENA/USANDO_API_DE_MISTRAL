// /api/consulta.js (ACTUALIZADO CON INSTRUCCIÓN DE ITERACIÓN)
import fetch from 'node-fetch';

const systemPrompt = `Eres un asistente de desarrollo Full-Stack de élite. Tu nombre es "Mistral Dev Assistant".
Proporcionas respuestas claras, concisas y técnicas.
Cuando generes código, SIEMPRE utiliza bloques de código Markdown con el lenguaje especificado (ej. \`\`\`js).
**Instrucción Clave: Cuando el usuario te pida modificar, añadir o mejorar una respuesta anterior, tu objetivo es integrar esos cambios directamente en la respuesta original. Debes generar un resultado nuevo, completo y unificado, no solo la parte que se te pide añadir.**
Sé amigable, pero profesional.`;

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: 'La variable de entorno MISTRAL_API_KEY no está configurada.' });
  }

  try {
    const { messages } = request.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return response.status(400).json({ error: 'El campo "messages" es requerido y debe ser un array no vacío.' });
    }
    
    const apiRequestBody = {
      model: 'mistral-large-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages 
      ],
      temperature: 0.7,
      safe_prompt: true,
    };

    const apiResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(apiRequestBody),
    });

    if (!apiResponse.ok) {
        const errorBody = await apiResponse.text();
        console.error('Error desde la API de Mistral:', errorBody);
        throw new Error(`Error de la API de Mistral: ${apiResponse.status} ${apiResponse.statusText}`);
    }

    const data = await apiResponse.json();

    response.status(200).json({
      reply: data.choices[0].message.content,
      usage: data.usage,
    });

  } catch (error) {
    console.error('Error en la función serverless:', error);
    response.status(500).json({ error: 'Ocurrió un error interno en el servidor.' });
  }
}