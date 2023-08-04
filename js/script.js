const valueDisplay = document.querySelectorAll('.kingHouse__num');
const interval = 4000;

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function animateCounter(valueDisplay) {
  let startValue = 0;
  const endValue = parseInt(valueDisplay.getAttribute('data-val'));
  const duration = Math.floor(interval / endValue);
  let animationFrame;

  function updateValue() {
    startValue += 1;
    valueDisplay.textContent = startValue;

    if (startValue < endValue) {
      animationFrame = requestAnimationFrame(updateValue);
    }
  }

  animationFrame = requestAnimationFrame(updateValue);
}

// Sprawdź, czy element jest w widoku na początku
valueDisplay.forEach((valueDisplay) => {
  if (isElementInViewport(valueDisplay)) {
    animateCounter(valueDisplay);
  }
});

// Po przewinięciu, sprawdź, czy element stał się widoczny i uruchom animację
window.addEventListener('scroll', () => {
  valueDisplay.forEach((valueDisplay) => {
    if (!valueDisplay.animationStarted && isElementInViewport(valueDisplay)) {
      valueDisplay.animationStarted = true; // Zapobiegaj ponownemu uruchomieniu
      animateCounter(valueDisplay);
    }
  });
});