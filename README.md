# week2-node-express

A simple Express API for Week 2.

## Setup

```bash
npm install
cp .env.example .env   # sets PORT (default 3000)
npm start              # or: npm run dev (auto-restart on changes)
```

## Endpoints

| Method | Route       | Response                                              |
|--------|-------------|-------------------------------------------------------|
| GET    | `/`         | Static HTML page: "My Week 2 API!"                    |
| POST   | `/user`     | Accepts `{ name, email }`, returns `Hello, [name]!`   |
| GET    | `/user/:id` | `User [id] profile`                                   |

`POST /user` returns **400** if `name` or `email` is missing or if the JSON is invalid. Unknown routes return **404**.

## Testing with curl

```bash
curl http://localhost:3000/

curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Isaac","email":"isaac@example.com"}'
# Hello, Isaac!

curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Isaac"}'
# 400 {"error":"Both name and email are required"}

curl http://localhost:3000/user/42
# User 42 profile
```

## Bonus: request logger

A custom middleware logs every request:

```
[2026-10-24T09:49:58.669Z] POST /user 200 - 7ms
```
