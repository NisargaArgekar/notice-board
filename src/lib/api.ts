export type Notice = {
  id: number;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function fetchNotices() {
  const response = await fetch("/api/notices");
  if (!response.ok) {
    throw new Error("Failed to load notices");
  }
  return response.json() as Promise<Notice[]>;
}

export async function createNotice(payload: Omit<Notice, "id" | "createdAt" | "updatedAt">) {
  const response = await fetch("/api/notices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create notice");
  }

  return response.json() as Promise<Notice>;
}

export async function updateNotice(id: number, payload: Omit<Notice, "id" | "createdAt" | "updatedAt">) {
  const response = await fetch(`/api/notices/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update notice");
  }

  return response.json() as Promise<Notice>;
}

export async function deleteNotice(id: number) {
  const response = await fetch(`/api/notices/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete notice");
  }
}
