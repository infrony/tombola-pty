import { useState, useEffect } from 'react';

const NumberGrid = () => {
    const [numbers, setNumbers] = useState<boolean[]>(Array(99).fill(true));

    const fetchNumbers = async () => {
        try {
            const res = await fetch('/api/numbers');
            const data = await res.json();
            setNumbers(data.numbers);
        } catch (error) {
            console.error('Error fetching numbers:', error);
        }
    };

    useEffect(() => {
        fetchNumbers();
        const interval = setInterval(fetchNumbers, 10000); // Actualizar cada 10 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '5px' }}>
            {numbers.map((available, index) => (
                <div
                    key={index}
                    style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: available ? 'green' : 'red',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    {index + 1}
                </div>
            ))}
        </div>
    );
};

export default NumberGrid;
