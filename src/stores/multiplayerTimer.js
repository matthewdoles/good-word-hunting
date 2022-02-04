import { writable } from 'svelte/store';

const multiplayerTimer = writable({
  timer: 30,
  progressValue: 0,
  interval: '',
  guessSubmitted: false,
  timeUp: false,
  timerStarted: false
});

const customMultiplayerTimer = {
  subscribe: multiplayerTimer.subscribe,
  startTimer: () => {
    let intervalId = setInterval(() => {
      multiplayerTimer.update((items) => {
        if (items.timer === 0 || items.guessSubmitted) {
          clearInterval(intervalId);
          return {
            ...items,
            interval: '',
            progressValue: 30,
            timer: 0,
            timeUp: true
          };
        }
        return {
          ...items,
          interval: intervalId,
          progressValue: items.progressValue + 1,
          timer: items.timer - 1,
          timeUp: false,
          timerStarted: true
        };
      });
    }, 1000);
  },
  stopTimer: () => {
    multiplayerTimer.update((items) => {
      return {
        ...items,
        guessSubmitted: true
      };
    });
  },
  resetTimer: () => {
    multiplayerTimer.update((items) => {
      return {
        ...items,
        guessSubmitted: false,
        progressValue: 0,
        timer: 30,
        timeUp: false,
        timerStarted: false
      };
    });
  }
};

export default customMultiplayerTimer;
