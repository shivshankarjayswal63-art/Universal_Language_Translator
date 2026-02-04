#!/usr/bin/env python3
"""
Simple HTTP server for Universal Language Translator
Serves static files and provides translation API endpoints
"""

import http.server
import socketserver
import json
import urllib.request
import urllib.parse
import ssl
from urllib.error import URLError, HTTPError
import os
import sys

PORT = 8000

class TranslationHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='public', **kwargs)

    def do_POST(self):
        """Handle POST requests for translation API"""
        if self.path == '/api/translate':
            self.handle_translate()
        elif self.path == '/api/detect':
            self.handle_detect()
        else:
            self.send_error(404, 'Endpoint not found')

    def handle_translate(self):
        """Handle translation requests"""
        try:
            # Read request body
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(post_data)
            
            text = data.get('text', '')
            sourceLang = data.get('sourceLang', 'auto')
            targetLang = data.get('targetLang', 'ne')
            
            if not text:
                self.send_json_response({'error': 'No text provided'}, 400)
                return
            
            # Google Translate API
            sl = sourceLang if sourceLang != 'auto' else 'auto'
            url = f'https://translate.googleapis.com/translate_a/single?client=gtx&sl={sl}&tl={targetLang}&dt=t&q={urllib.parse.quote(text)}'
            
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))
                
                if data and data[0]:
                    translation = ''.join(item[0] for item in data[0] if item[0])
                    detected = data[2] if len(data) > 2 else sourceLang
                    
                    self.send_json_response({
                        'translation': translation,
                        'detectedLang': detected,
                        'success': True
                    })
                else:
                    raise Exception('Invalid response')
                    
        except Exception as e:
            print(f'Translation error: {e}')
            # Fallback
            self.send_json_response({
                'translation': f'Translation: {text} → ({targetLang})',
                'success': True,
                'fallback': True
            })

    def handle_detect(self):
        """Handle language detection"""
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(post_data)
            
            text = data.get('text', '')
            if not text:
                self.send_json_response({'error': 'No text provided'}, 400)
                return
            
            # Use Google Translate for detection
            url = f'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q={urllib.parse.quote(text)}'
            
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))
                detected = data[2] if len(data) > 2 else 'en'
                self.send_json_response({'language': detected, 'success': True})
                
        except Exception as e:
            print(f'Detection error: {e}')
            self.send_json_response({'language': 'en', 'success': True})

    def do_GET(self):
        """Handle GET requests"""
        if self.path == '/api/health':
            self.send_json_response({'status': 'ok'})
        elif self.path == '/api/languages':
            self.send_languages()
        else:
            super().do_GET()

    def send_languages(self):
        """Send all supported languages"""
        languages = {
            'af': {'name': 'Afrikaans', 'nativeName': 'Afrikaans', 'flag': '🇿🇦'},
            'am': {'name': 'Amharic', 'nativeName': 'አማርኛ', 'flag': '🇪🇹'},
            'ar': {'name': 'Arabic', 'nativeName': 'العربية', 'flag': '🇸🇦'},
            'az': {'name': 'Azerbaijani', 'nativeName': 'Azərbaycan', 'flag': '🇦🇿'},
            'be': {'name': 'Belarusian', 'nativeName': 'Беларуская', 'flag': '🇧🇾'},
            'bg': {'name': 'Bulgarian', 'nativeName': 'Български', 'flag': '🇧🇬'},
            'bn': {'name': 'Bengali', 'nativeName': 'বাংলা', 'flag': '🇧🇩'},
            'bs': {'name': 'Bosnian', 'nativeName': 'Bosanski', 'flag': '🇧🇦'},
            'ca': {'name': 'Catalan', 'nativeName': 'Català', 'flag': '🇪🇸'},
            'ceb': {'name': 'Cebuano', 'nativeName': 'Cebuano', 'flag': '🇵🇭'},
            'co': {'name': 'Corsican', 'nativeName': 'Corsu', 'flag': '🇫🇷'},
            'cs': {'name': 'Czech', 'nativeName': 'Čeština', 'flag': '🇨🇿'},
            'cy': {'name': 'Welsh', 'nativeName': 'Cymraeg', 'flag': '🏴'},
            'da': {'name': 'Danish', 'nativeName': 'Dansk', 'flag': '🇩🇰'},
            'de': {'name': 'German', 'nativeName': 'Deutsch', 'flag': '🇩🇪'},
            'el': {'name': 'Greek', 'nativeName': 'Ελληνικά', 'flag': '🇬🇷'},
            'en': {'name': 'English', 'nativeName': 'English', 'flag': '🇺🇸'},
            'eo': {'name': 'Esperanto', 'nativeName': 'Esperanto', 'flag': '🌍'},
            'es': {'name': 'Spanish', 'nativeName': 'Español', 'flag': '🇪🇸'},
            'et': {'name': 'Estonian', 'nativeName': 'Eesti', 'flag': '🇪🇪'},
            'eu': {'name': 'Basque', 'nativeName': 'Euskara', 'flag': '🇪🇺'},
            'fa': {'name': 'Persian', 'nativeName': 'فارسی', 'flag': '🇮🇷'},
            'fi': {'name': 'Finnish', 'nativeName': 'Suomi', 'flag': '🇫🇮'},
            'fj': {'name': 'Fijian', 'nativeName': 'Vosa Vaka-Viti', 'flag': '🇫🇯'},
            'fr': {'name': 'French', 'nativeName': 'Français', 'flag': '🇫🇷'},
            'fy': {'name': 'Western Frisian', 'nativeName': 'Frysk', 'flag': '🇳🇱'},
            'ga': {'name': 'Irish', 'nativeName': 'Gaeilge', 'flag': '🇮🇪'},
            'gd': {'name': 'Scottish Gaelic', 'nativeName': 'Gàidhlig', 'flag': '🏴'},
            'gl': {'name': 'Galician', 'nativeName': 'Galego', 'flag': '🇪🇺'},
            'gu': {'name': 'Gujarati', 'nativeName': 'ગુજરાતી', 'flag': '🇮🇳'},
            'ha': {'name': 'Hausa', 'nativeName': 'Hausa', 'flag': '🇳🇪'},
            'haw': {'name': 'Hawaiian', 'nativeName': 'ʻŌlelo Hawaiʻi', 'flag': '🇺🇸'},
            'he': {'name': 'Hebrew', 'nativeName': 'עברית', 'flag': '🇮🇱'},
            'hi': {'name': 'Hindi', 'nativeName': 'हिन्दी', 'flag': '🇮🇳'},
            'hmn': {'name': 'Hmong', 'nativeName': 'Hmong', 'flag': '🇨🇳'},
            'hr': {'name': 'Croatian', 'nativeName': 'Hrvatski', 'flag': '🇭🇷'},
            'ht': {'name': 'Haitian Creole', 'nativeName': 'Kreyòl Ayisyen', 'flag': '🇭🇹'},
            'hu': {'name': 'Hungarian', 'nativeName': 'Magyar', 'flag': '🇭🇺'},
            'hy': {'name': 'Armenian', 'nativeName': 'Հայերեն', 'flag': '🇦🇲'},
            'id': {'name': 'Indonesian', 'nativeName': 'Indonesia', 'flag': '🇮🇩'},
            'ig': {'name': 'Igbo', 'nativeName': 'Igbo', 'flag': '🇳🇬'},
            'is': {'name': 'Icelandic', 'nativeName': 'Íslenska', 'flag': '🇮🇸'},
            'it': {'name': 'Italian', 'nativeName': 'Italiano', 'flag': '🇮🇹'},
            'ja': {'name': 'Japanese', 'nativeName': '日本語', 'flag': '🇯🇵'},
            'jw': {'name': 'Javanese', 'nativeName': 'Jawa', 'flag': '🇮🇩'},
            'ka': {'name': 'Georgian', 'nativeName': 'ქართული', 'flag': '🇬🇪'},
            'kk': {'name': 'Kazakh', 'nativeName': 'Қазақша', 'flag': '🇰🇿'},
            'km': {'name': 'Khmer', 'nativeName': 'ភាសាខ្មែរ', 'flag': '🇰🇭'},
            'kn': {'name': 'Kannada', 'nativeName': 'ಕನ್ನಡ', 'flag': '🇮🇳'},
            'ko': {'name': 'Korean', 'nativeName': '한국어', 'flag': '🇰🇷'},
            'ku': {'name': 'Kurdish', 'nativeName': 'Kurdî', 'flag': '🇮🇶'},
            'ky': {'name': 'Kyrgyz', 'nativeName': 'Кыргызча', 'flag': '🇰🇬'},
            'la': {'name': 'Latin', 'nativeName': 'Latina', 'flag': '🇻🇦'},
            'lb': {'name': 'Luxembourgish', 'nativeName': 'Lëtzebuergesch', 'flag': '🇱🇺'},
            'lo': {'name': 'Lao', 'nativeName': 'ລາວ', 'flag': '🇱🇦'},
            'lt': {'name': 'Lithuanian', 'nativeName': 'Lietuvių', 'flag': '🇱🇹'},
            'lv': {'name': 'Latvian', 'nativeName': 'Latviešu', 'flag': '🇱🇻'},
            'mg': {'name': 'Malagasy', 'nativeName': 'Malagasy', 'flag': '🇲🇬'},
            'mi': {'name': 'Maori', 'nativeName': 'Māori', 'flag': '🇳🇿'},
            'mk': {'name': 'Macedonian', 'nativeName': 'Македонски', 'flag': '🇲🇰'},
            'ml': {'name': 'Malayalam', 'nativeName': 'മലയാളം', 'flag': '🇮🇳'},
            'mn': {'name': 'Mongolian', 'nativeName': 'Монгол', 'flag': '🇲🇳'},
            'mr': {'name': 'Marathi', 'nativeName': 'मराठी', 'flag': '🇮🇳'},
            'ms': {'name': 'Malay', 'nativeName': 'Melayu', 'flag': '🇲🇾'},
            'mt': {'name': 'Maltese', 'nativeName': 'Malti', 'flag': '🇲🇹'},
            'my': {'name': 'Myanmar (Burmese)', 'nativeName': 'မြန်မာ', 'flag': '🇲🇲'},
            'ne': {'name': 'Nepali', 'nativeName': 'नेपाली', 'flag': '🇳🇵'},
            'nl': {'name': 'Dutch', 'nativeName': 'Nederlands', 'flag': '🇳🇱'},
            'no': {'name': 'Norwegian', 'nativeName': 'Norsk', 'flag': '🇳🇴'},
            'ny': {'name': 'Chichewa', 'nativeName': 'Chichewa', 'flag': '🇲🇼'},
            'or': {'name': 'Odia (Oriya)', 'nativeName': 'ଓଡ଼ਿଆ', 'flag': '🇮🇳'},
            'pa': {'name': 'Punjabi', 'nativeName': 'ਪੰਜਾਬੀ', 'flag': '🇮🇳'},
            'pl': {'name': 'Polish', 'nativeName': 'Polski', 'flag': '🇵🇱'},
            'ps': {'name': 'Pashto', 'nativeName': 'پښتو', 'flag': '🇦🇫'},
            'pt': {'name': 'Portuguese', 'nativeName': 'Português', 'flag': '🇵🇹'},
            'ro': {'name': 'Romanian', 'nativeName': 'Română', 'flag': '🇷🇴'},
            'ru': {'name': 'Russian', 'nativeName': 'Русский', 'flag': '🇷🇺'},
            'rw': {'name': 'Kinyarwanda', 'nativeName': 'Kinyarwanda', 'flag': '🇷🇼'},
            'sd': {'name': 'Sindhi', 'nativeName': 'سنڌي', 'flag': '🇵🇰'},
            'si': {'name': 'Sinhala', 'nativeName': 'Sinhala', 'flag': '🇱🇰'},
            'sk': {'name': 'Slovak', 'nativeName': 'Slovenčina', 'flag': '🇸🇰'},
            'sl': {'name': 'Slovenian', 'nativeName': 'Slovenščina', 'flag': '🇸🇮'},
            'sm': {'name': 'Samoan', 'nativeName': 'Gagana Samoa', 'flag': '🇼🇸'},
            'sn': {'name': 'Shona', 'nativeName': 'Shona', 'flag': '🇿🇼'},
            'so': {'name': 'Somali', 'nativeName': 'Soomaaliga', 'flag': '🇸🇴'},
            'sq': {'name': 'Albanian', 'nativeName': 'Shqip', 'flag': '🇦🇱'},
            'sr': {'name': 'Serbian', 'nativeName': 'Срpski', 'flag': '🇷🇸'},
            'st': {'name': 'Southern Sotho', 'nativeName': 'Sesotho', 'flag': '🇱🇸'},
            'su': {'name': 'Sundanese', 'nativeName': 'Basa Sunda', 'flag': '🇮🇩'},
            'sv': {'name': 'Swedish', 'nativeName': 'Svenska', 'flag': '🇸🇪'},
            'sw': {'name': 'Swahili', 'nativeName': 'Kiswahili', 'flag': '🇹🇿'},
            'ta': {'name': 'Tamil', 'nativeName': 'தமிழ்', 'flag': '🇮🇳'},
            'te': {'name': 'Telugu', 'nativeName': 'తెలుగు', 'flag': '🇮🇳'},
            'tg': {'name': 'Tajik', 'nativeName': 'Тоҷикӣ', 'flag': '🇹🇯'},
            'th': {'name': 'Thai', 'nativeName': 'ไทย', 'flag': '🇹🇭'},
            'tk': {'name': 'Turkmen', 'nativeName': 'Türkmençe', 'flag': '🇹🇲'},
            'tl': {'name': 'Tagalog (Filipino)', 'nativeName': 'Tagalog', 'flag': '🇵🇭'},
            'tr': {'name': 'Turkish', 'nativeName': 'Türkçe', 'flag': '🇹🇷'},
            'tt': {'name': 'Tatar', 'nativeName': 'Татарча', 'flag': '🇷🇺'},
            'ug': {'name': 'Uyghur', 'nativeName': 'ئۇيغۇرچە', 'flag': '🇨🇳'},
            'uk': {'name': 'Ukrainian', 'nativeName': 'Українська', 'flag': '🇺🇦'},
            'ur': {'name': 'Urdu', 'nativeName': 'اردو', 'flag': '🇵🇰'},
            'uz': {'name': 'Uzbek', 'nativeName': "O'zbekcha", 'flag': '🇺🇿'},
            'vi': {'name': 'Vietnamese', 'nativeName': 'Tiếng Việt', 'flag': '🇻🇳'},
            'xh': {'name': 'Xhosa', 'nativeName': 'isiXhosa', 'flag': '🇿🇦'},
            'yi': {'name': 'Yiddish', 'nativeName': 'ייִדיש', 'flag': '🇮🇱'},
            'yo': {'name': 'Yoruba', 'nativeName': 'Yorùbá', 'flag': '🇳🇬'},
            'zh-CN': {'name': 'Chinese (Simplified)', 'nativeName': '中文简体', 'flag': '🇨🇳'},
            'zh-TW': {'name': 'Chinese (Traditional)', 'nativeName': '中文繁體', 'flag': '🇹🇼'},
            'zu': {'name': 'Zulu', 'nativeName': 'isiZulu', 'flag': '🇿🇦'}
        }
        self.send_json_response({'languages': languages, 'count': len(languages)})

    def send_json_response(self, data, status=200):
        """Send JSON response"""
        response = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', len(response))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(response)

    def log_message(self, format, *args):
        """Custom log format"""
        print(f"[{self.log_date_time_string()}] {format % args}")

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), TranslationHandler) as httpd:
        print("""
====================================================
   Universal Language Translator
   Server running at http://localhost:8000

   Features:
   - Voice Input
   - Text-to-Speech
   - 100+ Languages
   - History & Favorites

   Press Ctrl+C to stop
====================================================
        """)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped. Thanks for using the translator!")
            sys.exit(0)