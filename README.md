# 📄 Resume Analyzer

**Resume Analyzer** is a modern, fully client-side web application that helps job seekers optimize their resumes. Upload your file (PDF, DOCX, or TXT) and get instant scoring, detailed feedback, and actionable tips — all processed securely in your browser, without sending your data to any server.

![Resume Analyzer Screenshot](./public/home.png)

---

## ✨ Features

- **Client-Side Resume Upload**: Secure processing — your resume never leaves your browser
- **Supported Formats**: PDF, DOCX, TXT
- **Instant Analysis**: Real-time scoring and feedback
- **Dynamic Score Visualization**: Circular progress indicator for your overall resume score
- **Detailed Section Feedback**: Strengths and improvement areas per resume section
- **Actionable Suggestions**: Easy-to-follow tips to boost your resume quality
- **Visual Stats**: See your strengths and weaknesses at a glance

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Document Parsing**:
  - `pdfjs-dist` for PDF text extraction
  - Mammoth.js for DOCX files
  - Native file reading for TXT files
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-analyzer.git
   cd resume-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Visit** [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Usage

1. **Upload Your Resume**: Click "Upload and Scan Resume" to select a file.
2. **Analyze Instantly**: Get an overall score and detailed section breakdown.
3. **Follow Suggestions**: Apply recommendations to improve your resume.
4. **Rescan**: Re-upload an improved version and track your progress.

---

## 🗂 Project Structure

```
resume-analyzer/
├── components/            # Reusable UI Components
│   ├── ResumeAnalysis.tsx  # Analysis and feedback logic
│   ├── ResumeScoreCard.tsx # Score visualization
│   └── ...
├── lib/                   # Utility functions
│   ├── extractText.tsx      # Document text extraction (PDF, DOCX, TXT)
    ├── analyzeResumeWithGemini.ts      # Gemine analysis logic
├── app/                   # App Router pages
│   ├── page.tsx           # Home page
│   ├── resume/page.tsx    # Resume analysis page
├── public/                # Static assets (e.g., home.png)
├── styles/                # Tailwind CSS styles
└── ...
```

---

## 📄 Supported File Formats and Processing

- **PDF**: Text extraction using `pdfjs-dist` on the client-side
- **DOCX**: Extracted via Mammoth.js
- **TXT**: Read as plain text

---

## 🎯 Scoring System

| Overall Score Range | Color Indicator     | Meaning            |
|:---------------------|:--------------------|:-------------------|
| 90-100%              | Dark Green           | Excellent          |
| 80-89%               | Green                | Very Good          |
| 70-79%               | Light Green          | Good               |
| 60-69%               | Blue                 | Above Average      |
| 50-59%               | Amber / Yellow       | Average            |
| 40-49%               | Orange               | Below Average      |
| 0-39%                | Red                  | Needs Improvement  |

Each **resume section** is also scored individually from 1–10 with matching color coding.

---

## ⚡ Deployment

Easily deploy to [Vercel](https://vercel.com/):

```bash
npm run build
# then
vercel --prod
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -m "feat: add new feature"`)
4. Push to GitHub (`git push origin feature/feature-name`)
5. Open a Pull Request 🚀

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js)
- [pdfjs-dist](https://github.com/mozilla/pdfjs-dist)

---
