import mammoth from "mammoth";

export interface PreparedResumePayload {
  fileName: string;
  sizeKb: string;
  resumeText?: string;
  pdfBase64?: string;
  wordCount?: number;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export const prepareResumePayload = async (
  file: File
): Promise<PreparedResumePayload> => {
  if (file.size === 0) {
    throw new Error("The selected file is empty. Please upload a valid resume file.");
  }

  const maxBytes = 15 * 1024 * 1024; // 15 MB
  if (file.size > maxBytes) {
    throw new Error("File exceeds the 15 MB limit. Please upload a smaller resume file.");
  }

  const sizeKb = `${Math.max(1, Math.round(file.size / 1024))} KB`;
  const lowerName = file.name.toLowerCase();
  const isPdf = file.type === "application/pdf" || lowerName.endsWith(".pdf");
  const isDocx =
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lowerName.endsWith(".docx");

  if (isPdf) {
    const arrayBuffer = await file.arrayBuffer();
    const pdfBase64 = arrayBufferToBase64(arrayBuffer);
    return {
      fileName: file.name,
      sizeKb,
      pdfBase64,
    };
  }

  if (isDocx) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value.trim();
    if (!text) {
      throw new Error(
        "Could not extract readable text from this DOCX file. Please ensure the document contains text."
      );
    }
    const wordCount = text.split(/\s+/).length;
    return {
      fileName: file.name,
      sizeKb,
      resumeText: text,
      wordCount,
    };
  }

  // Plain text (.txt) or fallback text file
  const text = (await file.text()).trim();
  if (!text) {
    throw new Error(
      "Could not extract readable text from this file. Please upload a valid PDF, DOCX, or TXT resume."
    );
  }
  const wordCount = text.split(/\s+/).length;
  return {
    fileName: file.name,
    sizeKb,
    resumeText: text,
    wordCount,
  };
};