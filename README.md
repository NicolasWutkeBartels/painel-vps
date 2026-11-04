# Painel VPS

Front-end (Next.js + React + Tailwind CSS) para monitorar a VPS: uptime, RAM, CPU, disco, último restart e console de logs.

## Rodando

```bash
npm install
cp .env.example .env.local   # ajuste a URL do backend
npm run dev
```

## Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL base do backend da VPS |
| `NEXT_PUBLIC_POLL_INTERVAL` | Intervalo de atualização em ms (padrão 2000) |
| `NEXT_PUBLIC_COMMAND_TIMEOUT` | Tempo máximo de um comando em ms (padrão 30000) |

## Contrato esperado do backend

As respostas (e o corpo enviado) são validadas com zod (`src/schemas`).

### `GET /status`
```json
{
  "uptime": 1759385520,
  "lastRestart": 1759385520,
  "cpu": { "percent": 23, "cores": 4 },
  "ram": { "used": 4939212390, "total": 8589934592 },
  "disk": { "used": 80530636800, "total": 171798691840 }
}
```
- `uptime`: momento em que a VPS ligou. O painel calcula o tempo ligado a partir dele.
- `uptime` e `lastRestart` aceitam timestamp Unix em **segundos** ou **milissegundos**, ou data ISO 8601 (`"2026-10-02T03:12:00-03:00"`).
- `ram` e `disk` em bytes.

### `GET /logs`
```json
[
  { "time": "14:30:41", "level": "INFO", "message": "Servidor iniciado" }
]
```
`level`: `INFO` | `WARN` | `ERROR` | `CMD`.

### `POST /command`
Corpo enviado:
```json
{ "command": "df -h" }
```
Resposta:
```json
{ "output": "Filesystem  Size  Used ...", "exitCode": 0 }
```
- `exitCode` é opcional. Diferente de 0, a saída aparece em vermelho.
- Em caso de erro, devolva um status 4xx/5xx com `{ "message": "..." }` que o painel mostra no console.
- `clear` é tratado no próprio front (limpa a saída dos comandos) e não chega ao backend.
- Setas ↑/↓ navegam pelo histórico de comandos.

> ⚠️ Esse endpoint executa comandos na VPS. O backend **precisa** de autenticação, CORS restrito à URL do painel e, de preferência, um usuário sem privilégio de root.

## Estrutura

```
src/
  app/          layout, página e estilos globais (Tailwind CSS v4, tema em globals.css)
  components/   Dashboard, StatCard, UsageCard, UptimeCard, LastRestartCard, Console, LogLine, CommandInput
  hooks/        usePolling, useVps, useCommand, useNow
  lib/          env (validada com zod) e instância do axios
  schemas/      schemas zod de status, logs, comando e timestamp
  services/     chamadas ao backend
  utils/        formatação
```
