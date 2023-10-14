import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export { DetailPage };
function DetailPage() {
    const params = useParams();
    console.log(params);
    useEffect(() => {
        axios.get(`/api/detail/${params.id}`);
    }, [params.id]);

    return <div></div>;
}
