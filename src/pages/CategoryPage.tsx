import Card from '../components/Card';
import tukeLogoImg from '../assets/tuke-logo.png';

const CategoryPage = () => {
    return (
        <div className='pt-7 max-w-6xl my-0 mx-auto'>
            <div className='flex flex-wrap gap-10'>
                <Card
                    title='etd'
                    description='evidencia záverečných prác'
                    logo={<img src={tukeLogoImg} alt='TUKE' style={{ maxWidth: '40px' }} />}
                />
                <Card
                    title='etd'
                    description='evidencia záverečných prác'
                    logo={<img src={tukeLogoImg} alt='TUKE' style={{ maxWidth: '40px' }} />}
                />
                <Card
                    title='etd'
                    description='evidencia záverečných prác'
                    logo={<img src={tukeLogoImg} alt='TUKE' style={{ maxWidth: '40px' }} />}
                />
            </div>
        </div>
    );
};

export default CategoryPage;
