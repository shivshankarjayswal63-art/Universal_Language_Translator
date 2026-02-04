package com.translator.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DetectController {
    @PostMapping("/detect")
    public Map<String, Object> detect(@RequestBody Map<String, String> body) {
        String text = body.getOrDefault("text", "");
        Map<String, Object> resp = new HashMap<>();
        if (text.isEmpty()) {
            resp.put("error", "No text provided");
            resp.put("success", false);
            return resp;
        }
        // Dummy detection: always returns 'en'. Replace with real detection logic.
        resp.put("language", "en");
        resp.put("success", true);
        return resp;
    }
}
