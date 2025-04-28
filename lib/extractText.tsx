/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/extractText.ts
import { getDocument, GlobalWorkerOptions, type PDFDocumentLoadingTask } from 'pdfjs-dist';
import mammoth from "mammoth";

// Create a declaration file for the worker
// Add this in a new file called pdf-worker.d.ts in your project:
// declare module 'pdfjs-dist/build/pdf.worker.entry';

// Set up the worker properly
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Properly typed loading task
    const loadingTask: PDFDocumentLoadingTask = getDocument({
      data: new Uint8Array(arrayBuffer),
      // Remove the problematic null assignments
    });
    
    const pdf = await loadingTask.promise;
    
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .filter((item: any) => 'str' in item)
        .map((item: any) => item.str)
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