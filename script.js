class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        this.isWorkMode = true;
        
        // Timer durations in minutes
        this.durations = {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15
        };

        this.initializeElements();
        this.initializeEventListeners();
        this.updateDisplay();
        this.modeDisplay.textContent = 'Work Time';
    }

    initializeElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.pomodoroButton = document.getElementById('pomodoro');
        this.shortBreakButton = document.getElementById('shortBreak');
        this.longBreakButton = document.getElementById('longBreak');
        this.toggleModeButton = document.getElementById('toggleMode');
        this.isWorkMode = true;
        this.modeDisplay = document.getElementById('modeDisplay');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.pomodoroButton.addEventListener('click', () => this.setMode('pomodoro'));
        this.shortBreakButton.addEventListener('click', () => this.setMode('shortBreak'));
        this.longBreakButton.addEventListener('click', () => this.setMode('longBreak'));
        this.toggleModeButton.addEventListener('click', () => this.toggleMode());
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();

                if (this.timeLeft === 0) {
                    this.pause();
                    alert('Time is up!');
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        this.timeLeft = this.durations.pomodoro * 60;
        this.updateDisplay();
    }

    setMode(mode) {
        this.pause();
        this.timeLeft = this.durations[mode] * 60;
        this.updateDisplay();

        // Update mode display text
        if (mode === 'pomodoro') {
            this.isWorkMode = true;
            this.modeDisplay.textContent = 'Work Time';
            this.toggleModeButton.textContent = 'Switch to Rest';
        } else {
            this.isWorkMode = false;
            this.modeDisplay.textContent = 'Break Time';
            this.toggleModeButton.textContent = 'Switch to Work';
        }

        // Update active button
        [this.pomodoroButton, this.shortBreakButton, this.longBreakButton].forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(mode).classList.add('active');
    }

    toggleMode() {
        this.isWorkMode = !this.isWorkMode;
        this.pause();
        
        if (this.isWorkMode) {
            this.timeLeft = this.durations.pomodoro * 60;
            this.toggleModeButton.textContent = 'Switch to Rest';
            this.modeDisplay.textContent = 'Work Time';
        } else {
            this.timeLeft = this.durations.shortBreak * 60;
            this.toggleModeButton.textContent = 'Switch to Work';
            this.modeDisplay.textContent = 'Break Time';
        }
        
        this.updateDisplay();
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 