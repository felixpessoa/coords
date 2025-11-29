
RegisterServerCallback('server:getGroup', function(source)
    local src = source
    local p = promise.new()
 TriggerEvent('redemrp:getPlayerFromId', src, function(user)
        if user then
            local group = user.getGroup() or 'user'
            p:resolve(group)
        else
            p:resolve('user')
        end
    end)
    return Citizen.Await(p)
end)

