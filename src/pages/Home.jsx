import { WalletCards } from "lucide-react";
import Dashbord from "../components/Dashbord";
import InfoCard from "../components/InfoCard";
import { useUser } from "../hooks/userUser";
import { addThousandSeparator } from "../util/numberFormat";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useUser();

  const navigate=useNavigate
  return (
   <div>
        <Dashbord activeMenu="Dashboard">
            <div className="my-5 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Display the Cards */}
                <InfoCard
                  icon={<WalletCards/>}
                  label="Total Balance"
                  value={addThousandSeparator(100000.00)}
                  color="bg-purple-800"
                />
                <InfoCard
                  icon={<WalletCards/>}
                  label="Total Income"
                  value={addThousandSeparator(200000.00)}
                  color="bg-green-800"
                />
                <InfoCard
                  icon={<WalletCards/>}
                  label="Total Exapnse"
                  value={addThousandSeparator(50000.00)}
                  color="bg-red-800"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Recent Transection */}

                {/* finance overview charts */}

                {/* Expanse Transection */}
                {/* Income Transection */}
              </div>

              <div className="">
                </div>


            </div>
        </Dashbord>
   </div>
  );
};

export default Home;
