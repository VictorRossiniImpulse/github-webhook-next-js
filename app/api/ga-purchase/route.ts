import { NextResponse } from 'next/server';

const { GA_MEASUREMENT_ID } = process.env;
const { GA_API_SECRET } = process.env;

if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
  console.error('Missing GA_MEASUREMENT_ID or GA_API_SECRET environment variables');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Extract purchase parameters from URL
  const transactionId = searchParams.get('transaction_id');
  const value = searchParams.get('value');
  const currency = searchParams.get('currency') || 'USD';

  if (!transactionId || !value) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  // Prepare the event data
  const eventData = {
    client_id: '555', // You might want to generate this dynamically
    events: [
      {
        name: 'purchase',
        params: {
          transaction_id: transactionId,
          value: parseFloat(value),
          currency,
          items: [
            {
              item_id: 'SKU123',
              item_name: 'Profissional de Digitação',
              item_category: 'BR | Profissão Digital',
              price: 49.99,
              quantity: 1,
            },
          ],
        },
      },
    ],
  };

  try {
    // Send the event to GA4
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify(eventData),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send event to GA4');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending event to GA4:', error);
    return NextResponse.json({ error: 'Failed to send event to GA4' }, { status: 500 });
  }
}
