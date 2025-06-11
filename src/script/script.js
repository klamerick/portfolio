// Modo escuro
const botaoTema = document.getElementById("botao-tema");
botaoTema?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Efeito de digitação
function digitarTexto(elementoId, texto, velocidade = 100) {
  let i = 0;
  const el = document.getElementById(elementoId);
  function digitar() {
    if (i < texto.length) {
      el.innerHTML += texto.charAt(i);
      i++;
      setTimeout(digitar, velocidade);
    }
  }
  digitar();
}
window.addEventListener("load", () => {
  alert("Bem-vindo ao meu portfólio!");
  digitarTexto("nome-digitado", "Renan Klamerick - Desenvolvedor Web 🚀");
});

// Scroll reveal
const secoes = document.querySelectorAll(".secao");
window.addEventListener("scroll", () => {
  secoes.forEach(secao => {
    const top = window.scrollY;
    const offset = secao.offsetTop - 400;
    if (top >= offset) {
      secao.classList.add("visivel");
    }
  });

  // Mostrar botão de topo
  const topoBtn = document.getElementById("topo");
  if (window.scrollY > 400) {
    topoBtn.style.display = "block";
  } else {
    topoBtn.style.display = "none";
  }
});

// Voltar ao topo
document.getElementById("topo")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
