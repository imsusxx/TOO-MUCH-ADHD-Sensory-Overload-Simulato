// TOO MUCH! — one small function updates the whole experience.
const noiseSlider = document.querySelector('#noiseSlider');
const clothingChecks = document.querySelectorAll('.puzzle-piece input');
const stateLabel = document.querySelector('#stateLabel');
const stateDescription = document.querySelector('#stateDescription');
const noiseValue = document.querySelector('#noiseValue');
const selectedCount = document.querySelector('#selectedCount');
const thresholdReadout = document.querySelector('#thresholdReadout');
const scoreValue = document.querySelector('#scoreValue');
const meterFill = document.querySelector('#meterFill');
const combinationNote = document.querySelector('#combinationNote');
const resetButton = document.querySelector('#resetButton');
const CLOTHING_POINTS = 12;
const COMBINATION_POINTS = 15;
const MAX_SCORE = 175;
const MAX_LAYERS = 5;
function getNoiseWord(noise) { if (noise < 30) return 'quiet'; if (noise < 70) return 'busy'; return 'loud'; }
function updateExperience() {
  const noise = Number(noiseSlider.value);
  const wornItems = [...clothingChecks].filter((piece) => piece.checked);
  const layerCount = wornItems.length;
  // Busy sound makes any uncomfortable layer feel more intense.
  const hasCombinedEffect = noise >= 50 && layerCount > 0;
  const isAtThreshold = layerCount === MAX_LAYERS;
  const score = noise + layerCount * CLOTHING_POINTS + (hasCombinedEffect ? COMBINATION_POINTS : 0);
  noiseValue.textContent = getNoiseWord(noise);
  selectedCount.textContent = `${layerCount} / ${MAX_LAYERS} worn`;
  thresholdReadout.textContent = `WARDROBE THRESHOLD ${layerCount} / ${MAX_LAYERS}`;
  scoreValue.textContent = `${score} / ${MAX_SCORE}`;
  meterFill.style.width = `${Math.min((score / MAX_SCORE) * 100, 100)}%`;
  noiseSlider.style.setProperty('--progress', `${noise}%`);
  combinationNote.textContent = hasCombinedEffect ? `sound + layers interaction: +${COMBINATION_POINTS} load` : '';
  document.body.classList.toggle('state-combined', hasCombinedEffect);
  document.body.classList.toggle('threshold-maxed', isAtThreshold);
  document.body.classList.remove('state-calm', 'state-uncomfortable', 'state-overloaded');
  if (isAtThreshold || score >= 110) { document.body.classList.add('state-overloaded'); stateLabel.textContent = isAtThreshold ? 'THRESHOLD MAXED' : 'OVERLOADED'; stateDescription.textContent = isAtThreshold ? 'Every layer is asking for attention at once.' : 'Everything is arriving at once.'; }
  else if (score >= 45) { document.body.classList.add('state-uncomfortable'); stateLabel.textContent = 'UNCOMFORTABLE'; stateDescription.textContent = 'The edges are starting to feel sharp.'; }
  else { document.body.classList.add('state-calm'); stateLabel.textContent = 'CALM'; stateDescription.textContent = 'Plenty of room to breathe.'; }
}
noiseSlider.addEventListener('input', updateExperience);
clothingChecks.forEach((piece) => piece.addEventListener('change', updateExperience));
resetButton.addEventListener('click', () => { noiseSlider.value = 15; clothingChecks.forEach((piece) => { piece.checked = false; }); updateExperience(); });
updateExperience();
