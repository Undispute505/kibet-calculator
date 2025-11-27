# Kibet Calculator

A simple web-based calculator implemented in plain JavaScript, HTML, and CSS. It supports basic arithmetic (addition, subtraction, multiplication, division), decimals, keyboard input, and clear/backspace functions.

## Features ✅
- Clean, responsive UI
- Decimal support
- Keyboard support (numbers, + - * /, Enter =, Backspace, Escape -> clear)
- AC (All Clear) and backspace
- Minimal footprint; no frameworks required

## Getting started
1. Install a local static server. You can use `serve` via npx (no global install required):

```powershell
npx serve -s . -l 3000
```

2. Open your browser at `http://localhost:3000`

### Quick browser tests (no Node required)

If you don't have Node installed or prefer a browser-only test, open `browser-tests.html` directly in your browser (or navigate to `/browser-tests.html` if you are using a local server). The page runs a few core arithmetic tests and displays pass/fail.

### Troubleshooting Node on Windows

If you see an error like:

```
The term 'node' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

Follow these steps:

1. Check if Node is installed:

```powershell
node -v
npm -v
```

2. If those commands fail, install Node.js (recommended: latest LTS):

Download from https://nodejs.org/en/ or use the Windows package manager (winget):

```powershell
winget install -e --id OpenJS.NodeJS.LTS
```

3. Verify the PATH is updated: open a new PowerShell window and run `node -v` again.

4. If `node` is installed but still not recognized, check where it is located:

```powershell
where.exe node
Get-Command node | Select-Object -Property Source
```

If `where.exe node` returns nothing, add Node's install directory (e.g., `C:\Program Files\nodejs`) to your PATH.

5. After Node is installed and recognized, you can run the Node tests from the project root:

```powershell
npm test
```

### Quick way to serve locally with PowerShell

If you don't want to check/modify system PATH, a helper script is included in the repository to start the project using Node (or fall back to Python when Node is missing):

```powershell
Set-Location -Path "d:\JAVASCRIPT PROJECTS\kibet-calculator"
.\start.ps1
```

This script will try to run `npx serve -s . -l 3000` if Node/npx is available. If not, it attempts to use `python -m http.server 3000` as a fallback.

## Usage
- Click the buttons or use the keyboard to input numbers and operations.
- Press `AC` to clear, `⌫` to remove the last digit, and `=` or Enter to evaluate.

## Project files
- `index.html` - calculator markup
- `style.css` - styles
- `script.js` - calculator logic
- `README.md` - this file

## Extending
- Add operator precedence or history using a parsed expression evaluator
- Add memory functions (M+, M-, MR)

