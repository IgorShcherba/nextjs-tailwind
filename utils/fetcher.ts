const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = async (url: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${API_URL}${url}`, {
    headers,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");

    throw error;
  }
  return response.json();
};
