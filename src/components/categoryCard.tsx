interface CardProps {
    variant?: 'primary' | 'secondary';
    title: string;
    description: string;
    logo: React.ReactNode;
    onClick?: () => void;
}

const CategoryCard = ({ variant = 'primary', ...props }: CardProps) => {
    return (
        <div
            style={{
                backgroundColor: variant === 'primary' ? '#a65858' : 'gray',
            }}
            className="max-w-[168px] w-full h-56 rounded-md flex flex-col items-center cursor-pointer card"
            onClick={props.onClick}
        >
            <div className="flex-1 pt-4">{props.logo}</div>
            <div className="w-full">
                <hr />
            </div>
            <div className="py-2 px-1 text-center">
                <h3 className="font-bold text-white uppercase">{props.title}</h3>
                <p className="text-white text-xs">{props.description}</p>
            </div>
        </div>
    );
};

export { CategoryCard };
