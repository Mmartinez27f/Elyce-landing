# Deploy en Vercel (elyce.cl)

## Reconectar desde el monorepo Elyce

1. Abre [Vercel Dashboard](https://vercel.com/dashboard) → proyecto que sirve `elyce.cl`.
2. **Settings → Git** → desconecta el repo `Mmartinez27f/Elyce` (o deja de desplegar en push a ese repo).
3. **Add New → Project** → importa `Mmartinez27f/Elyce-landing`.
4. Framework Preset: **Other** (sin build command).
5. Root Directory: `.` (raíz del repo).
6. Deploy.
7. **Settings → Domains** → asigna `elyce.cl` al nuevo proyecto si no migró solo.

## Verificación post-deploy

- https://elyce.cl/ — home carga
- https://elyce.cl/experiencia → redirect a `/`
- https://elyce.cl/seguimiento.html — formulario de tracking
- Formulario whitelist (early access) — insert en `whitelist_landing`

## Preview local

```powershell
npx --yes serve . -l 8080
```
