interface CardProps {
    variant?: 'primary' | 'secondary';
    title: string;
    description: string;
    logo: React.ReactNode;
    onClick?: () => void;
}

const Card = ({ variant = 'primary', title, description, logo }: CardProps) => {
    const bg = variant === 'primary' ? 'bg-red-900' : 'bg-gray-500';
    return (
        <div
            className={`${bg} max-w-40 h-52 rounded-md flex flex-col items-center cursor-pointer hover:shadow-2xl hover:border-black`}
        >
            <div className='flex-1 pt-4'>{logo}</div>
            <div className='border border-gray-600 w-full'></div>
            <div className='p-2 text-center'>
                <h3 className='font-bold text-white uppercase'>{title}</h3>
                <p className='text-white text-xs'>{description}</p>
            </div>
        </div>
    );
};

export default Card;
