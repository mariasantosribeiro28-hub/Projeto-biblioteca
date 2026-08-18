document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       DADOS
    ========================= */

    let livros =
        JSON.parse(localStorage.getItem("livrosCEEP")) || [];

    let alunos =
        JSON.parse(localStorage.getItem("alunosCEEP")) || [];

    let emprestimos =
        JSON.parse(localStorage.getItem("emprestimosCEEP")) || [];

    let historico =
        JSON.parse(localStorage.getItem("historicoCEEP")) || [];


    /* =========================
       TELAS
    ========================= */

    const telaInicial =
        document.getElementById("telaInicial");

    const telaLogin =
        document.getElementById("telaLogin");

    const dashboard =
        document.getElementById("dashboard");


    /* =========================
       BOTÃO COMEÇAR
    ========================= */

    const btnComecar =
        document.getElementById("btnComecar");

    btnComecar.addEventListener("click", function () {

        telaInicial.style.display = "none";

        telaLogin.style.display = "flex";

    });


    /* =========================
       BOTÃO VOLTAR
    ========================= */

    const btnVoltar =
        document.getElementById("btnVoltar");

    btnVoltar.addEventListener("click", function () {

        telaLogin.style.display = "none";

        telaInicial.style.display = "flex";

    });


    /* =========================
       LOGIN
    ========================= */

    const formLogin =
        document.getElementById("formLogin");

    formLogin.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome =
            document
                .getElementById("nomeUsuario")
                .value
                .trim();

        if (nome === "") {

            alert("Digite seu nome.");

            return;

        }


        document
            .getElementById("nomeLogado")
            .textContent = nome;


        document
            .getElementById("avatarUsuario")
            .textContent =
            nome.charAt(0).toUpperCase();


        telaLogin.style.display = "none";

        dashboard.style.display = "block";


        mostrarPagina("paginaDashboard");

        atualizarTudo();

    });


    /* =========================
       NAVEGAÇÃO
    ========================= */

    const menus = {

        menuDashboard: "paginaDashboard",

        menuLivros: "paginaLivros",

        menuAlunos: "paginaAlunos",

        menuEmprestimos: "paginaEmprestimos",

        menuDevolucoes: "paginaDevolucoes",

        menuAtrasados: "paginaAtrasados",

        menuHistorico: "paginaHistorico",

        menuRelatorios: "paginaRelatorios"

    };


    Object.keys(menus).forEach(function (menuId) {

        document
            .getElementById(menuId)
            .addEventListener("click", function () {

                mostrarPagina(
                    menus[menuId]
                );

                atualizarTudo();

            });

    });


    function mostrarPagina(idPagina) {

        document
            .querySelectorAll(".pagina")
            .forEach(function (pagina) {

                pagina.style.display = "none";

            });


        document
            .getElementById(idPagina)
            .style.display = "block";


        Object.keys(menus).forEach(function (menuId) {

            document
                .getElementById(menuId)
                .classList.remove("ativo");

        });


        Object.keys(menus).forEach(function (menuId) {

            if (menus[menuId] === idPagina) {

                document
                    .getElementById(menuId)
                    .classList.add("ativo");

            }

        });

    }


    /* =========================
       CADASTRAR LIVRO
    ========================= */

    document
        .getElementById("btnCadastrarLivro")
        .addEventListener("click", function () {

            const titulo =
                document
                    .getElementById("tituloLivro")
                    .value
                    .trim();

            const autor =
                document
                    .getElementById("autorLivro")
                    .value
                    .trim();


            if (titulo === "" || autor === "") {

                alert(
                    "Preencha o título e o autor."
                );

                return;

            }


            livros.push({

                id: Date.now(),

                titulo: titulo,

                autor: autor

            });


            salvarDados();


            document
                .getElementById("tituloLivro")
                .value = "";


            document
                .getElementById("autorLivro")
                .value = "";


            atualizarTudo();


            alert(
                "Livro cadastrado com sucesso!"
            );

        });


    function mostrarLivros() {

        const lista =
            document.getElementById("listaLivros");

        lista.innerHTML = "";


        if (livros.length === 0) {

            lista.innerHTML =
                "<p>Nenhum livro cadastrado ainda.</p>";

            return;

        }


        livros.forEach(function (livro) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${livro.titulo}
                    </strong>

                    <span>
                        Autor: ${livro.autor}
                    </span>

                </div>

                <button
                    class="btn-excluir"
                    data-id="${livro.id}">

                    Excluir

                </button>

            `;


            item
                .querySelector(".btn-excluir")
                .addEventListener("click", function () {

                    excluirLivro(livro.id);

                });


            lista.appendChild(item);

        });

    }


    function excluirLivro(id) {

        const emprestado =
            emprestimos.some(function (emprestimo) {

                return emprestimo.livroId === id;

            });


        if (emprestado) {

            alert(
                "Este livro está emprestado e não pode ser excluído."
            );

            return;

        }


        if (
            !confirm(
                "Deseja excluir este livro?"
            )
        ) {

            return;

        }


        livros =
            livros.filter(function (livro) {

                return livro.id !== id;

            });


        salvarDados();

        atualizarTudo();

    }


    /* =========================
       CADASTRAR ALUNO
    ========================= */

    document
        .getElementById("btnCadastrarAluno")
        .addEventListener("click", function () {

            const nome =
                document
                    .getElementById("nomeAluno")
                    .value
                    .trim();

            const matricula =
                document
                    .getElementById("matriculaAluno")
                    .value
                    .trim();


            if (nome === "" || matricula === "") {

                alert(
                    "Preencha o nome e a matrícula."
                );

                return;

            }


            alunos.push({

                id: Date.now(),

                nome: nome,

                matricula: matricula

            });


            salvarDados();


            document
                .getElementById("nomeAluno")
                .value = "";


            document
                .getElementById("matriculaAluno")
                .value = "";


            atualizarTudo();


            alert(
                "Aluno cadastrado com sucesso!"
            );

        });


    function mostrarAlunos() {

        const lista =
            document.getElementById("listaAlunos");

        lista.innerHTML = "";


        if (alunos.length === 0) {

            lista.innerHTML =
                "<p>Nenhum aluno cadastrado ainda.</p>";

            return;

        }


        alunos.forEach(function (aluno) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${aluno.nome}
                    </strong>

                    <span>
                        Matrícula: ${aluno.matricula}
                    </span>

                </div>

                <button
                    class="btn-excluir">

                    Excluir

                </button>

            `;


            item
                .querySelector(".btn-excluir")
                .addEventListener("click", function () {

                    excluirAluno(aluno.id);

                });


            lista.appendChild(item);

        });

    }


    function excluirAluno(id) {

        const emprestado =
            emprestimos.some(function (emprestimo) {

                return emprestimo.alunoId === id;

            });


        if (emprestado) {

            alert(
                "Este aluno possui um empréstimo ativo."
            );

            return;

        }


        if (
            !confirm(
                "Deseja excluir este aluno?"
            )
        ) {

            return;

        }


        alunos =
            alunos.filter(function (aluno) {

                return aluno.id !== id;

            });


        salvarDados();

        atualizarTudo();

    }


    /* =========================
       SELECTS
    ========================= */

    function atualizarSelects() {

        const selectAluno =
            document.getElementById("selectAluno");

        const selectLivro =
            document.getElementById("selectLivro");


        selectAluno.innerHTML =
            '<option value="">Selecione um aluno</option>';


        selectLivro.innerHTML =
            '<option value="">Selecione um livro</option>';


        alunos.forEach(function (aluno) {

            const option =
                document.createElement("option");

            option.value = aluno.id;

            option.textContent =
                aluno.nome +
                " - " +
                aluno.matricula;

            selectAluno.appendChild(option);

        });


        livros.forEach(function (livro) {

            const emprestado =
                emprestimos.some(function (emprestimo) {

                    return emprestimo.livroId === livro.id;

                });


            if (!emprestado) {

                const option =
                    document.createElement("option");

                option.value = livro.id;

                option.textContent =
                    livro.titulo +
                    " - " +
                    livro.autor;

                selectLivro.appendChild(option);

            }

        });

    }


    /* =========================
       EMPRÉSTIMO
    ========================= */

    document
        .getElementById("btnCadastrarEmprestimo")
        .addEventListener("click", function () {

            const alunoId =
                Number(
                    document.getElementById("selectAluno").value
                );

            const livroId =
                Number(
                    document.getElementById("selectLivro").value
                );

            const dataDevolucao =
                document
                    .getElementById("dataDevolucao")
                    .value;


            if (
                !alunoId ||
                !livroId ||
                !dataDevolucao
            ) {

                alert(
                    "Preencha todos os campos."
                );

                return;

            }


            const aluno =
                alunos.find(function (item) {

                    return item.id === alunoId;

                });


            const livro =
                livros.find(function (item) {

                    return item.id === livroId;

                });


            emprestimos.push({

                id: Date.now(),

                alunoId: alunoId,

                alunoNome: aluno.nome,

                livroId: livroId,

                livroTitulo: livro.titulo,

                dataEmprestimo:
                    new Date()
                        .toISOString()
                        .split("T")[0],

                dataDevolucao:
                    dataDevolucao

            });


            salvarDados();

            atualizarTudo();


            document
                .getElementById("selectAluno")
                .value = "";


            document
                .getElementById("selectLivro")
                .value = "";


            document
                .getElementById("dataDevolucao")
                .value = "";


            alert(
                "Empréstimo registrado com sucesso!"
            );

        });


    function mostrarEmprestimos() {

        const lista =
            document.getElementById("listaEmprestimos");

        lista.innerHTML = "";


        if (emprestimos.length === 0) {

            lista.innerHTML =
                "<p>Nenhum empréstimo ativo.</p>";

            return;

        }


        emprestimos.forEach(function (emprestimo) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${emprestimo.livroTitulo}
                    </strong>

                    <span>
                        Aluno: ${emprestimo.alunoNome}
                    </span>

                    <span>
                        Devolução:
                        ${formatarData(emprestimo.dataDevolucao)}
                    </span>

                </div>

            `;


            lista.appendChild(item);

        });

    }


    /* =========================
       DEVOLUÇÕES
    ========================= */

    function mostrarDevolucoes() {

        const lista =
            document.getElementById("listaDevolucoes");

        lista.innerHTML = "";


        if (emprestimos.length === 0) {

            lista.innerHTML =
                "<p>Nenhum livro para devolver.</p>";

            return;

        }


        emprestimos.forEach(function (emprestimo) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${emprestimo.livroTitulo}
                    </strong>

                    <span>
                        Aluno: ${emprestimo.alunoNome}
                    </span>

                    <span>
                        Data prevista:
                        ${formatarData(emprestimo.dataDevolucao)}
                    </span>

                </div>

                <button
                    class="btn-acao">

                    Devolver

                </button>

            `;


            item
                .querySelector(".btn-acao")
                .addEventListener("click", function () {

                    devolverLivro(emprestimo.id);

                });


            lista.appendChild(item);

        });

    }


    function devolverLivro(id) {

        const emprestimo =
            emprestimos.find(function (item) {

                return item.id === id;

            });


        if (!emprestimo) {
            return;
        }


        historico.push({

            id: Date.now(),

            alunoNome:
                emprestimo.alunoNome,

            livroTitulo:
                emprestimo.livroTitulo,

            dataEmprestimo:
                emprestimo.dataEmprestimo,

            dataDevolucao:
                emprestimo.dataDevolucao,

            dataDevolucaoReal:
                new Date()
                    .toISOString()
                    .split("T")[0]

        });


        emprestimos =
            emprestimos.filter(function (item) {

                return item.id !== id;

            });


        salvarDados();

        atualizarTudo();


        alert(
            "Livro devolvido com sucesso!"
        );

    }


    /* =========================
       ATRASADOS
    ========================= */

    function estaAtrasado(emprestimo) {

        const hoje =
            new Date();

        hoje.setHours(0, 0, 0, 0);


        const data =
            new Date(
                emprestimo.dataDevolucao +
                "T00:00:00"
            );


        return data < hoje;

    }


    function mostrarAtrasados() {

        const lista =
            document.getElementById("listaAtrasados");

        lista.innerHTML = "";


        const atrasados =
            emprestimos.filter(
                estaAtrasado
            );


        if (atrasados.length === 0) {

            lista.innerHTML =
                "<p>Nenhum livro em atraso. ✅</p>";

            return;

        }


        atrasados.forEach(function (emprestimo) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong>
                        ⚠️ ${emprestimo.livroTitulo}
                    </strong>

                    <span>
                        Aluno: ${emprestimo.alunoNome}
                    </span>

                    <span>
                        Deveria devolver:
                        ${formatarData(emprestimo.dataDevolucao)}
                    </span>

                </div>

                <button
                    class="btn-acao">

                    Registrar devolução

                </button>

            `;


            item
                .querySelector(".btn-acao")
                .addEventListener("click", function () {

                    devolverLivro(emprestimo.id);

                });


            lista.appendChild(item);

        });

    }


    /* =========================
       HISTÓRICO
    ========================= */

    function mostrarHistorico() {

        const lista =
            document.getElementById("listaHistorico");

        lista.innerHTML = "";


        if (historico.length === 0) {

            lista.innerHTML =
                "<p>Nenhuma devolução registrada.</p>";

            return;

        }


        [...historico]
            .reverse()
            .forEach(function (registro) {

                const item =
                    document.createElement("div");

                item.className = "item";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${registro.livroTitulo}
                        </strong>

                        <span>
                            Aluno:
                            ${registro.alunoNome}
                        </span>

                        <span>
                            Emprestado:
                            ${formatarData(registro.dataEmprestimo)}
                        </span>

                        <span>
                            Devolvido:
                            ${formatarData(registro.dataDevolucaoReal)}
                        </span>

                    </div>

                `;


                lista.appendChild(item);

            });

    }


    /* =========================
       DASHBOARD
    ========================= */

    function atualizarDashboard() {

        const atrasados =
            emprestimos.filter(
                estaAtrasado
            ).length;


        document
            .getElementById("totalLivros")
            .textContent =
            livros.length;


        document
            .getElementById("totalAlunos")
            .textContent =
            alunos.length;


        document
            .getElementById("totalEmprestados")
            .textContent =
            emprestimos.length;


        document
            .getElementById("totalAtrasados")
            .textContent =
            atrasados;


        mostrarRecentes();

        mostrarDevolucoesProximas();

    }


    function mostrarRecentes() {

        const lista =
            document.getElementById(
                "emprestimosRecentes"
            );

        lista.innerHTML = "";


        if (emprestimos.length === 0) {

            lista.innerHTML =
                "<p>Nenhum empréstimo registrado.</p>";

            return;

        }


        emprestimos
            .slice(-5)
            .reverse()
            .forEach(function (emprestimo) {

                const item =
                    document.createElement("div");

                item.className = "item";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${emprestimo.livroTitulo}
                        </strong>

                        <span>
                            ${emprestimo.alunoNome}
                        </span>

                    </div>

                    <span>
                        ${formatarData(emprestimo.dataDevolucao)}
                    </span>

                `;


                lista.appendChild(item);

            });

    }


    function mostrarDevolucoesProximas() {

        const lista =
            document.getElementById(
                "devolucoesProximas"
            );

        lista.innerHTML = "";


        const proximas =
            emprestimos
                .filter(function (emprestimo) {

                    return !estaAtrasado(emprestimo);

                })
                .slice(0, 5);


        if (proximas.length === 0) {

            lista.innerHTML =
                "<p>Nenhuma devolução próxima.</p>";

            return;

        }


        proximas.forEach(function (emprestimo) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${emprestimo.livroTitulo}
                    </strong>

                    <span>
                        ${emprestimo.alunoNome}
                    </span>

                </div>

                <span>
                    ${formatarData(emprestimo.dataDevolucao)}
                </span>

            `;


            lista.appendChild(item);

        });

    }


    /* =========================
       RELATÓRIOS
    ========================= */

    function atualizarRelatorios() {

        const atrasados =
            emprestimos.filter(
                estaAtrasado
            ).length;


        document
            .getElementById("relatorioLivros")
            .textContent =
            livros.length;


        document
            .getElementById("relatorioAlunos")
            .textContent =
            alunos.length;


        document
            .getElementById("relatorioEmprestimos")
            .textContent =
            emprestimos.length;


        document
            .getElementById("relatorioDevolucoes")
            .textContent =
            historico.length;


        document
            .getElementById("relatorioAtrasados")
            .textContent =
            atrasados;

    }


    /* =========================
       SALVAR
    ========================= */

    function salvarDados() {

        localStorage.setItem(
            "livrosCEEP",
            JSON.stringify(livros)
        );

        localStorage.setItem(
            "alunosCEEP",
            JSON.stringify(alunos)
        );

        localStorage.setItem(
            "emprestimosCEEP",
            JSON.stringify(emprestimos)
        );

        localStorage.setItem(
            "historicoCEEP",
            JSON.stringify(historico)
        );

    }


    /* =========================
       DATA
    ========================= */

    function formatarData(data) {

        if (!data) {
            return "-";
        }


        const partes =
            data.split("-");


        if (partes.length !== 3) {
            return data;
        }


        return (
            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0]
        );

    }


    /* =========================
       ATUALIZAR TUDO
    ========================= */

    function atualizarTudo() {

        mostrarLivros();

        mostrarAlunos();

        atualizarSelects();

        mostrarEmprestimos();

        mostrarDevolucoes();

        mostrarAtrasados();

        mostrarHistorico();

        atualizarDashboard();

        atualizarRelatorios();

    }


    /* =========================
       INÍCIO
    ========================= */

    mostrarPagina("paginaDashboard");

    atualizarTudo();

});