import styles from "./styles/eBrands.module.css";

// array with eBrands images
const eBrands = [
  { src: "/home/Rectangle 111.svg", href: "http://essentialnews.ng/" },
  { src: "/home/Rectangle 114.svg", href: "http://evenue.ng/" },

  { src: "/home/Rectangle 111.svg", href: "https://eproperties.ng/" },

  { src: "/home/Rectangle 114.svg", href: "https://ebnbhotel.com/" },

  { src: "/home/Rectangle 111.svg", href: "https://edirect.ng/" },

  { src: "/home/Rectangle 114.svg", href: "https://ebnbhotel.com/" },

  { src: "/home/Rectangle 111.svg", href: "http://estores.ng/" },
];

// create a div for each image
export const EBrandsList = () => {
  const eBrandsList = eBrands.map((eBrand, index) => (
    <div key={index} className={`${styles.card} ${styles.slide}`}>
      <a href={eBrand.href} target="_blank" rel="noopener noreferrer">
        <img src={eBrand.src} alt={`eBrand-${index}`} />
      </a>
    </div>
  ));

  return (
    <div className={styles.containerHJ0}>
      <h5>List of essential Group Brands</h5>
      <div className={styles.list}>
        <div className={styles.slide_track}>
          {eBrandsList}
          {eBrandsList}
        </div>
      </div>
      <p>
        The world is going <span>e</span> so are we{" "}
      </p>
    </div>
  );
};
