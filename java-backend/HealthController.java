package com.translator.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {
    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> resp = new HashMap<>();
        resp.put("status", "ok");
        resp.put("timestamp", java.time.Instant.now().toString());
        return resp;
    }
}
