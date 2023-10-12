import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";


export default function Layout() {
    return <>

        <SideBar></SideBar>
        <main className="col-8" >
            <Outlet></Outlet>
        </main>

    </>
};

