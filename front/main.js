let urls = `http://localhost:8080/challenge_ignicaodigital/api/`;

let html_templates = {
    'clientes': {
        'create': (item) => {

        },
        'read': (item) => {
            let tag_cods = item.tag.split(";")
            let tag_names = ""

            if (tag_cods) {
                tag_cods.forEach((element) => {
                    tag_names += (document.querySelector(`#clients_box .tags [type="checkbox"][value="${element}"]`)) ? `<p title="${element}">${document.querySelector(`#clients_box .tags [type="checkbox"][value="${element}"]`).getAttribute('name')}</p>`:``;
                })
            }

            let result = `<tr>
                <td>${item.nome}</td>
                <td>${item.email}</td>
                <td>${tag_names}</td>
                <td class="text-right">
                    <button class="button tiny" onclick="editBtn(this)" data-write="update" data-value="${item.id}"><i class="fas fa-user-edit"></i></button>
                    <button class="button alert tiny" onclick="delClient(this)" data-value="${item.id}" data-write="delete" data-type="clientes"><i class="fas fa-user-times"></i></button>
                </td>
            </tr>`
            return result
        },
        'update': (item) => {

        },
        'delete': (item) => {

        },
        'search': (item) => {
            let result = `<tr>
            <td>${item.nome}</td>
            <td>${item.email}</td>
            <td>${item.tag}</td>
            <td class="text-right">
                <button class="button tiny" data-write="update" data-value="${item.id}"><i class="fas fa-user-edit"></i></button>
                <button class="button alert tiny" data-value="${item.id}" data-write="delete" data-type="clientes"><i class="fas fa-user-times"></i></button>
            </td>
        </tr>`
            return result
        }
    },
    'tags': {
        'create': (item) => {

        },
        'read': (item) => {
            let result = `<div class="inp_lab"><input type="checkbox" name="${item.tag}" id="${item.tag}" value="${item.id}"><label for="${item.tag}">${item.tag}</label></div>`
            return result
        },
        'update': (item) => {

        },
        'delete': (item) => {

        },
        'search': (item) => {
            let result = `<option value="${item.id}">${item.tag}</option>`
            return result
        }
    }
}

let req = {
    'create': {
        'method': 'POST', 'func': (item) => {

        }
    },
    'read': {
        'method': 'GET', 'func': (data, local, typo, inst) => {
            try {
                let tags = data.data
                if (tags) {
                    tags.map((item) => (
                        local.insertAdjacentHTML('beforeend', (function () {
                            return html_templates[typo][inst](item);
                        })()
                        )
                    ))
                }
            } catch (e) {
                console.log(`Renderização falhou: ${e}`)
            }
        }
    },
    'update': {
        'method': 'PUT', 'func': (item) => {

        }
    },
    'delete': {
        'method': 'DELETE', 'func': (item) => {

        }
    },
    'search': {
        'method': 'POST', 'func': (data, local, typo, inst) => {
            try {
                let tags = data.data
                if (tags) {
                    tags.map((item) => (
                        local.insertAdjacentHTML('beforeend', (function () {
                            return html_templates[typo][inst](item);
                        })()
                        )
                    ))
                }
            } catch (e) {
                console.log(`Renderização falhou: ${e}`)
            }
        }
    }
}

function CheckedItens(x) {
    let aux = [];
    x.forEach(element => {
        if (element.checked) {
            aux.push(element.value)
        }
    });
    return aux
}

function addClient() {
    let tags = document.querySelector('#clients_box .tags').querySelectorAll('[type="checkbox"]')
    tags = CheckedItens(tags)
    let infos = {
        nome: document.querySelector('#nome_cli').value,
        email: document.querySelector('#email_cli').value,
        tag: tags.join(';')
    }
    document.querySelector('#nome_cli').value = '';
    document.querySelector('#email_cli').value = '';
    document.querySelector('#clients_box .tags').querySelectorAll('[type="checkbox"]').forEach((item) => {
        item.checked = false
    })
    fetch(`${urls}clientes/create.php`, { method: `${req['create']['method']}`, body: JSON.stringify(infos) })
        .then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    console.log('read', 'clientes')
                    req['create']['func'](data);
                }).then(
                    readClient()
                );
            }
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function readClient() {
    document.querySelector('tbody').innerHTML = ''
    fetch(`${urls}clientes/read.php`, { method: `${req['read']['method']}` })
        .then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    console.log('read', 'clientes')
                    req['read']['func'](data, document.querySelector('tbody'), 'clientes', 'read');
                });
            }
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function editBtn(element) {
    let pai = element.parentNode.parentNode
    pai.children[0].innerHTML = `<input value="${pai.children[0].textContent}"></input>`
    pai.children[1].innerHTML = `<input value="${pai.children[1].textContent}"></input>`
    let tags = []
    pai.children[2].querySelectorAll("p").forEach((item) => {
        tags.push(item.getAttribute('title'))
    })
    pai.children[2].innerHTML = document.querySelector('#clients_box .tags').innerHTML
    tags.forEach((item) => {
        pai.children[2].querySelector(`input[value="${item}"]`).checked = true
    })
    pai.children[3].innerHTML = `<button class="button tiny success" onclick="updateClient(this)" data-write="update" data-value="${pai.children[3].children[0].getAttribute('data-value')}" data-type="clientes"><i class="fas fa-check"></i></button><button class="button alert tiny" onclick="canclBtn(this)" data-value="${pai.children[3].children[1].getAttribute('data-value')}"><i class="far fa-times-circle"></i></button>`
}

function updateClient(element) {
    let pai = element.parentNode.parentNode
    let tags = pai.children[2].querySelectorAll('[type="checkbox"]')
    tags = CheckedItens(tags)
    let infos = {
        id: element.getAttribute('data-value'),
        nome: pai.children[0].querySelector('input').value,
        email: pai.children[1].querySelector('input').value,
        tag: tags.join(';')
    }
    fetch(`${urls}clientes/update.php`, { method: `${req['update']['method']}`, body: JSON.stringify(infos) })
        .then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    console.log('update', 'clientes')
                    req['update']['func'](data);
                }).then(
                    readClient()
                );
            }
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function canclBtn() {
    readClient()
}

function delClient(element) {
    let infos = {
        id: element.getAttribute('data-value')
    }
    fetch(`${urls}clientes/delete.php`, { method: `${req['delete']['method']}`, body: JSON.stringify(infos) })
        .then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    console.log('delete', 'clientes')
                    req['delete']['func'](data);
                }).then(
                    readClient()
                );
            }
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function addTag() {
    let pai = document.querySelector('#tags_box');
    let nome = pai.querySelector('#nome_tag')
    let infos = {
        tag: nome.value,
    }
    nome.value = '';
    fetch(`${urls}tags/create.php`, { method: `${req['create']['method']}`, body: JSON.stringify(infos) })
        .then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    console.log('create', 'tags')
                    req['create']['func'](data);
                }).then(
                    readTag()
                );
            }
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

}

function readTag() {
    document.querySelector('#clients_box .tags').innerHTML = ''
    document.querySelector('#tags_busca').innerHTML = '<option value="0" selected>Todas as tags</option>'
    fetch(`${urls}tags/read.php`, { method: `${req['read']['method']}` })
        .then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    console.log('read', 'tags')
                    req['read']['func'](data, document.querySelector('#clients_box .tags'), 'tags', 'read');
                    req['search']['func'](data, document.querySelector('#tags_busca'), 'tags', 'search');
                }).then(
                    readClient()
                );
            }
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function searchClient() {
    document.querySelector('tbody').innerHTML = ''
    let pai = document.querySelector('#busca');
    let infos = {
        nome: pai.querySelector('input').value,
        email: pai.querySelector('input').value,
        tag: pai.querySelector('select').options[pai.querySelector('select').selectedIndex].value
    }
    fetch(`${urls}clientes/search.php`, { method: `${req['search']['method']}`, body: JSON.stringify(infos) })
        .then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    console.log('search', 'clientes')
                    req['search']['func'](data, document.querySelector('tbody'), 'clientes', 'read');
                });
            }
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    document.querySelector('#buscada_string').innerHTML = `<span><span>${pai.querySelector('input').value}</span><span>|</span><span>${pai.querySelector('select').options[pai.querySelector('select').selectedIndex].textContent}</span><div><i class="far fa-times-circle" onclick="canclFilter()"></i></div></span>`
}

function canclFilter() {
    document.querySelector('#buscada_string').innerHTML = ''
    readClient()
}

readTag()