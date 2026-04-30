import { ArrowRight, BellRing, DollarSign, Gift, Percent } from "lucide-react";

export default function Register() {
  const iconColor = "#fefae0";
  const iconSize = 45;

  return (
    <div className="register">
      <div className="register__heading">
        <h2>Save more with an account</h2>
        <p>
          Get 15% off your first order, earn rewards with every purchase, and
          enjoy exclusive early access to new arrivals, special promotions, and
          member-only offers.
        </p>
      </div>
      <div className="register__perks">
        <div className="register__perk">
          <div className="register__perk-icon">
            <DollarSign color={iconColor} width={iconSize} height={iconSize} />
          </div>
          <p>15% off your first order</p>
        </div>
        <div className="register__perk">
          <div className="register__perk-icon">
            <Gift color={iconColor} width={iconSize} height={iconSize} />
          </div>
          <p>Rewards on every purchase</p>
        </div>
        <div className="register__perk">
          <div className="register__perk-icon">
            <Percent color={iconColor} width={iconSize} height={iconSize} />
          </div>
          <p>Member-only sales and offers</p>
        </div>
        <div className="register__perk">
          <div className="register__perk-icon">
            <BellRing color={iconColor} width={iconSize} height={iconSize} />
          </div>
          <p>Early access to new arrivals</p>
        </div>
      </div>
      <div className="register__button">
        <button>
          Register
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
