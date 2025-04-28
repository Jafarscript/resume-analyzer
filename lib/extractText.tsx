/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/extractText.ts
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.js";
import mammoth from "mammoth";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(" ");
    text += `\n${pageText}`;
  }

  return text.trim();
};

export const extractTextFromDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim(); // Just the text
};

export const extractText = async (file: File): Promise<string> => {
  const type = file.type;

  if (type === "application/pdf") {
    return await extractTextFromPDF(file);
  }

  if (
    type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  ) {
    return await extractTextFromDocx(file);
  }

  // Fallback for .txt or unknown
  return await file.text();
};
