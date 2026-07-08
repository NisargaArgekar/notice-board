import { useState } from "react";
import type { Notice } from "@/lib/api";

type NoticeFormProps = {
  initialValues?: Partial<Notice>;
  onSubmit: (payload: Omit<Notice, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  submitLabel: string;
  isSubmitting?: boolean;
};

const defaultValues = {
  title: "",
  body: "",
  category: "General",
  priority: "Medium",
  publishDate: "",
  image: "",
};

export function NoticeForm({
  initialValues,
  onSubmit,
  submitLabel,
  isSubmitting = false,
}: NoticeFormProps) {
  const [values, setValues] = useState({
    ...defaultValues,
    ...initialValues,
    image: initialValues?.image ?? "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({
      title: values.title,
      body: values.body,
      category: values.category,
      priority: values.priority,
      publishDate: values.publishDate,
      image: values.image || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
        Fill in the details below to publish or update a notice for your team.
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Title</span>
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-indigo-500"
            required
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Category</span>
          <input
            name="category"
            value={values.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-indigo-500"
            required
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Body</span>
        <textarea
          name="body"
          value={values.body}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-indigo-500"
          required
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Priority</span>
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-indigo-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Publish Date</span>
          <input
            type="date"
            name="publishDate"
            value={values.publishDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-indigo-500"
            required
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Image URL (optional)</span>
        <input
          name="image"
          value={values.image}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-indigo-500"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
