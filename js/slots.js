const STARTING_BALANCE = 1000;
const SPIN_COST = 10;

let balance = STARTING_BALANCE;

const balanceDiv = document.getElementById('balance');
const slotsDiv = document.getElementById('slots');
const resultDiv = document.getElementById('result');
const spinBtn = document.getElementById('spin-btn');

function randomSlot() {
  return Math.floor(Math.random() * 9) + 1; // 1-9
}

function spinSlots() {
  if (balance < SPIN_COST) {
    resultDiv.textContent = "Not enough balance to spin.";
    return;
  }

  balance -= SPIN_COST;

  const slots = [randomSlot(), randomSlot(), randomSlot()];
  slotsDiv.children[0].textContent = slots[0];
  slotsDiv.children[1].textContent = slots[1];
  slotsDiv.children[2].textContent = slots[2];

  const slotNum = parseInt(slots.join(''));
  let payout = 0;
  let message = "";

  if (slots[0] === 3 && slots[1] === 3 && slots[2] === 3) {
    payout = SPIN_COST * 3;
    message = '333! Triple payout!';
  } else if (slots[0] === 7 && slots[1] === 7 && slots[2] === 7) {
    payout = SPIN_COST * 10;
    message = '777! JACKPOT!';
  } else if (slotNum % 100 === 67) {
    payout = SPIN_COST * 2;
    message = 'Ends with 67! Double win!';
  } else if (slotNum % 100 === 41) {
    payout = SPIN_COST * 2;
    message = 'Ends with 41! Double win!';
  } else if (slots[0] === slots[1] && slots[1] === slots[2]) {
    // Covers 111, 222, 444, etc. (except 333 and 777 above)
    payout = SPIN_COST * 2;
    message = 'Triple! Double win!';
  } else {
    message = 'No win. Try again!';
  }

  balance += payout;
  balanceDiv.textContent = `Balance: $${balance}`;
  resultDiv.textContent = `${message} ${payout > 0 ? `You won $${payout}!` : ''}`;

  if (balance < SPIN_COST) {
    spinBtn.disabled = true;
    resultDiv.textContent += " Game over!";
  }
}

spinBtn.addEventListener('click', spinSlots);

// Initialize slots
for (let i = 0; i < 3; i++) {
  slotsDiv.children[i].textContent = '?';
}
