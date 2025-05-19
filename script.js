function logMsg(message) {
  const logDiv = document.getElementById('log');
  logDiv.innerText += message + '\n';
  logDiv.scrollTop = logDiv.scrollHeight;
}

function OpeningCeremony(callback) {
  logMsg('Opening Ceremony starting...');
  setTimeout(() => {
    logMsg('Let the games begin!');
    let score = { red: 0, blue: 0, green: 0, yellow: 0 };
    callback(score);
  }, 1000);
}

function Race100M(score, callback) {
  logMsg('Race100M is starting...');
  setTimeout(() => {
    let times = {};
    for (let color in score) {
      times[color] = Math.floor(Math.random() * 6) + 10; // Random between 10–15
    }
    logMsg('Race times: ' + JSON.stringify(times));

    let sorted = Object.keys(times).sort((a, b) => times[a] - times[b]);
    score[sorted[0]] += 50;
    score[sorted[1]] += 25;

    logMsg(
      `🏁 ${sorted[0]} came first (+50), ${sorted[1]} came second (+25)`
    );
    logMsg('Updated scores after Race100M: ' + JSON.stringify(score));
    callback(score);
  }, 3000);
}

function LongJump(score, callback) {
  logMsg('LongJump is starting...');
  setTimeout(() => {
    const colors = Object.keys(score);
    const selected = colors[Math.floor(Math.random() * colors.length)];
    score[selected] += 150;
    logMsg(`🏅 ${selected} won the LongJump (+150)`);
    logMsg('Updated scores after LongJump: ' + JSON.stringify(score));
    callback(score);
  }, 2000);
}

function HighJump(score, callback) {
  logMsg('HighJump is starting...');
  setTimeout(() => {
    const input = prompt(
      'What colour secured the highest jump? (red, blue, green, yellow)'
    );

    if (input && score.hasOwnProperty(input.toLowerCase())) {
      const color = input.toLowerCase();
      score[color] += 100;
      logMsg(`🥇 ${color} secured the highest jump (+100)`);
    } else {
      logMsg('Event was cancelled. No points awarded.');
    }

    logMsg('Updated scores after HighJump: ' + JSON.stringify(score));
    callback(score);
  }, 1000);
}

function AwardCeremony(score, userTeam) {
  logMsg('Award Ceremony is starting...');
  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([color, points], index) => {
    const medals = ['🥇', '🥈', '🥉', '🎖️'];
    const suffix =
      index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th';
    const userNote = color === userTeam ? ' ← Your Team!' : '';
    logMsg(
      `${medals[index]} ${
        index + 1
      }${suffix} Place: ${color} (${points} points)${userNote}`
    );
  });
}

function startEvent() {
  document.getElementById('log').innerText = ''; // Clear previous log

  const selectedColor = prompt(
    'Choose your team color (red, blue, green, yellow):'
  );
  const validColors = ['red', 'blue', 'green', 'yellow'];

  if (!selectedColor || !validColors.includes(selectedColor.toLowerCase())) {
    logMsg(
      '❌ Invalid color. Please reload and choose from red, blue, green, or yellow.'
    );
    return;
  }

  const teamColor = selectedColor.toLowerCase();
  logMsg(`✅ You chose: ${teamColor.toUpperCase()} as your team!\n`);

  OpeningCeremony((score) => {
    Race100M(score, (score) => {
      LongJump(score, (score) => {
        HighJump(score, (score) => {
          AwardCeremony(score, teamColor);
        });
      });
    });
  });
}
