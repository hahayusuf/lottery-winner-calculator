# Lottery winner calculator
## Config
### Verbosity
You can increase verbosity my changing the value of `verbose` to 1.
### Lottery configuration
The lottery variables are defined in the `LOTTO1` variable.
```javascript
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
```
## Example commands
### Example command: class 1

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,4,5,6"
```
### Example command: class 2

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,4,5,1"
```

### Example command: class 3

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,4,35,6"
```

### Example command: class 4

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,4,35,2"
```

### Example command: class 5

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,34,35,6"
```

### Example command: class 6

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,34,35,3"
```


### Example command: class 7

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,30,34,35,6"
```

### Example command: class 8

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,30,34,35,10"
```

