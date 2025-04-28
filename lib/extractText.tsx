/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/extractText.tsx
import mammoth from "mammoth";

export const extractTextFromPDF = async (file: File): Promise<string> => {
  // Load PDF.js from CDN to avoid bundling issues
  const pdfjsLib = await import('pdfjs-dist/webpack');
  
  // Set the worker source to a CDN
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str || "")
        .join(" ");
      text += `\n${pageText}`;
    }
    
    return text.trim();
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    return "Error extracting text from PDF.";
  }
};

export const extractTextFromDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
};

export const extractText = async (file: File): Promise<string> => {
  const type = file.type;

  if (type === "application/pdf") {
    return await extractTextFromPDF(file);
  }

  if (
    type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  ) {
    return await extractTextFromDocx(file);
  }

  // Fallback for .txt or unknown
  return await file.text();
};