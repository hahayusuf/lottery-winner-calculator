
const LOTTO1 = {
    lottery_name:"LOTTO1",
    winning_numbers_count: 6,
    single_ticket_count: 6,
    
    pool_one_count: 5,
    pool_two_count: 1,

    PoolOnePrizes: ["2","30","500","100,000"],
    PoolOneClass: ["8","6","4","2"],

    PoolTwoPrizes: ["5","100","10,000","10,000,000"],
    PoolTwoClass: ["7","5","3","1"],
}

run_lottery(LOTTO1,process)

function run_lottery(LOTTO1,process){

    console.info("winner-calculator.js running")
    const lottery_name = process.argv[2];
    const winning_numbers = process.argv[3].split(",");
    const pool_one = process.argv[3].split(",");
    const single_ticket = process.argv[4].split(",");
    const pool_two = pool_one.pop();

    // Checks
    if(lottery_name!=LOTTO1.lottery_name){
        throw new Error("Invalid lottery name")
    }

    for(var ii=0;ii<LOTTO1.winning_numbers_count;ii++){
        if(isNaN(winning_numbers(ii))){
            throw new Error("Invalid winning number detected in position: "+ii)
        }
    }

    if(winning_numbers.length!=LOTTO1.winning_numbers_count){
        throw new Error("Invalid winning numbers length: "+ winning_numbers)
    }

    for(var ii=0;ii<LOTTO1.single_ticket_count;ii++){
        if(isNaN(single_ticket(ii))){
            throw new Error("Invalid single number detected in position: "+ii)
        }
    }

    if(single_ticket.length!=LOTTO1.single_ticket_count){
        throw new Error("Invalid single ticket numbers")
    }

    // Informative output
    console.info("Lottery name: " +lottery_name)
    console.info("Winning numbers:" + winning_numbers)
    console.info("Single ticket:" + single_ticket)
    console.info("-------------------------------------")
    console.info("Pool one:" + pool_one)
    console.info("Pool two:" + pool_two)

    // Pool one
    const PoolOneChecks = calcPoolOneMatches(single_ticket,pool_one,LOTTO1)

    if(PoolOneChecks.result==-1){
        throw new Error("Error while looking for pool one matches")
    }

    // console.log("Pool one matches:"+ PoolOneChecks.matches)

    // Pool two

    const PoolTwoChecks = calcPoolTwoMatches(single_ticket,pool_two,LOTTO1)
    
    if(PoolTwoChecks.result==-1){
        throw new Error("Error while looking for pool two matches")
    }

    // console.log("Pool two matches:"+ PoolTwoChecks.matches)

    // Generate output

    var PrizeAmount = "";
    var PrizeClass = "";

    if(PoolOneChecks.matches<2){
        console.log("This ticket did not win a prize.")
        return 0;
    }

    if(PoolOneChecks.matches && !PoolTwoChecks.matches){
        PrizeAmount = LOTTO1.PoolOnePrizes[PoolOneChecks.matches-2];
        PrizeClass = LOTTO1.PoolOneClass[PoolOneChecks.matches-2];
    }

    if(PoolOneChecks.matches && PoolTwoChecks.matches){
        PrizeAmount = LOTTO1.PoolTwoPrizes[PoolOneChecks.matches-2];
        PrizeClass = LOTTO1.PoolTwoClass[PoolOneChecks.matches-2];
    }

    console.log("This ticket won a prize of class "+PrizeClass+" and amount £"+PrizeAmount+".")
    if(PoolOneChecks.matches && PoolTwoChecks.matches){
        console.log("Matched the numbers "+PoolOneChecks.matched_numbers+" from pool 1 and the number "+PoolTwoChecks.matched_numbers+" from pool 2.")
        return 0;
    }
    if(PoolOneChecks.matches){
        console.log("Matched the numbers "+PoolOneChecks.matched_numbers+" from pool 1.")
        return 0;
    }
    console.log("Matched the number "+PoolTwoChecks.matched_numbers+" from pool 2.")
    return 0;

}

function calcPoolOneMatches(single_ticket,poolone,lottery){
    if(poolone.length!=lottery.pool_one_count || single_ticket.length!=lottery.single_ticket_count){
        console.error("calcPoolOneMatches: unexpected single_ticket and poolone data.")
        return {
            "result": -1
        }
    }

    let matches=0;
    let matched_numbers="";

    for(let a=0;a<lottery.single_ticket_count;a++){
        for(let b=0;b<lottery.pool_one_count;b++){
            if(single_ticket[a]==poolone[b]){
                matches++
                matched_numbers+=poolone[b]+",";
            }
        }
    }

    return {
        "result":0,
        "matches": matches,
        "matched_numbers": matched_numbers.substring(0,matched_numbers.length-1)
    }

}


function calcPoolTwoMatches(single_ticket,pooltwo,lottery){
    if(pooltwo.length!=lottery.pool_two_count || single_ticket.length!=lottery.single_ticket_count){
        console.error("calcPoolOneMatches: unexpected single_ticket and pooltwo data.")
        return {
            "result": -1
        }
    }

    let matches=0;
    let matched_numbers="";

    for(let a=0;a<lottery.single_ticket_count;a++){

        if(single_ticket[a]==pooltwo){
            matches++;
            matched_numbers+=pooltwo;
        }
        
    }

    return {
        "result":0,
        "matches": matches,
        "matched_numbers": matched_numbers
    }

}

module.exports = {
    run_lottery
};
