import { CategoryCard } from '../components/categoryCard';
import etdImg from '../assets/etd.png';
import { useNavigate } from 'react-router-dom';

const CategoriesPage = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl my-0 mx-auto">
            <div className="flex flex-wrap gap-10">
                <CategoryCard
                    title="isp"
                    description="individuálny študijný program"
                    logo={<img src={etdImg} alt="TUKE" style={{ maxWidth: '100px' }} />}
                    onClick={() => navigate('/isp/requests')}
                />
                <CategoryCard
                    title="sj"
                    variant="secondary"
                    description="skúška z jazyka"
                    logo={<img src={etdImg} alt="TUKE" style={{ maxWidth: '100px' }} />}
                    onClick={() => navigate('/skex/exams')}
                />
            </div>
        </div>
    );
};

export { CategoriesPage };
