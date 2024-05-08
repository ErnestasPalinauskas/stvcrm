// Vartotojo pridėjimo formos funkcija
// Sukūrė: Karolis Momkus

import { AddVartotojasForm } from "./addVartotojasForm";


// Pagrindinė vartotojo pridėjimo formos funkcija
async function VartotojaiAdd() {
    return (
        <div>
            <h1 className="text-center font-bold">Pridėti vartotoją</h1>
            <AddVartotojasForm/>
        </div>
    )
}

export default VartotojaiAdd;