# 🏆 FIFA Stadium AI Copilot

![FIFA Stadium AI Copilot Banner](https://images.unsplash.com/photo-1518605368461-1e1e38ceee4b?auto=format&fit=crop&q=80&w=2000)

> A Generative AI-powered command center and fan experience platform built for the FIFA World Cup 2026.

## ⚠️ Problem Statement

Managing massive crowds during global events like the FIFA World Cup requires real-time insights, efficient resource allocation, and seamless fan experiences. Traditional, static stadium management systems fail to dynamically adapt to sudden changes such as unexpected congestion, sudden medical emergencies, or public transit delays. There is a critical need for an intelligent system that not only monitors data but provides **actionable, predictive AI recommendations** to both stadium organizers and attending fans.

## 🏗️ Architecture

The project utilizes a decoupled, modern architecture:

- **Frontend (Client)**: A high-performance React application built with Vite and TypeScript. It features a responsive, glassmorphic UI tailored for both mobile fans and desktop administrators.
- **Backend (API)**: A fast, asynchronous Python backend powered by FastAPI. It handles routing, mock data generation, and acts as a secure middleware to interface with Google's AI models.
- **AI Engine**: Deep integration with Google's `gemini-2.5-flash` via the `google-genai` SDK, utilizing strict JSON schema enforcement for deterministic, structured outputs in critical scenarios.

## 💻 Tech Stack

### Frontend
- **Framework**: React 18, Vite, TypeScript
- **Styling**: TailwindCSS, custom CSS variables (Glassmorphism)
- **UI Components**: shadcn/ui inspired modular components, Lucide Icons
- **Animations**: Framer Motion
- **Visualizations**: Recharts (Data), React-Leaflet (Interactive Maps)
- **Testing**: Vitest, React Testing Library

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **AI Integration**: `google-genai` SDK (Gemini 2.5 Flash)
- **Data Validation**: Pydantic
- **Database**: SQLite (SQLAlchemy)
- **Testing**: Pytest, FastAPI TestClient, unittest.mock

## ✨ Features

- **🏟️ Multi-Role Dashboards**: Dedicated experiences for Fans (mobile-first), Organizers (high-density command center), Volunteers, and Security.
- **🗺️ Interactive Wayfinding**: Live stadium map utilizing Leaflet to visualize gates, concessions, and washrooms.
- **📊 Deep Analytics**: Real-time tracking and AI-predicted comparisons of crowd density, food demand, and parking utilization via animated Recharts.
- **🚨 Emergency Protocols**: A pulsing SOS system that triggers immediate, calm, and localized life-safety protocols generated dynamically by AI.
- **♿ Accessibility First**: Built-in high-contrast modes and AI navigation that prioritizes elevators and ramps for differently-abled fans.

## 🧠 AI Usage

This platform goes beyond a simple chatbot. It leverages **Gemini 2.5 Flash** for complex, domain-specific tasks:
1. **Crowd Analysis**: Ingests raw JSON gate and sector data to output structured risk assessments and volunteer deployment strategies.
2. **Dynamic Navigation**: Calculates optimal intra-stadium routes avoiding AI-identified congestion zones.
3. **Transport Logistics**: Analyzes egress gates to recommend the most efficient transit (Metro, Bus, Rideshare) factoring in carbon footprint.
4. **Deterministic Emergency Response**: Utilizes `temperature=0.1` and strict Pydantic schemas to output concise, step-by-step crisis instructions.

## 📂 Folder Structure

```text
fifa-stadium-copilot/
├── backend/
│   ├── api/             # FastAPI routes
│   ├── core/            # Config and environment
│   ├── db/              # SQLAlchemy setup
│   ├── services/        # Gemini integration logic
│   ├── tests/           # Pytest suites
│   ├── main.py          # Application entry point
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/  # Modular React components
│   │   ├── context/     # Auth and global state
│   │   ├── pages/       # Dashboards and landing
│   │   ├── routes/      # React Router config
│   │   └── tests/       # Vitest suites
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vitest.config.ts
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- A Google Gemini API Key

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file in the `backend` directory:
```env
GEMINI_API_KEY=your_api_key_here
```
Run the server:
```bash
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## ☁️ Deployment

- **Frontend**: Ready for deployment on **Vercel** or Netlify. Simply connect the repository and set the build command to `npm run build` and output directory to `dist`.
- **Backend**: Ready for deployment on **Render**, Railway, or Google Cloud Run. Ensure `GEMINI_API_KEY` is set in the environment variables of your hosting provider.

## 🔮 Future Scope

- **IoT Integration**: Replace mock API data with live feeds from physical turnstile sensors and CCTV density cameras.
- **Multilingual Voice Assistant**: Utilize Web Speech API alongside Gemini to allow fans to request directions hands-free in any language.
- **Ticket Wallet**: Integrate digital ticketing logic to automatically route fans to their specific seats upon scanning.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
