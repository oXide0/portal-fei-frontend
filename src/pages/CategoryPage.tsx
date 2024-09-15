import Card from "../components/Card";
import etdImg from "../assets/etd.png";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl my-0 mx-auto">
            <div className="flex flex-wrap gap-10">
                <Card
                    title="isp"
                    description="individuálny študijný program"
                    logo={
                        <img
                            src={etdImg}
                            alt="TUKE"
                            style={{ maxWidth: "100px" }}
                        />
                    }
                    onClick={() => navigate("/isp/requests")}
                />
            </div>
        </div>
    );
};

export default CategoryPage;
