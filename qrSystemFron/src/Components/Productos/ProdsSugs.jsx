import { useEffect, useState } from "react";

const ProdsSugs = ({ name, setProducto, producto,close }) => {
    const [articulos, setArticulos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const articulosPorPagina = 5;
    useEffect(() => {
        fetch('https://stocksystemback-uorn.onrender.com/products/suggest')
            .then(response => response.json())
            .then(data => { setArticulos(data), setSuggestions(data) })
            .catch(error => console.error(error));
    }, [])
    const selectArt = (art) => {
        console.log(art)
        if (name == 'name') {
            setProducto({ ...producto, name: art.descripcion.toLowerCase(), code: art.code, codbarras: art.codbarras, codprov: art.codprov, unxcaja: art.unxcaja, familia: art.familia })
        }
        else {
            setProducto({ ...producto, name: art.descripcion.toLowerCase(), code: art.code, codbarras: art.codbarras, codprov: art.codprov, unxcaja: art.unxcaja, familia: art.familia })
        }
        close()
    }
    const inputChange = (e) => {
        const { value } = e.target
        console.log('value', value)
        if(name == 'descripcion' || name=='codprov'){
            setSuggestions(articulos.filter((art) => art[name].toLowerCase().includes(value.toLowerCase())));
        }else{
            setSuggestions(articulos.filter((art) => art[name].includes(value.toLowerCase())));
        }
        setPaginaActual(0);
    }
    // Calcula el número total de páginas
    const totalPaginas = Math.ceil(suggestions.length / articulosPorPagina);
    // Obtiene los artículos para la página actual
    const articulosEnPagina = suggestions.slice(
        paginaActual * articulosPorPagina,
        (paginaActual + 1) * articulosPorPagina
    );
    // Navega a la página siguiente
    const siguientePagina = () => {
        setPaginaActual((actual) => Math.min(actual + 1, totalPaginas - 1));
    };

    // Navega a la página anterior
    const anteriorPagina = () => {
        setPaginaActual((actual) => Math.max(actual - 1, 0));
    };
    console.log(suggestions)
    console.log(name)
    return (
        <div className="container text-center">
            <h1 className="text-dark text-center">Articulos sugeridos</h1>
            <section className="d-flex gap-2 justify-content-center align-items-center">
                <label className="text-dark">Buscar:</label>
                <input type="text" onChange={(e) => inputChange(e)} />
            </section>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Código</th>
                                <th>Cod. Prov</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articulosEnPagina.map((articulo, index) => (
                                <tr key={index} onClick={() => selectArt(articulo)}>
                                    <td>{articulo.descripcion}</td>
                                    <td>{articulo.code}</td>
                                    <td>{articulo.codprov}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${paginaActual === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={anteriorPagina}>Anterior</button>
                            </li>
                            <li className={`page-item ${paginaActual === totalPaginas - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={siguientePagina}>Siguiente</button>
                            </li>
                        </ul>
                    </nav>
                    <div>Página {paginaActual + 1} de {totalPaginas}</div>
                </div>
            </div>
        </div>
    );
}

export default ProdsSugs