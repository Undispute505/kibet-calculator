# Helper to run the project server
# Usage: Open powershell in project folder and run: .\start.ps1

function Test-CommandExists($cmd){
  $c = Get-Command $cmd -ErrorAction SilentlyContinue
  return $null -ne $c
}

# Try npx/serve first
if(Test-CommandExists npx){
  Write-Host "Found npx — launching 'npx serve -s . -l 3000' (press Ctrl+C to stop)" -ForegroundColor Green
  npx serve -s . -l 3000
  return
}

# Try node (if user has node/npm but maybe not npx)
if(Test-CommandExists node){
  Write-Host "Found node but npx is missing — trying 'npx' via npm if available..." -ForegroundColor Yellow
  if(Test-CommandExists npm){
    try{
      npm exec -- serve -s . -l 3000 -y
      return
    }catch{
      Write-Host "npm exec failed or 'serve' may not be installed. Running fallback." -ForegroundColor Yellow
    }
  }
}

# Try Python fallback
if(Test-CommandExists python){
  Write-Host "npx not found; using Python's http.server fallback on port 3000" -ForegroundColor Cyan
  python -m http.server 3000
  return
}

# If none of the above exist, print troubleshooting steps
Write-Host "Neither npx nor python are available. Install Node.js (LTS) or Python to host the demo locally." -ForegroundColor Red
Write-Host "Install Node (winget) example: winget install -e --id OpenJS.NodeJS.LTS" -ForegroundColor Yellow
Write-Host "After installing, re-open PowerShell and try: npx serve -s . -l 3000" -ForegroundColor Yellow

# Print environment hints
Write-Host "";
Write-Host "Useful diagnostic commands:" -ForegroundColor Gray
Write-Host "  node -v     (show node version if installed)"
Write-Host "  npm -v      (show npm version if installed)"
Write-Host "  npx -v      (show npx version if installed)"
Write-Host "  where.exe node   (show path to executable if present)"
