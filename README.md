# PDF Text Extraction API

Enterprise-grade PDF Text Extraction API built with Node.js and Express.js.

Supports:

- Text-based PDFs
- Scanned PDFs (OCR)
- Mixed PDFs
- Bangla OCR
- English OCR
- Structured Layout Extraction
- Block Detection
- JSON Extraction

---

## Features

### PDF Processing

- Text Layer Extraction
- OCR-based Extraction
- Mixed PDF Support
- Automatic PDF Type Detection

### Extraction Modes

#### Plain Mode

Returns extracted text as a single normalized string.

#### Block Mode

Returns detected document blocks:

- Paragraphs
- Headings
- Sections
- Tables
- Columns
- Footers
- Headers

#### JSON Mode

Returns fully structured document data with coordinates and metadata.

---

## Tech Stack

### Core

- Node.js
- Express.js
- ES Modules

### Upload Handling

- Multer

### PDF Processing

- pdfjs-dist
- pdf-parse

### OCR

- Tesseract.js

### Rendering

- canvas

### Security

- Helmet
- CORS
- Rate Limiting

---

## Architecture

```text
src/
├── app.js
├── server.js
│
├── config/
│
├── constants/
│
├── controllers/
│   └── pdf.controller.js
│
├── routes/
│   └── pdf.routes.js
│
├── services/
│   ├── extractionService.js
│   ├── pdfService.js
│   ├── pdfEngine.service.js
│   ├── pdfDetection.service.js
│   ├── pdfRender.service.js
│   ├── ocr.service.js
│   ├── blockDetection.service.js
│   └── readingOrder.service.js
│
├── middlewares/
│
├── validators/
│
├── utils/
│
└── uploads/
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Enter Project

```bash
cd pdf-text-api
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create:

```env
.env
```

Example:

```env
PORT=3000

NODE_ENV=development

MAX_FILE_SIZE=10485760

ALLOWED_ORIGINS=http://localhost:5173

OCR_LANGUAGE=eng+ben

REQUEST_TIMEOUT=120000
```

---

## Run Development Server

```bash
npm run dev
```

---

## Run Production Server

```bash
npm start
```

---

## API Endpoint

### Extract PDF

```http
POST /api/pdf/extract
```

### Request

Content Type:

```http
multipart/form-data
```

Fields:

| Field | Type | Required |
|---------|---------|---------|
| pdf | File | Yes |
| mode | String | Yes |

Allowed Modes:

```text
plain
block
json
```

---

## Example Request

### cURL

```bash
curl --location 'http://localhost:3000/api/pdf/extract' \
--form 'pdf=@document.pdf' \
--form 'mode=plain'
```

---

## Success Response

### Plain Mode

```json
{
  "success": true,
  "pdfType": "text-layer",
  "mode": "plain",
  "pageCount": 12,
  "wordCount": 5340,
  "characterCount": 32890,
  "processingTime": "1.84s",
  "text": "..."
}
```

---

### Block Mode

```json
{
  "success": true,
  "pdfType": "mixed",
  "mode": "block",
  "blocks": []
}
```

---

### JSON Mode

```json
{
  "success": true,
  "pdfType": "mixed",
  "mode": "json",
  "pages": []
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Meaningful error message"
}
```

---

## Supported PDF Types

### Text PDFs

Generated from:

- Microsoft Word
- Google Docs
- LibreOffice
- Canva Export
- Web Generated PDFs

### Scanned PDFs

Generated from:

- Scanners
- Mobile Cameras
- Printed Documents
- Image-based PDFs

### Mixed PDFs

Documents containing both:

- Text Layers
- Scanned Pages

---

## OCR Languages

Supported:

```text
eng
ben
eng+ben
```

Examples:

### English

```env
OCR_LANGUAGE=eng
```

### Bangla

```env
OCR_LANGUAGE=ben
```

### Mixed

```env
OCR_LANGUAGE=eng+ben
```

---

## Security Features

- File Type Validation
- MIME Validation
- Request Rate Limiting
- Upload Size Limits
- Error Sanitization
- Secure File Handling

---

## Performance Features

- Async/Await Only
- Incremental Page Processing
- Memory Efficient Extraction
- OCR On Demand
- Automatic PDF Detection
- Smart Extraction Pipeline

---

## Processing Flow

```text
Upload PDF
      ↓
Validate File
      ↓
Extract Text Layer
      ↓
Detect PDF Type
      ↓
Text Layer?
   ↙       ↘
 YES       NO
  ↓         ↓
Extract    OCR
  ↓         ↓
Merge Results
      ↓
Block Detection
      ↓
Reading Order
      ↓
Format Response
      ↓
Return Data
```

---

## Health Check

```http
GET /health
```

Example:

```json
{
  "success": true,
  "status": "healthy"
}
```

---

## Deployment

Recommended:

- VPS
- Docker
- Railway
- Render
- DigitalOcean
- AWS EC2
- Azure VM

---

## Production Checklist

- [ ] Environment Variables Configured
- [ ] Upload Limits Set
- [ ] Rate Limiting Enabled
- [ ] CORS Configured
- [ ] Logging Enabled
- [ ] Error Handling Enabled
- [ ] OCR Language Configured
- [ ] Health Check Enabled

---

## License

MIT License

---

## Author

Production-grade PDF Text Extraction API built using:

- Node.js
- Express.js
- pdfjs-dist
- Tesseract.js
- Clean Architecture
