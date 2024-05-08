// Šio failo neištrinti kitaip neveiks vartotojo duomenų atnaujinimo forma!!!
// Tikriausiai inicializuoja serverio komponentą
// Šis išdėstymo failas tiesiog aktyvuoja tuščia funkciją ¯\_(ツ)_/¯
// Sukūrė: Karolis Momkus

import { emptyFunction } from "../vartotojaiSQL";

export default function VartotojasLayout( {
    children,
}: {
    children: React.ReactNode;
} ) {
    emptyFunction();
    return (<div>{children}</div>);
}