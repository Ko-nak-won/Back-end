@ECHO OFF

:: Setup the back-end
ECHO �鿣�� �ʱ�ȭ ��...
CD be
pip install -r requirements.txt


CD ..
ECHO.


:: Setup the front-end
ECHO ����Ʈ���� �ʱ�ȭ ��...
CD fe
yarn install