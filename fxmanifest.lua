fx_version 'cerulean'
lua54 'yes'

rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
game 'rdr3'

name 'Coordenadas FiveM/RedM'
author 'fost0081'
description 'Sistema de Coordenadas com NUI'
version '1.0.0'

ui_page 'nui/dist/index.html'

files {
    'nui/dist/index.html',
    'nui/dist/assets/*.js',
    'nui/dist/assets/*.css',
    'nui/dist/*.*'
}

client_scripts {
    'client/main.lua'
}

server_scripts {
    'server/main.lua'
}

shared_scripts {    
	'@callbacks/import.lua'
}