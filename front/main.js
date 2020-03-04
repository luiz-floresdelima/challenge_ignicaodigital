let urls = `http://localhost/IgnicaoDigital_Challenge/api/`;

let html_templates = {
    'clientes': {
        'create': (item) => {

        },
        'read': (item) => {
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
        },
        'update': (item) => {

        },
        'delete': (item) => {

        },
        'search': (item) => {

        }
    },
    'tags': {
        'create': (item) => {

        },
        'read': (item) => {
            let result = `<input type="checkbox" name="${item.tag}" id="${item.tag}" value="${item.id}"><label for="${item.tag}">${item.tag}</label>`
            return result
        },
        'update': (item) => {

        },
        'delete': (item) => {

        },
        'search': (item) => {

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
                if (typo == 'clientes' && inst == 'read') {
                    del_btn()
                    edit_btn()
                    search_btn()
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
        'method': 'POST', 'func': (item) => {

        }
    },
}

function requests(x, y) {
    let typo = x.getAttribute(`data-type`)
    let inst = x.getAttribute(`data-content`) ? x.getAttribute(`data-content`) : x.getAttribute(`data-write`)
    let complement = (inst != 'read') ? { method: `${req[inst]['method']}`, body: JSON.stringify(y) } : { method: `${req[inst]['method']}` }
    fetch(`${urls}${typo}/${inst}.php`, complement)
        .then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    console.log(inst, typo)
                    req[inst]['func'](data, x, typo, inst);
                }).then(function () {
                    if (inst != 'read') {
                        document.querySelector('tbody').innerHTML = ''
                        requests(document.querySelector('tbody'))
                    } else if (typo == "tags") {
                        let tags = document.querySelector('.tags').querySelectorAll('[type="checkbox"]')
                        tags.forEach((tag) => {
                            document.querySelector("#tags_busca").insertAdjacentHTML('beforeend', `<option value="${tag.value}">${tag.name}</option>`)
                        })
                    }
                });
            }
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requests(entry.target);
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('[data-content]').forEach(p => { observer.observe(p) });

function CheckedItens(x) {
    let aux = [];
    x.forEach(element => {
        if (element.checked) {
            aux.push(element.value)
        }
    });
    return aux
}

document.querySelector('#add_client').addEventListener('click', (item) => {
    let pai = item.target.parentNode
    let tags = pai.querySelector('.tags').querySelectorAll('[type="checkbox"]')
    tags = CheckedItens(tags)
    let nome = pai.querySelector('#nome')
    let email = pai.querySelector('#email')
    let infos = {
        nome: nome.value,
        email: email.value,
        tag: tags.join(';')
    }
    nome.value = '';
    email.value = '';
    requests(pai, infos)
})

function del_btn() {
    document.querySelectorAll('[data-write="delete"]').forEach(element => {
        element.addEventListener('click', (item) => {
            let infos = {
                id: element.getAttribute('data-value')
            }
            requests(element, infos)
        })
    })
}

function edit_btn() {
    document.querySelectorAll('[data-write="update"]').forEach(element => {
        element.addEventListener('click', (item) => {
            let pai = element.parentNode.parentNode
            pai.children[0].innerHTML = `<input value="${pai.children[0].textContent}"></input>`
            pai.children[1].innerHTML = `<input value="${pai.children[1].textContent}"></input>`
            let checked = pai.children[2].textContent
            pai.children[2].innerHTML = document.querySelector(".tags").innerHTML
            checked.split(`;`).forEach(tag => {
                pai.children[2].querySelector(`input[value="${tag}"]`).checked = true
            });
            pai.children[3].innerHTML = `<button class="button tiny success" data-write="update" data-value="${pai.children[3].children[0].getAttribute('data-value')}" data-type="clientes"><i class="fas fa-check"></i></button>
            <button class="button alert tiny" data-value="${pai.children[3].children[1].getAttribute('data-value')}"><i class="far fa-times-circle"></i></button>`
            pai.children[3].querySelector('.success').addEventListener('click', (btn_item) => {
                let nome = pai.children[0].querySelector('input')
                let email = pai.children[1].querySelector('input')
                let tags = pai.children[2].querySelectorAll('[type="checkbox"]')
                tags = CheckedItens(tags)
                let infos = {
                    id: btn_item.target.getAttribute('data-value'),
                    nome: nome.value,
                    email: email.value,
                    tag: tags.join(';')
                }
                requests(btn_item.target, infos)
            })
            pai.children[3].querySelector('.alert').addEventListener('click', (btn_item) => {
                document.querySelector('tbody').innerHTML = ''
                requests(document.querySelector('tbody'))
            })
        })
    })
}

function search_btn() {
    document.querySelector("#btn_busca").addEventListener('click', (item) => {
        let pai = item.target.parentNode;
        let infos = {
            nome: pai.querySelector('input').value,
            email: pai.querySelector('input').value,
            tag: pai.querySelector('select').options[pai.querySelector('select').selectedIndex].value
        }
        requests(item.target,infos)
    })
}