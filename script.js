let salsaPoints = 0;
let salsaPerClick = 1;

const salsaPointsEl = document.getElementById('salsa-points');
const salsaPerClickEl = document.getElementById('salsa-per-click');
const nachoBtn = document.getElementById('nacho-btn');
const upgradeElements = document.querySelectorAll('.upgrade');

function updateUI() {
  salsaPointsEl.textContent = Math.floor(salsaPoints);
  salsaPerClickEl.textContent = salsaPerClick;
  updateButtons();
}

function updateButtons() {
  upgradeElements.forEach(upgrade => {
    const costEl = upgrade.querySelector('.cost');
    const buyBtn = upgrade.querySelector('.buy-btn');
    const cost = parseInt(costEl.textContent, 10);

    if (salsaPoints >= cost) {
      buyBtn.disabled = false;
    } else {
      buyBtn.disabled = true;
    }
  });
}

nachoBtn.addEventListener('click', () => {
  salsaPoints += salsaPerClick;
  updateUI();
});

upgradeElements.forEach(upgrade => {
  const id = upgrade.id;
  const costEl = upgrade.querySelector('.cost');
  const buyBtn = upgrade.querySelector('.buy-btn');
  const baseCost = parseInt(costEl.dataset.baseCost, 10);

  buyBtn.addEventListener('click', () => {
    let bonus = 0;
    let cost = parseInt(costEl.textContent, 10);

    if (salsaPoints < cost) return;

    if (id === 'upgrade-1') {
      bonus = 1;
    } else if (id === 'upgrade-2') {
      bonus = 5;
    } else if (id === 'upgrade-3') {
      bonus = 20;
    }

    salsaPoints -= cost;
    salsaPerClick += bonus;

    cost = Math.floor(cost * 1.4);
    if (cost < baseCost) cost = baseCost;
    costEl.textContent = cost;

    updateUI();
  });
});

updateUI();
