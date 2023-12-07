@echo off
setlocal

:: Set variables
set PROJECT_DIR=jetty
set JETTY_RUNNER=target\lib\jetty-runner.jar
set JETTY_LIB=target\lib
set JETTY_CLASSES=target\classes
set JETTY_PORT=3000
set WAR_FILE=target\swagger-converter-1.0.4.war
set JETTY_URL=http://localhost:%JETTY_PORT%

:: Navigate to the project directory
pushd %PROJECT_DIR%

:: Check if Jetty Runner exists
if not exist "%JETTY_RUNNER%" (
    echo Jetty Runner not found: %JETTY_RUNNER%
    popd
    exit /b
)

:: Check if WAR file exists
if not exist "%WAR_FILE%" (
    echo WAR file not found: %WAR_FILE%
    popd
    exit /b
)

:: Start Jetty with specified configurations
echo Starting Jetty on port %JETTY_PORT%...
java -jar "%JETTY_RUNNER%" --lib "%JETTY_LIB%" --classes "%JETTY_CLASSES%" --port %JETTY_PORT% --path / "%WAR_FILE%"
echo Jetty started. Open %JETTY_URL% in your browser.

:: Return to the original directory
popd

endlocal
