# 🖥️ mac-os-screen-mover

🚀 Move the active macOS window to **Desktop 1** with `⌘ Cmd + 1` or **Desktop 2** with `⌘ Cmd + 2`.

🌐 **Live Guide & Documentation (GitHub Pages):**
- 📖 [Overview & Options Comparison](https://rifaterdemsahin.github.io/mac-os-screen-mover/)
- 🧠 [First Principles: Why This Exists](https://rifaterdemsahin.github.io/mac-os-screen-mover/first-principles.html)
- 📦 [Install & How to Use Guide](https://rifaterdemsahin.github.io/mac-os-screen-mover/install.html)

## 🛠️ Implementation Options

1. 🔨 **[Hammerspoon (`options/hammerspoon/init.lua`)](options/hammerspoon/init.lua)** — ⭐ Recommended. No SIP disable required; uses `hs.spaces` and `hs.hotkey`.
2. 🪟 **[yabai + skhd (`options/yabai-skhd/skhdrc`)](options/yabai-skhd/skhdrc)** — ⚡ Best if you already use a tiling window manager (⚠️ requires partial SIP disable).
3. 🦅 **[Native Swift CLI (`options/swift-native/MoveWindowToSpace.swift`)](options/swift-native/MoveWindowToSpace.swift)** — 🧩 Zero third-party window manager; uses Accessibility + `CGEvent` titlebar-drag + `Ctrl+1`/`Ctrl+2`.

## ⚠️ Hotkey Note

⌨️ Global `⌘ Cmd + 1` and `⌘ Cmd + 2` override app-level tab/view shortcuts (e.g., browser Tab 1/2). Swap `cmd` for `ctrl + alt` or `cmd + shift` if you want to keep those intact!
