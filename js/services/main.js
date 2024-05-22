import { servicosProdutos } from "../services/produto-servicos.js";

const produtoContainer = document.querySelector("[data-produto]");
const form = document.querySelector("[data-formulario]");


let erroBanco = document.getElementById('erro');

function  createElement(id, nome, valor, imagem) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                
                    <img class="img__foto" src="${imagem}" alt="${nome}">
                    <div class="card-container--info">
                        <p class="card__nome_produto">${nome}</p>
                        <div class="card-container--valor">
                            <p class="card__valor_produto">$ ${valor}</p>
                            <button class="botao__delete" data-id="${id}">
                                <img src="./assets/lixo.svg" alt="deletar">
                            </button>
                        </div>
                    </div>
                </div>
    `
produtoContainer.appendChild(card);
return card;
}


const render = async () => {
    try {
        const listaProduto = await servicosProdutos.listaProduto();
        if(listaProduto != 0){
            listaProduto.forEach(produto => {
            produtoContainer.appendChild(
                createElement(produto.id, produto.nome, produto.valor, produto.imagem)
            );
        });
        }else {
            erroBanco.innerHTML = `<p style="color:red;"> Nenhum produto foi adicionado</p>`
        }
    }catch (error) {
        erroBanco.innerHTML = `<p style="color:red;"> Erro ao ler o banco de dados!</p>`
    }   
    
    async function deletarProduto(id) {
        const resposta = await fetch(`http://localhost:3000/produto/${id}`,{
            method: "DELETE",
        })
        .then(response => {
        })
        .catch(error => {
            console.error('Error ao excluir os dados')
        });
    }

    let btnDelete = document.querySelectorAll(".botao__delete")
        btnDelete.forEach( (btnDelete) => {
            btnDelete.addEventListener('click', (t) => {
                t.target
                alert('Produto deletado com Sucesso')
                deletarProduto(btnDelete.dataset.id)
            })
        })
}



form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.querySelector("[data-nome]").value;
    const valor = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;

    servicosProdutos.criarProduto(nome, valor, imagem)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
});

            
render();


