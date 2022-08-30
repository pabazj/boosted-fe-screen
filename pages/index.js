
//https://docs.etherscan.io

import { useEffect } from "react"
import Web3 from "web3"

const valueToEther = (value) => {
  return Web3.utils.fromWei(value, "ether")
}

const fetchETHData = async () => {
  const addr = '0x881D40237659C251811CEC9c364ef91dC08D300C'
  const results = 1000;
  // const url=`https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${process.env.ETHERSCAN_KEY}`
  // const balanceUrl=`https://api.etherscan.io/api?module=account&action=balance&address=${addr}&tag=latest&apikey=${process.env.ETHERSCAN_KEY}`
  const url=`https://api.etherscan.io/api?module=account&action=txlist&address=${addr}&startblock=0&endblock=99999999&page=1&offset=${results}&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`
     console.log(url)
  const res = await fetch(url)
  const data = await res.json()
  console.log(data.result)

  return data
}

export default function Home() {
  return (
    <div >
    <button>
      Fetch Data
    </button>
    </div>
  )
}
