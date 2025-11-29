-- 1. Comando de Chat para abrir o NUI
RegisterCommand('coords', function(source, args, rawCommand)
   local playerPed = PlayerPedId()
   local group = TriggerServerCallback('server:getGroup') -- Chama o callback do servidor para obter o grupo do jogador
   if group ~= 'superadmin' and group ~= 'admin' and group ~= 'support'  then
       return
   end
   local coords = GetEntityCoords(playerPed)
   local heading = GetEntityHeading(playerPed) -- Obtém o heading (rotação/direção)

   -- Formata as coordenadas e o heading como uma string (X, Y, Z, H) com duas casas decimais
   local rawCoordString = string.format("%.2f %.2f %.2f %.2f", coords.x, coords.y, coords.z, heading)

   -- 🎯 CORREÇÃO CRÍTICA: Define o foco para a NUI ser exibida.
   SetNuiFocus(true, true)

   SendNUIMessage({ action = "open", coords = rawCoordString })

end, false)

-- 3. Listener para fechar o NUI a partir do botão "CLOSE" no React (NUI)
RegisterNUICallback('client:close', function(data, cb)
   -- Esta função está correta, ela remove o foco (esconde a NUI)
   SetNuiFocus(false, false)
end)
