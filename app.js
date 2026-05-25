// Initialize sports day with team scores and start callback chain
async function OpeningCeremony(){
    // Create score object for all teams
    const scores = {
        red : 0 , 
        blue : 0 ,
        green : 0
    }
    console.log("Opening ceremony is started..");
    console.log("Initial scores", scores);

    // Log a start message every second for 3 seconds, then start Race100M
    let count = 0;
    const intervalId = setInterval(() => {
        count += 1;
        console.log(`Opening ceremony ongoing... (${count})`);
    }, 1000);

    // After 3 seconds stop the interval and start Race100M
    setTimeout(() => {
        clearInterval(intervalId);
        console.log("Opening ceremony is completed. Starting Race100M...");
        // Start Race100M after the opening ceremony (passes LongJump as next)
        Race100M(scores, LongJump);
    }, 3000);
}

// Simulate 100m race with random times and award points based on finish order
async function Race100M(scores , next){
    console.log("100M race is started..")
    console.log("Intial scores is : " , scores);
    
    // Generate random race times for each team (10-14 seconds)
    const times = {
        red : Number((Math.random() * 4 + 10).toFixed(2)),
        blue : Number((Math.random() * 4 + 10).toFixed(2)),
        green : Number((Math.random() * 4 + 10).toFixed(2))
    }

    console.log("Race time is : " , times);

    // Sort teams by race time (fastest first) and award points
    const sorted = Object.entries(times).sort((a, b) => a[1] - b[1]);
    const [first, second, third] = sorted;

    console.log(`1st : ${first[0]} (${first[1]}) , 2nd : ${second[0]} (${second[1]}) , 3rd : ${third[0]} (${third[1]})`);
    console.log("previous score is :", scores);

    // Award points: 1st=75, 2nd=50, 3rd=25
    scores[first[0]] += 75;
    scores[second[0]] += 50;
    scores[third[0]] += 25;

    console.log("updated score is :", scores);

    // After 3 seconds move to the LongJump event
    setTimeout(() => {
        console.log("100M Race is completed, moving to LongJump ->>");
        next(scores, HighJump);
    }, 3000);
}

// Randomly select a winning team for long jump and award points
async function LongJump(scores , next){
    console.log("Long Jump ceremony is started..")
    // Execute selection after a 2-second delay to simulate event
    const teams = Object.keys(scores);
    setTimeout(() => {
        const randomIdx = Math.floor(Math.random() * teams.length);
        const winner = teams[randomIdx];

        // Award 100 points to random winner
        scores[winner] += 100;
        console.log("Long Jump Winner team is:", winner);
        console.log("updated score is:", scores);

        console.log("LongJump is done, moving to the HighJump -->");
        next(scores, AwardCeremony);
    }, 2000);
 
}

// Prompt user for high jump winner and update scores with validation
async function HighJump(scores , next){
    console.log("High Jump is started...")
    console.log("previous score is :" , scores);
    
    // Get user input for the high jump winner
    let winner = null;
    try {
        // In browser environment `prompt` may be available
        if (typeof prompt === 'function') {
            const input = prompt("Enter the team with highest jump (red/blue/green):");
            if (input && input.trim()) winner = input.trim().toLowerCase();
        }
    } catch (e) {
        // ignore prompt errors in non-browser environments
    }

    // Validate input and update score; handle incorrect or no input
    if (winner && Object.prototype.hasOwnProperty.call(scores, winner)) {
        scores[winner] += 125; // Award 125 points to winner
        console.log(`High Jump winner provided: ${winner}`);
    } else {
        // No valid input: choose a random winner
        const teams = Object.keys(scores);
        const randomIdx = Math.floor(Math.random() * teams.length);
        const randomWinner = teams[randomIdx];
        scores[randomWinner] += 125;
        console.log("No valid input provided. Randomly selected High Jump winner:", randomWinner);
    }

    console.log("updated score is :", scores);

    // Simulate event delay, then call final event (AwardCeremony)
    setTimeout(() => {
        console.log("High jump is completed, moving to award ceremony --->");
        next(scores);
    }, 3000);
}

// Display final scores and determine the winning team
async function AwardCeremony(scores){
    console.log("Award ceremony is started...");
    console.log("final scores is : " , scores);

    // Create sorted ranking from highest to lowest
    const ranking = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .map(([team, pts], idx) => ({ position: idx + 1, team, pts }));

    // Announce positions
    ranking.forEach(r => {
        const posLabel = r.position === 1 ? '1st' : r.position === 2 ? '2nd' : '3rd';
        console.log(`${posLabel} place: ${r.team} with ${r.pts} points`);
    });

    // Overall winner
    if (ranking.length > 0) {
        console.log("The Winner team is =", ranking[0].team);
    }

}

OpeningCeremony();