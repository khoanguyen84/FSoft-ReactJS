import React, { useEffect, useState } from "react";
import StudentJsonData from '../../server/database/student.json';
function StudentList() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        setStudents(StudentJsonData);
    }, [])

    const removeStudent = (stdId) => {
        let confirmed = window.confirm('Are you sure to remove this student?');
        if(confirmed){
            setStudents(students.filter((std) => std.id !== stdId));
        }
    }
    const editStudent = (stdId) => {
        let tr = document.querySelector(`#tr_${stdId}`);
        let student = getStudentById(stdId);
        tr.children[1].innerHTML = `<input id='name_${stdId}' class='form-control' type='text' value='${student.studentName}' />`;
        tr.children[2].innerHTML = `<input id='java_${stdId}' class='form-control' type='number' value='${student.java}' />`;
        tr.children[3].innerHTML = `<input id='fe_${stdId}' class='form-control' type='number' value='${student.fe}' />`;
        tr.children[4].innerHTML = `<input id='react_${stdId}' class='form-control' type='number' value='${student.react}' />`;
        tr.children[5].children[0].classList.toggle('d-none');
        tr.children[5].children[1].classList.toggle('d-none');
    }

    const saveStudent = (stdId) =>{
        let newName = document.querySelector(`#name_${stdId}`).value;
        let java_score = document.querySelector(`#java_${stdId}`).value;
        let fe_score = document.querySelector(`#fe_${stdId}`).value;
        let react_score = document.querySelector(`#react_${stdId}`).value;
        if(!isValidName(newName)){
            alert('Please input alphabet characters only');
            return;
        }
        if(!isValidScore(java_score)){
            alert('Java score is invalid, please input score is interger and between 0 and 10');
            return;
        }
        if(!isValidScore(fe_score)){
            alert('FE score is invalid, please input score is interger and between 0 and 10');
            return;
        }
        if(!isValidScore(react_score)){
            alert('React score is invalid, please input score is interger and between 0 and 10');
            return;
        }
        let student = getStudentById(stdId);
        student.studentName = newName;
        student.java = java_score;
        student.fe = fe_score;
        student.react = react_score;
        setStudents(students);
        let tr = document.querySelector(`#tr_${stdId}`);
        tr.children[1].innerHTML = student.studentName;
        tr.children[2].innerHTML = student.java;
        tr.children[3].innerHTML = student.fe;
        tr.children[4].innerHTML = student.react;
        tr.children[5].children[0].classList.toggle('d-none');
        tr.children[5].children[1].classList.toggle('d-none');
    }
    const isValidName = (name) => {
        var reg_name = /^[a-zA-Z\s]*$/;
        return name !== "" && name != null && name.match(reg_name);
    }

    const isValidScore = (score) => {
        return score !== "" && score != null && Number(score) >= 0 && Number(score) <= 10 && Number.isInteger(Number(score))
    }
    const getStudentById = (stdId) => students.find((std) => std.id === stdId);
    return (
        <div className="container">
            <h3 className="text-center">Students Info Table</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th className="text-center">Java</th>
                        <th className="text-center">FE</th>
                        <th className="text-center">React</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((std) => (
                            <tr id={`tr_${std.id}`} key={std.id}>
                                <td>{std.id}</td>
                                <td>{std.studentName}</td>
                                <td className="text-center">{std.java}</td>
                                <td className="text-center">{std.fe}</td>
                                <td className="text-center">{std.react}</td>
                                <td className="text-center">
                                    <i className="fa fa-check text-success me-3 d-none" 
                                        title="save"
                                        onClick={() => saveStudent(std.id)}></i>
                                    <i className="fa fa-edit me-3" 
                                        title="edit"
                                        onClick={() => editStudent(std.id)}></i>
                                    <i className="fa fa-times text-danger" 
                                        title="remove"
                                        onClick= {() => removeStudent(std.id)}></i>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default StudentList;