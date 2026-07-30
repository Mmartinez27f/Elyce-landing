# Elyce Journey — Remotion

Genera secuencias WebP para scroll-scrub (experimento offline).

**Nota v4:** `/experiencia.html` ya **no usa** frames ni Remotion en runtime. Este subproyecto queda como herramienta opcional de experimentación, no bloqueante para producción.

## Por qué no `npx create-video@latest --yes`

Ese comando **falla dentro de un repo git** (regla de Remotion). Este subproyecto está scaffolded a mano.

## Uso

```powershell
cd remotion
npm install
.\scripts\sync-assets.ps1
npm run studio          # preview GalponChapter
npm run render:galpon   # 40 WebP → assets/escenas/frames/01_galpon/
npm run render:all      # piloto cap 0 (más caps se agregan en render-all.ps1)
```

Preview landing: `npx --yes serve .. -l 8080` → `/`

## Roadmap composiciones

| Composition | Carpeta frames |
|-------------|----------------|
| `GalponChapter` | `01_galpon` |
| `SyncChapter` | `02_sync` (pendiente) |
| `TiendaChapter` | `03_tienda` (pendiente) |
| `DespachoChapter` | `04_despacho` (pendiente) |
| `ControlChapter` | `05_control` (pendiente) |
