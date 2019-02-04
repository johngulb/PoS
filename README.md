# PoS
A point-of-sale system written in Node.js

### Start the api server
`npm start`

### Test
`npm test`

## Manage Inventory

#### Add item to inventory
`POST /inventory`
  * upc: apple|orange|doritos
  * price: 1.19
  * per: unit|pound
  * markdown: 0.19
  * special: e.g. "4 for $8, limit 8"
  
#### Remove item from inventory
`DELETE /inventory`
  * upc
  
#### Add item to order
`POST /scan`
  * upc
  * weight (required for per pound items)
 
#### Remove item from order
`DELETE /scan`  
  * upc
  * weight (required for per pound items)

## Determining price

* The cost of any item is automatically rounded down to the nearest penny.
* For each specials are applied regardless of the number of items purchased. (e.g. 4 for $8, the total for purchasing 1 item is $2)
* Discounts for by weight items are applied to the per pound prices rounded to the nearest penny. That price is applied to the weight of the item. (e.g. 50% off $6.99/lb, discounted item is charged at $3.49/lb, not $3.495/lb)

## Notes
* Exhaustive error handling remains to be implemented.

