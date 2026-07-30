$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

$chapters = @(
  @{ Composition = "GalponChapter"; Out = "..\assets\escenas\frames\01_galpon" }
)

foreach ($c in $chapters) {
  & "$PSScriptRoot\render-chapter.ps1" -Composition $c.Composition -OutDir $c.Out
}

Set-Content -Path (Join-Path (Split-Path $root -Parent) "assets\escenas\frames\.elyce-remotion") -Value "Remotion $(Get-Date -Format o)"
