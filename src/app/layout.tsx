import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "ŠTV",
        template: "%s | ŠTV",
    },
    description: 'Šiaulių apskrities televizijos programų planavimo sistemos laidų sąrašas.'
}

function MainLayout( {children}: {children: React.ReactNode}){
    return (
        <html lang="lt">
            <head>
                <link rel="icon" href="/favicon-32x32.png" sizes="any" />
            </head>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}

export default MainLayout;