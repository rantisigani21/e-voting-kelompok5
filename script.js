// Data kandidat
let kandidat = [
  { id: 1, nama: "Ranti", foto: "./foto/calon1.jpg", hasil: 0 },
  { id: 2, nama: "Pipi", foto: "./foto/calon2.jpg", hasil: 0 },
  { id: 3, nama: "Diba", foto: "./foto/calon4.jpg", hasil: 0 },
  { id: 4, nama: "Hades", foto: "./foto/calon3.jpg", hasil: 0 },
];

// Data pengguna
let pemilih = [
  { username: "pipi", password: "wemjyhhmr", voted: 0 },
  { username: "diba", password: "qbifsbohj", voted: 0 },
  { username: "zahra", password: "ibsvobstzbe", voted: 0 },
  { username: "cai", password: "wyhmvqer", voted: 0 },
  { username: "dayat", password: "bnjo", voted: 0 },
  { username: "tantan", password: "tvebstpop", voted: 0 },
  { username: "mul", password: "nvmzbej", voted: 0 },
  { username: "asya", password: "sbnmj", voted: 0 },
  { username: "alfi", password: "tzbsjg", voted: 0 },
  { username: "fila", password: "tbgsjbeiz", voted: 0 },
  { username: "ranti", password: "leqvmhmr", voted: 0 },
  { username: "hades", password: "oeveqe", voted: 0 },
  { username: "rahma", password: "pyoqer", voted: 0 },
  { username: "rahmi", password: "pyoqer", voted: 0 },
  { username: "hasni", password: "qelqyh", voted: 0 },
  { username: "labibi", password: "viw{erhe", voted: 0 },
  { username: "abu", password: "qy+qev", voted: 0 },
  { username: "anto", password: "veqerk", voted: 0 },
  { username: "fahmi", password: "qyre{mv", voted: 0 },
  { username: "mus", password: "ew+eh", voted: 0 },
  { username: "sheva", password: "erxsr$lmhe}ex", voted: 0 },
  { username: "tri", password: "mufep", voted: 0 },
  { username: "ico", password: "weqmyhmr", voted: 0 },
];

let hasil = 
  { partisipan: pemilih.length, 
    sudahVote: 0, 
    belumVote: pemilih.length 
  };

// Variabel untuk menyimpan pengguna yang sedang login
let currentUser = null;

// Fungsi untuk login
function login() {
  const username = document.getElementById("usernameInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();
  // const password = md5(document.getElementById("passwordInput").value.trim());
  key = "rahasia";
  // const enk = enkripPass(password, key);

  // Validasi username dan password
  const user = pemilih.find(
    (p) => p.username === username && p.password === enkripPassx(password)
  );

  if (user) {
    // Periksa apakah pengguna sudah login sebelumnya
    if (currentUser && currentUser.username !== username) {
      currentUser.voted = 0; // Reset status voting untuk pengguna baru
    }

    currentUser = user; // Simpan pengguna yang sedang login
    alert(`Selamat datang, ${username}!`);
    document.getElementById("loginModal").style.display = "none"; // Tutup modal login
    tampilData(); // Perbarui tampilan
  } else {
    teks = "karama";
    // key = "rahasia";
    enk = enkripPassx(teks);
    console.log(enk);
    // alert(enk);
    alert("Username atau password salah! Silakan coba lagi.");
  }
}

// Fungsi untuk membuka modal login
function openLoginModal() {
  document.getElementById("loginModal").style.display = "block";
}

// Fungsi untuk menampilkan data kandidat dan partisipasi
function tampilData() {
  const kandidats = document.getElementById("kandidats");
  const partisipasi = document.getElementById("partisipasi"); // Elemen untuk partisipasi

  // Bersihkan elemen sebelumnya
  kandidats.innerHTML = "";
  partisipasi.innerHTML = `
    <p 
      style="text-align:center;color:white"
    
    >Total Partisipan: ${hasil.partisipan}</p>
    <p
      style="text-align:center;color:white"
    >Sudah Vote: ${hasil.sudahVote}</p>
    <p
      style="text-align:center;color:white"
    >Belum Vote: ${hasil.belumVote}</p>
    `;
  //

  // Jika pengguna belum login, tampilkan modal login
  if (!currentUser) {
    openLoginModal();
    return;
  }

  // Tampilkan data kandidat
  for (let a = 0; a < kandidat.length; a++) {
    let kandidatsData = document.createElement("div");
    kandidatsData.setAttribute("class", "calon1");

    let kandidatsImage = document.createElement("img");
    kandidatsImage.setAttribute("src", kandidat[a].foto);
    kandidatsImage.setAttribute(
      "style",
      "height: 150px; width: 150px; object-fit: cover"
    );

    let kandidatsName = document.createElement("h3");
    kandidatsName.textContent = kandidat[a].nama;
    kandidatsName.setAttribute("style", "width:100%;text-align:center");

    let buttonVoting = document.createElement("button");
    buttonVoting.setAttribute("id", `voteButton${kandidat[a].id}`);
    buttonVoting.setAttribute("onclick", `submitVote(${kandidat[a].id})`);
    buttonVoting.setAttribute(
      "style",
      "width:60%; display:block; margin-left:auto; margin-right:auto;"
    );

    // Ubah teks tombol jika pengguna sudah voting
    buttonVoting.textContent = currentUser.voted ? "Sudah Vote" : "Vote";

    let hasil = document.createElement("h1");
    hasil.textContent = kandidat[a].hasil;
    hasil.setAttribute("style", "width:100%;text-align:center; color:white");

    kandidatsData.appendChild(kandidatsImage);
    kandidatsData.appendChild(kandidatsName);
    kandidatsData.appendChild(buttonVoting);
    kandidatsData.appendChild(hasil);

    kandidats.appendChild(kandidatsData);
  }
}

function reset() {
  alert("RESET");
  kandidat[0].hasil = 0;
  kandidat[1].hasil = 0;
  kandidat[2].hasil = 0;
  kandidat[3].hasil = 0;
  currentUser.voted = false;
  hasil.sudahVote = 0;
  hasil.belumVote = pemilih.length;
  tampilData();
}

function showButton() {
  const buttonreset = document.getElementById("buttonreset");
  buttonreset.innerHTML = `
    <button onclick="reset()">Reset</button>
  `;
}

showButton();

// Fungsi untuk menangani voting
function submitVote(id) {
  if (!currentUser) {
    alert("Silakan login terlebih dahulu sebelum memberikan suara!");
    openLoginModal();
    return;
  }

  if (currentUser.voted) {
    alert(
      "Anda sudah melakukan voting. Silakan login dengan akun berbeda untuk memilih lagi."
    );
    openLoginModal(); // Munculkan modal login
    return;
  }

  // Menambah suara untuk kandidat yang dipilih
  for (let a = 0; a < kandidat.length; a++) {
    if (kandidat[a].id == id) {
      kandidat[a].hasil += 1;
    }
  }
  // Tandai bahwa pengguna sudah voting
  currentUser.voted = true;

  hasil.sudahVote+=1;
  hasil.belumVote-=pemilih.filter((p) => p.voted).length;

  // Perbarui tampilan data
  tampilData();
}

// Fungsi untuk logout
function logout() {
  currentUser = null; // Hapus pengguna yang sedang login
  alert("Anda telah logout. Silakan login kembali untuk memberikan suara.");
  tampilData();
}

function enkripPass(text) {
  let chars = text.split("");
  for (let i = 0; i < chars.length - 1; i += 2) {
    let temp = chars[i];
    chars[i] = chars[i + 1];
    chars[i + 1] = temp;
  }
  return chars.join("");
}

function enkripPassx(text) {
  let chars = text.split("");
  for (let i = 0; i < chars.length; i++) {
    let charCode = chars[i].charCodeAt(0);
    chars[i] = String.fromCharCode(charCode + 4);
  }
  return chars.join("");
}

tampilData();
