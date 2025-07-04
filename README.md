# eq-track

A full-stack equipment tracking app, built with a clean, modular architecture and modern tooling.

---

## main technologies

**containerization:**  
- Docker & Docker Compose for local dev. 

**backend:**  
- NestJS (with GraphQL, code-first approach)
- Prisma ORM
- PostgreSQL
- csv-parse for importing equipment types from CSV files
- Clean, modular architecture

**frontend:**  
- React (TypeScript)
- Tailwind CSS (design inspired by Flowbite)
- Vite (build tool)
- sweetalert2 for user-friendly alerts
- Custom hooks and user-defined modals for a clean, maintainable frontend structure

**dev stuff:**  
- VS Code devcontainers for seamless development inside the API container

---

## getting started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/ilyes-i-ben/eq-track.git
   cd eq-track
   ```

2. **Start the stack:**
   ```sh
   docker compose up -d --build
   ```

3. **Generate the Prisma client (inside the `api` container):**
   ```sh
   docker exec -it <api_container_name> npx prisma generate
   ```
   Replace `<api_container_name>` with the actual container name (usually something like `eq-track-api-1`).

4. **Import equipment types from CSV (inside the API container):**
   ```sh
   npm run import:equipment
   ```
   (Runs the script at `scripts/import-equipment-types.ts`)

5. **Generate fake equipment data (inside the API container):**
   ```sh
   npm run generate:equipment [-- --count=200]
   ```
   (Runs the script at `scripts/generate-equipments.ts`)
   (By default, generates 500 fake entries. You can set a custom count with `--count=<number>`, e.g. `npm run generate:equipment -- --count=200`)

---

## notes

- all backend scripts should be run inside the api container.
- the app uses a clean, modular structure both on the backend and frontend for maintainability.
- for development, vs code devcontainers are recommended for a smooth experience.
