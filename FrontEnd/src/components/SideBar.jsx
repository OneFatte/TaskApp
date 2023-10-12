import { Link } from "react-router-dom";


export default function SideBar() {
    return <div className="col-4">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: 280 + "px", height: 100 + "vh" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journals" viewBox="0 0 16 16">
                    <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
                    <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z" />
                </svg>
                <span className="fs-4 m-1">Menu</span>
            </a>
            <hr></hr>
            <ul className="nav nav-pills flex-column mb-auto">

                <li className="nav-item">
                    <Link className="nav-link text-white" to={`login`}>Login</Link>
                </li>
                <li>
                    <Link className="nav-link text-white" to={`task/1`}>Ver Contacto</Link>
                </li>
                <li>
                    <Link className="nav-link active" to={`tasks`}>Contactos</Link>
                </li>
            </ul>
            <hr></hr>
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://i.ytimg.com/vi/31HfP81oWDI/maxresdefault.jpg" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>Camilo Giraldo</strong>
                </a>

            </div>
        </div>
    </div>
};