import Cookies from "js-cookie";
import React, { useState } from "react";
import { baseURL } from "../../lib/global/urls";

export const HomeAdvert = () => {
  const [img, setImg] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");

  const token = Cookies.get("token");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (img) {
      formData.append("img", img);
    }
    formData.append("url", url);

    try {
      const response = await fetch(`${baseURL}/admin/addAdvert`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Advert added successfully!");
      } else {
        alert("Failed to add advert.");
      }
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
  };

  return (
    <div>
      <h1>Add Home Advert</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
          required
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
