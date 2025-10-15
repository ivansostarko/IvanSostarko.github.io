// ---- Data ----
const sdks = [
  {
    name: "PHP / Laravel",
    repo: "https://github.com/ivansostarko/otto-crypt-php",
    install: "composer require ivansostarko/otto-crypt-php",
    example: `use IvanSostarko\\OttoCrypt\\Facades\\Otto as OTTO;
[$cipher, $header] = OTTO::encryptString("Hello", options: ['password' => 'P@ssw0rd!']);
$plain = OTTO::decryptString($cipher, $header, options: ['password' => 'P@ssw0rd!']);
OTTO::encryptFile('in.mp4', 'in.mp4.otto', options: ['password' => 'P@ssw0rd!']);`,
  },
  {
    name: "Node.js / JS",
    repo: "https://github.com/ivansostarko/otto-crypt-js",
    install: "npm i otto-crypt-js  # or: git+https://github.com/ivansostarko/otto-crypt-js",
    example: `import { OttoCrypt } from 'otto-crypt-js';
const otto = new OttoCrypt();
const opt = { password: 'P@ssw0rd!' };
const { cipherAndTag, header } = await otto.encryptString(Buffer.from('Hello'), opt);
const plain = await otto.decryptString(cipherAndTag, header, opt);`,
  },
  {
    name: ".NET / C#",
    repo: "https://github.com/ivansostarko/otto-crypt-cs",
    install: "dotnet add package Sodium.Core  # for Argon2id/X25519",
    example: `using IvanSostarko.OttoCrypt;
var otto = new OttoCrypt();
var opt = new Options { Password = "P@ssw0rd!" };
var (c, h) = otto.EncryptString(System.Text.Encoding.UTF8.GetBytes("Hello"), opt);
var p = otto.DecryptString(c, h, opt);`,
  },
  {
    name: "Python",
    repo: "https://github.com/ivansostarko/otto-crypt-python",
    install: "pip install otto-crypt  # or: pip install git+https://github.com/ivansostarko/otto-crypt-python",
    example: `from otto_crypt import OttoCrypt, Options
otto = OttoCrypt()
opt = Options(password='P@ssw0rd!')
c,h = otto.encrypt_string(b'Hello', opt)
plain = otto.decrypt_string(c, h, opt)
otto.encrypt_file('movie.mp4', 'movie.mp4.otto', opt)`,
  },
  {
    name: "Java / Android",
    repo: "https://github.com/ivansostarko/otto-crypt-android",
    install: `Gradle (Android):
implementation("com.goterl:lazysodium-android:5.1.0")
// Add module from repo or published artifact`,
    example: `var o = new com.ivansostarko.ottocrypt.OttoCrypt();
var opt = new com.ivansostarko.ottocrypt.OttoCrypt.Options();
opt.password = "P@ssw0rd!";
var enc = o.encryptString("Hello".getBytes(java.nio.charset.StandardCharsets.UTF_8), opt);`,
  },
  {
    name: "Swift (iOS/macOS)",
    repo: "https://github.com/ivansostarko/otto-crypt-swift",
    install: `Package.swift:
.package(url: "https://github.com/ivansostarko/otto-crypt-swift.git", from: "0.1.0")`,
    example: `import IvanSostarkoOttoCrypt
let otto = OttoCrypt()
var opt = Options(); opt.password = "P@ssw0rd!"
let enc = try otto.encryptString(Data("Hello".utf8), options: opt)`,
  },
  {
    name: "Flutter / Dart",
    repo: "https://github.com/ivansostarko/otto-crypt-flutter",
    install: `pubspec.yaml:
otto_crypt: ^0.1.0
sodium: ^2.0.0
sodium_libs: ^2.0.0`,
    example: `final otto = await OttoCrypt.create(withSodium: true);
final opt = OttoOptions(password: 'P@ssw0rd!');
final enc = await otto.encryptString(Uint8List.fromList('Hello'.codeUnits), opt);`,
  },
];

const demos = [
  {
    name: "Flutter demo (example/)",
    desc: "Minimal messenger-style sample: encrypt text & files, E2E via X25519.",
    link: "https://github.com/ivansostarko/otto-crypt",
    run: "dart run example/main.dart",
  },
  {
    name: "Python quickstart",
    desc: "Encrypt strings & large files; same header/stream format as other SDKs.",
    link: "https://github.com/ivansostarko/otto-crypt",
    run: "python -m otto_crypt.demo",
  },
  {
    name: ".NET sample",
    desc: "Console sample: password mode + X25519 E2E.",
    link: "https://github.com/ivansostarko/otto-crypt",
    run: "dotnet run",
  },
  {
    name: "Node/JS sample",
    desc: "Chunked file encryption example, interoperable with PHP/.NET/etc.",
    link: "https://github.com/ivansostarko/otto-crypt",
    run: "node examples/encrypt-file.mjs",
  },
  {
    name: "Laravel Artisan",
    desc: "One-liners to encrypt/decrypt files and use E2E with X25519.",
    link: "https://github.com/ivansostarko/otto-crypt",
    run: "php artisan otto:encrypt in.mp4 --out=in.mp4.otto --password=...",
  },
];

const clients = [
  {
    name: "OTTO P2P Messenger (Flutter)",
    badge: "Build from source",
    desc: "Cross‑platform messenger demo that uses OTTO for text & media. Use the Flutter plugin and example as a starting point.",
    actions: [
      { label: "Source", href: "https://github.com/ivansostarko/p2p-otto-messenger" },
      { label: "Example", href: "https://github.com/ivansostarko/p2p-otto-messenger#readme" },
    ],
  },
  {
    name: "OTTO P2P CLI (Linux service)",
    badge: "Ready now",
    desc: "Peer‑to‑peer direct chat over TCP. Installs as /usr/local/bin/p2pchat and optional systemd service.",
    actions: [
      { label: "Repo", href: "https://github.com/ivansostarko/p2p-otto-cli-messenger" },
    ],
    code: `# Install (Ubuntu/Debian/CentOS)
sudo bash install.sh
# Configure
sudo nano /etc/p2p-otto-chat/p2pchat.env
# Start service
sudo systemctl start p2p-otto-chat`,
  },
];

const compareRows = [
  {
    scheme: "OTTO‑256‑GCM‑HKDF‑SIV",
    aead: "AES‑256‑GCM (AAD = header)",
    keyx: "Argon2id | Raw 32B | X25519",
    streaming: "Chunked, constant‑memory",
    nonces: "Deterministic (HKDF‑SIV style)",
    interop: "Identical wire format across SDKs",
    note: "Custom composition; request independent audit",
  },
  {
    scheme: "Plain AES‑GCM libs",
    aead: "AES‑GCM",
    keyx: "App‑defined",
    streaming: "App‑defined framing",
    nonces: "Random/managed by app (reuse risks)",
    interop: "No standard cross‑SDK format",
    note: "Powerful but foot‑guns if nonce handling is wrong",
  },
  {
    scheme: "NaCl sealed boxes",
    aead: "XSalsa20‑Poly1305",
    keyx: "X25519 (sealed box)",
    streaming: "Message‑oriented (no chunk spec)",
    nonces: "Handled internally",
    interop: "Great libs, not a file format",
    note: "Excellent for messages; less prescriptive for large media",
  },
  {
    scheme: "age (file encryption)",
    aead: "ChaCha20‑Poly1305",
    keyx: "X25519/Passphrase",
    streaming: "Yes (file‑centric)",
    nonces: "Internal",
    interop: "CLI/tooling ecosystem",
    note: "Focused on file encryption; OTTO targets app SDK + uniform object format",
  },
];

const docsLinks = [
  { label: "OTTO Algorithm (spec & reference)", href: "https://github.com/ivansostarko/otto-crypt" },
  { label: "Laravel SDK", href: "https://github.com/ivansostarko/otto-crypt-php" },
  { label: "Node/JS SDK", href: "https://github.com/ivansostarko/otto-crypt-js" },
  { label: "Python SDK", href: "https://github.com/ivansostarko/otto-crypt-python" },
  { label: ".NET SDK", href: "https://github.com/ivansostarko/otto-crypt-cs" },
  { label: "Java/Android SDK", href: "https://github.com/ivansostarko/otto-crypt-android" },
  { label: "Swift SDK", href: "https://github.com/ivansostarko/otto-crypt-swift" },
  { label: "Flutter Plugin", href: "https://github.com/ivansostarko/otto-crypt-flutter" },
];

// ---- Helpers ----
function el(tag, props = {}, children = []) {
  const e = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "class") e.className = v;
    else if (k === "dataset") Object.entries(v).forEach(([dk, dv]) => e.dataset[dk] = dv);
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else if (k === "html") e.innerHTML = v;
    else e.setAttribute(k, v);
  });
  children.forEach(c => e.append(c));
  return e;
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  } catch (e) {
    console.error(e);
    toast("Copy failed");
  }
}

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1400);
}

// ---- Renderers ----
function renderSDKs() {
  const grid = document.getElementById("sdk-grid");
  sdks.forEach(sdk => {
    const card = el("div", { class: "card" }, [
      el("div", { class: "row between center" }, [
        el("h3", {}, [document.createTextNode(sdk.name)]),
        el("a", { class: "btn ghost", href: sdk.repo }, [document.createTextNode("Repo")])
      ]),
      el("div", { class: "mtop" }, [
        el("div", { class: "row between center" }, [
          el("span", { class: "muted" }, [document.createTextNode("Install")]),
          el("button", { class: "copy", onclick: () => copy(sdk.install) }, [document.createTextNode("Copy")])
        ]),
        el("pre", {}, [el("code", {}, [document.createTextNode(sdk.install)])])
      ]),
      el("div", { class: "mtop" }, [
        el("div", { class: "row between center" }, [
          el("span", { class: "muted" }, [document.createTextNode("Example")]),
          el("button", { class: "copy", onclick: () => copy(sdk.example) }, [document.createTextNode("Copy")])
        ]),
        el("pre", {}, [el("code", {}, [document.createTextNode(sdk.example)])])
      ]),
    ]);
    grid.append(card);
  });
}

function renderDemos() {
  const grid = document.getElementById("demo-grid");
  demos.forEach(d => {
    const card = el("div", { class: "card" }, [
      el("div", { class: "row between center" }, [
        el("h3", {}, [document.createTextNode(d.name)]),
        el("a", { class: "btn ghost", href: d.link }, [document.createTextNode("Open")])
      ]),
      el("p", { class: "muted mtop" }, [document.createTextNode(d.desc)]),
      el("div", { class: "mtop" }, [
        el("div", { class: "row between center" }, [
          el("span", { class: "muted" }, [document.createTextNode("Run")]),
          el("button", { class: "copy", onclick: () => copy(d.run) }, [document.createTextNode("Copy")])
        ]),
        el("pre", {}, [el("code", {}, [document.createTextNode(d.run)])])
      ]),
    ]);
    grid.append(card);
  });
}

function renderClients() {
  const grid = document.getElementById("client-grid");
  clients.forEach(app => {
    const actions = el("div", { class: "actions row gap wrap" }, app.actions.map(a => el("a", { class: "btn ghost", href: a.href }, [document.createTextNode(a.label)])));
    const cardChildren = [
      el("div", { class: "row between center" }, [
        el("h3", {}, [document.createTextNode(app.name)]),
        el("span", { class: "badge" }, [document.createTextNode(app.badge)])
      ]),
      el("p", { class: "muted mtop" }, [document.createTextNode(app.desc)]),
      actions,
    ];
    if (app.code) {
      cardChildren.push(
        el("div", { class: "mtop" }, [
          el("div", { class: "row between center" }, [
            el("span", { class: "muted" }, [document.createTextNode("Quick start")]),
            el("button", { class: "copy", onclick: () => copy(app.code) }, [document.createTextNode("Copy")])
          ]),
          el("pre", {}, [el("code", {}, [document.createTextNode(app.code)])])
        ])
      );
    }
    grid.append(el("div", { class: "card" }, cardChildren));
  });
}

function renderCompare() {
  const body = document.querySelector("#compare-table tbody");
  compareRows.forEach(r => {
    const tr = el("tr", {}, [
      el("td", {}, [document.createTextNode(r.scheme)]),
      el("td", {}, [document.createTextNode(r.aead)]),
      el("td", {}, [document.createTextNode(r.keyx)]),
      el("td", {}, [document.createTextNode(r.streaming)]),
      el("td", {}, [document.createTextNode(r.nonces)]),
      el("td", {}, [document.createTextNode(r.interop)]),
      el("td", {}, [document.createTextNode(r.note)]),
    ]);
    body.append(tr);
  });
}

function renderDocs() {
  const wrap = document.getElementById("docs-links");
  docsLinks.forEach(d => {
    wrap.append(el("a", { class: "btn ghost", href: d.href }, [document.createTextNode(d.label)]));
  });
}

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  renderSDKs();
  renderDemos();
  renderClients();
  renderCompare();
  renderDocs();
});
