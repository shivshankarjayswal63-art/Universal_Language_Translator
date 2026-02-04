/**
 * Universal Language Translator - Fully Functional Frontend
 * Connects to backend API for translations
 */

// ============================================
// Configuration
// ============================================
const API_BASE = 'http://localhost:8080/api';

// ============================================
// Complete Language List (100+ Languages)
// ============================================
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
    'si': { name: 'Sinhala', nativeName: 'sinhala', flag: '🇱🇰' },
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

// ============================================
// Application State
// ============================================
const state = {
    translationHistory: JSON.parse(localStorage.getItem('translationHistory')) || [],
    favorites: JSON.parse(localStorage.getItem('translationFavorites')) || [],
    currentTranslation: null,
    isTranslating: false,
    speechUtterance: null
};

// ============================================
// DOM Elements
// ============================================
const elements = {
    sourceText: document.getElementById('sourceText'),
    targetLanguage: document.getElementById('targetLanguage'),
    sourceLanguage: document.getElementById('sourceLanguage'),
    translationResult: document.getElementById('translationResult'),
    detectedLang: document.getElementById('detectedLang'),
    charCount: document.getElementById('charCount'),
    translateBtn: document.getElementById('translateBtn'),
    swapLanguages: document.getElementById('swapLanguages'),
    voiceInput: document.getElementById('voiceInput'),
    clearSource: document.getElementById('clearSource'),
    copyTranslation: document.getElementById('copyTranslation'),
    speakTranslation: document.getElementById('speakTranslation'),
    favoriteTranslation: document.getElementById('favoriteTranslation'),
    historyList: document.getElementById('historyList'),
    favoritesList: document.getElementById('favoritesList'),
    historyCount: document.getElementById('historyCount'),
    favoritesCount: document.getElementById('favoritesCount'),
    languagesGrid: document.getElementById('languagesGrid'),
    toast: document.getElementById('toast'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    ttsControls: document.getElementById('ttsControls'),
    ttsStatus: document.getElementById('ttsStatus')
};

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    populateLanguageSelectors();
    populateLanguagesGrid();
    renderHistory();
    renderFavorites();
    updateCounts();
    setupEventListeners();
    
    // Check server health
    checkServerHealth();
}

// Populate language dropdowns
function populateLanguageSelectors() {
    const sortedLangs = Object.entries(languages)
        .sort((a, b) => a[1].name.localeCompare(b[1].name));

    elements.sourceLanguage.innerHTML = '<option value="auto">🔍 Auto Detect</option>';
    sortedLangs.forEach(([code, lang]) => {
        elements.sourceLanguage.innerHTML += `<option value="${code}">${lang.flag} ${lang.name}</option>`;
    });

    elements.targetLanguage.innerHTML = '';
    sortedLangs.forEach(([code, lang]) => {
        const isSelected = code === 'ne' ? 'selected' : '';
        elements.targetLanguage.innerHTML += `<option value="${code}" ${isSelected}>${lang.flag} ${lang.nativeName}</option>`;
    });
}

// Populate all languages grid
function populateLanguagesGrid() {
    if (!elements.languagesGrid) return;
    
    const sortedLangs = Object.entries(languages)
        .sort((a, b) => a[1].name.localeCompare(b[1].name));

    elements.languagesGrid.innerHTML = sortedLangs.map(([code, lang]) => `
        <div class="lang-item" data-lang="${code}" onclick="selectLanguage('${code}')">
            ${lang.flag} ${lang.name}
        </div>
    `).join('');
}

// Select language from grid
function selectLanguage(code) {
    elements.targetLanguage.value = code;
    showToast(`Language changed to ${languages[code]?.name}`, 'success');
}

// ============================================
// Server Health Check
// ============================================
async function checkServerHealth() {
    try {
        const response = await fetch(`${API_BASE}/health`);
        if (response.ok) {
            console.log('✓ Server is running');
        }
    } catch (error) {
        console.log('⚠ Server not running. Some features may be limited.');
        showToast('Using offline mode - start server for full features', 'info');
    }
}

// ============================================
// Event Listeners Setup
// ============================================
function setupEventListeners() {
    // Character count
    elements.sourceText.addEventListener('input', () => {
        elements.charCount.textContent = elements.sourceText.value.length;
    });

    // Translate button
    elements.translateBtn.addEventListener('click', performTranslation);

    // Keyboard shortcut (Ctrl+Enter)
    elements.sourceText.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            performTranslation();
        }
    });

    // Swap languages
    elements.swapLanguages.addEventListener('click', swapLanguagePair);

    // Voice input
    elements.voiceInput.addEventListener('click', startVoiceInput);

    // Clear source
    elements.clearSource.addEventListener('click', clearSourceText);

    // Copy translation
    elements.copyTranslation.addEventListener('click', copyTranslationToClipboard);

    // Speak translation
    elements.speakTranslation.addEventListener('click', speakTranslation);

    // Favorite translation
    elements.favoriteTranslation.addEventListener('click', toggleFavorite);

    // Quick language buttons
    document.querySelectorAll('.quick-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            elements.targetLanguage.value = btn.dataset.lang;
            showToast(`Language changed to ${languages[btn.dataset.lang]?.name}`, 'success');
        });
    });

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // Quick action cards
    document.getElementById('actionHistory')?.addEventListener('click', () => switchTab('history'));
    document.getElementById('actionFavorites')?.addEventListener('click', () => switchTab('favorites'));
    document.getElementById('actionClear')?.addEventListener('click', clearAllData);
    document.getElementById('actionDownload')?.addEventListener('click', downloadTranslation);

    // TTS Controls
    document.getElementById('ttsPause')?.addEventListener('click', pauseSpeech);
    document.getElementById('ttsResume')?.addEventListener('click', resumeSpeech);
    document.getElementById('ttsStop')?.addEventListener('click', stopSpeech);
    
    // Document Mode
    setupDocumentMode();
    
    // Conversation Mode
    setupConversationMode();
    
    // Translate button for document mode
    document.getElementById('translateBtn')?.addEventListener('click', () => {
        if (currentMode === 'document') {
            translateDocument();
        } else {
            performTranslation();
        }
    });
}

// ============================================
// Mode Switching
// ============================================
let currentMode = 'text';

// Mode switching functionality
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentMode = btn.dataset.mode;
        updateModeUI();
    });
});

function updateModeUI() {
    const textModeEl = document.querySelector('.text-mode');
    const documentModeEl = document.getElementById('documentMode');
    const conversationModeEl = document.getElementById('conversationMode');
    const translateBtn = document.getElementById('translateBtn');
    
    // Hide all modes first
    if (textModeEl) textModeEl.style.display = 'none';
    if (documentModeEl) documentModeEl.style.display = 'none';
    if (conversationModeEl) conversationModeEl.style.display = 'none';
    
    // Show selected mode
    switch (currentMode) {
        case 'text':
            if (textModeEl) textModeEl.style.display = 'block';
            if (translateBtn) translateBtn.style.display = 'flex';
            break;
        case 'document':
            if (documentModeEl) documentModeEl.style.display = 'flex';
            if (translateBtn) translateBtn.style.display = 'flex';
            break;
        case 'conversation':
            if (conversationModeEl) conversationModeEl.style.display = 'flex';
            if (translateBtn) translateBtn.style.display = 'none';
            break;
    }
}

// ============================================
// Document Mode - File Upload
// ============================================
let uploadedDocumentContent = '';

function setupDocumentMode() {
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    const removeDocument = document.getElementById('removeDocument');
    
    if (!fileUploadArea || !fileInput) return;
    
    // Click to upload
    fileUploadArea.addEventListener('click', () => fileInput.click());
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
    
    // Drag and drop
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.classList.add('dragover');
    });
    
    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.classList.remove('dragover');
    });
    
    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });
    
    // Remove document
    if (removeDocument) {
        removeDocument.addEventListener('click', () => {
            uploadedDocumentContent = '';
            document.getElementById('documentContent').style.display = 'none';
            fileUploadArea.style.display = 'flex';
            fileInput.value = '';
        });
    }
}

function handleFileUpload(file) {
    const validTypes = ['.txt', '.md', '.json', '.csv', '.html', '.htm'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(fileExt)) {
        showToast('Unsupported file type. Please use: .txt, .md, .json, .csv, .html', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedDocumentContent = e.target.result;
        
        // Update UI
        document.getElementById('fileUploadArea').style.display = 'none';
        document.getElementById('documentContent').style.display = 'flex';
        document.getElementById('documentName').textContent = file.name;
        
        // Show first 500 characters preview
        const preview = uploadedDocumentContent.length > 500 
            ? uploadedDocumentContent.substring(0, 500) + '...'
            : uploadedDocumentContent;
        document.getElementById('documentText').textContent = preview;
        
        showToast(`File loaded: ${file.name}`, 'success');
    };
    reader.onerror = () => {
        showToast('Error reading file', 'error');
    };
    reader.readAsText(file);
}

async function translateDocument() {
    if (!uploadedDocumentContent) {
        showToast('Please upload a document first', 'error');
        return;
    }
    
    const targetLang = elements.targetLanguage.value;
    const sourceLang = elements.sourceLanguage.value;
    
    showLoading(true);
    
    try {
        // Split content into chunks (max 5000 chars per request)
        const chunkSize = 4000;
        const chunks = [];
        
        for (let i = 0; i < uploadedDocumentContent.length; i += chunkSize) {
            chunks.push(uploadedDocumentContent.substring(i, i + chunkSize));
        }
        
        const translations = [];
        
        for (let i = 0; i < chunks.length; i++) {
            showToast(`Translating part ${i + 1} of ${chunks.length}...`, 'info');
            
            const translation = await translateText(chunks[i], sourceLang, targetLang);
            translations.push(translation);
        }
        
        const fullTranslation = translations.join('\n');
        
        // Display translation
        displayTranslation(fullTranslation);
        
        // Save to history
        addToHistory({
            sourceText: `Document: ${uploadedDocumentContent.substring(0, 100)}...`,
            translatedText: fullTranslation,
            sourceLang: sourceLang === 'auto' ? 'auto' : sourceLang,
            targetLang: targetLang,
            timestamp: new Date().toISOString()
        });
        
        showToast('Document translated successfully!', 'success');
        
    } catch (error) {
        console.error('Document translation error:', error);
        showToast('Error translating document', 'error');
    } finally {
        showLoading(false);
    }
}

// ============================================
// Conversation Mode
// ============================================
let conversationActive = false;
let conv1Recognition = null;
let conv2Recognition = null;

function setupConversationMode() {
    const startBtn = document.getElementById('startConversation');
    const conv1Input = document.getElementById('convPerson1Input');
    const conv2Input = document.getElementById('convPerson2Input');
    const conv1Speak = document.getElementById('convPerson1Speak');
    const conv2Speak = document.getElementById('convPerson2Speak');
    
    if (startBtn) {
        startBtn.addEventListener('click', toggleConversation);
    }
    
    // Real-time translation as user types
    if (conv1Input) {
        conv1Input.addEventListener('input', debounce(() => {
            translateConversation('person1');
        }, 500));
    }
    
    if (conv2Input) {
        conv2Input.addEventListener('input', debounce(() => {
            translateConversation('person2');
        }, 500));
    }
    
    // Voice buttons
    if (conv1Speak) {
        conv1Speak.addEventListener('click', () => toggleVoiceInput('person1'));
    }
    
    if (conv2Speak) {
        conv2Speak.addEventListener('click', () => toggleVoiceInput('person2'));
    }
}

function toggleConversation() {
    conversationActive = !conversationActive;
    const startBtn = document.getElementById('startConversation');
    
    if (conversationActive) {
        startBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Conversation';
        startBtn.classList.add('active');
        showToast('Conversation mode started - type or speak to translate', 'success');
    } else {
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start Real-time Translation';
        startBtn.classList.remove('active');
        if (conv1Recognition) conv1Recognition.stop();
        if (conv2Recognition) conv2Recognition.stop();
        showToast('Conversation mode stopped', 'info');
    }
}

async function translateConversation(person) {
    // Determine source and target based on who is speaking
    const isPerson1 = person === 'person1';
    
    const sourceLang = isPerson1 
        ? document.getElementById('convPerson1Lang').value
        : document.getElementById('convPerson2Lang').value;
    
    const targetLang = isPerson1 
        ? document.getElementById('convPerson2Lang').value
        : document.getElementById('convPerson1Lang').value;
    
    const inputEl = document.getElementById(isPerson1 ? 'convPerson1Input' : 'convPerson2Input');
    const outputEl = document.getElementById(isPerson1 ? 'convPerson2Input' : 'convPerson1Input');
    
    const text = inputEl.value.trim();
    if (!text) return;
    
    try {
        // Show loading state
        outputEl.style.opacity = '0.7';
        
        const translation = await translateText(text, sourceLang, targetLang);
        
        // Update the other person's box with translation
        outputEl.value = translation;
        outputEl.style.opacity = '1';
        
        // Speak the translation if conversation is active
        if (conversationActive) {
            speakText(translation, targetLang);
        }
        
    } catch (error) {
        console.error('Conversation translation error:', error);
        outputEl.style.opacity = '1';
    }
}

function toggleVoiceInput(person) {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showToast('Voice input is not supported in this browser', 'error');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    const lang = person === 'person1' 
        ? getSpeechLangCode(document.getElementById('convPerson1Lang').value)
        : getSpeechLangCode(document.getElementById('convPerson2Lang').value);
    
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    
    const speakBtn = document.getElementById(person === 'person1' ? 'convPerson1Speak' : 'convPerson2Speak');
    const inputEl = document.getElementById(person === 'person1' ? 'convPerson1Input' : 'convPerson2Input');
    
    recognition.onstart = () => {
        speakBtn.classList.add('listening');
        showToast('Listening...', 'info');
    };
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        inputEl.value = transcript;
        translateConversation(person);
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        speakBtn.classList.remove('listening');
        showToast('Voice recognition error', 'error');
    };
    
    recognition.onend = () => {
        speakBtn.classList.remove('listening');
    };
    
    recognition.start();
}

// ============================================
// Helper Functions
// ============================================
async function translateText(text, sourceLang, targetLang) {
    // Try server API first
    try {
        const response = await fetch(`${API_BASE}/translate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, sourceLang, targetLang })
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.success && data.translation) {
                return data.translation;
            }
        }
    } catch (error) {
        console.log('API not available, using direct translation');
    }
    
    // Fallback to direct Google Translate
    return await directGoogleTranslate(text, sourceLang, targetLang);
}

function speakText(text, langCode) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLangCode(langCode);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Translation Function
// ============================================
async function performTranslation() {
    const text = elements.sourceText.value.trim();
    const sourceLang = elements.sourceLanguage.value;
    const targetLang = elements.targetLanguage.value;

    if (!text) {
        showToast('Please enter some text to translate', 'error');
        elements.sourceText.focus();
        return;
    }

    if (text.length > 5000) {
        showToast('Text is too long (max 5000 characters)', 'error');
        return;
    }

    showLoading(true);
    state.isTranslating = true;

    try {
        // Try server API first
        let translation = null;
        let detectedLang = sourceLang;

        try {
            const response = await fetch(`${API_BASE}/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, sourceLang, targetLang })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.translation) {
                    translation = data.translation;
                    detectedLang = data.detectedLang || sourceLang;
                }
            }
        } catch (apiError) {
            console.log('API not available, using fallback');
        }

        // Fallback: Direct Google Translate
        if (!translation) {
            translation = await directGoogleTranslate(text, sourceLang, targetLang);
        }

        if (translation) {
            displayTranslation(translation);
            
            // Show detected language
            if (sourceLang === 'auto' && detectedLang && languages[detectedLang]) {
                elements.detectedLang.textContent = `Detected: ${languages[detectedLang].flag} ${languages[detectedLang].name}`;
            } else {
                elements.detectedLang.textContent = '';
            }

            // Save to history
            addToHistory({
                sourceText: text,
                translatedText: translation,
                sourceLang: sourceLang === 'auto' ? 'auto' : sourceLang,
                targetLang: targetLang,
                timestamp: new Date().toISOString()
            });

            state.currentTranslation = { text: translation, lang: targetLang };
            showToast('Translation completed!', 'success');
        } else {
            showToast('Translation failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Translation error:', error);
        showToast('An error occurred. Please try again.', 'error');
    } finally {
        showLoading(false);
        state.isTranslating = false;
    }
}

// Direct Google Translate (browser-side)
async function directGoogleTranslate(text, sourceLang, targetLang) {
    try {
        const sl = sourceLang === 'auto' ? 'auto' : sourceLang;
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data[0] && data[0].length > 0) {
            return data[0].map(item => item[0]).join('');
        }
        return null;
    } catch (error) {
        console.error('Google Translate error:', error);
        return null;
    }
}

// Display translation
function displayTranslation(translation) {
    elements.translationResult.innerHTML = `<p>${escapeHtml(translation)}</p>`;
}

// ============================================
// Voice Input (Speech Recognition)
// ============================================
function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showToast('Voice input is not supported. Try Chrome browser.', 'error');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    const sourceLang = elements.sourceLanguage.value;
    recognition.lang = sourceLang === 'auto' ? 'en-US' : getSpeechLangCode(sourceLang);
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Visual feedback
    elements.voiceInput.innerHTML = '<i class="fas fa-microphone-slash"></i>';
    elements.voiceInput.classList.add('listening');

    recognition.onstart = () => {
        showToast('Listening... Speak now!', 'info');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        elements.sourceText.value = transcript;
        elements.charCount.textContent = transcript.length;
        showToast('Voice captured! Click translate.', 'success');
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        let message = 'Voice recognition error.';
        if (event.error === 'no-speech') {
            message = 'No speech detected. Please try again.';
        } else if (event.error === 'not-allowed') {
            message = 'Microphone access denied.';
        } else if (event.error === 'network') {
            message = 'Network error. Check your connection.';
        }
        showToast(message, 'error');
    };

    recognition.onend = () => {
        elements.voiceInput.innerHTML = '<i class="fas fa-microphone"></i>';
        elements.voiceInput.classList.remove('listening');
    };

    recognition.start();
}

function getSpeechLangCode(shortCode) {
    const langMap = {
        'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE',
        'it': 'it-IT', 'pt': 'pt-PT', 'ja': 'ja-JP', 'ko': 'ko-KR',
        'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', 'ru': 'ru-RU', 'ar': 'ar-SA',
        'hi': 'hi-IN', 'ne': 'ne-NP', 'th': 'th-TH', 'vi': 'vi-VN',
        'nl': 'nl-NL', 'pl': 'pl-PL', 'tr': 'tr-TR', 'uk': 'uk-UA'
    };
    return langMap[shortCode] || 'en-US';
}

// ============================================
// Text-to-Speech
// ============================================
function speakTranslation() {
    const text = elements.translationResult.textContent;
    if (!text || elements.translationResult.querySelector('.placeholder')) {
        showToast('No translation to speak', 'error');
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLangCode(elements.targetLanguage.value);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Show TTS controls
    if (elements.ttsControls) {
        elements.ttsControls.style.display = 'flex';
    }

    utterance.onstart = () => {
        if (elements.speakTranslation) elements.speakTranslation.classList.add('speaking');
        if (elements.ttsStatus) elements.ttsStatus.textContent = '🔊 Playing...';
    };

    utterance.onend = () => {
        if (elements.speakTranslation) elements.speakTranslation.classList.remove('speaking');
        if (elements.ttsStatus) elements.ttsStatus.textContent = '✓ Completed';
        setTimeout(() => {
            if (elements.ttsControls) elements.ttsControls.style.display = 'none';
        }, 2000);
    };

    utterance.onerror = (event) => {
        console.error('TTS error:', event);
        if (elements.speakTranslation) elements.speakTranslation.classList.remove('speaking');
        if (elements.ttsStatus) elements.ttsStatus.textContent = '✗ Error';
        showToast('Could not play audio', 'error');
    };

    state.speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    showToast('Playing audio...', 'success');
}

function pauseSpeech() {
    window.speechSynthesis.pause();
    if (elements.ttsStatus) elements.ttsStatus.textContent = '⏸ Paused';
}

function resumeSpeech() {
    window.speechSynthesis.resume();
    if (elements.ttsStatus) elements.ttsStatus.textContent = '🔊 Playing...';
}

function stopSpeech() {
    window.speechSynthesis.cancel();
    if (elements.ttsControls) elements.ttsControls.style.display = 'none';
    if (elements.speakTranslation) elements.speakTranslation.classList.remove('speaking');
    showToast('Speech stopped', 'info');
}

// ============================================
// Language Management
// ============================================
function swapLanguagePair() {
    const tempLang = elements.sourceLanguage.value;
    const tempText = elements.sourceText.value;
    
    elements.sourceLanguage.value = elements.targetLanguage.value;
    elements.targetLanguage.value = tempLang === 'auto' ? 'ne' : tempLang;
    
    // Swap text if there's a translation
    const currentResult = elements.translationResult.textContent;
    if (currentResult && !elements.translationResult.querySelector('.placeholder')) {
        elements.sourceText.value = currentResult;
        elements.translationResult.innerHTML = '<p class="placeholder"><i class="fas fa-language"></i> Translation will appear here...</p>';
        elements.charCount.textContent = elements.sourceText.value.length;
        elements.detectedLang.textContent = '';
    }
}

function clearSourceText() {
    elements.sourceText.value = '';
    elements.charCount.textContent = '0';
    elements.translationResult.innerHTML = '<p class="placeholder"><i class="fas fa-language"></i> Translation will appear here...</p>';
    elements.detectedLang.textContent = '';
    state.currentTranslation = null;
    elements.favoriteTranslation.classList.remove('active');
}

// ============================================
// Copy & Download
// ============================================
function copyTranslationToClipboard() {
    const text = elements.translationResult.textContent;
    if (!text || elements.translationResult.querySelector('.placeholder')) {
        showToast('No translation to copy', 'error');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback method
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied to clipboard!', 'success');
    });
}

function downloadTranslation() {
    const text = elements.translationResult.textContent;
    if (!text || elements.translationResult.querySelector('.placeholder')) {
        showToast('No translation to download', 'error');
        return;
    }

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Translation downloaded!', 'success');
}

// ============================================
// Favorites
// ============================================
function toggleFavorite() {
    if (!state.currentTranslation) {
        showToast('No translation to save', 'error');
        return;
    }

    const isFavorited = elements.favoriteTranslation.classList.contains('active');
    
    if (isFavorited) {
        elements.favoriteTranslation.classList.remove('active');
        
        // Remove from favorites
        const index = state.favorites.findIndex(f => 
            f.text === state.currentTranslation.text && 
            f.lang === state.currentTranslation.lang
        );
        if (index > -1) {
            state.favorites.splice(index, 1);
        }
        showToast('Removed from favorites', 'info');
    } else {
        elements.favoriteTranslation.classList.add('active');
        
        // Add to favorites
        state.favorites.unshift({
            text: state.currentTranslation.text,
            lang: state.currentTranslation.lang,
            sourceText: elements.sourceText.value,
            sourceLang: elements.sourceLanguage.value,
            timestamp: new Date().toISOString()
        });
        
        // Keep only 50 favorites
        if (state.favorites.length > 50) {
            state.favorites = state.favorites.slice(0, 50);
        }
        showToast('Added to favorites!', 'success');
    }
    
    localStorage.setItem('translationFavorites', JSON.stringify(state.favorites));
    renderFavorites();
    updateCounts();
}

// ============================================
// History Management
// ============================================
function addToHistory(entry) {
    // Check for duplicates
    const exists = state.translationHistory.some(h => 
        h.sourceText === entry.sourceText && 
        h.translatedText === entry.translatedText
    );
    
    if (!exists) {
        state.translationHistory.unshift(entry);
        
        // Keep only 50 items
        if (state.translationHistory.length > 50) {
            state.translationHistory = state.translationHistory.slice(0, 50);
        }
        
        localStorage.setItem('translationHistory', JSON.stringify(state.translationHistory));
        renderHistory();
        updateCounts();
    }
}

function renderHistory() {
    if (!elements.historyList) return;
    
    if (state.translationHistory.length === 0) {
        elements.historyList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📝</span>
                <p>No translation history yet</p>
                <span class="empty-hint">Start translating to see your history here</span>
            </div>
        `;
        return;
    }

    elements.historyList.innerHTML = state.translationHistory.slice(0, 20).map((item, index) => `
        <div class="history-item" data-index="${index}">
            <div class="history-content">
                <div class="history-source">${escapeHtml(item.sourceText.substring(0, 150))}${item.sourceText.length > 150 ? '...' : ''}</div>
                <div class="history-translation">${escapeHtml(item.translatedText.substring(0, 150))}${item.translatedText.length > 150 ? '...' : ''}</div>
                <div class="history-meta">
                    ${languages[item.targetLang]?.flag || ''} ${languages[item.targetLang]?.name || item.targetLang} • ${formatTime(item.timestamp)}
                </div>
            </div>
            <div class="history-actions">
                <button class="action-btn" onclick="copyHistoryItem(${index})" title="Copy">📋</button>
                <button class="action-btn" onclick="useHistoryItem(${index})" title="Use">🔄</button>
                <button class="action-btn" onclick="deleteHistoryItem(${index})" title="Delete">🗑️</button>
            </div>
        </div>
    `).join('');
}

function renderFavorites() {
    if (!elements.favoritesList) return;
    
    if (state.favorites.length === 0) {
        elements.favoritesList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">💖</span>
                <p>No favorites yet</p>
                <span class="empty-hint">Save your favorite translations by clicking the heart icon</span>
            </div>
        `;
        return;
    }

    elements.favoritesList.innerHTML = state.favorites.slice(0, 20).map((item, index) => `
        <div class="history-item" data-index="${index}">
            <div class="history-content">
                <div class="history-source">${escapeHtml(item.sourceText.substring(0, 150))}${item.sourceText.length > 150 ? '...' : ''}</div>
                <div class="history-translation">${escapeHtml(item.text.substring(0, 150))}${item.text.length > 150 ? '...' : ''}</div>
                <div class="history-meta">
                    ${languages[item.lang]?.flag || ''} ${languages[item.lang]?.name || item.lang} • ${formatTime(item.timestamp)}
                </div>
            </div>
            <div class="history-actions">
                <button class="action-btn" onclick="copyFavoriteItem(${index})" title="Copy">📋</button>
                <button class="action-btn" onclick="removeFavoriteItem(${index})" title="Remove">💔</button>
            </div>
        </div>
    `).join('');
}

function updateCounts() {
    if (elements.historyCount) {
        elements.historyCount.textContent = `${state.translationHistory.length} items`;
    }
    if (elements.favoritesCount) {
        elements.favoritesCount.textContent = `${state.favorites.length} items`;
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all history and favorites?')) {
        state.translationHistory = [];
        state.favorites = [];
        localStorage.removeItem('translationHistory');
        localStorage.removeItem('translationFavorites');
        renderHistory();
        renderFavorites();
        updateCounts();
        showToast('All data cleared', 'success');
    }
}

// ============================================
// History Item Functions
// ============================================
function copyHistoryItem(index) {
    navigator.clipboard.writeText(state.translationHistory[index].translatedText);
    showToast('Copied to clipboard!', 'success');
}

function useHistoryItem(index) {
    const item = state.translationHistory[index];
    elements.sourceText.value = item.sourceText;
    elements.targetLanguage.value = item.targetLang;
    elements.sourceLanguage.value = item.sourceLang;
    elements.charCount.textContent = item.sourceText.length;
    displayTranslation(item.translatedText);
    showToast('Translation loaded!', 'success');
}

function deleteHistoryItem(index) {
    state.translationHistory.splice(index, 1);
    localStorage.setItem('translationHistory', JSON.stringify(state.translationHistory));
    renderHistory();
    updateCounts();
    showToast('Item deleted', 'info');
}

function copyFavoriteItem(index) {
    navigator.clipboard.writeText(state.favorites[index].text);
    showToast('Copied to clipboard!', 'success');
}

function removeFavoriteItem(index) {
    state.favorites.splice(index, 1);
    localStorage.setItem('translationFavorites', JSON.stringify(state.favorites));
    renderFavorites();
    updateCounts();
    showToast('Removed from favorites', 'info');
}

// ============================================
// Tabs
// ============================================
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}Tab`);
    });
}

// ============================================
// UI Helpers
// ============================================
function showLoading(show) {
    if (elements.loadingOverlay) {
        elements.loadingOverlay.classList.toggle('show', show);
    }
    if (elements.translateBtn) {
        elements.translateBtn.disabled = show;
    }
}

function showToast(message, type = 'info') {
    if (!elements.toast) return;
    
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
}

// ============================================
// Global Functions (for inline onclick handlers)
// ============================================
window.selectLanguage = selectLanguage;
window.copyHistoryItem = copyHistoryItem;
window.useHistoryItem = useHistoryItem;
window.deleteHistoryItem = deleteHistoryItem;
window.copyFavoriteItem = copyFavoriteItem;
window.removeFavoriteItem = removeFavoriteItem;

// ============================================
// Export for debugging
// ============================================
window.TranslatorApp = {
    languages,
    state,
    translate: performTranslation,
    speak: speakTranslation,
    getHistory: () => state.translationHistory,
    getFavorites: () => state.favorites
};