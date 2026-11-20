# mac-os-screen-mover

Move the active macOS window to **Desktop 1** with `Cmd + 1` or **Desktop 2** with `Cmd + 2`.

🌐 **Documentation & Options Guide:** [https://rifaterdemsahin.github.io/mac-os-screen-mover/](https://rifaterdemsahin.github.io/mac-os-screen-mover/)

## Implementation Options

1. **[Hammerspoon (`options/hammerspoon/init.lua`)](options/hammerspoon/init.lua)** — Recommended. No SIP disable required; uses `hs.spaces` and `hs.hotkey`.
2. **[yabai + skhd (`options/yabai-skhd/skhdrc`)](options/yabai-skhd/skhdrc)** — Best if you already use a tiling window manager (requires partial SIP disable).
3. **[Native Swift CLI (`options/swift-native/MoveWindowToSpace.swift`)](options/swift-native/MoveWindowToSpace.swift)** — Zero third-party window manager; uses Accessibility + `CGEvent` titlebar-drag + `Ctrl+1`/`Ctrl+2`.
