import {useEffect, useRef, useState} from "react";
import axios from "../../utils/axios";

export default function Grades()
{
    const [rows, setRows] = useState([]);

    const dataFetchedRef = useRef(false);
    useEffect(()=>{
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        axios.get('/getGrades').then((respone)=>{
            setRows(respone.data)
            const rating =(respone.data.subject1 + respone.data.subject2 + respone.data.subject3 + respone.data.subject4 + respone.data.subject5)/5;
            if(rating >= 50){
                setGradeStatus(true);
            }
            setRating(rating);

        })
    },[])

    const [gradeStatus, setGradeStatus] = useState(false);
    const [rating, setRating] = useState(0);
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-900 dark:text-gray-900">
                <thead className="text-xs uppercase bg-gray-200 ">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Full Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        subject 1
                    </th>
                    <th scope="col" className="px-6 py-3">
                        subject 2
                    </th>
                    <th scope="col" className="px-6 py-3">
                        subject 3
                    </th>
                    <th scope="col" className="px-6 py-3">
                        subject 4
                    </th>
                    <th scope="col" className="px-6 py-3">
                        subject 5
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Year
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Rating %
                    </th>
                </tr>
                </thead>
                <tbody className="bg-gray-100 border-b border-gray-400">
                <tr >
                    <th scope="row" className="px-6 py-4">
                        {localStorage.getItem("name")}
                    </th>
                    <td className="px-6 py-4">
                        {rows.subject1}
                    </td>
                    <td className="px-6 py-4">
                        {rows.subject2}
                    </td>
                    <td className="px-6 py-4">
                        {rows.subject3}
                    </td>
                    <td className="px-6 py-4">
                        {rows.subject4}
                    </td>
                    <td className="px-6 py-4">
                        {rows.subject5}
                    </td>
                    <td className="px-6 py-4">
                        {rows.Year}
                    </td>
                    <td className={`px-6 py-4 text-red-600 ${gradeStatus && "text-green-600"}`}>
                        {rating}%
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    )
}