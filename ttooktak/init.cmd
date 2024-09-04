@ECHO OFF

:: Setup the back-end
ECHO 백엔드 초기화 중...
CD be
pip install -r requirements.txt


CD ..
ECHO.


:: Setup the front-end
ECHO 프론트엔드 초기화 중...
CD fe
yarn install