package com.translator.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class LanguagesController {
    @GetMapping("/languages")
    public Map<String, Object> getLanguages() {
        Map<String, Object> resp = new HashMap<>();
        Map<String, Map<String, String>> languages = new HashMap<>();
        // Example: Add a few languages. Add more as needed.
        languages.put("en", Map.of("name", "English", "nativeName", "English", "flag", "🇺🇸"));
        languages.put("fr", Map.of("name", "French", "nativeName", "Français", "flag", "🇫🇷"));
        languages.put("ne", Map.of("name", "Nepali", "nativeName", "नेपाली", "flag", "🇳🇵"));
        resp.put("languages", languages);
        resp.put("count", languages.size());
        return resp;
    }
}
