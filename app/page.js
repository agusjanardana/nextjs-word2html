// pages/index.js
"use client";
import { useState, useEffect } from "react";
import mammoth from "mammoth";
import dynamic from "next/dynamic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Home() {
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setContent(result.value);
      console.log("test", result.value);
      console.log("test", content);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSave = async () => {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName, content }),
    });
    const result = await response.json();
    alert(result.message);
  };

  useEffect(() => {
    if (content) {
      console.log("Content state updated:", content); // Print content after it's updated
    }
  }, [content]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          padding: "10px",
          backgroundColor: "#61dafb",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Word Editor
      </h1>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileUpload}
        style={{
          padding: "10px",
          backgroundColor: "#61dafb",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      />
      {content && (
        <>
          <div class="test">
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => setContent(editor.getData())}
              style={{ minHeight: "400px", width: "100%" }}
            />
          </div>

          <button
            onClick={handleSave}
            style={{
              padding: "10px",
              backgroundColor: "#61dafb",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}
