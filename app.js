// ==========================================
// BIBLIOTECA DO CEEP
// app.js - Sistema completo
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // BANCO DE DADOS - LOCALSTORAGE
    // ==========================================

    let db = {
        usuarios: JSON.parse(localStorage.getItem("ceep_usuarios")) || [],
        livros: JSON.parse(localStorage.getItem("ceep_livros")) || [],
        alunos: JSON.parse(localStorage.getItem("ceep_alunos")) || [],
        emprestimos: JSON.parse(localStorage.getItem("ceep_emprestimos")) || [],
        historico: JSON.parse(localStorage.getItem("ceep_historico")) || [],
        usuarioLogado: JSON.parse(localStorage.getItem("ceep_usuarioLogado")) || null
    };


    // ==========================================
    // SALVAR BANCO
    // ==========================================

    function salvarDB() {

        localStorage.setItem(
            "ceep_usuarios",
            JSON.stringify(db.usuarios)
        );

        localStorage.setItem(
            "ceep_livros",
            JSON.stringify(db.livros)
        );

        localStorage.setItem(
            "ceep_alunos",
            JSON.stringify(db.alunos)
        );

        localStorage.setItem(
            "ceep_emprestimos",
            JSON.stringify(db.emprestimos)
        );

        localStorage.setItem(
            "ceep_historico",
            JSON.stringify(db.historico)
        );

        localStorage.setItem(
            "ceep_usuarioLogado",
            JSON.stringify(db.usuarioLogado)
        );
    }


    // ==========================================
    // ELEMENTOS DAS TELAS
    // ==========================================

    const telaInicial =
        document.getElementById("telaInicial");

    const telaLogin =
        document.getElementById("telaLogin");

    const dashboard =
        document.getElementById("dashboard");


    // ==========================================
    // BOTÕES
    // ==========================================

    const btnComecar =
        document.getElementById("btnComecar");

    const btnVoltar =
        document.getElementById("btnVoltar");

    const formLogin =
        document.getElementById("formLogin");


    // ==========================================
    // USUÁRIO
    // ==========================================

    const avatarUsuario =
        document.getElementById("avatarUsuario");

    const nomeLogado =
        document.getElementById("nomeLogado");


    // ==========================================
    // MENUS
    // ==========================================

    const menuLinks = {

        paginaDashboard:
            document.getElementById("menuDashboard"),

        paginaLivros:
            document.getElementById("menuLivros"),

        paginaAlunos:
            document.getElementById("menuAlunos"),

        paginaEmprestimos:
            document.getElementById("menuEmprestimos"),

        paginaDevolucoes:
            document.getElementById("menuDevolucoes"),

        paginaAtrasados:
            document.getElementById("menuAtrasados"),

        paginaHistorico:
            document.getElementById("menuHistorico"),

        paginaRelatorios:
            document.getElementById("menuRelatorios")
    };


    // ==========================================
    // PÁGINAS
    // ==========================================

    const paginas =
        document.querySelectorAll(".pagina");


    // ==========================================
    // LIVROS
    // ==========================================

    const tituloLivro =
        document.getElementById("tituloLivro");

    const autorLivro =
        document.getElementById("autorLivro");

    const btnCadastrarLivro =
        document.getElementById("btnCadastrarLivro");

    const listaLivros =
        document.getElementById("listaLivros");


    // ==========================================
    // ALUNOS
    // ==========================================

    const nomeAluno =
        document.getElementById("nomeAluno");

    const matriculaAluno =
        document.getElementById("matriculaAluno");

    const btnCadastrarAluno =
        document.getElementById("btnCadastrarAluno");

    const listaAlunos =
        document.getElementById("listaAlunos");


    // ==========================================
    // EMPRÉSTIMOS
    // ==========================================

    const selectAluno =
        document.getElementById("selectAluno");

    const selectLivro =
        document.getElementById("selectLivro");

    const dataDevolucao =
        document.getElementById("dataDevolucao");

    const btnCadastrarEmprestimo =
        document.getElementById("btnCadastrarEmprestimo");

    const listaEmprestimos =
        document.getElementById("listaEmprestimos");


    // ==========================================
    // DEVOLUÇÕES / ATRASADOS / HISTÓRICO
    // ==========================================

    const listaDevolucoes =
        document.getElementById("listaDevolucoes");

    const listaAtrasados =
        document.getElementById("listaAtrasados");

    const listaHistorico =
        document.getElementById("listaHistorico");


    // ==========================================
    // DASHBOARD
    // ==========================================

    const totalLivros =
        document.getElementById("totalLivros");

    const totalAlunos =
        document.getElementById("totalAlunos");

    const totalEmprestados =
        document.getElementById("totalEmprestados");

    const totalAtrasados =
        document.getElementById("totalAtrasados");

    const emprestimosRecentes =
        document.getElementById("emprestimosRecentes");

    const devolucoesProximas =
        document.getElementById("devolucoesProximas");


    // ==========================================
    // RELATÓRIOS
    // ==========================================

    const relatorioLivros =
        document.getElementById("relatorioLivros");

    const relatorioAlunos =
        document.getElementById("relatorioAlunos");

    const relatorioEmprestimos =
        document.getElementById("relatorioEmprestimos");

    const relatorioDevolucoes =
        document.getElementById("relatorioDevolucoes");

    const relatorioAtrasados =
        document.getElementById("relatorioAtrasados");


    // ==========================================
    // FUNÇÃO PARA FORMATAR DATA
    // ==========================================

    function formatarData(data) {

        if (!data) {
            return "-";
        }

        const partes = data.split("-");

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


    // ==========================================
    // DATA DE HOJE
    // ==========================================

    function obterDataHoje() {

        const hoje = new Date();

        const ano =
            hoje.getFullYear();

        const mes =
            String(hoje.getMonth() + 1)
                .padStart(2, "0");

        const dia =
            String(hoje.getDate())
                .padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }


    // ==========================================
    // VERIFICAR SE ESTÁ ATRASADO
    // ==========================================

    function estaAtrasado(emprestimo) {

        if (!emprestimo) {
            return false;
        }

        if (emprestimo.status !== "ativo") {
            return false;
        }

        return (
            emprestimo.dataDevolucao <
            obterDataHoje()
        );
    }


    // ==========================================
    // MOSTRAR TELA
    // ==========================================

    function mostrarTela(tela) {

        telaInicial.style.display = "none";
        telaLogin.style.display = "none";
        dashboard.style.display = "none";

        if (tela === "inicial") {

            telaInicial.style.display = "flex";

        }

        if (tela === "login") {

            telaLogin.style.display = "flex";

        }

        if (tela === "dashboard") {

            dashboard.style.display = "block";

            navegarPara("paginaDashboard");

            atualizarTudo();

        }
    }


    // ==========================================
    // NAVEGAR ENTRE PÁGINAS
    // ==========================================

    function navegarPara(idPagina) {

        paginas.forEach(function (pagina) {

            pagina.style.display = "none";

        });


        Object.keys(menuLinks).forEach(function (id) {

            if (menuLinks[id]) {

                menuLinks[id]
                    .classList
                    .remove("ativo");

            }

        });


        const pagina =
            document.getElementById(idPagina);

        if (pagina) {

            pagina.style.display = "block";

        }


        if (menuLinks[idPagina]) {

            menuLinks[idPagina]
                .classList
                .add("ativo");

        }


        atualizarTudo();
    }


    // ==========================================
    // EVENTOS DOS MENUS
    // ==========================================

    Object.keys(menuLinks).forEach(function (idPagina) {

        if (!menuLinks[idPagina]) {
            return;
        }

        menuLinks[idPagina]
            .addEventListener("click", function (event) {

                event.preventDefault();

                navegarPara(idPagina);

            });

    });


    // ==========================================
    // BOTÃO COMEÇAR
    // ==========================================

    btnComecar.addEventListener("click", function () {

        mostrarTela("login");

    });


    // ==========================================
    // BOTÃO VOLTAR
    // ==========================================

    btnVoltar.addEventListener("click", function () {

        mostrarTela("inicial");

    });


    // ==========================================
    // LOGIN
    // ==========================================

    formLogin.addEventListener("submit", function (event) {

        event.preventDefault();


        const nome =
            document
                .getElementById("nomeUsuario")
                .value
                .trim();

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const senha =
            document
                .getElementById("senha")
                .value
                .trim();


        if (!nome) {

            alert("Digite seu nome.");

            return;

        }


        if (!email) {

            alert("Digite seu e-mail.");

            return;

        }


        if (!senha) {

            alert("Digite sua senha.");

            return;

        }


        db.usuarioLogado = {

            nome: nome,

            email: email

        };


        const usuarioExistente =
            db.usuarios.find(function (usuario) {

                return usuario.email === email;

            });


        if (!usuarioExistente) {

            db.usuarios.push({

                id: Date.now(),

                nome: nome,

                email: email

            });

        }


        salvarDB();


        nomeLogado.textContent =
            nome;

        avatarUsuario.textContent =
            nome
                .charAt(0)
                .toUpperCase();


        mostrarTela("dashboard");

    });


    // ==========================================
    // CADASTRAR LIVRO
    // ==========================================

    btnCadastrarLivro.addEventListener(
        "click",
        function () {

            const titulo =
                tituloLivro.value.trim();

            const autor =
                autorLivro.value.trim();


            if (!titulo || !autor) {

                alert(
                    "Por favor, preencha o título e o autor do livro."
                );

                return;

            }


            const livroExistente =
                db.livros.some(function (livro) {

                    return (
                        livro.titulo.toLowerCase() ===
                        titulo.toLowerCase() &&
                        livro.autor.toLowerCase() ===
                        autor.toLowerCase()
                    );

                });


            if (livroExistente) {

                alert(
                    "Esse livro já está cadastrado."
                );

                return;

            }


            const novoLivro = {

                id: Date.now(),

                titulo: titulo,

                autor: autor,

                status: "disponivel"

            };


            db.livros.push(novoLivro);


            salvarDB();


            tituloLivro.value = "";

            autorLivro.value = "";


            atualizarTudo();


            alert(
                "Livro cadastrado com sucesso!"
            );

        }
    );


    // ==========================================
    // EXCLUIR LIVRO
    // ==========================================

    function excluirLivro(id) {

        const livroEmprestado =
            db.emprestimos.some(function (emprestimo) {

                return (
                    emprestimo.livroId === id &&
                    emprestimo.status === "ativo"
                );

            });


        if (livroEmprestado) {

            alert(
                "Este livro está emprestado e não pode ser excluído."
            );

            return;

        }


        const confirmar =
            confirm(
                "Deseja realmente excluir este livro?"
            );


        if (!confirmar) {
            return;
        }


        db.livros =
            db.livros.filter(function (livro) {

                return livro.id !== id;

            });


        salvarDB();

        atualizarTudo();

    }


    // ==========================================
    // DISPONIBILIZAR FUNÇÃO PARA O HTML
    // ==========================================

    window.excluirLivro =
        excluirLivro;


    // ==========================================
    // RENDERIZAR LIVROS
    // ==========================================

    function renderLivros() {

        listaLivros.innerHTML = "";


        if (db.livros.length === 0) {

            listaLivros.innerHTML =
                "<p>Nenhum livro cadastrado.</p>";

            return;

        }


        db.livros.forEach(function (livro) {

            const item =
                document.createElement("div");

            item.className = "item";


            const statusTexto =
                livro.status === "emprestado"
                    ? "Emprestado"
                    : "Disponível";


            const statusCor =
                livro.status === "emprestado"
                    ? "#e99129"
                    : "#19a974";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escaparHTML(livro.titulo)}
                    </strong>

                    <span>
                        Autor:
                        ${escaparHTML(livro.autor)}
                    </span>

                    <span>
                        Status:
                        <b style="color:${statusCor}">
                            ${statusTexto}
                        </b>
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
                .addEventListener(
                    "click",
                    function () {

                        excluirLivro(livro.id);

                    }
                );


            listaLivros.appendChild(item);

        });

    }


    // ==========================================
    // CADASTRAR ALUNO
    // ==========================================

    btnCadastrarAluno.addEventListener(
        "click",
        function () {

            const nome =
                nomeAluno.value.trim();

            const matricula =
                matriculaAluno.value.trim();


            if (!nome || !matricula) {

                alert(
                    "Por favor, preencha o nome e a matrícula do aluno."
                );

                return;

            }


            const matriculaExistente =
                db.alunos.some(function (aluno) {

                    return (
                        aluno.matricula.toLowerCase() ===
                        matricula.toLowerCase()
                    );

                });


            if (matriculaExistente) {

                alert(
                    "Essa matrícula já está cadastrada."
                );

                return;

            }


            const novoAluno = {

                id: Date.now(),

                nome: nome,

                matricula: matricula

            };


            db.alunos.push(novoAluno);


            salvarDB();


            nomeAluno.value = "";

            matriculaAluno.value = "";


            atualizarTudo();


            alert(
                "Aluno cadastrado com sucesso!"
            );

        }
    );


    // ==========================================
    // EXCLUIR ALUNO
    // ==========================================

    function excluirAluno(id) {

        const alunoEmprestado =
            db.emprestimos.some(function (emprestimo) {

                return (
                    emprestimo.alunoId === id &&
                    emprestimo.status === "ativo"
                );

            });


        if (alunoEmprestado) {

            alert(
                "Este aluno possui um empréstimo ativo e não pode ser excluído."
            );

            return;

        }


        const confirmar =
            confirm(
                "Deseja realmente excluir este aluno?"
            );


        if (!confirmar) {
            return;
        }


        db.alunos =
            db.alunos.filter(function (aluno) {

                return aluno.id !== id;

            });


        salvarDB();

        atualizarTudo();

    }


    window.excluirAluno =
        excluirAluno;


    // ==========================================
    // RENDERIZAR ALUNOS
    // ==========================================

    function renderAlunos() {

        listaAlunos.innerHTML = "";


        if (db.alunos.length === 0) {

            listaAlunos.innerHTML =
                "<p>Nenhum aluno cadastrado.</p>";

            return;

        }


        db.alunos.forEach(function (aluno) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escaparHTML(aluno.nome)}
                    </strong>

                    <span>
                        Matrícula:
                        ${escaparHTML(aluno.matricula)}
                    </span>

                </div>

                <button
                    class="btn-excluir"
                    data-id="${aluno.id}">

                    Excluir

                </button>

            `;


            item
                .querySelector(".btn-excluir")
                .addEventListener(
                    "click",
                    function () {

                        excluirAluno(aluno.id);

                    }
                );


            listaAlunos.appendChild(item);

        });

    }


    // ==========================================
    // ATUALIZAR SELECTS
    // ==========================================

    function renderSelects() {

        selectAluno.innerHTML =
            `
            <option value="">
                Selecione um aluno
            </option>
            `;


        db.alunos.forEach(function (aluno) {

            const option =
                document.createElement("option");

            option.value =
                aluno.id;

            option.textContent =
                aluno.nome +
                " - " +
                aluno.matricula;

            selectAluno.appendChild(option);

        });


        selectLivro.innerHTML =
            `
            <option value="">
                Selecione um livro
            </option>
            `;


        db.livros
            .filter(function (livro) {

                return livro.status === "disponivel";

            })
            .forEach(function (livro) {

                const option =
                    document.createElement("option");

                option.value =
                    livro.id;

                option.textContent =
                    livro.titulo +
                    " - " +
                    livro.autor;

                selectLivro.appendChild(option);

            });

    }


    // ==========================================
    // REGISTRAR EMPRÉSTIMO
    // ==========================================

    btnCadastrarEmprestimo.addEventListener(
        "click",
        function () {

            const alunoId =
                Number(selectAluno.value);

            const livroId =
                Number(selectLivro.value);

            const dataDev =
                dataDevolucao.value;


            if (
                !alunoId ||
                !livroId ||
                !dataDev
            ) {

                alert(
                    "Selecione o aluno, o livro e a data de devolução."
                );

                return;

            }


            const aluno =
                db.alunos.find(function (item) {

                    return item.id === alunoId;

                });


            const livro =
                db.livros.find(function (item) {

                    return item.id === livroId;

                });


            if (!aluno || !livro) {

                alert(
                    "Aluno ou livro não encontrado."
                );

                return;

            }


            if (livro.status === "emprestado") {

                alert(
                    "Esse livro já está emprestado."
                );

                return;

            }


            if (dataDev < obterDataHoje()) {

                alert(
                    "A data de devolução não pode ser anterior a hoje."
                );

                return;

            }


            const novoEmprestimo = {

                id: Date.now(),

                alunoId: alunoId,

                livroId: livroId,

                nomeAluno: aluno.nome,

                tituloLivro: livro.titulo,

                dataEmprestimo:
                    obterDataHoje(),

                dataDevolucao:
                    dataDev,

                status: "ativo"

            };


            livro.status =
                "emprestado";


            db.emprestimos.push(
                novoEmprestimo
            );


            salvarDB();


            selectAluno.value = "";

            selectLivro.value = "";

            dataDevolucao.value = "";


            atualizarTudo();


            alert(
                "Empréstimo registrado com sucesso!"
            );

        }
    );


    // ==========================================
    // RENDERIZAR EMPRÉSTIMOS
    // ==========================================

    function renderEmprestimos() {

        listaEmprestimos.innerHTML = "";


        const ativos =
            db.emprestimos.filter(
                function (emprestimo) {

                    return (
                        emprestimo.status ===
                        "ativo"
                    );

                }
            );


        if (ativos.length === 0) {

            listaEmprestimos.innerHTML =
                "<p>Nenhum empréstimo ativo.</p>";

            return;

        }


        ativos.forEach(function (emprestimo) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escaparHTML(
                            emprestimo.tituloLivro
                        )}
                    </strong>

                    <span>
                        Aluno:
                        ${escaparHTML(
                            emprestimo.nomeAluno
                        )}
                    </span>

                    <span>
                        Devolução:
                        ${formatarData(
                            emprestimo.dataDevolucao
                        )}
                    </span>

                </div>

                <button
                    class="btn-acao"
                    data-id="${emprestimo.id}">

                    Devolver

                </button>

            `;


            item
                .querySelector(".btn-acao")
                .addEventListener(
                    "click",
                    function () {

                        devolverLivro(
                            emprestimo.id
                        );

                    }
                );


            listaEmprestimos.appendChild(item);

        });

    }


    // ==========================================
    // DEVOLVER LIVRO
    // ==========================================

    function devolverLivro(emprestimoId) {

        const emprestimo =
            db.emprestimos.find(
                function (item) {

                    return (
                        item.id ===
                        emprestimoId
                    );

                }
            );


        if (!emprestimo) {
            return;
        }


        if (emprestimo.status !== "ativo") {

            alert(
                "Este empréstimo já foi devolvido."
            );

            return;

        }


        const confirmar =
            confirm(
                "Confirmar a devolução deste livro?"
            );


        if (!confirmar) {
            return;
        }


        emprestimo.status =
            "devolvido";


        emprestimo.dataDevolucaoReal =
            obterDataHoje();


        const livro =
            db.livros.find(
                function (item) {

                    return (
                        item.id ===
                        emprestimo.livroId
                    );

                }
            );


        if (livro) {

            livro.status =
                "disponivel";

        }


        db.historico.push({

            id: Date.now(),

            alunoId:
                emprestimo.alunoId,

            livroId:
                emprestimo.livroId,

            alunoNome:
                emprestimo.nomeAluno,

            livroTitulo:
                emprestimo.tituloLivro,

            dataEmprestimo:
                emprestimo.dataEmprestimo,

            dataDevolucaoPrevista:
                emprestimo.dataDevolucao,

            dataDevolucaoReal:
                emprestimo.dataDevolucaoReal

        });


        salvarDB();


        atualizarTudo();


        alert(
            "Livro devolvido com sucesso!"
        );

    }


    window.devolverLivro =
        devolverLivro;


    // ==========================================
    // DEVOLUÇÕES
    // ==========================================

    function renderDevolucoes() {

        listaDevolucoes.innerHTML = "";


        const ativos =
            db.emprestimos.filter(
                function (emprestimo) {

                    return (
                        emprestimo.status ===
                        "ativo"
                    );

                }
            );


        if (ativos.length === 0) {

            listaDevolucoes.innerHTML =
                "<p>Nenhum livro pendente para devolução.</p>";

            return;

        }


        ativos.forEach(function (emprestimo) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${escaparHTML(
                            emprestimo.tituloLivro
                        )}
                    </strong>

                    <span>
                        Emprestado para:
                        ${escaparHTML(
                            emprestimo.nomeAluno
                        )}
                    </span>

                    <span>
                        Data prevista:
                        ${formatarData(
                            emprestimo.dataDevolucao
                        )}
                    </span>

                </div>

                <button
                    class="btn-acao"
                    data-id="${emprestimo.id}">

                    Registrar devolução

                </button>

            `;


            item
                .querySelector(".btn-acao")
                .addEventListener(
                    "click",
                    function () {

                        devolverLivro(
                            emprestimo.id
                        );

                    }
                );


            listaDevolucoes.appendChild(item);

        });

    }


    // ==========================================
    // ATRASADOS
    // ==========================================

    function renderAtrasados() {

        listaAtrasados.innerHTML = "";


        const atrasados =
            db.emprestimos.filter(
                estaAtrasado
            );


        if (atrasados.length === 0) {

            listaAtrasados.innerHTML =
                "<p>Nenhum empréstimo em atraso! ✅</p>";

            return;

        }


        atrasados.forEach(function (emprestimo) {

            const item =
                document.createElement("div");

            item.className = "item";


            item.innerHTML = `

                <div>

                    <strong style="color:#e05252;">

                        ⚠️
                        ${escaparHTML(
                            emprestimo.tituloLivro
                        )}

                    </strong>

                    <span>
                        Aluno:
                        ${escaparHTML(
                            emprestimo.nomeAluno
                        )}
                    </span>

                    <span>
                        Deveria devolver:
                        ${formatarData(
                            emprestimo.dataDevolucao
                        )}
                    </span>

                </div>

                <button
                    class="btn-acao"
                    data-id="${emprestimo.id}">

                    Registrar devolução

                </button>

            `;


            item
                .querySelector(".btn-acao")
                .addEventListener(
                    "click",
                    function () {

                        devolverLivro(
                            emprestimo.id
                        );

                    }
                );


            listaAtrasados.appendChild(item);

        });

    }


    // ==========================================
    // HISTÓRICO
    // ==========================================

    function renderHistorico() {

        listaHistorico.innerHTML = "";


        if (db.historico.length === 0) {

            listaHistorico.innerHTML =
                "<p>Nenhuma devolução registrada.</p>";

            return;

        }


        const historicoOrdenado =
            [...db.historico].reverse();


        historicoOrdenado.forEach(
            function (registro) {

                const item =
                    document.createElement("div");

                item.className = "item";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${escaparHTML(
                                registro.livroTitulo
                            )}
                        </strong>

                        <span>
                            Aluno:
                            ${escaparHTML(
                                registro.alunoNome
                            )}
                        </span>

                        <span>
                            Emprestado:
                            ${formatarData(
                                registro.dataEmprestimo
                            )}
                        </span>

                        <span>
                            Devolvido:
                            ${formatarData(
                                registro.dataDevolucaoReal
                            )}
                        </span>

                    </div>

                    <span style="color:#19a974;font-weight:bold;">
                        DEVOLVIDO
                    </span>

                `;


                listaHistorico.appendChild(item);

            }
        );

    }


    // ==========================================
    // DASHBOARD
    // ==========================================

    function renderDashboard() {

        const emprestados =
            db.emprestimos.filter(
                function (emprestimo) {

                    return (
                        emprestimo.status ===
                        "ativo"
                    );

                }
            );


        const atrasados =
            emprestados.filter(
                estaAtrasado
            );


        totalLivros.textContent =
            db.livros.length;


        totalAlunos.textContent =
            db.alunos.length;


        totalEmprestados.textContent =
            emprestados.length;


        totalAtrasados.textContent =
            atrasados.length;


        renderEmprestimosRecentes();

        renderDevolucoesProximas();

    }


    // ==========================================
    // EMPRÉSTIMOS RECENTES
    // ==========================================

    function renderEmprestimosRecentes() {

        emprestimosRecentes.innerHTML = "";


        const ativos =
            db.emprestimos.filter(
                function (emprestimo) {

                    return (
                        emprestimo.status ===
                        "ativo"
                    );

                }
            );


        if (ativos.length === 0) {

            emprestimosRecentes.innerHTML =
                "<p>Nenhum empréstimo registrado.</p>";

            return;

        }


        ativos
            .slice()
            .reverse()
            .slice(0, 5)
            .forEach(
                function (emprestimo) {

                    const item =
                        document.createElement("div");

                    item.className = "item";


                    item.innerHTML = `

                        <div>

                            <strong>
                                ${escaparHTML(
                                    emprestimo.tituloLivro
                                )}
                            </strong>

                            <span>
                                ${escaparHTML(
                                    emprestimo.nomeAluno
                                )}
                            </span>

                        </div>

                        <span>
                            ${formatarData(
                                emprestimo.dataDevolucao
                            )}
                        </span>

                    `;


                    emprestimosRecentes
                        .appendChild(item);

                }
            );

    }


    // ==========================================
    // DEVOLUÇÕES PRÓXIMAS
    // ==========================================

    function renderDevolucoesProximas() {

        devolucoesProximas.innerHTML = "";


        const proximas =
            db.emprestimos
                .filter(
                    function (emprestimo) {

                        return (
                            emprestimo.status ===
                            "ativo" &&
                            !estaAtrasado(emprestimo)
                        );

                    }
                )
                .sort(
                    function (a, b) {

                        return (
                            a.dataDevolucao.localeCompare(
                                b.dataDevolucao
                            )
                        );

                    }
                )
                .slice(0, 5);


        if (proximas.length === 0) {

            devolucoesProximas.innerHTML =
                "<p>Nenhuma devolução próxima.</p>";

            return;

        }


        proximas.forEach(
            function (emprestimo) {

                const item =
                    document.createElement("div");

                item.className = "item";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${escaparHTML(
                                emprestimo.tituloLivro
                            )}
                        </strong>

                        <span>
                            ${escaparHTML(
                                emprestimo.nomeAluno
                            )}
                        </span>

                    </div>

                    <span>
                        ${formatarData(
                            emprestimo.dataDevolucao
                        )}
                    </span>

                `;


                devolucoesProximas
                    .appendChild(item);

            }
        );

    }


    // ==========================================
    // RELATÓRIOS
    // ==========================================

    function renderRelatorios() {

        const emprestados =
            db.emprestimos.filter(
                function (emprestimo) {

                    return (
                        emprestimo.status ===
                        "ativo"
                    );

                }
            );


        const atrasados =
            emprestados.filter(
                estaAtrasado
            );


        relatorioLivros.textContent =
            db.livros.length;


        relatorioAlunos.textContent =
            db.alunos.length;


        relatorioEmprestimos.textContent =
            emprestados.length;


        relatorioDevolucoes.textContent =
            db.historico.length;


        relatorioAtrasados.textContent =
            atrasados.length;

    }


    // ==========================================
    // ATUALIZAR TUDO
    // ==========================================

    function atualizarTudo() {

        renderSelects();

        renderLivros();

        renderAlunos();

        renderEmprestimos();

        renderDevolucoes();

        renderAtrasados();

        renderHistorico();

        renderDashboard();

        renderRelatorios();

    }


    // ==========================================
    // ESCAPAR HTML
    // Evita problemas se alguém digitar
    // caracteres especiais nos campos.
    // ==========================================

    function escaparHTML(texto) {

        if (texto === null ||
            texto === undefined) {

            return "";

        }


        return String(texto)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    // ==========================================
    // RECUPERAR USUÁRIO LOGADO
    // ==========================================

    function carregarUsuarioLogado() {

        if (!db.usuarioLogado) {
            return;
        }


        nomeLogado.textContent =
            db.usuarioLogado.nome;


        avatarUsuario.textContent =
            db.usuarioLogado.nome
                .charAt(0)
                .toUpperCase();

    }


    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    carregarUsuarioLogado();

    atualizarTudo();


    // ==========================================
    // SEMPRE COMEÇA NA TELA INICIAL
    // ==========================================

    mostrarTela("inicial");

});