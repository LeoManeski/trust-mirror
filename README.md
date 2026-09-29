# Trust Mirror

**An education platform that teaches students to recognise AI-generated and manipulative online content.**

🏆 **3rd place, [MKSafeNet Innovators Hackathon 2025](https://ma.edu.mk/en/news/251215-mksafenet-innovators-2025-concludes-winning-teams-awarded)**, built in two days by a team of three.

![Dashboard](docs/screenshots/dashboard.png)

## The idea

Detection tools will always be one step behind generative AI. Trust Mirror trains the human instead. Students practise on realistic deceptive content in a safe environment and learn *why* they fall for it.

1. **Face a scenario.** A video of a "man walking on Mars", an urgent account-verification text, a celebrity product endorsement, a heartbreaking plea for money, and more.
2. **Decide.** Authentic or deceptive? Students can also explain their reasoning.
3. **Learn.** Instant feedback breaks down the manipulation techniques and psychological triggers behind the content.
4. **See your Trust Mirror.** Every answer updates a personal vulnerability profile across eight tactics, visualised as a radar chart, so students see which tricks work best on *them*.

| Scenario | Feedback |
|---|---|
| ![Scenario](docs/screenshots/scenario.png) | ![Feedback](docs/screenshots/feedback.png) |

## Features

- **Scenario challenges** across video, text-message and social-media formats, with difficulty levels
- **Vulnerability profile** scored across emotional manipulation, authority bias, urgency tactics, scarcity, social proof, source verification, and visual and audio inconsistency
- **Student and teacher roles.** Teachers can follow their students' progress and vulnerability profiles
- **Deception Playbook** explaining common manipulation tactics
- **JWT authentication** with stateless sessions

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot 3.2, Spring Security, JWT (jjwt), Spring Data JPA |
| Database | PostgreSQL 15 |
| Frontend | React 18, Vite, React Router, Recharts |
| Infrastructure | Docker Compose, Nginx (serves the frontend and proxies `/api` to the backend) |

## Run it

Requires Docker and Docker Compose.

```bash
git clone https://github.com/LeoManeski/trust-mirror.git
cd trust-mirror
docker compose up -d
```

- App: http://localhost:3000
- API: http://localhost:8080

Scenarios are seeded automatically on first start. Register an account to begin.

> The credentials in `docker-compose.yml` and `application.properties` are for local development only.

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account (student or teacher) |
| POST | `/api/auth/login` | Log in and receive a JWT |
| GET | `/api/scenarios` | List scenarios (also filterable by `/type`, `/category`, `/difficulty`) |
| GET | `/api/scenarios/{id}` | Get one scenario |
| POST | `/api/attempts` | Submit an answer; updates the vulnerability profile |
| GET | `/api/attempts/my-attempts` | The current user's attempts |
| GET | `/api/vulnerability/my-profile` | The current user's Trust Mirror profile |
| GET | `/api/teacher/students` | A teacher's students and their progress |

## Project structure

```
backend/    Spring Boot API: controllers, services, JPA entities, security (JWT filter, config)
frontend/   React app: dashboard, scenario view, Trust Mirror, Deception Playbook
docker-compose.yml   PostgreSQL + backend + frontend
```

## My role

The idea for Trust Mirror was mine, and I built the backend: the REST API, authentication and authorization with Spring Security and JWT, the data model, and the scoring logic behind the vulnerability profiles. The frontend was prototyped with AI-assisted tooling to fit the two-day hackathon timeline.
