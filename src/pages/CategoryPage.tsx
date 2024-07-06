import Card from '../components/Card';
import etdImg from '../assets/etd.png';

const CategoryPage = () => {
    return (
        <div className='pt-7 max-w-6xl my-0 mx-auto'>
            <div className='flex flex-wrap gap-10'>
                <Card
                    title='etd'
                    description='evidencia záverečných prác'
                    logo={<img src={etdImg} alt='TUKE' style={{ maxWidth: '100px' }} />}
                />
                <Card
                    title='etd'
                    description='evidencia záverečných prác'
                    logo={<img src={etdImg} alt='TUKE' style={{ maxWidth: '100px' }} />}
                />
                <Card
                    title='etd'
                    description='evidencia záverečných prác'
                    logo={<img src={etdImg} alt='TUKE' style={{ maxWidth: '100px' }} />}
                />
            </div>
        </div>
    );
};

export default CategoryPage;
