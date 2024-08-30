import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './Airdrop';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
                <WalletProvider wallets={[new UnsafeBurnerWalletAdapter()]} autoConnect>
                    <WalletModalProvider>
                        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full space-y-6">
                            <div className="flex flex-col items-center space-y-4">
                                {/* Centered Wallet Buttons */}
                                <div className="flex flex-col items-center space-y-4">
                                    <WalletMultiButton className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition" />
                                    <WalletDisconnectButton className="bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 transition" />
                                </div>
                                <Airdrop />
                            </div>
                        </div>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
}

export default App;
