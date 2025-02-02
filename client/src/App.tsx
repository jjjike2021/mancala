import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import { Provider as JotaiProvider } from "jotai";
import { sepolia, Chain } from "@starknet-react/chains";
import {
  StarknetConfig,
  jsonRpcProvider,
} from "@starknet-react/core";
import Gameplay from "./pages/games/Gameplay";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import { useEffect, useState } from "react";
import CartridgeConnector from "@cartridge/connector";
import { useDojo } from "./dojo/useDojo";

function rpc(_chain: Chain) {
  return {
    nodeUrl: "https://api.cartridge.gg/x/mancala-alpha/katana",
  };
}

export default function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { burner } = useDojo();

  const connector = new CartridgeConnector(
    [
      {
        target: burner.feeTokenAddress,
        method: "approve",
      },
      {
        target: "0x15e4963c02114bf9b7f4149cbc75c0a5df749b7bdfdeefe318108873038b3c9",
        method: "create_initial_game_id",
      },
      {
        target: "0x15e4963c02114bf9b7f4149cbc75c0a5df749b7bdfdeefe318108873038b3c9",
        method: "create_game",
      },
      {
        target: "0x15e4963c02114bf9b7f4149cbc75c0a5df749b7bdfdeefe318108873038b3c9",
        method: "create_private_game",
      },
      {
        target: "0x15e4963c02114bf9b7f4149cbc75c0a5df749b7bdfdeefe318108873038b3c9",
        method: "join_game",
      },
      {
        target: "0x15e4963c02114bf9b7f4149cbc75c0a5df749b7bdfdeefe318108873038b3c9",
        method: "create_private_game",
      },
      {
        target: "0x15e4963c02114bf9b7f4149cbc75c0a5df749b7bdfdeefe318108873038b3c9",
        method: "move",
      },
      {
        target: "0x15e4963c02114bf9b7f4149cbc75c0a5df749b7bdfdeefe318108873038b3c9",
        method: "time_out",
      },
    ],
    {
      rpc: "https://api.cartridge.gg/x/mancala-alpha/katana",
    },
  );

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={jsonRpcProvider({ rpc })}
      connectors={[connector]}
    >
      <JotaiProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/games/:gameId" element={<Gameplay />} />
          </Routes>
        </BrowserRouter>
      </JotaiProvider>
      {isSmallScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-white bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">
              This game is not optimized for this device screen!
            </h1>
          </div>
        </div>
      )}
    </StarknetConfig>
  );
}
