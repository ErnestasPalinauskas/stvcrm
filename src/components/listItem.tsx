//Sąrašo lauko elementas
//Sukūrė: Karolis Momkus

const ListItem = ({children}: {children: React.ReactNode}) => {
    const cardStyle = {
        padding: "1px",
        margin: "5px",
        boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.2)",
        border: "1px solid #ddd",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    return <div style={cardStyle}>{children}</div>;
}

export default ListItem;