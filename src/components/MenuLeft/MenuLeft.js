import React, { useState }  from "react";
import { Link } from 'react-router-dom';

const menu = [
    {
        name: "Student Manager",
        link: "/student/list"
    },
    {
        name: "Search Tab",
        link: "/student/search"
    }
]
function MenuLeft(){
    const [active, setActive] = useState("Student Manager");
    return (
        <div className="d-flex flex-column justify-content-center">
            <h3 className="mb-2 text-center">Menu Item</h3>
            {
                menu.map((m) => (
                    <Link to={m.link} key={m.name}
                        className={`btn btn-outline-primary ${m.name === active ? "active" : ""} flex-1 mb-2`}
                        onClick={() => setActive(m.name)}
                    >{m.name}</Link>
                ))
            }
        </div>
    )
}

export default MenuLeft;