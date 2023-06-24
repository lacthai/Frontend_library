import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../../axios";
import Loading from "../Loading/Loading";
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import Grid3x3TwoToneIcon from '@mui/icons-material/Grid3x3TwoTone';
import AlternateEmailTwoToneIcon from '@mui/icons-material/AlternateEmailTwoTone';


function ClientsAdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);

    if (loading) return <Loading />;
    if (users?.length === 0) return <h2 className="py-2 text-center">No users yet</h2>;

    return (
        <div className="h-[150vh]">

        <Table responsive striped bordered hover className="text-white h-[40%]">
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>User Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr>
                        <td className="text-white"><span className="backdrop-opacity-10 backdrop-invert bg-white/30 p-2 rounded-xl flex items-center w-fit"><Grid3x3TwoToneIcon className="mr-1 text-[#71BC78]"/>{user._id}</span></td>
                        <td className="text-white capitalize"><span className="backdrop-opacity-10 backdrop-invert bg-white/30 p-2 rounded-xl flex items-center w-fit"><DriveFileRenameOutlineTwoToneIcon className="mr-1 text-[#4B9CD3]"/>{user.name}</span></td>
                        <td className="text-white"><span className="backdrop-opacity-10 backdrop-invert bg-white/30 p-2 rounded-xl flex items-center w-fit"><AlternateEmailTwoToneIcon className="mr-1 text-[#E31837]"/>{user.email}</span></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
    );

}

export default ClientsAdminPage;