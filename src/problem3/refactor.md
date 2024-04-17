# Issues and Explaining correctly how to improve

## Import library and Component

`import React, { useMemo } from "react";
import { useWalletBalances, usePrices } from "./hooks/mockHooks";
import { WalletRow } from "./components/WalletRow";`

## Missing property

Refactor: `blockchain: string`

## Redeclare the property

Initial: `interface WalletBalance {
currency: string;
amount: number;
}

interface FormattedWalletBalance {
currency: string;
amount: number;
formatted: string;
}`

Refactor: `interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  formatted: string;
}`

## BoxProps not use

delete it

## Type of blockchain

Initial: `const getPriority = (blockchain: any): number => {}`
Refactor: `const getPriority = (blockchain: string): number => {}`

## Combined same priority blockchains in getPriority()

Initial: `      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;`

Refactor: `      case "Zilliqa":
      case "Neo":
        return 20;`

## Wrong use variable in statement

Initial: `        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }`

Refactor: `        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }`

## Handle case where priorities are equal

Initial: `if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }`

Refactor: `if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        } 
        return 0;`

## Wrong use function in statement

Initial: `const rows = sortedBalances.map()`
Refactor: `const rows = formattedBalances.map()`

## Export component

Refactor: `export default WalletPage;`
