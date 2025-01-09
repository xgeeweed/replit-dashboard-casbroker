
export async function createBL(blNumber: string, bulkCargoWeight: number) {
  const response = await fetch('/api/bl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      blNumber,
      bulkCargoWeight,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create BL');
  }

  return response.json();
}
