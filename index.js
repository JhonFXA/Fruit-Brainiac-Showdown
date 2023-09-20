const cartas= document.querySelectorAll(".carta")

// for(let i = 0; i<cartas.length; i++){
//     cartas[i].addEventListener('click', ()=>{
//         cartas[i].classList.toggle('virarCarta')
//     })
// }

const carta = (cartas,i = 0) => {
    if(i<cartas.length){
        cartas[i].addEventListener('click', ()=>{
            cartas[i].classList.toggle('virarCarta')
        })
        return carta(cartas, i+1)
    }
}
carta(cartas)