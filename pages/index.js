
//https://docs.etherscan.io
const songs = require('./songlist.json')

import { useEffect } from "react"
import Web3 from "web3"

const valueToEther = (value) => {
  return Web3.utils.fromWei(value, "ether")
}

console.log(songs)

export default function Home() {
  return (
    <div >
      <button>
        TODO: implement music player    </button>
    </div>
  )
}
