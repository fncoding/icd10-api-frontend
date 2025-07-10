
# ICD10 API Frontend

Dies ist das Frontend für die [ICD10 API](https://github.com/fncoding/icd10-api). Es basiert auf **Vite**, **React**, **TailwindCSS** und **daisyUI**.

## Features

- Moderne UI mit React, TailwindCSS und daisyUI
- Docker-basiertes Deployment für einfache Skalierbarkeit
- Getrennte Projekte für API und Frontend (jeweils mit eigenem `docker-compose`)
- Einfache Konfiguration für den Einsatz im lokalen Netzwerk

## Voraussetzungen

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

- [Node.js und npm](https://nodejs.org/)


## Installation & Start

1. **Repository klonen:**
    ```bash
    git clone https://github.com/fncoding/icd10-api-frontend.git
    cd icd10-api-frontend
    ```

2. **Umgebungsvariablen konfigurieren:**
    ```bash
    cp .env.example .env
    ```
    Trage in der `.env`-Datei die **IP-Adresse** deines Geräts ein, wenn das Frontend im lokalen Netzwerk erreichbar sein soll (nicht nur über `localhost`). Passe ggf. auch den **Port** an.

3. **Starten:**
    ```bash
    docker-compose up -d --build
    ```

Das Frontend spricht automatisch die API an, sofern diese korrekt gehostet und in der `.env` konfiguriert ist.

## Hinweise

- Die API und das Frontend sind **getrennte Projekte** und können unabhängig voneinander skaliert und wiederverwendet werden.
- Für die API-Konfiguration siehe: [ICD10 API README](https://github.com/fncoding/icd10-api#readme)

