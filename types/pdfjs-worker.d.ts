/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'pdfjs-dist/legacy/build/pdf.worker.entry';
declare module "pdfjs-dist/build/pdf" {
    const pdfjsLib: any;
    export = pdfjsLib;
  }
  
  declare module "pdfjs-dist/legacy/build/pdf.worker.entry" {
    const pdfjsWorker: string;
    export default pdfjsWorker;
  }