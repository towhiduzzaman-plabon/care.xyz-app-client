<#
PowerShell helper for deploying the care-client to Vercel.

Usage:
  - Deploy only:
      .\scripts\deploy-prod.ps1

  - Deploy and set VITE_API_BASE in Vercel (production):
      .\scripts\deploy-prod.ps1 -ApiBase "https://your-backend.example.com" -SetEnv

Notes:
  - This script uses npx so a global vercel install is not required.
  - You must be logged in to Vercel (run `npx vercel login`) before calling the script.
#>
param(
  [string]$ApiBase = "",
  [switch]$SetEnv,
  [switch]$DryRun
)

function Exec($cmd) {
  Write-Host "\n> $cmd" -ForegroundColor Cyan
  if ($DryRun) { return }
  $proc = Start-Process -FilePath "powershell" -ArgumentList "-NoProfile -NoLogo -Command $cmd" -Wait -PassThru -WindowStyle Hidden
  if ($proc.ExitCode -ne 0) { throw "Command failed: $cmd" }
}

Write-Host "PowerShell: Starting Vercel deploy helper" -ForegroundColor Green

# Check Vercel login
try {
  Exec "npx vercel whoami"
} catch {
  Write-Host "You are not logged in to Vercel. Run: npx vercel login" -ForegroundColor Yellow
  exit 1
}

if ($SetEnv) {
  if (-not $ApiBase) {
    Write-Host "When using -SetEnv you must pass -ApiBase 'https://your-backend.example.com'" -ForegroundColor Red
    exit 1
  }

  Write-Host "Setting VITE_API_BASE in Vercel (production) to: $ApiBase" -ForegroundColor Cyan
  if (-not $DryRun) {
    Exec "npx vercel env add VITE_API_BASE production $ApiBase"
  }
}

# Run npm deploy script (npx vercel --prod --confirm)
Write-Host "Running production deploy (npm run deploy:prod)" -ForegroundColor Cyan
if (-not $DryRun) {
  Exec "npm run deploy:prod"
}

Write-Host "Done — production deploy started. Check Vercel dashboard or CLI output for details." -ForegroundColor Green
