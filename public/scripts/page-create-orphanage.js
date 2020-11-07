const map = L.map("mapid").setView([-8.8299405,13.2162971], 16);
 
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon ({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker
// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon 
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

//add photo field 
function addPhotoField() {
    // get photo container #images
    const container = document.querySelector('#images')
    
    // pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    
    // realizar o clone da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    
    // verificar se o campo está vazio, se sim, não adiconar ao container de imagem
    const input = newFieldContainer.children[0]
    if(input.value == ""){
        return
    }
    
    // limpar o campo antes de adiconar ao container de imagens
    input.value = ''

    // adiconar o clone container de imagem
    container.appendChild(newFieldContainer)
}

function deleteField (event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length < 2) {
    //deletar o compo
        span.parentNode.children[0].value = ""
        return
    }

    //deletar o compo
    span.parentNode.remove();

}

// select yer or no
function toggleSelect(event) {
    //retirar a class .active (dos botões)
    document.querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'))
    // colocar a class .active nesse botao clicado
    const button = event.currentTarget
    button.classList.add('active')

    //actualizar o meu input hidden com o calor selectionado
    const input = document.querySelector('[name="open_on_weekends"]')

    //verifcar se  seim ou nao
    input.value = button.dataset.value
}