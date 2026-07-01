# Pictify

Pictify adalah sebuah aplikasi terdesentralisasi (dApp) yang memungkinkan pengguna untuk melakukan *minting* (pencetakan) dan pengelolaan koleksi NFT (Non-Fungible Token) secara mudah dan elegan. Antarmuka pengguna didesain dengan gaya *fintech* modern (IDRX Aesthetic) untuk memberikan pengalaman interaktif yang bersih dan mulus.

## 🚀 Tech Stack

Proyek ini dibangun menggunakan teknologi modern baik di sisi *Frontend* maupun *Smart Contract*:

- **Frontend**: 
  - **[Vue.js 3](https://vuejs.org/)**: Framework JavaScript progresif untuk membangun antarmuka pengguna yang dinamis dan reaktif.
  - **[TailwindCSS](https://tailwindcss.com/)**: Framework CSS *utility-first* untuk *styling* secara cepat dan terstandarisasi.
  - **[Vite](https://vitejs.dev/)**: *Build tool* generasi baru untuk proses *development* dan kompilasi yang super cepat.

- **Smart Contract & Blockchain**:
  - **[Ape Framework (Python)](https://docs.apeworx.io/ape/stable/)**: Kerangka kerja pengembangan *smart contract* berbasis Python (ApeWorX) untuk menyusun, menguji, dan melakukan *deploy* kontrak pintar (Smart Contracts).
  - **[EVM (Ethereum Virtual Machine)](https://ethereum.org/)**: Standar mesin virtual tempat berjalannya *smart contract*, mendukung jaringan seperti Ethereum (Mainnet), Sepolia, atau Ganache secara lokal.
  - **[Web3.js](https://web3js.readthedocs.io/)**: Pustaka JavaScript untuk berinteraksi dengan node Ethereum dan *smart contract* secara langsung dari peramban (*browser*).

## ✨ Fitur Utama

1. **Minting NFT Cepat**: Unggah gambar beserta metadata dan langsung cetak (mint) ke dalam jaringan *blockchain*. Gambar Anda akan disimpan ke IPFS menggunakan Pinata.
2. **Galeri Pribadi**: Jelajahi koleksi NFT yang terhubung langsung dengan alamat *wallet* (MetaMask) Anda.
3. **Desain Modern (IDRX Style)**: Tampilan visual responsif dengan *clean white aesthetic*, *pill-shaped buttons*, serta tipografi IBM Plex Sans yang cantik dan berorientasi pengguna.

## 🛠 Instalasi dan Penggunaan Lokal

### 1. Kloning Repositori
```bash
git clone https://github.com/Eldovyn/pictify.git
cd pictify
```

### 2. Frontend Development
Pastikan Anda sudah menginstal [Bun](https://bun.sh/) atau Node.js.
```bash
cd frontend
bun install
bun run dev
```
Aplikasi frontend akan berjalan di `http://localhost:5173`. 
> Jangan lupa untuk menyiapkan berkas `.env` dengan kredensial Pinata (`VITE_PINATA_API_KEY` dan `VITE_PINATA_SECRET_API_KEY`) serta alamat *smart contract* Anda (`VITE_CONTRACT_ADDRESS`).

### 3. Smart Contract Development
Pastikan Anda menginstal Python 3.9+ dan membuat *virtual environment*.
```bash
# Kembali ke direktori root
cd ..
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Compile kontrak menggunakan Ape
ape compile
```

## 📜 Lisensi

Hak cipta dilindungi. Silakan berkontribusi dengan mengajukan *Pull Request* atau membuka *Issue* jika Anda menemukan *bug* atau memiliki saran perbaikan.
