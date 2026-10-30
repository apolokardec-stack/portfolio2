/* =========================================
   1. MENU HAMBÚRGUER
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll("#nav-links a");

function fecharMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
}

menuToggle.addEventListener("click", function () {
    const menuEstaAberto = menuToggle.getAttribute("aria-expanded") === "true";

    if (menuEstaAberto) {
        fecharMenu();
    } else {
        navLinks.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Fechar menu de navegação");
    }
});

// Fecha o menu quando uma opção é selecionada.
navItems.forEach(function (item) {
    item.addEventListener("click", fecharMenu);
});

// Fecha o menu com a tecla Escape.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        fecharMenu();
        menuToggle.focus();
    }
});

// Fecha o menu se a tela passar para o tamanho de computador.
window.addEventListener("resize", function () {
    if (window.innerWidth > 700) {
        fecharMenu();
    }
});


/* =========================================
   2. SAUDAÇÃO DINÂMICA
========================================= */

const greeting = document.getElementById("greeting");

function atualizarSaudacao() {
    const horaAtual = new Date().getHours();

    let mensagem;

    if (horaAtual >= 5 && horaAtual < 12) {
        mensagem = "Bom dia! Seja bem-vindo(a).";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        mensagem = "Boa tarde! Seja bem-vindo(a).";
    } else {
        mensagem = "Boa noite! Seja bem-vindo(a).";
    }

    greeting.textContent = mensagem;
}

atualizarSaudacao();


/* =========================================
   3. MODO CLARO E ESCURO
========================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const root = document.documentElement;

function aplicarTema(tema) {
    root.dataset.theme = tema;

    const modoClaroAtivo = tema === "light";

    themeIcon.textContent = modoClaroAtivo ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        modoClaroAtivo ? "Ativar modo escuro" : "Ativar modo claro"
    );

    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (themeColor) {
        themeColor.setAttribute(
            "content",
            modoClaroAtivo ? "#f5f7fc" : "#0b1020"
        );
    }
}

// Verifica se existe um tema salvo no navegador.
let temaSalvo = null;

try {
    temaSalvo = localStorage.getItem("portfolio-tema");
} catch (error) {
    // O site continua funcionando mesmo se o armazenamento estiver indisponível.
}

// Usa o tema salvo ou, por padrão, o modo escuro.
aplicarTema(temaSalvo === "light" ? "light" : "dark");

themeToggle.addEventListener("click", function () {
    const temaAtual = root.dataset.theme;
    const novoTema = temaAtual === "dark" ? "light" : "dark";

    aplicarTema(novoTema);

    try {
        localStorage.setItem("portfolio-tema", novoTema);
    } catch (error) {
        // A troca de tema continua funcionando sem salvar a preferência.
    }
});


/* =========================================
   4. IMAGEM DO PERFIL
========================================= */

const avatarImage = document.getElementById("avatar-image");
const avatarPlaceholder = document.getElementById("avatar-placeholder");

function mostrarAvatar() {
    avatarImage.hidden = false;
    avatarPlaceholder.style.display = "none";
}

function mostrarAvatarAlternativo() {
    avatarImage.hidden = true;
    avatarPlaceholder.style.display = "grid";
}

// Exibe uma alternativa caso a imagem não exista ou não carregue.
avatarImage.addEventListener("error", mostrarAvatarAlternativo);

avatarImage.addEventListener("load", mostrarAvatar);

// Verifica se a imagem já foi carregada pelo navegador.
if (avatarImage.complete) {
    if (avatarImage.naturalWidth > 0) {
        mostrarAvatar();
    } else {
        mostrarAvatarAlternativo();
    }
}


/* =========================================
   5. VALIDAÇÃO DO FORMULÁRIO
========================================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const mensagemInput = document.getElementById("mensagem");
const consentimentoInput = document.getElementById("consentimento");

function mostrarStatus(mensagem, tipo) {
    formStatus.textContent = mensagem;
    formStatus.className = "form-status " + tipo;
}

contactForm.addEventListener("submit", function (event) {
    // Impede o envio e o recarregamento da página.
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    // Verifica se o nome foi preenchido corretamente.
    if (nome.length < 2 || nome.length > 80) {
        mostrarStatus(
            "Digite um nome com pelo menos 2 caracteres.",
            "error"
        );

        nomeInput.focus();
        return;
    }

    // Verifica o formato do e-mail.
    if (
        email.length > 254 ||
        !emailInput.validity.valid ||
        email === ""
    ) {
        mostrarStatus(
            "Digite um endereço de e-mail válido.",
            "error"
        );

        emailInput.focus();
        return;
    }

    // Verifica a mensagem.
    if (mensagem.length < 10 || mensagem.length > 2000) {
        mostrarStatus(
            "A mensagem deve ter entre 10 e 2000 caracteres.",
            "error"
        );

        mensagemInput.focus();
        return;
    }

    // Verifica o consentimento.
    if (!consentimentoInput.checked) {
        mostrarStatus(
            "Marque o consentimento antes de continuar.",
            "error"
        );

        consentimentoInput.focus();
        return;
    }

    // A validação foi concluída.
    mostrarStatus(
        "Validação concluída! O formulário é demonstrativo e não envia mensagens. Nenhum dado foi armazenado.",
        "success"
    );

    // Limpa os campos após a validação.
    contactForm.reset();
});


/* =========================================
   6. ANO AUTOMÁTICO NO RODAPÉ
========================================= */

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();