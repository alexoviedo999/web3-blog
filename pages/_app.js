import '../styles/globals.css'
import { useState } from 'react'
import Link from 'next/link'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import { ownerAddress } from '../config'
import 'easymde/dist/easymde.min.css'

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

function MyApp({ Component, pageProps }) {
  /* create local state to save account information after signin */
  const [account, setAccount] = useState(null)

  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: { 
            infuraId: INFURA_PROJECT_ID
          },
        },
      },
    })
    return web3Modal
  }

    /* the connect function uses web3 modal to connect to the user's wallet */
    async function connect() {
      try {
        const web3Modal = await getWeb3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const accounts = await provider.listAccounts()
        setAccount(accounts[0])
      } catch (err) {
        console.log('error:', err)
      }
    }

    return (
      <div>
        <nav className={nav}>

        </nav>
      </div>
    )
}