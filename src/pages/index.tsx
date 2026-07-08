import Link from "next/link";
import { useEffect, useState } from "react";
import { createNotice, deleteNotice, fetchNotices, updateNotice, type Notice } from "@/lib/api";
import { NoticeForm } from "@/components/NoticeForm";

export default function HomePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const getNotices = async () => {
    try {
      setLoading(true);
      const data = await fetchNotices();
      setNotices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getNotices();
  }, []);

  const handleCreate = async (payload: Omit<Notice, "id" | "createdAt" | "updatedAt">) => {
    try {
      setIsSubmitting(true);
      await createNotice(payload);
      await getNotices();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create notice");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (payload: Omit<Notice, "id" | "createdAt" | "updatedAt">) => {
    if (editingId === null) {
      return;
    }

    try {
      setIsSubmitting(true);
      await updateNotice(editingId, payload);
      await getNotices();
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update notice");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (deleteTargetId === null) {
      return;
    }

    try {
      await deleteNotice(deleteTargetId);
      await getNotices();
      setDeleteTargetId(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete notice");
    }
  };

  const selectedNotice = notices.find((notice) => notice.id === editingId) ?? null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Notice Board</p>
              <h1 className="mt-2 text-3xl font-semibold">Modern internal communications</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Publish updates, highlight urgent matters, and manage notices from one professional dashboard.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-100">
              <div className="font-medium">{notices.length} active notices</div>
              <div className="text-slate-400">Server-side managed with Prisma</div>
            </div>
          </div>
        </header>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Latest notices</h2>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                Sorted by priority and publish date
              </span>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">Loading notices...</div>
            ) : notices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                No notices yet. Create the first announcement to get started.
              </div>
            ) : (
              <div className="grid gap-4">
                {notices.map((notice) => (
                  <article key={notice.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">{notice.title}</h3>
                          {notice.priority === "High" ? (
                            <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">Urgent</span>
                          ) : null}
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{notice.category}</span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{notice.body}</p>
                      </div>
                      <div className="text-sm text-slate-500">
                        <div>{new Date(notice.publishDate).toLocaleDateString()}</div>
                        <div className="mt-1">{notice.priority}</div>
                      </div>
                    </div>

                    {notice.image ? (
                      <img src={notice.image} alt={notice.title} className="mt-4 h-44 w-full rounded-xl object-cover" />
                    ) : null}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() => setEditingId(notice.id)}
                        className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(notice.id)}
                        className="rounded-xl border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">{editingId ? "Edit notice" : "Create notice"}</h2>
            <NoticeForm
              initialValues={selectedNotice ? {
                ...selectedNotice,
                publishDate: selectedNotice.publishDate.slice(0, 10),
              } : undefined}
              submitLabel={editingId ? "Update notice" : "Create notice"}
              isSubmitting={isSubmitting}
              onSubmit={editingId ? handleUpdate : handleCreate}
            />
            {editingId ? (
              <button
                onClick={() => setEditingId(null)}
                className="text-sm font-medium text-slate-600 underline"
              >
                Cancel edit
              </button>
            ) : null}
          </section>
        </div>
      </div>

      {deleteTargetId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Delete confirmation</h3>
            <p className="mt-2 text-sm text-slate-600">This action cannot be undone. Do you want to remove this notice?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
