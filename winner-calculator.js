
const LOTTO1 = {
    lottery_name:"LOTTO1",
    winning_numbers_count: 6,
    ticket_count: 6,
    
    pool_one_count: 5,
    pool_two_count: 1,

    PoolOnePrizes: ["2","30","500","100,000"],
    PoolOneClass: ["8","6","4","2"],
    PoolOneRange: {
        max: 35,
        min: 1,
    },

    PoolTwoPrizes: ["5","100","10,000","10,000,000"],
    PoolTwoClass: ["7","5","3","1"],
    PoolTwoRange: {
        max: 10,
        min: 1,
    }
    
    
}

run_lottery(LOTTO1,process)

function run_lottery(LOTTO1,process){

    console.info("winner-calculator.js running")
    const lottery_name = process.argv[2];
    const winning_numbers = process.argv[3].split(",");
    const winning_pool_one = process.argv[3].split(",");
    const winning_pool_two = winning_pool_one.pop();
    const ticket = process.argv[4].split(",");
    const ticket_pool_one = process.argv[4].split(",");
    const ticket_pool_two = ticket_pool_one.pop();

    // Checks
    if(lottery_name!=LOTTO1.lottery_name){
        throw new Error("Invalid lottery name")
    }

    var validData = numberSetChecker(winning_pool_one,LOTTO1.PoolOneRange,LOTTO1.pool_one_count);
    
    if(validData.result){
        throw new Error({message:"Unexpected error with pool one",validData})
    }

    var validData = numberSetChecker(winning_pool_two,LOTTO1.PoolTwoRange,LOTTO1.pool_two_count);

    if(validData.result){
        throw new Error({message:"Unexpected error with pool two",validData})
    }


    // Informative output
    console.info("Lottery name: " +lottery_name)
    console.info("Winning numbers:" + winning_numbers)
    console.info("Single ticket:" + ticket)
    console.info("-------------------------------------")
    console.info("Pool one:" + winning_pool_one)
    console.info("Pool two:" + winning_pool_two)

    // Pool one
    const PoolOneChecks = calcPoolMatches(ticket_pool_one,winning_pool_one,LOTTO1.pool_one_count)

    if(PoolOneChecks.result==-1){
        throw new Error("Error while looking for pool one matches")
    }

    // console.log("Pool one matches:"+ PoolOneChecks.matches)

    // Pool two

    const PoolTwoChecks = calcPoolMatches(ticket_pool_two,winning_pool_two,LOTTO1.pool_two_count)
    
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


function calcPoolMatches(ticket,pool,pool_count){
    if(pool.length!=pool_count || ticket.length!=pool_count){
        console.error("calcPoolMatches: unexpected ticket and pool data.")
        return {
            "result": -1
        }
    }

    let matches=0;
    let matched_numbers="";

    for(let a=0;a<pool_count;a++){
        for(let b=0;b<pool_count;b++){
            if(ticket[a]==pool[b]){
                matches++
                matched_numbers+=pool[b]+",";
            }
        }
    }

    return {
        "result":0,
        "matches": matches,
        "matched_numbers": matched_numbers.substring(0,matched_numbers.length-1)
    }

}

function numberSetChecker(set,range,count){
    if(set.length!=count){
        return {
            result: -1,
            message: "Unexpected length of set."
        }
    }

    for(var ii=0;ii<count;ii++){
        if(isNaN(set[ii])){
            return {
                result: -1,
                message: "Non-numeric data detected at index "+ ii
            }
        }
        if(+set[ii]>range.max || +set[ii]<range.min){
            return {
                result: -1,
                message: "Out of range value detected at index "+ ii
            }
        }
    }

    for(var a=0;a<count;a++){
        for(var b=0;b<count;b++){
            if(a==b){
                continue
            }
            if(set[a]==set[b]){
                return {
                    result: -1,
                    message: "Duplicate found between indexes "+ a+","+b
                }
            }
        }
    }

    return {
        result: 0,
        message: "Healthy data."
    }

}

module.exports = {
    run_lottery
};
