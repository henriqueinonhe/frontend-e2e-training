export const httpClient = (() => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const request = async <T>(
    url: string,
    options?: Parameters<typeof fetch>[1],
  ) => {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error("HTTP request error!");
    }

    const data = (await response.json()) as T;

    return data;
  };

  return {
    request,
  };
})();
