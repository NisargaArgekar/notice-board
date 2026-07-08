import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid notice id" });
  }

  const noticeId = Number(id);

  if (Number.isNaN(noticeId)) {
    return res.status(400).json({ message: "Notice id must be a number" });
  }

  if (req.method === "PATCH") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      const allowedCategory = ["Exam", "Event", "General"];
      const allowedPriority = ["Normal", "Urgent"];

      if (!title || !body || !category || !priority || !publishDate) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }

      if (!allowedCategory.includes(category)) {
        return res.status(400).json({ message: "Category must be Exam, Event, or General" });
      }

      if (!allowedPriority.includes(priority)) {
        return res.status(400).json({ message: "Priority must be Normal or Urgent" });
      }

      const publishDateObject = new Date(publishDate);
      if (Number.isNaN(publishDateObject.getTime())) {
        return res.status(400).json({ message: "Publish date must be a valid date" });
      }

      const notice = await prisma.notice.update({
        where: { id: noticeId },
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: publishDateObject,
          image: image?.trim() || null,
        },
      });

      return res.status(200).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update notice" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({ where: { id: noticeId } });
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete notice" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
