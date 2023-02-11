import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export default function NotFound()
{
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section className="h-screen bg-gray-300 flex flex-row min-h-screen justify-center items-center">
            <div>
                <h1 className="text-gray-800 text-3xl font-serif text-center mb-6">
                    404 not found &gt;_&lt;
                </h1>
                <Button variant="outlined" size="small" className='text-slate-50 bg-sky-800 hover:text-gray-800 rounded-full w-full'
                        onClick={goBack}>Go Back
                </Button>
            </div>

        </section>
    );
}
