import OfferCard from "../components/OfferCard";

const stakeimgs = {
  stakecom:
    "https://www.bigfoltz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstake.eb763cfa.png&w=750&q=75",
  stakeus:
    "https://www.bigfoltz.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstakeus.bb058c27.png&w=750&q=75",
};

const Offers = () => {
  return (
    <div className="p-8 bg-gray-900">
      <h1 className="text-6xl font-bold mb-6 text-center text-gray-200">
        Our Offers
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Stake.com Card */}
        <OfferCard
          logo={stakeimgs.stakecom}
          title="Stake.com Bonus"
          code="TEAMCGF"
          features={[
            "Exclusive 200%",
            "Min: $100 - Max: $1000",
            "Join discord and verify your account.",
          ]}
          buttonLink="https://stake.com/?offer=TeamCGF&c=VzhyLGwq"
        />

        {/* Stake.us Card */}
        <OfferCard
          logo={stakeimgs.stakeus}
          title="Stake.us Bonus"
          code="TEAMCGF"
          features={[
            "Free $25",
            "Free 250k Gold Coin",
            "Join discord and verify your account.",
          ]}
          buttonLink="https://stake.us/?offer=TeamCGF&c=yZu0i4rE"
        />
      </div>
    </div>
  );
};

export default Offers;
