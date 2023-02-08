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
## Usage
### Command-line
```bash
node winner-calculator.js lottery-name draw ticket
```
Current supported values for `lottery-name` is `"LOTTO1"`. The draws and tickets should have the same length and contain the pools in sequence i.e. `poolone,pooltwo`. So a total of six numbers e.g `"10,25,9,12,36,6"`.

Structure of draws and tickets for `"LOTTO1"` is defined as below:
| Pool      |  Count |   Min    |  Max      |
| --------- |     --:|       --:|        --:|
| One       | 5      | 1        | 35        |
| Two       | 1      | 1        | 10        |


## Examples
### Class 1

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,4,5,6"
```
### Class 2

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,4,5,1"
```

### Class 3

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,4,35,6"
```

### Class 4

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,4,35,2"
```

### Class 5

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,34,35,6"
```

### Class 6

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,3,34,35,3"
```


### Class 7

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,30,34,35,6"
```

### Class 8

```bash
node winner-calculator.js "LOTTO1" "1,2,3,4,5,6" "1,2,30,34,35,10"
```

