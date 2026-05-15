# LearnLingo — MVP für einen Marktplatz für Sprachlehrer

LearnLingo ist ein React-basiertes Marketplace-MVP für Online-Sprachunterricht. Nutzer können Sprachlehrer durchsuchen, nach Sprache, Niveau und Preis filtern, sich über Firebase anmelden, bevorzugte Lehrer speichern und eine Probestunde anfragen.

Das Projekt zeigt eine realistische clientseitige Webanwendung mit React, Redux Toolkit, React Router, Formik/Yup-Validierung und Firebase Authentication / Realtime Database. Es eignet sich als Portfolio-Projekt für Frontend-Rollen, Freelancer-MVPs und Firebase-basierte Produktprototypen.

## Funktionen

- Öffentliche Landingpage mit Produktpositionierung und Plattform-Kennzahlen
- Lehrerkatalog mit wiederverwendbaren Teacher Cards
- Filterung nach Sprache, Lernniveau und Stundenpreis
- „Load more“-Pattern für schrittweises Nachladen
- Firebase-Registrierung und Login mit E-Mail/Passwort
- Google Login über Firebase Authentication
- Geschützte Favoriten-Seite für angemeldete Nutzer
- Hinzufügen und Entfernen von Favoriten mit Speicherung in Firebase Realtime Database
- Modal für die Buchung einer Probestunde
- Formularvalidierung mit Formik und Yup
- Geschützte Routen für private Bereiche
- Redux Toolkit State Management für Auth, Lehrer und Favoriten
- GitHub-Pages-Deployment über GitHub Actions
- Firebase-Konfiguration über Umgebungsvariablen

## Tech Stack

### Frontend

- React 18
- React Router DOM
- Redux Toolkit
- React Redux
- Redux Persist
- CSS Modules
- React Select
- React Loader Spinner

### Formulare und Validierung

- Formik
- Yup

### Backend-as-a-Service

- Firebase Authentication
- Firebase Google Authentication
- Firebase Realtime Database

### Tooling und Deployment

- Create React App
- ESLint über react-scripts
- Prettier-Konfiguration
- GitHub Actions
- GitHub Pages

## Architekturübersicht

Die Anwendung ist eine clientseitige React Single Page Application. Firebase übernimmt Authentifizierung und Datenhaltung.

```text
User Interface
  └── React-Seiten und wiederverwendbare Komponenten
        ├── Home Page
        ├── Teachers Catalogue
        ├── Favorites Page
        └── Auth- und Probestunden-Modals

State Management
  └── Redux Toolkit Slices
        ├── auth
        ├── teachers
        └── favorites

Datenebene
  └── Firebase SDK
        ├── Firebase Authentication
        ├── Google Sign-in Provider
        └── Realtime Database

Deployment
  └── GitHub Actions
        └── Build und Deployment zu GitHub Pages
```

Das Projekt verwendet keine eigene REST API. Die Daten werden direkt aus Firebase Realtime Database geladen, während Login und Registrierung über Firebase Authentication laufen. Diese Architektur ist passend für ein leichtgewichtiges MVP oder einen Prototyp, sollte aber ehrlich als Firebase-backed SPA und nicht als klassische Fullstack-Plattform beschrieben werden.

## Screenshots

### Startseite

![LearnLingo Startseite](assets/screenshots/home-desktop.png)

### Lehrerkatalog mit Filtern

![Lehrerkatalog mit Filtern](assets/screenshots/teachers-filters-desktop.png)

### Erweiterte Teacher Card mit Bewertungen

![Erweiterte Teacher Card mit Bewertungen](assets/screenshots/teacher-card-expanded.png)

### Login- und Registrierungsmodal

![Login- und Registrierungsmodal](assets/screenshots/auth-modal.png)

### Favoriten-Seite

![Gespeicherte Lehrer](assets/screenshots/favorites-authenticated.png)

### Anfrage für eine Probestunde

![Probestunden-Modal](assets/screenshots/trial-lesson-modal.png)

### Mobile Ansicht des Lehrerkatalogs

![Mobile Ansicht des Lehrerkatalogs](assets/screenshots/teachers-mobile.png)

## Installation

Repository klonen:

```bash
git clone https://github.com/turboboyd/LearnLingo.git
cd LearnLingo
```

Abhängigkeiten installieren:

```bash
npm install
```

## Environment Setup

Erstelle eine `.env`-Datei im Root-Verzeichnis:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

Die Firebase Realtime Database URL ist aktuell in `src/server/firebaseConfig.js` definiert. Für eine sauberere Production-Konfiguration sollte sie ebenfalls in eine Umgebungsvariable verschoben werden:

```env
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
```

## Lokal starten

Development Server starten:

```bash
npm start
```

Linting ausführen:

```bash
npm run lint:js
```

Production Build erstellen:

```bash
npm run build
```

## API / Backend-Beschreibung

Dieses Projekt nutzt Firebase als Backend-as-a-Service und keinen eigenen Backend-Server.

### Authentifizierung

Die Authentifizierung läuft über Firebase Authentication:

- Registrierung mit E-Mail und Passwort
- Login mit E-Mail und Passwort
- Google Login
- Logout
- Wiederherstellung des Auth-Status beim Laden der App

### Datenbank

Firebase Realtime Database wird genutzt für:

- Laden von Lehrerdaten aus `teachers/`
- Speichern nutzerspezifischer Favoriten unter `favorites/{userId}`

Logisches Datenmodell:

```text
teachers/
  teacherId/
    name
    surname
    languages[]
    levels[]
    rating
    reviews[]
    price_per_hour
    lessons_done
    lesson_info
    conditions[]

favorites/
  userId/
    teacherId/
      teacher data snapshot
```

Für ein größeres Production-System wäre es besser, bei Favoriten nur Teacher-IDs zu speichern, statt komplette Teacher-Objekte zu duplizieren. Ein eigener Backend-Service könnte später Buchungen, Zahlungen, Audit Logs und Admin-Funktionen übernehmen.

## Ordnerstruktur

```text
src/
  components/          Wiederverwendbare UI- und Feature-Komponenten
  hooks/               Custom Hooks für Auth, Lehrer, Favoriten, Filter und Pagination
  images/              Statische Icons, SVGs und Assets
  pages/               Route-Level Pages: Home, Teachers, Favorites
  redux/               Redux Toolkit Slices, Async Thunks, Selectors und Reducers
  server/              Firebase-Konfiguration und exportierte Firebase Services
  utils/               Gemeinsame Konstanten und visuelle Konfiguration
  index.js             Einstiegspunkt der React-App
  index.css            Globale Styles
  variables.css        CSS-Variablen
```

Wichtige Bereiche:

- `components/TeacherCard/` enthält die Teacher Card mit Avatar, Statistiken, Informationen, Levels, Favoriten-Button und CTA für eine Probestunde.
- `components/Form/` enthält Auth- und Probestunden-Formulare mit Validierung.
- `redux/auth/` verwaltet den Firebase-Authentifizierungsstatus.
- `redux/teacher/` verwaltet das Laden des Lehrerkatalogs.
- `redux/favorite/` verwaltet gespeicherte Favoriten.
- `hooks/` trennt wiederverwendbare UI- und Datenlogik von Komponenten.

## Business Use Case

LearnLingo ist ein MVP für einen Marktplatz im Bereich Online-Sprachunterricht. Ein ähnliches Produkt könnte genutzt werden von:

- Online-Sprachschulen
- privaten Lehrernetzwerken
- Nachhilfeagenturen
- EdTech-Startups zur Validierung einer Marketplace-Idee
- kleinen Unternehmen, die schnell ein Firebase-basiertes MVP benötigen

Der zentrale User Flow:

1. Nutzer besucht die Landingpage.
2. Nutzer durchsucht Lehrer.
3. Nutzer filtert nach Lernbedarf.
4. Nutzer prüft Lehrerprofil, Bewertungen und Preise.
5. Nutzer meldet sich an.
6. Nutzer speichert Favoriten.
7. Nutzer fragt eine Probestunde an.

## Warum dieses Projekt technisch interessant ist

Dieses Projekt ist für ein Portfolio wertvoll, weil es mehr als eine statische Landingpage ist. Es enthält:

- clientseitiges Routing
- geschützte Routen
- Firebase Authentication
- OAuth Login mit Google
- Datenbank-Lese- und Schreiboperationen
- globales State Management mit Redux Toolkit
- wiederverwendbare Custom Hooks
- validierte Formulare
- Modal-Workflows
- Katalogfilterung
- nutzerspezifische persistierte Daten
- automatisiertes Deployment mit GitHub Actions

Das sind praktische Fähigkeiten, die in Freelancer-MVPs, Startup-Prototypen und Junior+/Middle-Frontend-Rollen relevant sind.

## Production-orientierte Hinweise

Bereits vorhandene Production-orientierte Elemente:

- Firebase-Konfiguration über Umgebungsvariablen
- GitHub Actions Workflow für Build und Deployment
- geschützte Route für private Inhalte
- Formularvalidierung über Schemas
- Teile der Businesslogik sind in Hooks und Redux Async Thunks ausgelagert

Empfohlene Verbesserungen:

- `databaseURL` in eine Umgebungsvariable verschieben
- `.env.example` hinzufügen
- saubere Loading- und Empty-States für Teachers und Favorites ergänzen
- `snapshot.val() === null` robust behandeln
- Fehlerzustände bei Firebase Requests sichtbar machen
- Favoriten als Teacher-ID-Referenzen speichern statt vollständige Teacher-Objekte zu duplizieren
- TypeScript einführen oder PropTypes konsequenter nutzen
- Unit Tests für Hooks, Reducers und Formularvalidierung hinzufügen
- Firebase Security Rules dokumentieren
- Accessibility von Modals und Formularen verbessern
- Screenshots und Live-Demo-Link prominent im README platzieren
- GitHub Actions auf aktuelle Versionen aktualisieren

## Zukünftige Verbesserungen

- Persistente Buchungsanfragen in Firebase
- Admin-Bereich zur Verwaltung von Lehrern
- Detailseite für Lehrerprofile
- Suche nach Lehrername oder Keywords
- Sortierung nach Bewertung, Preis und Popularität
- Kalenderbasierte Buchung von Unterrichtsstunden
- E-Mail-Benachrichtigungen für Probestunden-Anfragen
- Zahlungsintegration als Prototyp
- Nutzerprofileinstellungen
- Mehrsprachigkeit der Oberfläche
- Migration zu TypeScript
- Testabdeckung mit React Testing Library
- Firebase Security Rules und Emulator Setup
- CI Pipeline mit Lint, Tests und Build-Prüfung

## Repository-Status

Dieses Repository sollte als Frontend Marketplace MVP mit React und Firebase präsentiert werden. Es sollte nicht als vollständig fertige Production-Plattform mit Zahlungen, Admin-Tools oder echter Buchungsabwicklung vermarktet werden, solange diese Funktionen nicht implementiert sind.
