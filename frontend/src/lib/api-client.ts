const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiOptions extends RequestInit {
  data?: unknown;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { data, headers: customHeaders, ...customConfig } = options;

  const headers = new Headers(customHeaders);
  if (data) {
    headers.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers,
    ...customConfig,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  let responseData: unknown;
  try {
    responseData = await response.json();
  } catch {
    responseData = await response.text();
  }

  if (!response.ok) {
    const errorMsg =
      (responseData as { message?: string })?.message ||
      (typeof responseData === "string" ? responseData : "An error occurred while fetching data.");
    throw new Error(errorMsg);
  }

  return responseData as T;
}
