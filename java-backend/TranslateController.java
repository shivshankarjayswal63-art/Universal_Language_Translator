package com.translator.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TranslateController {
    @PostMapping("/translate")
    public Map<String, Object> translate(@RequestBody Map<String, String> body) {
        String text = body.getOrDefault("text", "");
        String sourceLang = body.getOrDefault("sourceLang", "auto");
        String targetLang = body.getOrDefault("targetLang", "en");
        Map<String, Object> resp = new HashMap<>();
        if (text.isEmpty() || targetLang.isEmpty()) {
            resp.put("error", "Missing required parameters");
            resp.put("success", false);
            return resp;
        }
        // Dummy translation: just echoes the text. Replace with real translation logic.
        resp.put("translation", text + " (translated to " + targetLang + ")");
        resp.put("detectedLang", sourceLang.equals("auto") ? "en" : sourceLang);
        resp.put("success", true);
        return resp;
    }
}
