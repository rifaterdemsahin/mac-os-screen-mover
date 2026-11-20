-- ~/.hammerspoon/init.lua
-- Move the active (focused) window to Virtual Desktop (Space) 1 or 2
-- Hotkeys: Cmd + 1 -> Desktop 1, Cmd + 2 -> Desktop 2

local spaces = require("hs.spaces")
local window = require("hs.window")
local hotkey = require("hs.hotkey")
local alert  = require("hs.alert")

-- Set to true to follow the window to the target desktop; false to stay on the current desktop
local FOLLOW_WINDOW = true

local function moveFocusedWindowToSpace(spaceIndex)
    local win = window.focusedWindow()
    if not win then
        alert.show("No active window found")
        return
    end

    local screen = win:screen()
    local screenSpaces = spaces.spacesForScreen(screen)
    if not screenSpaces or #screenSpaces < spaceIndex then
        alert.show("Desktop " .. spaceIndex .. " does not exist on this display")
        return
    end

    local targetSpaceID = screenSpaces[spaceIndex]
    spaces.moveWindowToSpace(win, targetSpaceID)

    if FOLLOW_WINDOW then
        spaces.gotoSpace(targetSpaceID)
    end
end

hotkey.bind({"cmd"}, "1", function()
    moveFocusedWindowToSpace(1)
end)

hotkey.bind({"cmd"}, "2", function()
    moveFocusedWindowToSpace(2)
end)
