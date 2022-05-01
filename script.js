let next=document.getElementById("next");
let prev=document.getElementById("previous");
var contador=0;
//console.log("Hola mundo");
CrearLocalStorageBase();//Se genera un LocalStorage con una base de fotos, se puede comentar esta linea luego se ser corrida una vez
//localStorage.removeItem("paginas");
//console.log(localStorage.getItem("paginas"));
//Espera a que CrearLocalStorageBase se ejecute


let paginas = JSON.parse(localStorage.getItem("paginas"));
ConstruiPagina(0);
next.addEventListener("click", () => { 
   pag=paginas[contador+1];
    if (contador < 4 && pag[0] != undefined) {
        contador++;   
        console.log(contador);     
        ConstruiPagina(contador);
    } else {
        alert("No puedes ir mas alla");
    }
});
prev.addEventListener("click", () => {
    pag=paginas[contador-1];
    if (contador > 0 && pag[0] != undefined) {
        contador--;
        ConstruiPagina(contador);
    } else {
        alert("No puedes ir mas atras");
    }
});

enviar.addEventListener("click", function () {
    let titulo = document.getElementById("titulo");
    let descripcion = document.getElementById("descripcion");
    let link = document.getElementById("url");
    let file = document.getElementById("file");
    let enviar = document.getElementById("enviar");
    console.log("link.value");
    console.log(link.value);
    if (link.value == '' && file.value == '') {
        alert("Debes subir una imagen");
    } else {

        if (link.value != '') {
            pp = ({
                titulo: titulo.value,
                descripcion: descripcion.value,
                link: link.value,
                file: ""
            });
        } else {

            pp = ({
                titulo: titulo.value,
                descripcion: descripcion.value,
                link: "",
                file: file.value
            });
        }
        //console.log(pp);
        ManejoDePaginas(pp, 0);
        titulo.value = "";
        descripcion.value = "";
        link.value = "";
        file.value = "";

        //console.log(paginas);
        ConstruiPagina(0);
        localStorage.setItem("paginas", JSON.stringify(paginas));
        //console.log(localStorage.getItem("paginas"));

    }
});
function ConstruiPagina(numero) {
    let pag = document.getElementById("pag");
    pag.innerHTML = "";
    pagina = paginas[numero];
    console.log(pagina);
    pagina.forEach(element => {
        //recorrer pagina
        if (element.link == "" || element.link == null) {
            link = element.file;
        } else {
            link = element.link;
        }
        const img = `
        <div class="relative  w-full p-1 md:p-2">            
        <img src="${link}" alt="" class="  object-cover object-center w-full h-full rounded-lg " alt="galeria">
            <div class=" absolute w-full h-full opacity-0 hover:opacity-100 top-0 left-0 rounded-lg bg-gray-500 bg-opacity-60">
                <h1 class=" mt-3 ml-3  text-2xl text-left leading-5  text-white font-bold opacity-95 font-serif ">${element.titulo}</h1>
                <h1 class=" mt-5 ml-5  text-xl text-left leading-5  text-white font-bold opacity-95 font-serif ">${element.descripcion}</h1>
            </div>
        </div>
        
        `
        // file:///C:/fakepath/2017-03-11.png
        pag.innerHTML= img+pag.innerHTML;
    });

}
function ManejoDePaginas(pp, numero) {
    //paginas = JSON.parse(localStorage.getItem("paginas"));
    if (numero + 1 <= 6) {
        pagina1 = paginas[numero];
        pagina2 = paginas[numero + 1];
        //console.log(pagina1.length);
        if (pagina1.length < 6) {
            //posiciona pp en la primera poscion de pagina1

            pagina1.push(pp);
            //console.log(pagina1);
        } else {
            //saca la primera poscicion de pagina1
            cos = pagina1.shift();
            pagina1.push(pp);
            if (pagina2.length < 6) {
                pagina2.push(cos);
            } else {
                ManejoDePaginas(cos, numero + 1);
            }
        }
    } else {
        alert("No puedes agregar mas paginas");
    }


}
function CrearLocalStorageBase() {
    p1 = [{
        titulo: "Atardecer Barquino",
        descripcion: "Es un atardecer en un pequeño bote",
        link: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
        file: ""
    }, {
        titulo: "Lobo",
        descripcion: "Es un lobo",
        link: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp",
        file: ""
    }, {
        titulo: "Montañas nevadas",
        descripcion: "Son montañas y estan nevadas",
        link: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp",
        file: ""
    }, {
        titulo: "Selva",
        descripcion: "Es una selva",
        link: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp",
        file: ""
    }, {
        titulo: "Ciudad nevada",
        descripcion: "Es una ciuda y esta nevada",
        link: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp",
        file: ""
    }];
    p2 = [];
    p3 = [];
    pags = [p1, p2, p3, [], [], []];
    console.log(pags);
    localStorage.setItem("paginas", JSON.stringify(pags));
}