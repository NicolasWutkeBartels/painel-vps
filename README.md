# Painel VPS

Front-end (Next.js + React) para monitorar a VPS: uptime, RAM, CPU, disco, último restart e console de logs.

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

## Contrato esperado do backend

As respostas são validadas com zod (`src/schemas`).

`GET /status`
```json
{
  "hostname": "vps-01",
  "uptimeSeconds": 2804640,
  "lastRestart": "2026-10-02T03:12:00-03:00",
  "cpu": { "percent": 23, "cores": 4 },
  "ram": { "used": 4939212390, "total": 8589934592 },
  "disk": { "used": 80530636800, "total": 171798691840 }
}
```
`ram` e `disk` em bytes.

`GET /logs`
```json
[
  { "time": "14:30:41", "level": "INFO", "message": "Servidor iniciado" }
]
```
`level`: `INFO` | `WARN` | `ERROR` | `CMD`.

## Estrutura

```
src/
  app/          layout, página e estilos globais
  components/   Dashboard, StatCard, UsageCard, UptimeCard, LastRestartCard, Console, LogLine, CommandInput
  hooks/        usePolling, useVps
  lib/          env (validada com zod) e instância do axios
  schemas/      schemas zod de status e logs
  services/     chamadas ao backend
  utils/        formatação
```
