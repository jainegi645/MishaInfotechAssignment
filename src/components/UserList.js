import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function UserList() {
    const [list, setList] = useState([]);
    const fetchList = async () => {
        try {
            const { data } = await axios.get("http://44.201.126.35:5000/api/auth/user");
            if (data) {
                setList(data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteUser = async (id) => {
        if(window.confirm("Are you sure you want to delete")){
            try {
                const { data } = await axios.delete(`http://44.201.126.35:5000/api/auth/deleteUser/${id}`);
                if (data) {
                    alert("User deleted successfully");
                    fetchList();
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchList();//eslint-disable-next-line
    }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2 mt-3">
                    <div className="card">
                        <div className="card-header">Users List</div>
                        <div className="card-body table-striped">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.length > 0 && list.map((user, index) => {
                                            return (

                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.firstName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.state}</td>
                                                    <td>{user.gender}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
