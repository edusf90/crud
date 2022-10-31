let modal = document.querySelector('.modal-container')
let tbody = document.querySelector('tbody')
let sNome = document.querySelector('#m-nome')
let sFuncao = document.querySelector('#m-funcao')
let sSalario = document.querySelector('#m-salario')
let btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

loadItens()

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><box-icon  type="solid" name="edit"> </button>
    </td>

    <td class="acao">
      <button onclick="deleteItem(${index})"><box-icon  type="solid" name="trash"></box-icon> </button>
    </td>
  `
  tbody.appendChild(tr)
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
}

btnSalvar.onclick = e => {
  if (sNome.value == '' || sFuncao.value == '' || sSalario == '') {
    return
  }

  e.preventDefault()

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({
      nome: sNome.value,
      funcao: sFuncao.value,
      salario: sSalario.value
    })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}
