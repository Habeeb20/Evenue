import { useState } from "react";
import styles from "./styles/popUpI21.module.css";
import { payStackFn } from "../../lib/paystack/paystack";

export const PopUp = ({
  name,
  price,
  email,
  setShowPayment,
}: {
  email: string;
  name: string;
  price: number;
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [noOfTickets, setNoOfTickets] = useState(1);

  // increment Max 10
  const handleIncrement = () => {
    if (noOfTickets < 10) {
      setNoOfTickets((prevNoOfTicket) => prevNoOfTicket + 1);
    }
  };

  // decrement Min 1
  const handleDecrement = () => {
    if (noOfTickets > 1) {
      setNoOfTickets((prevNoOfTicket) => prevNoOfTicket - 1);
    }
  };

  const totalPrice = price * noOfTickets;

  async function handlePayment(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const formattedPrice = totalPrice * 100;
    const res = await payStackFn({
      email: email,
      amount: formattedPrice.toString(),
    });

    if (res) {
      window.location.href = res.data.authorization_url;
    }
  }

  return (
    <div className={styles.containerI21}>
      <button
        onClick={() => setShowPayment(false)}
        className={styles.closeBtn}
      >
        X
      </button>
      <img
        src="/home/Rectangle 267.svg"
        alt="fancy header"
      />

      <div>
        <section>
          <div>
            <div>
              <h4>General Admission</h4>
              <div
                style={{
                  display: "flex",
                  columnGap: "1rem",
                  alignItems: "center",
                }}
              >
                <button
                  className={`${styles.greyBtn} ${styles.arithmeticBtn}`}
                  onClick={handleDecrement}
                >
                  -
                </button>
                <span>
                  {noOfTickets < 10 ? "0" + noOfTickets : noOfTickets}
                </span>
                <button
                  className={`${styles.redBtn} ${styles.arithmeticBtn}`}
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <hr />
            <div>
              <h4>Free</h4>
              <p>Saves ends on 2023</p>
            </div>
            <hr />
          </div>
          <span>
            <button
              onClick={handlePayment}
              className={`${styles.redBtn} ${styles.buyBtn}`}
            >
              Get Ticket
            </button>
          </span>
        </section>
        <section>
          <div>
            <h3>{name}</h3>
            <p className={styles.orderSummary}>
              <strong>Order Summary</strong>
            </p>
          </div>
          <hr />
          <div>
            <div>
              <p className={styles.virtualCard}>{noOfTickets}x Virtual card</p>
              <p>{name}</p>
            </div>
            <div>
              <p>&#8358;{price.toLocaleString()}</p>{" "}
              {/* change $ logo to Naira */}
            </div>
          </div>
          <hr />
          <div>
            <div>
              <p>Total</p>
            </div>
            <div>
              <p>&#8358;{totalPrice.toLocaleString()}</p>{" "}
              {/* change $ logo to Naira */}
            </div>
          </div>
          <hr />
        </section>
      </div>
    </div>
  );
};
