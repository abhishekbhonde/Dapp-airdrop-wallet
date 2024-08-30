import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export default function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState(""); // Manage the input state

    async function airDropUser() {
        if (!wallet.publicKey) {
            alert("Connect your wallet first");
            return;
        }
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            const lamports = parseFloat(amount) * 1e9; // Convert SOL to lamports
            await connection.requestAirdrop(wallet.publicKey, lamports);
            alert("Airdrop sent successfully");
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Failed to send airdrop");
        }
    }

    return (
        <div className="bg-white p-6 shadow-md rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Airdrop SOL</h2>
            <p className="text-gray-600 mb-4">
                Send SOL to your wallet for testing purposes. Make sure your wallet is connected.
            </p>
            <div className="flex flex-col space-y-4">
                <input
                    type="number"
                    placeholder="Amount (in SOL)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={airDropUser}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                    Send Airdrop
                </button>
            </div>
        </div>
    );
}
