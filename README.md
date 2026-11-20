# 🖥️ mac-os-screen-mover

🚀 Move the active macOS window to **Desktop 1 – 10** with `⌃ Ctrl + ⌥ Option + 1`..`9` and `⌃ Ctrl + ⌥ Option + 0` (Desktop 10).

🌐 **Live Guide & Documentation (GitHub Pages):**
- 📖 [Overview & Options Comparison](https://rifaterdemsahin.github.io/mac-os-screen-mover/)
- 🧠 [First Principles: Why This Exists](https://rifaterdemsahin.github.io/mac-os-screen-mover/first-principles.html)
- 📦 [Install & How to Use Guide](https://rifaterdemsahin.github.io/mac-os-screen-mover/install.html)
- 💡 [Recommendations & Workflow Tips](https://rifaterdemsahin.github.io/mac-os-screen-mover/recommendations.html)

## 🛠️ Implementation Options

1. 🔨 **[Hammerspoon (`options/hammerspoon/init.lua`)](options/hammerspoon/init.lua)** — ⭐ Recommended. No SIP disable required; uses `hs.spaces` and `hs.hotkey`.
2. 🪟 **[yabai + skhd (`options/yabai-skhd/skhdrc`)](options/yabai-skhd/skhdrc)** — ⚡ Best if you already use a tiling window manager (⚠️ requires partial SIP disable).
3. 🦅 **[Native Swift CLI (`options/swift-native/MoveWindowToSpace.swift`)](options/swift-native/MoveWindowToSpace.swift)** — 🧩 Zero third-party window manager; uses Accessibility + `CGEvent` titlebar-drag + `Ctrl+1`..`Ctrl+0`.

## ⚠️ Why `Ctrl + Option` Instead of `Cmd`?

⌨️ Global `⌘ Cmd + 1` through `⌘ Cmd + 9` override app-level tab/view shortcuts (such as switching browser or editor tabs). Using **`⌃ Ctrl + ⌥ Option + 1..9, 0`** keeps your `⌘ Cmd + 1..9` tab shortcuts intact and pairs naturally with macOS's built-in `⌃ Ctrl + 1..0` desktop-switching shortcuts! You can still customize `MODIFIERS` in `init.lua` if you prefer another combo.
