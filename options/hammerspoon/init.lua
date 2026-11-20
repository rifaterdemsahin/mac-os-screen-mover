-- ~/.hammerspoon/init.lua
-- Move the active (focused) window to Virtual Desktop (Space) 1..10
-- Hotkeys: Ctrl + Option + 1..9 -> Desktop 1..9, Ctrl + Option + 0 -> Desktop 10
-- (Avoids Cmd + 1..9 which switches browser/editor tabs)

local spaces = require("hs.spaces")
local window = require("hs.window")
local hotkey = require("hs.hotkey")
local alert  = require("hs.alert")

-- Modifier keys (change to {"cmd", "shift"} or {"cmd"} if preferred)
local MODIFIERS = {"ctrl", "alt"}

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

for i = 1, 10 do
    local key = (i == 10) and "0" or tostring(i)
    hotkey.bind(MODIFIERS, key, function()
        moveFocusedWindowToSpace(i)
    end)
end
