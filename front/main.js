let urls = `http://localhost/IgnicaoDigital_Challenge/api/`;

let html_templates = {
    'clientes': {
        'create': (item) => {

        },
        'read': (item) => {
            let result = `<tr><td>${item.nome}</td><td>${item.email}</td><td>${item.tag}</td><td class="text-right"><button class="button tiny">Editar</button><button class="button alert tiny" data-value="${item.id}">Deletar</button></td></tr>`
            return result
        },
        'update': (item) => {

        },
        'delete': (item) => {

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

        }
    }
}

let req = {
    'create': {
        'method': 'POST', 'func': (item) => {

        }
    },
    'read': {
        'method': 'GET', 'func': (data,local,typo,inst) => {
            try {
                let tags = data.data
                tags.map((item) => (
                    local.insertAdjacentHTML('beforeend', (function () {
                        return html_templates[typo][inst](item);
                    })()
                    )
                ))
            } catch{
                console.log(`Renderização falhou!`)
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
    }
}

function requests(x,y) {
    let typo = x.getAttribute(`data-type`)
    let inst = x.getAttribute(`data-content`) ? x.getAttribute(`data-content`) : x.getAttribute(`data-write`)
    let complement = (inst != 'read')? {method:`${req[inst]['method']}`, body:JSON.stringify(y)} : { method:`${req[inst]['method']}`}
    console.log(complement)
    fetch(`${urls}${typo}/${inst}.php`, complement)
        .then(function (response) {
            if (response.status === 200) {
                console.log(response)
                response.json().then(function (data) {
                    req[inst]['func'](data,x,typo,inst);
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

function CheckedItens(x){
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
    let infos = {
        nome: pai.querySelector('#nome').value,
        email: pai.querySelector('#email').value,
        tag: tags.join(';')
    }
    let table_body = document.querySelector('tbody')
    requests(pai,infos)
    table_body.innerHTML = ''
    requests(table_body)
})
