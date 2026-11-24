// TOO MUCH! — beginner-friendly interaction code.
// We keep the current inputs in simple variables, then update the page in one function.

const noiseSlider = document.querySelector('#noiseSlider');
const discomfortChecks = document.querySelectorAll('.check-card input');
const stateLabel = document.querySelector('#stateLabel');
const stateDescription = document.querySelector('#stateDescription');
const noiseValue = document.querySelector('#noiseValue');
const selectedCount = document.querySelector('#selectedCount');
const scoreValue = document.querySelector('#scoreValue');
const meterFill = document.querySelector('#meterFill');
const resetButton = document.querySelector('#resetButton');

// Each selected body sensation adds the same amount to the overall load.
const DISCOMFORT_POINTS = 20;
const MAX_SCORE = 160;

function getNoiseWord(noise) {
  if (noise < 30) return 'quiet';
  if (noise < 70) return 'busy';
  return 'loud';
}

function updateExperience() {
  // Read the noise slider and count the checked discomfort boxes.
  const noise = Number(noiseSlider.value);
  const checkedItems = [...discomfortChecks].filter((checkbox) => checkbox.checked);
  const score = noise + checkedItems.length * DISCOMFORT_POINTS;

  // Update the small text pieces first.
  noiseValue.textContent = getNoiseWord(noise);
  selectedCount.textContent = `${checkedItems.length} selected`;
  scoreValue.textContent = `${score} / ${MAX_SCORE}`;
  meterFill.style.width = `${Math.min((score / MAX_SCORE) * 100, 100)}%`;
  noiseSlider.style.setProperty('--progress', `${noise}%`);

  // Decide which of the three states should be visible.
  document.body.classList.remove('state-calm', 'state-uncomfortable', 'state-overloaded');

  if (score >= 90) {
    document.body.classList.add('state-overloaded');
    stateLabel.textContent = 'OVERLOADED';
    stateDescription.textContent = 'Everything is arriving at once.';
  } else if (score >= 45) {
    document.body.classList.add('state-uncomfortable');
    stateLabel.textContent = 'UNCOMFORTABLE';
    stateDescription.textContent = 'The edges are starting to feel sharp.';
  } else {
    document.body.classList.add('state-calm');
    stateLabel.textContent = 'CALM';
    stateDescription.textContent = 'Plenty of room to breathe.';
  }
}

// Event listeners run updateExperience whenever the visitor changes an input.
noiseSlider.addEventListener('input', updateExperience);
discomfortChecks.forEach((checkbox) => checkbox.addEventListener('change', updateExperience));

// Reset brings every input back to the calm starting point.
resetButton.addEventListener('click', () => {
  noiseSlider.value = 15;
  discomfortChecks.forEach((checkbox) => { checkbox.checked = false; });
  updateExperience();
});

// Draw the correct initial state when the page loads.
updateExperience();
