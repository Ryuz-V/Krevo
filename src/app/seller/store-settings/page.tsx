"use client";

import { useEffect, useState } from "react";

export default function StoreSettings() {

  const [store, setStore] = useState<any>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");

  const [uploading, setUploading] = useState(false);

  useEffect(() => {

    const loadStore = async () => {

      const res = await fetch("/api/store/me");
      const data = await res.json();

      setStore(data);

      setName(data.name || "");
      setDescription(data.description || "");
      setLogo(data.logo || "");
      setBanner(data.banner || "");
    };

    loadStore();

  }, []);

  const uploadImage = async (file: File) => {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "krevoid");

  console.log("Uploading with preset: krevoid");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dbovn8n06/image/upload",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();

  console.log("Cloudinary response:", data);

  return data.secure_url;
};

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      const res = await fetch("/api/store/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          logo,
          banner
        })
      });

      if (!res.ok) {
        alert("Update failed");
        return;
      }

      alert("Store updated successfully");

      const updated = await res.json();
      setStore(updated);

    } catch (error) {

      console.log(error);
      alert("Error updating store");

    }
  };

  if (!store) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600 }}>

      <h1>Store Settings</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Store Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>

          <label>Logo</label>

          <input
            type="file"
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {

              const file = e.target.files?.[0];

              if (!file) return;

              const url = await uploadImage(file);

              if (url) setLogo(url);

            }}
          />

          {logo && (
            <div>
              <p>Logo Preview</p>
              <img src={logo} width={120} />
            </div>
          )}

        </div>

        <div>

          <label>Banner</label>

          <input
            type="file"
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {

              const file = e.target.files?.[0];

              if (!file) return;

              const url = await uploadImage(file);

              if (url) setBanner(url);

            }}
          />

          {banner && (
            <div>
              <p>Banner Preview</p>
              <img src={banner} width={400} />
            </div>
          )}

        </div>

        {uploading && <p>Uploading image...</p>}

        <button type="submit">
          Save
        </button>

      </form>

    </div>
  );
}