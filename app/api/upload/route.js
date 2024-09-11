import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (request) => {
  try {
    const req = await request.json();
    const { fileName, content } = req;

    // Buat path file yang akan disimpan
    const filePath = path.join(
      process.cwd(),
      "public",
      `${fileName.replace(".docx", "")}-modified.docx`
    );

    // Simpan file sebagai HTML, bisa diubah ke format lain jika diperlukan
    await fs.writeFile(filePath, content, "utf8");

    // Return NextResponse dengan pesan sukses
    return NextResponse.json({ message: "File saved successfully!" });
  } catch (error) {
    console.error("Error saving file:", error);
    // Return NextResponse dengan pesan error
    return NextResponse.json({ message: "Error saving file" }, { status: 500 });
  }
};
