
call  vue-cli-service build
rd /s/q "D:\object\baogongtao\resources\baogongtao_admin\dist\templateadmin.zip"
c:
set PATH=%PATH%;C:\Program Files\WinRAR\;
d:
cd D:\object\baogongtao\resources\baogongtao_admin\dist
WinRAR.exe a -r .\templateadmin.zip .\*
c:
cd C:\Program Files (x86)\WinSCP
winscp.exe /console /command "option batch continue" "option confirm off" "open sftp://root:bgt-123456@47.115.4.72:22" "option transfer binary"  "cd /usr/site/baogongtao/public/panel/" "call rm -rf /usr/site/baogongtao/public/panel/*"  "put D:\object\baogongtao\resources\baogongtao_admin\dist\templateadmin.zip /usr/site/baogongtao/public/panel/" "call unzip templateadmin.zip" "exit"  /log=D:\object\log.txt
