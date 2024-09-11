// pages/api/save.js
import fs from "fs";
import path from "path";

export default async (req, res) => {
  if (req.method === "POST") {
    const { content } = req.body;

    try {
      const filePath = path.join(
        process.cwd(),
        "public/uploads/edited-document.html"
      );
      fs.writeFileSync(filePath, content);
      res.status(200).json({ message: "Document saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error saving document" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
