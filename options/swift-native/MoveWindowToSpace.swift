// MoveWindowToSpace.swift
// Compile: swiftc -O MoveWindowToSpace.swift -o move-window-to-space
// Usage:   ./move-window-to-space 1   (moves active window to Desktop 1)
//          ./move-window-to-space 2   (moves active window to Desktop 2)
//
// Prerequisites:
// 1. Grant Accessibility permission to your terminal/app in:
//    System Settings -> Privacy & Security -> Accessibility
// 2. Enable "Switch to Desktop 1" (Ctrl+1) and "Switch to Desktop 2" (Ctrl+2) in:
//    System Settings -> Keyboard -> Keyboard Shortcuts -> Mission Control

import Cocoa
import ApplicationServices

guard CommandLine.arguments.count == 2,
      let targetDesktop = Int(CommandLine.arguments[1]),
      (1...9).contains(targetDesktop) else {
    fputs("Usage: move-window-to-space <1-9>\n", stderr)
    exit(1)
}

// Virtual key codes for digits 1..9 on US ANSI layout
let desktopKeyCodes: [Int: CGKeyCode] = [
    1: 0x12, 2: 0x13, 3: 0x14, 4: 0x15, 5: 0x17,
    6: 0x16, 7: 0x1A, 8: 0x1C, 9: 0x19
]

guard let keyCode = desktopKeyCodes[targetDesktop] else {
    exit(1)
}

// 1. Get the frontmost application and its focused window via Accessibility API
let systemWide = AXUIElementCreateSystemWide()
var focusedAppRef: CFTypeRef?
guard AXUIElementCopyAttributeValue(systemWide, kAXFocusedApplicationAttribute as CFString, &focusedAppRef) == .success,
      let focusedApp = focusedAppRef else {
    fputs("Error: Could not get focused application. Check Accessibility permissions.\n", stderr)
    exit(1)
}

var focusedWindowRef: CFTypeRef?
guard AXUIElementCopyAttributeValue(focusedApp as! AXUIElement, kAXFocusedWindowAttribute as CFString, &focusedWindowRef) == .success,
      let focusedWindow = focusedWindowRef else {
    fputs("Error: No focused window found.\n", stderr)
    exit(1)
}

var posRef: CFTypeRef?
var sizeRef: CFTypeRef?
guard AXUIElementCopyAttributeValue(focusedWindow as! AXUIElement, kAXPositionAttribute as CFString, &posRef) == .success,
      AXUIElementCopyAttributeValue(focusedWindow as! AXUIElement, kAXSizeAttribute as CFString, &sizeRef) == .success else {
    fputs("Error: Could not read window position/size.\n", stderr)
    exit(1)
}

var origin = CGPoint.zero
var size = CGSize.zero
AXValueGetValue(posRef as! AXValue, .cgPoint, &origin)
AXValueGetValue(sizeRef as! AXValue, .cgSize, &size)

// Pick a safe point on the window's titlebar (avoiding traffic-light buttons on the left)
let grabPoint = CGPoint(
    x: origin.x + min(size.width * 0.5, 140),
    y: origin.y + 12
)

let source = CGEventSource(stateID: .hidSystemState)

// 2. Press and hold mouse button on the titlebar
let mouseDown = CGEvent(mouseEventSource: source, mouseType: .leftMouseDown, mouseCursorPosition: grabPoint, mouseButton: .left)
mouseDown?.post(tap: .cghidEventTap)
usleep(60_000)

// 3. Trigger Mission Control's Ctrl+<N> shortcut while holding the window
let keyDown = CGEvent(keyboardEventSource: source, virtualKey: keyCode, keyDown: true)
keyDown?.flags = .maskControl
keyDown?.post(tap: .cghidEventTap)

let keyUp = CGEvent(keyboardEventSource: source, virtualKey: keyCode, keyDown: false)
keyUp?.flags = .maskControl
keyUp?.post(tap: .cghidEventTap)

usleep(120_000)

// 4. Release mouse button
let mouseUp = CGEvent(mouseEventSource: source, mouseType: .leftMouseUp, mouseCursorPosition: grabPoint, mouseButton: .left)
mouseUp?.post(tap: .cghidEventTap)
