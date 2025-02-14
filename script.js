const btnCep = document.getElementById('btnCep')
const buscarLocal = document.querySelector('.informacoesEstado')
const cep = document.getElementById('cep')

btnCep.addEventListener('click', handleClick)

function handleClick(event) {
  event.preventDefault()
  let cepbusca = cep.value
  buscarCep(cepbusca)
}

async function buscarCep(cepbusca) {
  let dados = await fetch(`https://viacep.com.br/ws/${cepbusca}/json/`).then(
    resolve => resolve.json(),
  )
  if (buscarCep.length !== 8 && dados.erro) {
    alert('CEP não encontrado. Verifique o número e tente novamente.')
    let inputs = document.querySelectorAll('input[type="text"]')
    inputs.forEach(input => {
      input.style.borderColor = 'red'
      input.value = ''
    })
  } else {
    colocarNaTela(dados)
    let inputs = document.querySelectorAll('input[type="text"]')
    inputs.forEach(input => {
      input.style.borderColor = ''
    })
  }
}

function colocarNaTela(dados) {
  document.getElementById('estado').value = dados.estado
  document.getElementById('cidade').value = dados.localidade
  document.getElementById('rua').value = dados.logradouro
  document.getElementById('bairro').value = dados.bairro
  document.getElementById('ddd').value = dados.ddd
}
