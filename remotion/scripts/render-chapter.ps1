param(
  [Parameter(Mandatory = $true)][string]$Composition,
  [Parameter(Mandatory = $true)][string]$OutDir
)

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

& "$PSScriptRoot\sync-assets.ps1"

$outAbs = if ([System.IO.Path]::IsPathRooted($OutDir)) { $OutDir } else { Join-Path $root $OutDir }
$tmp = Join-Path $outAbs "_remotion_png"
New-Item -ItemType Directory -Force -Path $outAbs | Out-Null
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

Get-ChildItem $outAbs -Filter "frame_*.webp" -ErrorAction SilentlyContinue | Remove-Item -Force
Get-ChildItem $tmp -Filter "*.png" -ErrorAction SilentlyContinue | Remove-Item -Force

Write-Host "Remotion render $Composition ..."
$mp4 = Join-Path $tmp "out.mp4"
npx remotion render $Composition $mp4 --log=error
if (-not (Test-Path $mp4)) { throw "Remotion no genero MP4" }

$prevErr = $ErrorActionPreference
$ErrorActionPreference = "Continue"
& ffmpeg -y -i $mp4 -vsync 0 (Join-Path $tmp "frame_%03d.png") 2>$null | Out-Null
$ErrorActionPreference = $prevErr

$pngs = Get-ChildItem $tmp -Filter "frame_*.png" | Sort-Object Name
if ($pngs.Count -lt 40) { throw "FAIL ${Composition}: solo $($pngs.Count) PNG" }

$i = 1
foreach ($png in $pngs) {
  $webp = Join-Path $outAbs ("frame_{0:D3}.webp" -f $i)
  $prevErr = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  & ffmpeg -y -i $png.FullName -c:v libwebp -quality 85 $webp 2>$null | Out-Null
  $ErrorActionPreference = $prevErr
  if (-not (Test-Path $webp)) { throw "ffmpeg fallo: $webp" }
  $i++
}

Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item (Join-Path $outAbs "frame_020.webp") (Join-Path $outAbs "poster.webp") -Force
Write-Host "OK ${Composition} $($pngs.Count)/40 WebP -> $outAbs"
