const listaProduto = () => {
    return fetch("https://json-testes.vercel.app/produto/")
    .then((res) => res.json())
    .catch((err) => console.log(err))
};

//criar produto pelo formulario

const criarProduto = (nome, valor, imagem) => {
    return fetch("https://json-testes.vercel.app/produto/", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            nome,
            valor,
            imagem,
        })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const servicosProdutos = {
    listaProduto,
    criarProduto,
}
