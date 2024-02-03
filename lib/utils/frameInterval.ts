// This function is used to call a callback function every x milliseconds
// Using requestAnimationFrame for better performance
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
export type ReturnProps = {
  stop: () => void;
  cancel: () => void;
};

export const framesInterval = (
  callback: () => void,
  interval: number
): ReturnProps => {
  let startTime: number;
  let isRunning = true;
  let intervalId: number;

  function animate(currentTime: number) {
    if (!startTime) {
      startTime = currentTime;
    }

    if (isRunning && currentTime - startTime >= interval) {
      callback();
      startTime = currentTime;
    }

    if (isRunning) {
      intervalId = requestAnimationFrame(animate);
    }
  }

  intervalId = requestAnimationFrame(animate);

  // Function to stop the animation
  function stop() {
    isRunning = false;
  }

  // Function to cancel the animation
  function cancel() {
    stop();
    startTime = 0;
    cancelAnimationFrame(intervalId);
  }

  return { stop, cancel };
};
