const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

interface DistanceMatrixResponse {
  rows: {
    elements: {
      distance: {
        value: number;
        text: string;
      };
      duration: {
        value: number;
        text: string;
      };
      status: string;
    }[];
  }[];
  status: string;
}

export async function getDistanceFromGoogleMaps(
  origin: string,
  destination: string
): Promise<number> {
  try {
    // Using a proxy route to avoid CORS issues
    const response = await fetch(
      `/api/distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch distance from Google Maps API");
    }

    const data: DistanceMatrixResponse = await response.json();

    if (
      data.status === "OK" &&
      data.rows[0]?.elements[0]?.status === "OK" &&
      data.rows[0]?.elements[0]?.distance?.value
    ) {
      // Convert meters to kilometers
      return data.rows[0].elements[0].distance.value / 1000;
    }

    throw new Error("Could not calculate distance");
  } catch (error) {
    console.error("Error calculating distance:", error);
    throw error;
  }
} 