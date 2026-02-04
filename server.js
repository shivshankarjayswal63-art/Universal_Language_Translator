// Universal Language Translator - Backend Server
// Handles API requests to avoid CORS issues

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ============================================
// Translation API Endpoints
// ============================================

// Google Translate API (via unofficial endpoint)
app.post('/api/translate', async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;
    
    if (!text || !targetLang) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        // Using Google Translate's internal API
        const sl = sourceLang === 'auto' ? 'auto' : sourceLang;
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data[0]) {
            const translation = data[0].map(item => item[0]).join('');
            const detectedLang = data[2] || sourceLang;
            
            res.json({ 
                translation, 
                detectedLang,
                success: true 
            });
        } else {
            throw new Error('Invalid response from translation service');
        }
    } catch (error) {
        console.error('Translation error:', error);
        
        // Fallback to MyMemory API
        tryMyMemoryTranslation(text, sourceLang, targetLang)
            .then(fallbackResult => {
                res.json(fallbackResult);
            })
            .catch(() => {
                res.status(500).json({ 
                    error: 'Translation failed',
                    message: 'Unable to translate. Please try again.',
                    success: false 
                });
            });
    }
});

// MyMemory API (Fallback)
async function tryMyMemoryTranslation(text, sourceLang, targetLang) {
    const source = sourceLang === 'auto' ? 'en' : sourceLang;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}!&langpair=${source}|${targetLang}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData) {
        return {
            translation: data.responseData.translatedText,
            detectedLang: sourceLang,
            success: true,
            source: 'mymemory'
        };
    }
    throw new Error('MyMemory translation failed');
}

// Language Detection API
app.post('/api/detect', async (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'No text provided' });
    }

    try {
        // Use Google Translate for detection
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data[2]) {
            res.json({ language: data[2], success: true });
        } else {
            throw new Error('Detection failed');
        }
    } catch (error) {
        res.status(500).json({ error: 'Detection failed', success: false });
    }
});

// Get Available Languages
app.get('/api/languages', (req, res) => {
    const languages = {
        'af': { name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' },
        'am': { name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
        'ar': { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
        'az': { name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿' },
        'be': { name: 'Belarusian', nativeName: 'Беларуская', flag: '🇧🇾' },
        'bg': { name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
        'bn': { name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
        'bs': { name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦' },
        'ca': { name: 'Catalan', nativeName: 'Català', flag: '🇪🇸' },
        'ceb': { name: 'Cebuano', nativeName: 'Cebuano', flag: '🇵🇭' },
        'co': { name: 'Corsican', nativeName: 'Corsu', flag: '🇫🇷' },
        'cs': { name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
        'cy': { name: 'Welsh', nativeName: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
        'da': { name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
        'de': { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
        'el': { name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
        'en': { name: 'English', nativeName: 'English', flag: '🇺🇸' },
        'eo': { name: 'Esperanto', nativeName: 'Esperanto', flag: '🌍' },
        'es': { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
        'et': { name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪' },
        'eu': { name: 'Basque', nativeName: 'Euskara', flag: '🇪🇺' },
        'fa': { name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷' },
        'fi': { name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
        'fj': { name: 'Fijian', nativeName: 'Vosa Vaka-Viti', flag: '🇫🇯' },
        'fr': { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
        'fy': { name: 'Western Frisian', nativeName: 'Frysk', flag: '🇳🇱' },
        'ga': { name: 'Irish', nativeName: 'Gaeilge', flag: '🇮🇪' },
        'gd': { name: 'Scottish Gaelic', nativeName: 'Gàidhlig', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
        'gl': { name: 'Galician', nativeName: 'Galego', flag: '🇪🇺' },
        'gu': { name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
        'ha': { name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇪' },
        'haw': { name: 'Hawaiian', nativeName: 'ʻŌlelo Hawaiʻi', flag: '🇺🇸' },
        'he': { name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
        'hi': { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
        'hmn': { name: 'Hmong', nativeName: 'Hmong', flag: '🇨🇳' },
        'hr': { name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
        'ht': { name: 'Haitian Creole', nativeName: 'Kreyòl Ayisyen', flag: '🇭🇹' },
        'hu': { name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
        'hy': { name: 'Armenian', nativeName: 'Հայերեն', flag: '🇦🇲' },
        'id': { name: 'Indonesian', nativeName: 'Indonesia', flag: '🇮🇩' },
        'ig': { name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬' },
        'is': { name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸' },
        'it': { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
        'ja': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
        'jw': { name: 'Javanese', nativeName: 'Jawa', flag: '🇮🇩' },
        'ka': { name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪' },
        'kk': { name: 'Kazakh', nativeName: 'Қазақша', flag: '🇰🇿' },
        'km': { name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭' },
        'kn': { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
        'ko': { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
        'ku': { name: 'Kurdish', nativeName: 'Kurdî', flag: '🇮🇶' },
        'ky': { name: 'Kyrgyz', nativeName: 'Кыргызча', flag: '🇰🇬' },
        'la': { name: 'Latin', nativeName: 'Latina', flag: '🇻🇦' },
        'lb': { name: 'Luxembourgish', nativeName: 'Lëtzebuergesch', flag: '🇱🇺' },
        'lo': { name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦' },
        'lt': { name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹' },
        'lv': { name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻' },
        'mg': { name: 'Malagasy', nativeName: 'Malagasy', flag: '🇲🇬' },
        'mi': { name: 'Maori', nativeName: 'Māori', flag: '🇳🇿' },
        'mk': { name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰' },
        'ml': { name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
        'mn': { name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳' },
        'mr': { name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
        'ms': { name: 'Malay', nativeName: 'Melayu', flag: '🇲🇾' },
        'mt': { name: 'Maltese', nativeName: 'Malti', flag: '🇲🇹' },
        'my': { name: 'Myanmar (Burmese)', nativeName: 'မြန်မာ', flag: '🇲🇲' },
        'ne': { name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵' },
        'nl': { name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
        'no': { name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
        'ny': { name: 'Chichewa', nativeName: 'Chichewa', flag: '🇲🇼' },
        'or': { name: 'Odia (Oriya)', nativeName: 'ଓଡ଼ਿଆ', flag: '🇮🇳' },
        'pa': { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
        'pl': { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
        'ps': { name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫' },
        'pt': { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
        'ro': { name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
        'ru': { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
        'rw': { name: 'Kinyarwanda', nativeName: 'Kinyarwanda', flag: '🇷🇼' },
        'sd': { name: 'Sindhi', nativeName: 'سنڌي', flag: '🇵🇰' },
        'si': { name: 'Sinhala', nativeName: 'සิංඅ', flag: '🇱🇰' },
        'sk': { name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
        'sl': { name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮' },
        'sm': { name: 'Samoan', nativeName: 'Gagana Samoa', flag: '🇼🇸' },
        'sn': { name: 'Shona', nativeName: 'Shona', flag: '🇿🇼' },
        'so': { name: 'Somali', nativeName: 'Soomaaliga', flag: '🇸🇴' },
        'sq': { name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱' },
        'sr': { name: 'Serbian', nativeName: 'Срpski', flag: '🇷🇸' },
        'st': { name: 'Southern Sotho', nativeName: 'Sesotho', flag: '🇱🇸' },
        'su': { name: 'Sundanese', nativeName: 'Basa Sunda', flag: '🇮🇩' },
        'sv': { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
        'sw': { name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿' },
        'ta': { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
        'te': { name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
        'tg': { name: 'Tajik', nativeName: 'Тоҷикӣ', flag: '🇹🇯' },
        'th': { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
        'tk': { name: 'Turkmen', nativeName: 'Türkmençe', flag: '🇹🇲' },
        'tl': { name: 'Tagalog (Filipino)', nativeName: 'Tagalog', flag: '🇵🇭' },
        'tr': { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
        'tt': { name: 'Tatar', nativeName: 'Татарча', flag: '🇷🇺' },
        'ug': { name: 'Uyghur', nativeName: 'ئۇيغۇرچە', flag: '🇨🇳' },
        'uk': { name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
        'ur': { name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
        'uz': { name: 'Uzbek', nativeName: 'Oʻzbekcha', flag: '🇺🇿' },
        'vi': { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
        'xh': { name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦' },
        'yi': { name: 'Yiddish', nativeName: 'ייִדיש', flag: '🇮🇱' },
        'yo': { name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' },
        'zh-CN': { name: 'Chinese (Simplified)', nativeName: '中文简体', flag: '🇨🇳' },
        'zh-TW': { name: 'Chinese (Traditional)', nativeName: '中文繁體', flag: '🇹🇼' },
        'zu': { name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦' }
    };
    
    res.json({ languages, count: Object.keys(languages).length });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Universal Language Translator Server running on http://localhost:${PORT}`);
    console.log(`📚 API Endpoints:`);
    console.log(`   POST /api/translate - Translate text`);
    console.log(`   POST /api/detect - Detect language`);
    console.log(`   GET /api/languages - Get all languages`);
    console.log(`   GET /api/health - Health check`);
});
