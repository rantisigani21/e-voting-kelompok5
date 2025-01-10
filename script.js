// Data kandidat
let kandidat = [
  { id: 1, nama: "Ranti", foto: "./foto/calon1.jpg", hasil: 0 },
  { id: 2, nama: "Pipi", foto: "./foto/calon2.jpg", hasil: 0 },
  { id: 3, nama: "Diba", foto: "./foto/calon4.jpg", hasil: 0 },
  { id: 4, nama: "Hades", foto: "./foto/calon3.jpg", hasil: 0 },
];

// Data pengguna
let pemilih = [
  { username: "pipi", password: "wemjyhhmr", voted: false },
  { username: "diba", password: "teliverkm", voted: false },
  { username: "zahra", password: "levyr", voted: false },
  { username: "cai", password: "wyhmvqer", voted: false },
  { username: "dayat", password: "eqmr", voted: false },
  { username: "tantan", password: "wyhevwsrs", voted: false },
  { username: "mul", password: "qyp}ehm", voted: false },
  { username: "asya", password: "veqpm", voted: false },
  { username: "alfi", password: "tzbsjg", voted: false },
  { username: "fila", password: "wejvmehl}", voted: false },
  { username: "ranti", password: "leqvmhmr", voted: false },
  { username: "hades", password: "oeveqe", voted: false },
  { username: "rahma", password: "pyoqer", voted: false },
  { username: "rahmi", password: "pyoqer", voted: false },
  { username: "hasni", password: "qelqyh", voted: false },
  { username: "labibi", password: "viw{erhe", voted: false },
  { username: "abu", password: "qy+qev", voted: false },
  { username: "anto", password: "veqerk", voted: false },
  { username: "fahmi", password: "qyre{mv", voted: false },
  { username: "mus", password: "ew+eh", voted: false },
  { username: "sheva", password: "erxsr", voted: false },
  { username: "tri", password: "mufep", voted: false },
  { username: "ico", password: "weqmyhmr", voted: false },
  { username: "tes", password: "e}el", voted: false },
];

let hasil = {
  partisipan: pemilih.length,
  sudahVote: 0,
  belumVote: pemilih.length,
};

// Variabel untuk menyimpan pengguna yang sedang login
let userSekarang = null;

// Fungsi untuk login
function login() {
  const username = document.getElementById("usernameInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();
  // const password = md5(document.getElementById("passwordInput").value.trim());
  // key = "rahasia";
  // const enk = enkripPass(password, key);

  // Validasi username dan password
  const user = pemilih.find(
    (item) =>
      item.username == username && item.password === enkripPassx(password)
  );

  // let user;
  // for (var i = 0; i < pemilih.length; i++) {
  //   if (
  //     pemilih[i].username === username &&
  //     pemilih[i].password === enkripPassx(password)
  //   ) {
  //     user = { username: username, password: enkripPassx(password) };
  //   }
  // }

  if (user) {
    // Periksa apakah pengguna sudah login sebelumnya
    if (userSekarang && userSekarang.username !== username) {
      userSekarang.voted = 0; // Reset status voting untuk pengguna baru
    }

    userSekarang = user; // Simpan pengguna yang sedang login
    alert(`Selamat datang, ${username}!`);
    document.getElementById("loginModal").style.display = "none"; // Tutup modal login
    tampilData(); // Perbarui tampilan
  } else {
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

  // Bersihkan elemen sebelumnya agar elemen tidak berulang
  kandidats.innerHTML = "";
  partisipasi.innerHTML = `
    <p 
      style="text-align:center;color:white"
    
    >Total Partisipan: ${hasil.partisipan}</p>
    <p
      style="text-align:center;color:white;"
    >Sudah Vote: ${hasil.sudahVote}</p>
    <p
      style="text-align:center;color:white"
    >Belum Vote: ${hasil.belumVote}</p>
    `;
  //

  // Jika pengguna belum login, tampilkan modal login
  if (!userSekarang) {
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
    buttonVoting.textContent = userSekarang.voted ? "Sudah Vote" : "Vote";

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
  alert("VOTED RESET");
  for(b=0; b<kandidat.length; b++){
    kandidat[b].hasil=0;
    userSekarang.voted=false;
    hasil.sudahVote = 0;
    hasil.belumVote = pemilih.length;

    tampilData();
  }

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
  // if (!userSekarang) {
  //   alert("Silakan login terlebih dahulu sebelum memberikan suara!");
  //   openLoginModal();
  //   return;
  // }

  if (userSekarang.voted) {
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
  userSekarang.voted = true;

  hasil.sudahVote += 1;
  hasil.belumVote -= pemilih.filter((p) => p.voted).length;

  // Perbarui tampilan data
  tampilData();
}

function enkripPassx(text) {
  let chars = text.split("");
  for (let i = 0; i < chars.length; i++) {
    let charCode = chars[i].charCodeAt(0);
    console.log(chars[i] + " => " + charCode);
    chars[i] = String.fromCharCode(charCode + 4);

    console.log(chars[i]);
    // console.log("3------------");
  }
  console.log(chars.join());
  return chars.join("");
}
//
tampilData();
