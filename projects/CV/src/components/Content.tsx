import axios from 'axios';
import { useEffect, useState } from 'react';

function Content() {
    // 'experience' | 'introduction' | 'skills'
    const files = ['introduction', 'experience', 'skills'];
    const [data, setData] = useState<string[]>([]);
    //
    useEffect(() => {
        Promise.all<string>(
            files.map((file) =>
                axios
                    .get(`${import.meta.env.VITE_API}/api/cdn/html/${file}.html`)
                    .then((res) => res.data.replace(/className/g, 'class'))
                    .catch((error) => {
                        console.error('Error fetching HTML:', error);
                    }),
            ),
        ).then((d) => setData(d));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="cv-content">
            {data.map((d, i) => (
                <div dangerouslySetInnerHTML={{ __html: d }} key={`${files[i]}`} />
            ))}
        </div>
    );
}

export default Content;
