@echo off
REM Ghost Note - Phase 1 git bootstrap + push
REM Double-click this file, or run from cmd in this folder.
REM
REM Repo: https://github.com/nwlkr13/ghost-note

cd /d "%~dp0"
echo.
echo === Ghost Note: Phase 1 git bootstrap + push ===
echo Working in: %CD%
echo.

REM --- Ensure git identity is set (one-time, --global affects all repos on this machine) ---
for /f "tokens=*" %%a in ('git config --global user.email 2^>nul') do set _GIT_EMAIL=%%a
if "%_GIT_EMAIL%"=="" (
    echo Setting global git identity ^(one-time setup^)...
    git config --global user.email "nwlkr13@gmail.com"
    git config --global user.name "Neo"
    echo   user.email = nwlkr13@gmail.com
    echo   user.name  = Neo
    echo   ^(change these later anytime with: git config --global user.email "new@email.com"^)
    echo.
)

if exist ".git" (
    echo Found existing .git folder. Removing it...
    rmdir /s /q .git
    if exist ".git" (
        echo [ERROR] Could not remove .git folder. Try closing any editor/IDE and re-running.
        pause
        exit /b 1
    )
)

echo Running: git init
git init
if errorlevel 1 goto :err

echo.
echo Running: git branch -M main
git branch -M main
if errorlevel 1 goto :err

echo.
echo Running: git add -A
git add -A
if errorlevel 1 goto :err

echo.
echo Running: git commit -m "Phase 1 - initial scaffold"
git commit -m "Phase 1 - initial scaffold"
if errorlevel 1 goto :err

echo.
echo Running: git remote add origin https://github.com/nwlkr13/ghost-note.git
git remote add origin https://github.com/nwlkr13/ghost-note.git
if errorlevel 1 (
    echo [INFO] origin already exists or could not be added. Continuing.
)

echo.
echo Running: git push -u origin main
echo If this is your first push, Windows may prompt for GitHub credentials.
git push -u origin main
if errorlevel 1 (
    echo.
    echo [WARNING] Push failed. The local commit is safe.
    echo Common fixes:
    echo   - Sign in to GitHub via the Windows credential prompt when it appears
    echo   - If your account uses 2FA, generate a Personal Access Token and use it as the password
    echo   - Or set up GitHub CLI: gh auth login
    echo Once auth is sorted, re-run: git push -u origin main
    pause
    exit /b 1
)

echo.
echo === Phase 1 pushed to GitHub. ===
echo View it: https://github.com/nwlkr13/ghost-note
echo.
pause
exit /b 0

:err
echo.
echo [ERROR] A git command failed. Scroll up to see what happened.
pause
exit /b 1
