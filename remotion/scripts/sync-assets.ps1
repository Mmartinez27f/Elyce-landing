# Copia assets Elyce al public/ de Remotion (idempotente)
$root = Split-Path $PSScriptRoot -Parent
$public = Join-Path $root "public"
$escenas = Join-Path (Split-Path $root -Parent) "assets\escenas"
$layers = Join-Path $escenas "layers"

New-Item -ItemType Directory -Force -Path (Join-Path $public "scenes") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $public "sprites") | Out-Null

$empty = Join-Path $layers "01_galpon\bg_empty.webp"
$galpon = Join-Path $escenas "01_galpon.webp"
$destEmpty = Join-Path $public "scenes\01_galpon_empty.webp"
if (Test-Path $empty) { Copy-Item $empty $destEmpty -Force }
elseif (Test-Path $galpon) { Copy-Item $galpon $destEmpty -Force }

$truck = Join-Path $layers "_shared\truck.webp"
if (Test-Path $truck) {
  Copy-Item $truck (Join-Path $public "sprites\truck.webp") -Force
}

Write-Host "Assets sincronizados en $public"
