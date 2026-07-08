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
  priority: "Normal",
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
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
        Use this form to create or update a notice. Required fields are marked with *.
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Title *</span>
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition duration-150 focus:border-indigo-500 focus:bg-white"
            required
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Category *</span>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition duration-150 focus:border-indigo-500 focus:bg-white"
            required
          >
            <option value="General">General</option>
            <option value="Exam">Exam</option>
            <option value="Event">Event</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Body *</span>
        <textarea
          name="body"
          value={values.body}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition duration-150 focus:border-indigo-500 focus:bg-white"
          required
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Priority *</span>
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition duration-150 focus:border-indigo-500 focus:bg-white"
            required
          >
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Publish Date *</span>
          <input
            type="date"
            name="publishDate"
            value={values.publishDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition duration-150 focus:border-indigo-500 focus:bg-white"
            required
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Image URL</span>
        <input
          name="image"
          value={values.image}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition duration-150 focus:border-indigo-500 focus:bg-white"
          placeholder="Optional link to an image"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
