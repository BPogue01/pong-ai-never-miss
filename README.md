# Pong AI Never Miss 🧠🏓

This is a minimalist Pong game where **two AI players (or human vs AI)** battle with retro sound, visuals, and gameplay.

## 🎮 Features

- AI vs AI or Human vs AI toggle (`T` key)
- Real retro-style sound effects and music
- Flash visual effect when the ball is missed
- Canvas-based rendering, zero dependencies

## 🕹️ Controls

- `↑` / `↓` arrows — Control right paddle (when human-controlled)
- `T` — Toggle AI/Human control

## 🔊 Setup & Music

1. Download your chosen retro chiptune track and name it:
   ```
   bgmusic.mp3
   ```
2. Place `bgmusic.mp3` in the project root alongside `index.html`.
3. **Serve via a local HTTP server**. From the project directory run:
   ```bash
   python -m http.server 8000
   ```
4. Open your browser at `http://localhost:8000`.
5. Click or press any key to activate audio.

> ⚠️ Audio often doesn’t play via `file://` URLs. Serving over HTTP fixes this.

## 🚀 Getting Started

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/pong-ai-never-miss.git
cd pong-ai-never-miss

# Serve locally
python -m http.server 8000
```

Open `http://localhost:8000` in your browser, then click or press any key to start.

Enjoy the infinite rally. You’ll never win. 😉
