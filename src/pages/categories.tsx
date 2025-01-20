import { useAppSelector } from '@/hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import etdImg from '../assets/etd.png';
import { CategoryCard } from '../components/categoryCard';

const CategoriesPage = () => {
    const navigate = useNavigate();
    const { role } = useAppSelector((state) => state.user);

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
                    onClick={() => navigate(role === 'S' ? '/skex/student-exams' : '/skex/exams')}
                />
            </div>
        </div>
    );
};

export { CategoriesPage };
