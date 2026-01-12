import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Terminal, Minus, X, Square, Mail, Github, Linkedin, FileText, Gamepad2 } from "lucide-react";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const USERNAME = "engineer";
const HOSTNAME = "portfolio";

// Snake game state
interface SnakeGameState {
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
  score: number;
  gameOver: boolean;
  running: boolean;
}

const commands: Record<string, React.ReactNode> = {
  help: (
    <div className="space-y-1">
      <p className="text-secondary">Available commands:</p>
      <p><span className="text-primary">help</span> - Show this help message</p>
      <p><span className="text-primary">about</span> - Learn more about me</p>
      <p><span className="text-primary">contact</span> - Get my contact information</p>
      <p><span className="text-primary">social</span> - View my social links</p>
      <p><span className="text-primary">resume</span> - Download my resume</p>
      <p><span className="text-primary">theme [matrix|cyber|retro]</span> - Change terminal theme</p>
      <p><span className="text-primary">neofetch</span> - System information</p>
      <p><span className="text-primary">snake</span> - 🎮 Play Snake game!</p>
      <p><span className="text-primary">clear</span> - Clear terminal</p>
      <p><span className="text-primary">exit</span> - Close terminal (just kidding!)</p>
    </div>
  ),
  about: (
    <div className="space-y-2">
      <p className="text-secondary">$ cat about.txt</p>
      <p>I'm a Software Engineer passionate about building</p>
      <p>scalable systems that handle real-world challenges.</p>
      <p className="mt-2">When I'm not coding, I'm probably:</p>
      <p>• Contributing to open source</p>
      <p>• Writing technical blog posts</p>
      <p>• Experimenting with new technologies</p>
    </div>
  ),
  contact: (
    <div className="space-y-2">
      <p className="text-secondary">$ cat contact.json</p>
      <p>{"{"}</p>
      <p>  <span className="text-primary">"email"</span>: "hello@engineer.dev",</p>
      <p>  <span className="text-primary">"location"</span>: "San Francisco, CA",</p>
      <p>  <span className="text-primary">"availability"</span>: "Open to opportunities"</p>
      <p>{"}"}</p>
    </div>
  ),
  social: (
    <div className="space-y-2">
      <p className="text-secondary">$ ls social/</p>
      <div className="flex gap-6 mt-2">
        <a href="#" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
          <Github className="w-4 h-4" /> GitHub
        </a>
        <a href="#" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
          <Linkedin className="w-4 h-4" /> LinkedIn
        </a>
        <a href="#" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
          <Mail className="w-4 h-4" /> Email
        </a>
      </div>
    </div>
  ),
  resume: (
    <div className="space-y-2">
      <p className="text-secondary">$ download resume.pdf</p>
      <p className="text-primary flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Downloading... Done!
      </p>
      <p className="text-muted-foreground text-sm">(In a real implementation, this would trigger a download)</p>
    </div>
  ),
  neofetch: (
    <div className="flex gap-8 flex-wrap">
      <pre className="text-primary text-xs leading-tight">
{`    ___      
   /   \\    
  |  E  |   
  | N G |   
  |_____|   
    |||     
    |||     `}
      </pre>
      <div className="space-y-1 text-sm">
        <p><span className="text-primary">OS:</span> MacOS Sonoma</p>
        <p><span className="text-primary">Shell:</span> zsh 5.9</p>
        <p><span className="text-primary">Terminal:</span> Portfolio v2.0</p>
        <p><span className="text-primary">Editor:</span> Neovim / VSCode</p>
        <p><span className="text-primary">Languages:</span> TypeScript, Python, Go</p>
        <p><span className="text-primary">Uptime:</span> 5+ years in tech</p>
      </div>
    </div>
  ),
  exit: (
    <div className="space-y-2">
      <p className="text-destructive">Nice try! You can't escape that easily 😄</p>
      <p className="text-muted-foreground">This terminal is your new home now.</p>
    </div>
  ),
};

// Snake Game Component
const SnakeGame = ({ onExit }: { onExit: () => void }) => {
  const GRID_SIZE = 15;
  const CELL_SIZE = 16;
  
  const [game, setGame] = useState<SnakeGameState>({
    snake: [{ x: 7, y: 7 }],
    food: { x: 10, y: 10 },
    direction: "RIGHT",
    score: 0,
    gameOver: false,
    running: true,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit();
        return;
      }
      
      setGame((prev) => {
        if (prev.gameOver) return prev;
        
        let newDirection = prev.direction;
        switch (e.key) {
          case "ArrowUp":
          case "w":
            if (prev.direction !== "DOWN") newDirection = "UP";
            break;
          case "ArrowDown":
          case "s":
            if (prev.direction !== "UP") newDirection = "DOWN";
            break;
          case "ArrowLeft":
          case "a":
            if (prev.direction !== "RIGHT") newDirection = "LEFT";
            break;
          case "ArrowRight":
          case "d":
            if (prev.direction !== "LEFT") newDirection = "RIGHT";
            break;
        }
        return { ...prev, direction: newDirection };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

  useEffect(() => {
    if (game.gameOver || !game.running) return;

    const gameLoop = setInterval(() => {
      setGame((prev) => {
        const head = { ...prev.snake[0] };

        switch (prev.direction) {
          case "UP": head.y--; break;
          case "DOWN": head.y++; break;
          case "LEFT": head.x--; break;
          case "RIGHT": head.x++; break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          return { ...prev, gameOver: true, running: false };
        }

        // Check self collision
        if (prev.snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          return { ...prev, gameOver: true, running: false };
        }

        const newSnake = [head, ...prev.snake];
        let newFood = prev.food;
        let newScore = prev.score;

        // Check food collision
        if (head.x === prev.food.x && head.y === prev.food.y) {
          newScore++;
          newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          };
        } else {
          newSnake.pop();
        }

        return { ...prev, snake: newSnake, food: newFood, score: newScore };
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [game.gameOver, game.running]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <p className="text-secondary flex items-center gap-2">
          <Gamepad2 className="w-4 h-4" /> Snake Game
        </p>
        <p className="text-primary">Score: {game.score}</p>
      </div>
      <div 
        className="inline-block border border-muted rounded"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        <div className="relative w-full h-full bg-card/50">
          {/* Food */}
          <div
            className="absolute bg-secondary rounded-sm"
            style={{
              left: game.food.x * CELL_SIZE,
              top: game.food.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
          {/* Snake */}
          {game.snake.map((segment, i) => (
            <div
              key={i}
              className={`absolute rounded-sm ${i === 0 ? "bg-primary" : "bg-primary/70"}`}
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
              }}
            />
          ))}
        </div>
      </div>
      {game.gameOver ? (
        <p className="text-destructive">Game Over! Score: {game.score}. Press ESC to exit.</p>
      ) : (
        <p className="text-muted-foreground text-xs">Use WASD or Arrow Keys. ESC to exit.</p>
      )}
    </div>
  );
};

export const TerminalSection = () => {
  const ref = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [theme, setTheme] = useState<"default" | "matrix" | "cyber" | "retro">("default");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showSnake, setShowSnake] = useState(false);

  const themeStyles = {
    default: { bg: "bg-card", text: "text-foreground", glow: "glow-blue" },
    matrix: { bg: "bg-[hsl(120,100%,2%)]", text: "text-[hsl(120,100%,50%)]", glow: "shadow-[0_0_20px_hsl(120,100%,50%,0.5)]" },
    cyber: { bg: "bg-[hsl(280,100%,3%)]", text: "text-accent", glow: "glow-purple" },
    retro: { bg: "bg-[hsl(25,100%,3%)]", text: "text-[hsl(25,100%,50%)]", glow: "shadow-[0_0_20px_hsl(25,100%,50%,0.5)]" },
  };

  const currentTheme = themeStyles[theme];

  // Auto-scroll when history updates
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [history, showSnake]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(" ");
    const mainCmd = args[0];

    if (mainCmd === "clear") {
      setHistory([]);
      return;
    }

    if (mainCmd === "snake") {
      setShowSnake(true);
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: <p className="text-secondary">Starting Snake game... Use WASD or Arrow Keys!</p> },
      ]);
      return;
    }

    if (mainCmd === "theme" && args[1]) {
      const newTheme = args[1] as typeof theme;
      if (["matrix", "cyber", "retro", "default"].includes(newTheme)) {
        setTheme(newTheme);
        setHistory((prev) => [
          ...prev,
          { command: cmd, output: <p className="text-secondary">Theme changed to {newTheme}!</p> },
        ]);
        return;
      }
    }

    const output = commands[mainCmd] || (
      <p className="text-destructive">
        Command not found: {cmd}. Type <span className="text-primary">help</span> for available commands.
      </p>
    );

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setCommandHistory((prev) => [cmd, ...prev]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  useEffect(() => {
    // Welcome message
    setHistory([
      {
        command: "",
        output: (
          <div className="space-y-2">
            <p className="text-secondary">Welcome to Engineer's Terminal v2.0</p>
            <p className="text-muted-foreground">Type <span className="text-primary">help</span> to see available commands.</p>
            <p className="text-muted-foreground">Try <span className="text-primary">snake</span> for a surprise! 🎮</p>
          </div>
        ),
      },
    ]);
  }, []);

  return (
    <section id="terminal" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full">
            <span className="font-mono text-sm text-secondary">06.</span>
            <span className="font-mono text-sm text-muted-foreground">terminal()</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">The Command Center</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A fully interactive terminal. Type commands and explore!
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`rounded-xl overflow-hidden ${currentTheme.glow} transition-all duration-500`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-[hsl(45,100%,50%)]" />
                <div className="w-3 h-3 rounded-full bg-secondary" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Terminal className="w-4 h-4" />
              <span className="font-mono text-sm">{USERNAME}@{HOSTNAME}:~</span>
            </div>
            <div className="flex gap-2 text-muted-foreground">
              <Minus className="w-4 h-4" />
              <Square className="w-4 h-4" />
              <X className="w-4 h-4" />
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalContentRef}
            className={`${currentTheme.bg} ${currentTheme.text} p-6 font-mono text-sm min-h-[400px] max-h-[500px] overflow-y-auto transition-colors duration-500`}
          >
            {/* History */}
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                {item.command && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-secondary">{USERNAME}@{HOSTNAME}</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-primary">~</span>
                    <span className="text-muted-foreground">$</span>
                    <span className="ml-1">{item.command}</span>
                  </div>
                )}
                <div className="pl-0">{item.output}</div>
              </div>
            ))}

            {/* Snake Game */}
            {showSnake && (
              <div className="mb-4">
                <SnakeGame onExit={() => setShowSnake(false)} />
              </div>
            )}

            {/* Input */}
            {!showSnake && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-secondary">{USERNAME}@{HOSTNAME}</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-primary">~</span>
                <span className="text-muted-foreground">$</span>
                <div className="flex-1 relative ml-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent outline-none caret-transparent"
                    autoFocus
                    spellCheck={false}
                  />
                  {/* Custom cursor positioned after the text */}
                  <span 
                    className="absolute top-0 cursor-blink pointer-events-none"
                    style={{ left: `${input.length * 0.6}em` }}
                  >
                    ▋
                  </span>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-6 text-muted-foreground text-sm font-mono"
        >
          Pro tip: Try "snake" or "theme matrix" 🎮
        </motion.p>
      </div>
    </section>
  );
};
