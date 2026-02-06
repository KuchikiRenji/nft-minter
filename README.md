# NFT Minter — ERC-721 Allowlist & Public Minting Stack

**Production-ready Ethereum NFT minting dApp** with allowlist (Merkle) and public sale rounds, revealable metadata, IPFS workflow, and a Wagmi-powered Next.js mint UI. Build and deploy your own NFT collection with gas-optimized Solidity, Hardhat, and TypeScript.

---

## Table of Contents

- [What is NFT Minter?](#what-is-nft-minter)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [User Guide](#user-guide)
- [Installation](#installation)
- [Hardhat Usage](#hardhat-usage)
- [Deployment](#deployment)
- [Frontend Usage](#frontend-usage)
- [Directory Structure](#directory-structure)
- [IPFS Workflow](#ipfs-workflow)
- [Author & Contact](#author--contact)
- [License](#license)

---

## What is NFT Minter?

NFT Minter is an **open-source NFT minting platform** for Ethereum and EVM-compatible chains. It provides:

- **ERC-721 smart contract** with allowlist (Merkle proof) and public mint phases, per-wallet limits, hidden/reveal metadata, and owner treasury controls.
- **Hardhat + TypeScript** tooling: Merkle tree generation, IPFS upload scripts, deployment automation, and high-coverage tests.
- **Next.js minting UI** using Wagmi v2 and Tailwind for wallet connection, allowlist proof input, and public mint with live supply and toast feedback.

Use it to launch NFT collections with allowlist (whitelist) support, public sales, and a professional reveal workflow on IPFS.

---

## Features

| Area | Capabilities |
|------|--------------|
| **Smart contract** | ERC-721, allowlist + public rounds, wallet caps, reveal, owner treasury & withdraw |
| **Backend / tooling** | TypeScript Hardhat workspace, 95%+ test coverage, Merkle tooling, deployment automation |
| **Assets** | Metadata + IPFS upload scripts (Web3.Storage), deterministic asset handling |
| **Frontend** | Next.js App Router, Wagmi v2, Tailwind UI, toast-powered mint feedback |

---

## Tech Stack

- **Blockchain:** Solidity ^0.8.20, OpenZeppelin Contracts, Hardhat
- **Frontend:** Next.js 14 (App Router), React, Wagmi v2, Viem, Tailwind CSS, React Query, React Hot Toast
- **Storage:** IPFS via Web3.Storage (or Pinata)
- **Language:** TypeScript (contracts, scripts, frontend)

---

## Requirements

- **Node.js** 18+
- **Package manager:** pnpm, npm, or yarn
- **Wallet:** Hardhat/Foundry-compatible private key (e.g. MetaMask)
- **IPFS:** Web3.Storage or Pinata API token for metadata & image uploads

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/KuchikiRenji/nft-minter.git
cd nft-minter
npm install
cd frontend && npm install --legacy-peer-deps
```

1. Copy `.env.example` to `.env` and set `RPC_URL`, `PRIVATE_KEY`, `MERKLE_ROOT`, `HIDDEN_URI`, etc.
2. Run `npm run generate:merkle` after editing `allowlist.json`.
3. Run `npm run upload:ipfs` (with `WEB3_STORAGE_TOKEN`) to upload images and metadata.
4. Deploy: `npm run deploy -- --network sepolia`.
5. Set `frontend/.env.local` with `NEXT_PUBLIC_CONTRACT_ADDRESS` and `NEXT_PUBLIC_SEPOLIA_RPC`, then `cd frontend && npm run dev` and open `/mint`.

---

## User Guide

### 1. Bootstrap

- Clone the repo and install root dependencies: `npm install`.
- Copy `.env.example` → `.env` and populate `RPC_URL`, `PRIVATE_KEY`, `MERKLE_ROOT`, `HIDDEN_URI`, and other variables.

### 2. Allowlist + Metadata

- Edit `allowlist.json` and run `npm run generate:merkle`; the root and proofs are saved under `scripts/output/merkle.json`.
- Place preview PNGs in `images/` and JSON metadata in `metadata/`.
- Run `npm run upload:ipfs` (requires `WEB3_STORAGE_TOKEN`) to upload assets and obtain image/metadata CIDs.

### 3. Contract Lifecycle

- Compile and test: `npm run build`, `npm run test` (optionally `npm run coverage`).
- Deploy: `npm run deploy -- --network <network>` (e.g. `sepolia`). The script writes the contract address and deployment record to `deployments/`.
- After deploy, configure sale states and pricing via Hardhat console or scripts as needed.

### 4. Frontend Setup

- Create `frontend/.env.local` with:
  ```env
  NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContract
  NEXT_PUBLIC_SEPOLIA_RPC=https://sepolia.infura.io/v3/...
  ```
- Install UI deps: `cd frontend && npm install --legacy-peer-deps`.
- Run dev server: `npm run dev` and open `http://localhost:3000/mint`.

### 5. Minting UX

- Connect wallet (MetaMask or other Wagmi-injected wallet).
- **Allowlist:** Paste proof from `merkle.json`, choose amount (within contract wallet limits), and submit.
- **Public mint:** Use the public form once the owner has opened `publicMintOpen`.
- Toasts show transaction status; mint counters refresh automatically.

### 6. Reveal + Withdraw

- After assets are on IPFS, call `reveal("ipfs://<metadata-cid>/")` from the owner wallet.
- Use `withdraw` to collect mint proceeds (optionally to a custom treasury address).

---

## Installation

```bash
npm install
cd frontend && npm install
```

Copy `.env.example` to `.env` and fill in RPC, private key, and Merkle root parameters.

---

## Hardhat Usage

| Command | Description |
|---------|-------------|
| `npm run build` | Compile Solidity contracts |
| `npm run test` | Run test suite |
| `npm run coverage` | Generate coverage report |
| `npm run generate:merkle` | Generate Merkle root and proofs from `allowlist.json` |
| `npm run deploy -- --network sepolia` | Deploy NFTMinter to specified network |
| `npm run upload:ipfs` | Upload images and metadata to IPFS |

---

## Deployment

1. Run `npm run generate:merkle` and set `MERKLE_ROOT` in `.env`.
2. Upload images and metadata with `npm run upload:ipfs`; note the metadata CID and set `HIDDEN_URI` / base URI as needed.
3. Run `npm run deploy -- --network <network>` to deploy `NFTMinter`.
4. Update `frontend/.env.local` with `NEXT_PUBLIC_CONTRACT_ADDRESS` and RPC URL.
5. Deploy the Next.js app (`npm run build && npm run start` or your preferred hosting).

---

## Frontend Usage

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000/mint`, connect your wallet, paste your allowlist proof if applicable, and mint.

---

## Directory Structure

```
nft-minter/
├── contracts/           # Solidity sources (NFTMinter.sol)
├── scripts/             # Merkle generation, deploy, IPFS upload
├── metadata/            # JSON metadata seeds
├── images/              # NFT art assets
├── frontend/            # Next.js mint UI (Wagmi, Tailwind)
├── docs/                # Architecture and workflow notes
└── test/                # Hardhat test suite
```

---

## IPFS Workflow

1. Place assets in `images/` and `metadata/`.
2. Run `npm run upload:ipfs` with `WEB3_STORAGE_TOKEN` set.
3. The script uploads images, rewrites metadata image links, uploads metadata, and writes CID info to `scripts/output/ipfs.json`.
4. When ready, call `reveal("ipfs://<metadata-cid>/")` from the owner wallet.

---

## Author & Contact

**KuchikiRenji**

| Channel | Handle |
|---------|--------|
| **GitHub** | [github.com/KuchikiRenji](https://github.com/KuchikiRenji) |
| **Email** | KuchikiRenji@outlook.com |
| **Discord** | kuchiki_renji |

---

## Repository Description & Topics

**Suggested short description** (e.g. for GitHub repo "About" / SEO):

> Production-ready ERC-721 NFT minting dApp with allowlist (Merkle) and public sale, IPFS reveal, Hardhat + Next.js. By KuchikiRenji.

**Suggested GitHub topics** (add in repo Settings → General → Topics):

```
nft
erc-721
ethereum
solidity
hardhat
nextjs
wagmi
ipfs
allowlist
whitelist
merkle
nft-minting
web3
dapp
typescript
openzeppelin
```

---

## License

MIT. See repository for details.
