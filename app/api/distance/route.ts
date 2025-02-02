import { NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  if (!origin || !destination) {
    return NextResponse.json(
      { error: 'Origin and destination are required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
      )}&destinations=${encodeURIComponent(
        destination
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch distance from Google Maps API');
    }

    const data = await response.json();

    if (
      data.status === 'OK' &&
      data.rows[0]?.elements[0]?.status === 'OK' &&
      data.rows[0]?.elements[0]?.distance?.value
    ) {
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { error: 'Could not calculate distance' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error calculating distance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 