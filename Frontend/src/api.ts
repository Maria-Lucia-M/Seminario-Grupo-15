const API_URL: string =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const api = {
  get: async (url: string) => {
    const res = await fetch(`${API_URL}${url}`);
    if (!res.ok) throw new Error(`GET error: ${res.status}`);
    return res.json();
  },

  post: async (url: string, data: any) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`POST error: ${res.status}`);
    return res.json();
  },
};
