# Elyce — Landing web

Sitio estático público en **https://elyce.cl/** (early access, seguimiento de envíos, formulario whitelist).

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Home early access |
| `experiencia.html` | Redirect stub → `/` |
| `seguimiento.html` | Tracking público de envíos (Supabase JS) |

## Previsualizar

```powershell
npx --yes serve . -l 8080
```

Abrir: http://localhost:8080/

## Stack

- HTML/CSS/vanilla JS estático
- GSAP ScrollTrigger (`js/experiencia-v4.js`)
- Supabase JS (whitelist + seguimiento)
- Remotion opcional (`remotion/`) — solo generación de assets, no runtime

### Scripts

```
js/asset-base.js      — ElyceAssets.resolve()
js/experiencia-v4.js  — Journey + formulario whitelist
```

## Assets

- `assets/escenas/` — escenas `.webp` + `.png`
- `assets/ref/` — frames de referencia (local, no versionados)

## Brand

- Fondo: `#F1F8F5` · Texto: `#1B4332` · Acento: `#52B788` · Menta: `#D8F3DC`

## Deploy

Repo conectado a **Vercel** (`vercel.json` en raíz, sin build). Push a `main` despliega `elyce.cl`.

## Supabase

El formulario whitelist y `seguimiento.html` consumen el proyecto Supabase de Elyce WMS (anon key en JS). La tabla `whitelist_landing` se crea con la migración `068_whitelist_landing.sql` en el repo [Elyce](https://github.com/Mmartinez27f/Elyce) (`supabase/migrations/`).

## Repo relacionado

- **Elyce WMS** (Flutter + Supabase): https://github.com/Mmartinez27f/Elyce
