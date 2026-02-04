# 🌍 Universal Language Translator

A fully functional, beautiful language translator web application with **100+ languages** support including **Nepali (नेपाली)**.

## ✨ Features

### 🎤 Voice Input (Speech-to-Text)
- Click the microphone button and speak
- Automatically converts speech to text
- Supports multiple languages
- Visual feedback during recording

### 🔊 Text-to-Speech (TTS)
- Listen to translations in natural voices
- Play, Pause, and Stop controls
- Multiple language voices supported

### 🌐 100+ Languages
- Full support for 100+ world languages
- Nepali (नेपाली) included with special highlighting
- Quick language access buttons
- Auto language detection

### 📱 Mobile Friendly
- Fully responsive design
- Touch-friendly buttons
- Works on all devices

### ⚡ Instant Results
- Fast translation within milliseconds
- Loading animations
- No page refresh

### 💾 Save History
- LocalStorage persistence
- View past translations
- Re-use or delete translations
- Favorites system

## 🚀 Quick Start

### Option 1: With Node.js (Recommended)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   Navigate to: `http://localhost:3000`

### Option 2: Direct HTML (Offline Mode)

Simply open `public/index.html` in your browser.

**Note:** Some features may be limited without the server.

## 📁 Project Structure

```
LANGUAGE TRANSLATOR/
├── package.json          # Node.js dependencies
├── server.js             # Express backend server
├── README.md             # This file
└── public/
    ├── index.html        # Main HTML file
    ├── styles.css        # Complete styling
    └── app.js            # Full frontend logic
```

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express
- **APIs:** 
  - Google Translate API (via proxy)
  - Web Speech API (Voice Input)
  - SpeechSynthesis API (Text-to-Speech)
- **Storage:** LocalStorage (browser)

## 🎨 UI Features

- Beautiful animated gradient background
- Glassmorphism card design
- Smooth hover animations
- Floating shapes
- Dark theme header
- Responsive layout

## 📋 Supported Languages

100+ languages including:
- English, Spanish, French, German
- Japanese, Chinese, Korean
- Arabic, Hindi, Russian
- Nepali (नेपाली) - Special support
- And many more...

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/translate` | POST | Translate text |
| `/api/detect` | POST | Detect language |
| `/api/languages` | GET | Get all languages |
| `/api/health` | GET | Health check |

## 🧪 Testing

Test each feature:
1. ✅ Voice input (Chrome recommended)
2. ✅ Translation to any language
3. ✅ Text-to-speech playback
4. ✅ History persistence
5. ✅ Copy/download translations

## ⚠️ Browser Requirements

- **Chrome/Edge:** Full feature support
- **Firefox:** Most features work
- **Safari:** Limited voice input support

## 📝 Notes

- Voice input requires microphone permission
- Translation API may have rate limits
- Some features work offline (basic translations)
- Server recommended for full functionality

## 🤝 Contributing

Feel free to enhance this project!

## 📄 License

MIT License - Feel free to use and modify.

---

**Made with ❤️ for global communication**
"# Universal_Language_Translator"  
