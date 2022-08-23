import React, { useState, useEffect } from "react";
import StudentJsonData from '../../server/database/student.json';

function SearchTab() {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({});
    const [keyword, setKeyword] = useState({
        value : "",
        hasClicked: false
    });
    
    useEffect(() => {
        setStudents(StudentJsonData);
    }, [])

    const viewStudent = (stdId) => {
        let foundStudent = students.find((std) => std.id === stdId)
        let { java, fe, react } = foundStudent;
        setStudent({
            ...foundStudent,
            aveScore : ((java + fe + react)/3).toFixed(2)
        })
    }
    const handleSearch = () => {
        if(!keyword.value){
            setStudents(StudentJsonData);
        }else{
            let searchStudents = students.filter((std) => std.studentName.toLowerCase().includes(keyword.value.toLocaleLowerCase()))
            setStudents(searchStudents)
        }
        setKeyword({...keyword, hasClicked: true});
    }
    return (
        <React.Fragment>
            <div className="container">
                <h3 className="text-center">Search Form</h3>
                <div className="d-flex justify-content-center position-relative">
                    <input type="text" 
                            value={keyword.value} onInput={ (e) => setKeyword({hasClicked: false, value: e.target.value })} 
                            className="form-control w-50 me-2 " />
                    <button onClick={handleSearch} className="btn btn-primary">Search</button>
                    <span className={`${keyword.value || !keyword.hasClicked ? 'd-none' : ''} position-absolute top-100 text-danger`}>
                            Student Name you entered is not valid, please try again!</span>
                </div>
            </div>
            <div className="container my-3">
                <h3 className="text-center">Student Info</h3>
                <div className="d-flex justify-content-center">
                    <table className="table table-hover w-75">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th className="text-center">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map((std) => (
                                    <tr className={std.java >= 5 && std.fe >= 5 && std.react >= 5 ? "row-active" : "bg-secondary text-white"} id={`tr_${std.id}`} key={std.id}>
                                        <td>{std.id}</td>
                                        <td>{std.studentName}</td>
                                        <td className="text-center">
                                            <button onClick={() => viewStudent(std.id)} className="btn btn-primary btn-sm">View</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                Object.keys(student).length > 0 && (
                    <div className="container">
                        <h3 className="text-center">Detail</h3>
                        <div className="d-flex flex-column">
                            <div className="flex-grow-1 bg-primary py-3 text-center text-white">
                                {student.studentName}
                            </div>
                            <div className="border border-primary d-flex justify-content-around align-items-center py-3">
                                <div className="text-center w-25">
                                    <h6>Java</h6>
                                    <div className="bg-success py-3 text-white">{student.java}</div>
                                </div>
                                <div className="text-center w-25">
                                    <h6>FE</h6>
                                    <div className="bg-success py-3 text-white">{student.fe}</div>
                                </div>
                                <div className=" text-center w-25">
                                    <h6>React</h6>
                                    <div className="bg-success py-3 text-white">{student.react}</div>
                                </div>
                            </div>
                            <div className="w-50 bg-primary py-4 text-center my-1 mx-auto text-white">
                                <h6>{student.aveScore}</h6>
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default SearchTab;