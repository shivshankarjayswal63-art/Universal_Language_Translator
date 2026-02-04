# Java backend for Universal Language Translator
#
# How to run:
# 1. Install Java 17+ and Maven (https://maven.apache.org/)
# 2. In this folder, run:
#    mvn spring-boot:run
#
# The server will start at http://localhost:8080
#
# Endpoints:
#   POST   /api/translate   {text, sourceLang, targetLang}
#   POST   /api/detect      {text}
#   GET    /api/languages
#   GET    /api/health
