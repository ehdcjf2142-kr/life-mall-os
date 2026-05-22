@echo off
ping -n 3 127.0.0.1 >nul
start http://localhost:5173/
