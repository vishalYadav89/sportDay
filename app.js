// Initialize sports day with team scores and start callback chain
async function OpeningCeremony(){
    // Create score object for all teams
    const scores = {
        red : 0 , 
        blue : 0 ,
        green : 0
    }
    console.log("Opening ceremony is started..");
    console.log("Initial scores" , scores);

    // Simulate ceremony delay, then trigger first event (Race100M)
    setTimeout(()=>{
        console.log("opening ceremony is completed . Starting Race100M ...");
        Race100M(scores , LongJump);
    },1000);
}

// Simulate 100m race with random times and award points based on finish order
async function Race100M(scores , next){
    console.log("100M race is started..")
    console.log("Intial scores is : " , scores);
    
    // Generate random race times for each team (10-14 seconds)
    const times = {
        red :Number(Math.random() * 4 + 10).toFixed(2),
        blue :Number(Math.random() * 4 + 10).toFixed(2),
        green :Number(Math.random() * 4 + 10).toFixed(2)
    }

    console.log("Race time is : " , times);

    // Sort teams by race time (fastest first)
    const sorted = Object.entries(times).sort((a,b) => a[1] - b[1]);
    const [first , second ,third] = sorted;

    console.log(`1st : ${first[0]} (${first[1]}) , 2nd : ${second[0]}(${second[1]} , 3rd : ${third[0]} (${third[1]})`);
    console.log("previous score is : ", scores);

    // Award points: 1st=75, 2nd=50, 3rd=25
    scores[first[0]] += 75 ;
    scores[second[0]] += 50 ;
    scores[third[0]] += 25;

    console.log("updated score is : " , scores);

    setTimeout(()=>{
        console.log("100M Race is completed , moving to LongJump ->>");
        next(scores , HighJump);
    },3000);
}

// Randomly select a winning team for long jump and award points
async function LongJump(scores , next){
    console.log("Long Jump ceremony is started..")
    
    // Extract team names from scores object
    const teams = Object.keys(scores);
    // Generate random index to select a team
    const randomIdx = Math.floor(Math.random() * teams.length);
    const winner = teams[randomIdx];

    // Award 100 points to random winner
    scores[winner] += 100;
    console.log("Long Jump Winner team is : " , winner);
    console.log("updated score is : " , scores);

    // Simulate event delay, then call next event (HighJump)
    setTimeout(()=>{
        console.log("LongJump is done , moving to the HighJump -->");
        next(scores , AwardCeremony);
    },3000);
 
}

// Prompt user for high jump winner and update scores with validation
async function HighJump(scores , next){
    console.log("High Jump is started...")
    console.log("previous score is :" , scores);
    
    // Get user input for the high jump winner
    const winner = prompt("enter the team with highest jump  : ");

    // Validate if entered team name exists before updating score
    if(scores[winner] !== undefined){
        scores[winner] += 125; // Award 125 points to winner
    }
    else{
        console.log("invalid team name !..");
    }

    console.log("updated score is : ",scores);

    // Simulate event delay, then call final event (AwardCeremony)
    setTimeout(()=>{
        console.log("High jump is completed , moving to award ceremony --->");
        next(scores);
    } ,3000)
}

// Display final scores and determine the winning team
async function AwardCeremony(scores){
    console.log("Award ceremony is started...");
    console.log("final scores is : " , scores);

    // Find team with highest score
    let team = "";
    let maxScore = -Infinity;

    // Loop through all teams to find maximum score
    for(let tm in scores){
        if(scores[tm] > maxScore){
            maxScore = scores[tm];
            team = tm;
        }
    }
    
    // Announce the overall winner
    console.log("the Winner team is = " , team);

}

OpeningCeremony();