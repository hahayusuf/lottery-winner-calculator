
let verbose=1;

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

run_lottery(LOTTO1,process,verbose)

function run_lottery(lott,process,verbose){

    
    const lottery_name = process.argv[2];
    const winning_numbers = process.argv[3].split(",");
    const winning_pool_one = process.argv[3].split(",");
    const winning_pool_two = winning_pool_one.pop();
    const ticket = process.argv[4].split(",");
    const ticket_pool_one = process.argv[4].split(",");
    const ticket_pool_two = ticket_pool_one.pop();

    // Checks
    if(lottery_name!=lott.lottery_name){
        throw new Error("Invalid lottery name")
    }

    // Winning draw checks
    { // Pool one
        let checkData = numberSetChecker(winning_pool_one,lott.PoolOneRange,lott.pool_one_count);
        
        if(checkData.result){
            console.error(checkData)
            throw new Error({message:"Unexpected error with pool one",checkData})
        }
    }
    { // Pool two
        let checkData = numberSetChecker(winning_pool_two,lott.PoolTwoRange,lott.pool_two_count);

        if(checkData.result){
            console.error(checkData)
            throw new Error({message:"Unexpected error with pool two",checkData})
        }
    }

    // Ticket checks
    { // Pool one
        let checkData = numberSetChecker(ticket_pool_one,lott.PoolOneRange,lott.pool_one_count);
        
        if(checkData.result){
            console.error(checkData)
            throw new Error({message:"Unexpected error with ticket pool one"})
        }
    }
    { // Pool two
        let checkData = numberSetChecker(ticket_pool_two,lott.PoolTwoRange,lott.pool_two_count);

        if(checkData.result){
            console.error(checkData)
            throw new Error({message:"Unexpected error with ticket pool two",checkData})
        }
    }

    

    // Matching
    // Pool one 
    const PoolOneChecks = calcPoolMatches(ticket_pool_one,winning_pool_one,lott.pool_one_count)

    if(PoolOneChecks.result==-1){
        throw new Error("Error while looking for pool one matches")
    }

    // Pool two
    const PoolTwoChecks = calcPoolMatches(ticket_pool_two,winning_pool_two,lott.pool_two_count)
    
    if(PoolTwoChecks.result==-1){
        throw new Error("Error while looking for pool two matches")
    }

    if(verbose){
        // Informative output
        console.info("Lottery name: " +lottery_name)
        console.info("Winning numbers:" + winning_numbers)
        console.info("Single ticket:" + ticket)
        console.info("-------------------------------------")
        console.info("Winning draw pool one:" + winning_pool_one)
        console.info("Winning draw pool two:" + winning_pool_two)
        console.info("-------------------------------------")
        console.info("Ticket pool one:" + ticket_pool_one)
        console.info("Ticket pool two:" + ticket_pool_two)
        console.info("-------------------------------------")
        console.log("Pool one matches:"+ PoolOneChecks.matches)
        console.log("Pool two matches:"+ PoolTwoChecks.matches)
        console.info("-------------------------------------")
    }

    // Generate output
    let PrizeAmount = "";
    let PrizeClass = "";

    if(PoolOneChecks.matches<2){
        console.log("This ticket did not win a prize.")
        return 0;
    }

    if(PoolOneChecks.matches && !PoolTwoChecks.matches){
        PrizeAmount = lott.PoolOnePrizes[PoolOneChecks.matches-2];
        PrizeClass = lott.PoolOneClass[PoolOneChecks.matches-2];
    }

    if(PoolOneChecks.matches && PoolTwoChecks.matches){
        PrizeAmount = lott.PoolTwoPrizes[PoolOneChecks.matches-2];
        PrizeClass = lott.PoolTwoClass[PoolOneChecks.matches-2];
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
    if(pool_count==1 && (isNaN(ticket) || isNaN(pool))){
        console.error("calcPoolMatches: unexpected ticket and pool data.")
        return {
            "result": -1
        }
    } 
    if(pool_count>1 && (pool.length!=pool_count || ticket.length!=pool_count)){
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
    if(count==1 && isNaN(set)){
        return {
            result: -1,
            message: "Unexpected length of set: it is supposed to be single number.",
            set: set
        }
    }
    if(count>1 && set.length!=count){
        return {
            result: -1,
            message: "Unexpected length of set: target length is "+count,
            set: set
        }
    }

    for(let ii=0;ii<count;ii++){
        if(isNaN(set[ii])){
            return {
                result: -1,
                message: "Non-numeric data detected at index "+ ii,
                set: set
            }
        }
        if(+set[ii]>range.max || +set[ii]<range.min){
            return {
                result: -1,
                message: "Out of range value detected at index "+ ii,
                set: set
            }
        }
    }

    for(let a=0;a<count;a++){
        for(let b=0;b<count;b++){
            if(a==b){
                continue
            }
            if(set[a]==set[b]){
                return {
                    result: -1,
                    message: "Duplicate found between indexes "+ a+","+b,
                    set: set
                }
            }
        }
    }

    return {
        result: 0,
        message: "Healthy data.",
        set: set
    }

}


