import OfferCard from "../components/OfferCard";
import stakeus from "../assets/stake.svg";
import stake from "../assets/stake_us.svg";

const Offers = () => {
  return (
    <div className="p-8 bg-gray-900">
      <h1 className="text-6xl font-bold mb-6 text-center text-gray-200">
        Our Offers
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Stake.com Card */}
        <OfferCard
          logo={stakeus}
          title="Stake.com Bonus"
          code="TEAMCGF"
          features={[
            "Free $21",
            "Minimum deposit $15",
            "Join discord and verify your account",
          ]}
          buttonLink="https://stake.com/?offer=TeamCGF&c=VzhyLGwq"
        />

        {/* Stake.us Card */}
        <OfferCard
          logo={stake}
          title="Stake.us Bonus"
          code="TEAMCGF"
          features={[
            "Free $25",
            "Free 250k Gold Coin",
            "Join discord and verify your account",
          ]}
          buttonLink="https://stake.us/?offer=TeamCGF&c=yZu0i4rE"
        />
      </div>
    </div>
  );
};

export default Offers;
