import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../lib/global/urls";
import { Welcome67 } from "../home/glamoreAd";

export const DeleteHomeAdvert = () => {
  const [imgs, setImgs] = useState<Welcome67>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${baseURL}/admin/getAdverts`);
      const data = await res.json();
      setImgs(data);
    })();
  }, []);

  const imgsList = imgs?.results.map((img) => (
    <>
      <li>
        {img.url}{" "}
        <button onClick={() => handleDeleteAdv(img.id.toString())}>
          Delete
        </button>
      </li>
    </>
  ));

  const handleDeleteAdv = async (ad_id: string) => {
    const res = await fetch(`${baseURL}/admin/deleteAd/${ad_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    await res.json();

    alert("Advert deleted successfully");
  };

  return (
    <div>
      <h1>Delete Home Advert</h1>
      <ol>{imgsList}</ol>
    </div>
  );
};
