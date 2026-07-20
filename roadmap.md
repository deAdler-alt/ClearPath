# 🗺️ Zwycięska Roadmapa: ClearPath (Hackathon Edition)

**Tech-Stack:** Next.js 14 (App Router), Tailwind CSS, shadcn/ui, Magic UI, **Groq API** (Llama 3), Vercel.
**Narzędzia:** Cursor + Claude Code (Twoi cyfrowi parobkowie)
**Cel:** One-Man-Army dowozi MVP w 12-24 godziny bez wydawania ani grosza.

> **💡 Jak pracować z tą roadmapą w Cursorze:**
> Nie próbuj generować całej aplikacji jednym promptem. Otwieraj plik z roadmapą w Cursorze, zaznaczaj konkretny "Krok" i proś Claude Code (Cmd/Ctrl + L lub w terminalu): *"Zrób Krok 1.1 z roadmap.md"*. Dzięki temu AI nie zgubi kontekstu, a ty będziesz miał pełną kontrolę nad architekturą.

---

## 🕒 Faza 1: Błyskawiczny Setup (Zadanie na pierwsze 1-2h)
W tej fazie stawiamy fundamenty. Zleć to Cursorowi, niech odwala czarną robotę.

### 1.1 Inicjalizacja projektu
- **Akcja:** Wygeneruj nowy projekt Next.js.
- **Prompt dla Cursora:** `"Stwórz nowy projekt Next.js 14 z App Router, TypeScript i Tailwind CSS. Zainstaluj od razu lucide-react oraz framer-motion."`
- **Konfiguracja:** Upewnij się, że masz czysty `page.tsx` i usunięte domyślne style Next.js.

### 1.2 Instalacja systemu komponentów (shadcn/ui)
- **Akcja:** Inicjalizacja shadcn.
- **Prompt dla Cursora:** `"Zainicjalizuj shadcn/ui w tym projekcie (użyj stylów 'New York' i bazy kolorów 'Slate'). Następnie zainstaluj komponenty: button, card, input, label, textarea, skeleton, toast."`

### 1.3 Integracja Groq API (Za darmo i z prędkością światła)
- **Opis:** Groq używa układów LPU, co daje ekstremalną prędkość (idealne na demo!). Co najlepsze, ich API jest kompatybilne z OpenAI, więc użyjemy standardowego Vercel AI SDK.
- **Akcja:** Instalacja SDK i konfiguracja klienta.
- **Prompt dla Cursora:** `"Zainstaluj 'ai' oraz '@ai-sdk/openai'. Stwórz plik w 'lib/groq.ts' i skonfiguruj klienta OpenAI, podmieniając baseURL na 'https://api.groq.com/openai/v1' i używając process.env.GROQ_API_KEY. Skonfiguruj go do używania modelu 'llama3-8b-8192' lub 'llama3-70b-8192'."`

---

## 🎨 Faza 2: Landing Page & "Efekt Wow" (Godziny 2-5)
Sędziowie kupują oczami. Twój Landing Page musi wyglądać jak strona startupu wycenianego na 10 milionów dolarów.

### 2.1 Hero Section z Magic UI
- **Akcja:** Dodanie animowanego tła i nagłówka.
- **Prompt dla Cursora:** `"Skorzystaj z Magic UI (lub napisz to we Framer Motion). Stwórz sekcję Hero. Nagłówek to 'Zrozum swoje zdrowie i prawa w sekundy.' Dodaj animowany gradient w tle, wyśrodkowany tekst i duży, zachęcający przycisk 'Przeanalizuj dokument za darmo', który gładko scrolluje do sekcji aplikacji. Dodaj wsparcie dla Dark Mode."`

### 2.2 Fejkowa sekcja "Zaufali nam" / "Jak to działa"
- **Akcja:** Proste karty z ikonami (Lucide React).
- **Opis:** Pokaż trzy kroki: 1. Wgrywasz zdjęcie/PDF -> 2. Groq AI analizuje żargon -> 3. Dostajesz prostą listę kroków. Zleć Cursorowi stworzenie ładnego gridu (Grid 3 kolumny).

---

## 🧠 Faza 3: Core Aplikacji - Mechanika "Happy Path" (Godziny 5-9)
Nie robimy autoryzacji (Supabase wyrzucamy, żeby było szybciej i darmowo). Każdy wchodzi i używa. Skupiamy się na jednym, idealnym przepływie dla wideo.

### 3.1 Interfejs Wgrywania (Drag & Drop)
- **Akcja:** Wizualny komponent wgrywania.
- **Prompt dla Cursora:** `"Stwórz komponent 'DocumentUploader'. Ma to być duża przerywana ramka, która reaguje na drag & drop. Użytkownik widzi ikonę pliku i napis 'Przeciągnij swój dokument (PDF, JPG) lub kliknij'. Po wybraniu pliku NIE WYSYŁAJ GO nigdzie – po prostu symuluj pasek ładowania przez 2 sekundy (użyj setTimeout i stanu 'isUploading'), a potem przejdź do widoku analizy."`
- **Hack:** Na hackathonie nie piszemy ekstrakcji tekstu z PDF. Na żywo wgrasz plik graficzny, a w tle z-hardkodujesz tekst "pacjent ma zdiagnozowaną hiperlipidemię i nadciśnienie...", który poleci do Groqa.

### 3.2 Prompty do Groqa (Backend Route)
- **Akcja:** Stworzenie Route Handlera dla AI.
- **Prompt dla Cursora:** `"Stwórz Route Handler w Next.js (np. /api/analyze). Ma przyjmować tekst. Użyj Vercel AI SDK i klienta Groq, którego stworzyliśmy wcześniej. Napisz system prompt, który poinstruuje model Llama-3: 'Jesteś ekspertem od upraszczania skomplikowanych tekstów medycznych/prawniczych. Przetłumacz poniższy tekst na język 10-latka (ELI5). Zwróć wynik w formacie JSON z trzema polami: 'summary' (2 zdania), 'action_items' (tablica 3 prostych kroków, np. 'Kup lek X'), 'difficult_words' (tablica obiektów: słowo + prosta definicja)'. Użyj streamObject z Vercel AI SDK."`

### 3.3 Dashboard Analizy (Wyniki)
- **Akcja:** Prezentacja wyników od AI.
- **Prompt dla Cursora:** `"Stwórz komponent 'AnalysisResult'. Ma on odbierać streamowany JSON z naszego API. Użyj komponentów 'Card' z shadcn, aby wyświetlić wyniki. Karta 1 to Podsumowanie (z fajną ikonką mózgu). Karta 2 to 'Co musisz zrobić' (lista z checkboxami). Karta 3 to 'Słowniczek' (zastosuj komponent Accordion z shadcn, żeby wyglądało interaktywnie). Zadbaj o płynne pojawianie się elementów (Framer Motion opacity: 0 -> 1)."`

---

## 🎬 Faza 4: Szlifowanie przed Nagraniem (Godziny 9-11)
To faza wygrywania. Aplikacja musi wyglądać perfekcyjnie na nagraniu.

### 4.1 Szkielety (Skeleton Loaders) i Empty States
- Zanim Groq zwróci wynik (choć będzie to trwało ułamek sekundy), pokaż animowane szkielety (Skeleton z shadcn). To dodaje +100 punktów do profesjonalizmu UX.
- **Prompt dla Cursora:** `"Kiedy dane z API się ładują, wyświetl ładny Skeleton UI, który kształtem przypomina ostateczne karty z wynikami."`

### 4.2 Responsywność
- Aplikacja na 99% będzie oceniana na laptopach, ale na Devpoście warto dorzucić screena z widoku mobilnego.
- Poproś Claude Code: *"Przejrzyj cały kod i upewnij się, że wszystkie gridy w Tailwindzie zwijają się do 1 kolumny na ekranach mobilnych (np. z grid-cols-3 na md:grid-cols-3 grid-cols-1)."*

---

## 🚀 Faza 5: Deploy & Prezentacja (Godzina 12)
Gotowe MVP trzeba teraz wrzucić do sieci i nagrać wideo.

### 5.1 Vercel Deploy
1. Wrzuć kod na GitHub.
2. Zaloguj się do Vercela i zaimportuj repozytorium.
3. **WAŻNE:** Pamiętaj, aby w ustawieniach projektu na Vercelu dodać zmienną środowiskową `GROQ_API_KEY`.
4. Kliknij Deploy.

### 5.2 Nagrywanie Demo (Obsidian / Loom)
- Użyj darmowego narzędzia (np. Loom, OBS Studio).
- Postępuj zgodnie ze scenariuszem z poprzedniej wiadomości:
  1. Haczyk (Pokaż skomplikowany tekst).
  2. Wgraj plik do swojej zdeployowanej apki ClearPath.
  3. Pokaż, jak szybko Groq analizuje tekst i jak UI w czasie rzeczywistym wypełnia się kartami.
  4. Omów darmowy i szybki tech stack.

---
**Wskazówka od Hackatończyka:** Z Groqiem i jego układami LPU odpowiedź dostaniesz tak szybko, że wydaje się to aż nierealne. Wykorzystaj to w prezentacji! Powiedz sędziom: *"Zamiast drogich modeli z sekundowymi opóźnieniami, wykorzystałem Groqa, dzięki czemu nasi starsi użytkownicy nie muszą wpatrywać się w kręcące się kółko ładowania - dostają pomoc natychmiast."*