/* ==========================================
   MENU RESPONSIVO
========================================== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


/* Fecha o menu ao clicar em um link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});



/* ==========================================
   TEMA CLARO / ESCURO
========================================== */

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");


/* Carrega o tema salvo */

if (savedTheme === "light") {

    body.classList.add("light-theme");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", event => {

    // Posição do botão na tela

    const rect =
        themeToggle.getBoundingClientRect();


    const x =
        rect.left + rect.width / 2;


    const y =
        rect.top + rect.height / 2;


    // Define a origem da onda

    document.documentElement.style.setProperty(
        "--wave-x",
        `${x}px`
    );

    document.documentElement.style.setProperty(
        "--wave-y",
        `${y}px`
    );


    // Função que realmente altera o tema

    const changeTheme = () => {

        body.classList.toggle("light-theme");


        if (
            body.classList.contains("light-theme")
        ) {

            localStorage.setItem(
                "theme",
                "light"
            );


            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem(
                "theme",
                "dark"
            );


            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    };


    // Verifica se o navegador suporta
    // View Transition API

    if (
        !document.startViewTransition
    ) {

        changeTheme();

        return;

    }


    // Executa a transição

    document.startViewTransition(
        changeTheme
    );

});



/* ==========================================
   FILTRO DE PROJETOS
========================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projects =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove a classe active */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        /* Adiciona active */

        button.classList.add("active");


        const filter =
            button.dataset.filter;


        projects.forEach(project => {

            const category =
                project.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                project.classList.remove("hide");

            } else {

                project.classList.add("hide");

            }

        });

    });

});



/* ==========================================
   MODAL DE PROJETOS
========================================== */

const modal =
    document.getElementById("project-modal");

const modalClose =
    document.getElementById("modal-close");

const modalTitle =
    document.getElementById("modal-title");

const modalDescription =
    document.getElementById("modal-description");

const projectButtons =
    document.querySelectorAll(".project-button");


projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const title =
            button.dataset.title;

        const description =
            button.dataset.description;


        modalTitle.textContent =
            title;

        modalDescription.textContent =
            description;


        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });

});


/* Fechar modal */

modalClose.addEventListener("click", closeModal);


function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow =
        "auto";

}


/* Fechar clicando fora */

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


/* Fechar com ESC */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("active")
    ) {

        closeModal();

    }

});



/* ==========================================
   BOTÃO VOLTAR AO TOPO
========================================== */

const scrollTopButton =
    document.getElementById("scroll-top");


scrollTopButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* ==========================================
   ANO AUTOMÁTICO
========================================== */

const year =
    document.getElementById("year");


year.textContent =
    new Date().getFullYear();



/* ==========================================
   ANIMAÇÃO DE DIGITAÇÃO
========================================== */

const typingElement =
    document.getElementById("typing-text");


const texts = [

    "Técnico em Informática",
    "Desenvolvedor Web",
    "Entusiasta de Tecnologia",
    "Criador de Soluções"

];


let textIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    const currentText =
        texts[textIndex];


    if (!deleting) {

        typingElement.textContent =
            currentText.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentText.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1800
            );

            return;

        }

    } else {

        typingElement.textContent =
            currentText.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            textIndex++;


            if (
                textIndex ===
                texts.length
            ) {

                textIndex = 0;

            }

        }

    }


    const speed =
        deleting ? 40 : 80;


    setTimeout(
        typeEffect,
        speed
    );

}


typeEffect();