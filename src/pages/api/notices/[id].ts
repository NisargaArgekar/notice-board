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

  if (req.method === "PUT") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      if (!title || !body || !category || !priority || !publishDate) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }

      const notice = await prisma.notice.update({
        where: { id: noticeId },
        data: {
          title: title.trim(),
          body: body.trim(),
          category: category.trim(),
          priority: priority.trim(),
          publishDate: new Date(publishDate),
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
