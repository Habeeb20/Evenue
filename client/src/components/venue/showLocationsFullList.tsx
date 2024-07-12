import { useEffect, useState } from "react";
import { Res4Locations } from "../../typesAndInterfaces/venues/getLocationCount";
import getLocationsFn from "../../lib/venues/getLocations";
import { Link } from "react-router-dom";
import styles from "../event/styles/eventsByCat29C.module.css";
import { ErrMsg } from "../global/errMsg";

export const ShowLocationsFullList = () => {
  const [resLocations, setResLocations] = useState<Res4Locations>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getLocationsFn({ setErrMsg }).then((res) => {
      res && setResLocations(res);
    });
  }, []);

  const lagos = resLocations?.result.find((state) => state.lagos)?.lagos;
  const ogun = resLocations?.result.find((state) => state.ogun)?.ogun;
  const kano = resLocations?.result.find((state) => state.kano)?.kano;
  const abia = resLocations?.result.find((state) => state.abia)?.abia;
  const abuja = resLocations?.result.find((state) => state.abuja)?.abuja;
  const rivers = resLocations?.result.find((state) => state.rivers)?.rivers;

  return (
    <div className={styles.parent29C}>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <>
          <h2>Popular Event Centres Cities</h2>
          <section className={styles.container29C}>
            <Link to={`/venues/q/lagos`}>
              <div>
                <h3>Lagos</h3>
                <p>{lagos} venues</p>
              </div>
            </Link>
            <Link to={`/venues/q/ogun`}>
              <div>
                <h3>Ogun</h3>
                <p>{ogun} venues</p>
              </div>
            </Link>
            <Link to={`/venues/q/kano`}>
              <div>
                <h3>Kano</h3>
                <p>{kano} venues</p>
              </div>
            </Link>
            <Link to={`/venues/q/abia`}>
              <div>
                <h3>Abia</h3>
                <p>{abia} venues</p>
              </div>
            </Link>
            <Link to={`/venues/q/abuja`}>
              <div>
                <h3>Abuja</h3>
                <p>{abuja} venues</p>
              </div>
            </Link>
            <Link to={`/venues/q/rivers`}>
              <div>
                <h3>Rivers</h3>
                <p>{rivers} venues</p>
              </div>
            </Link>
          </section>
        </>
      )}
    </div>
  );
};
