import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" },
          { publishDate: "desc" },
        ],
      });

      return res.status(200).json(notices);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch notices" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      if (!title || !body || !category || !priority || !publishDate) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }

      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category: category.trim(),
          priority: priority.trim(),
          publishDate: new Date(publishDate),
          image: image?.trim() || null,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to create notice" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
