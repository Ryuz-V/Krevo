"use client";

import { useEffect, useState } from "react";

export default function StoreSettings() {

  const [store, setStore] = useState<any>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  type ImageType = {
    url: string
    public_id: string
  }

  const [logo, setLogo] = useState<ImageType | null>(null)
  const [banner, setBanner] = useState<ImageType | null>(null)

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {

    const loadStore = async () => {

      const res = await fetch("/api/store/me");
      const data = await res.json();

      setStore(data);

      setName(data.name || "");
      setDescription(data.description || "");
      setLogo(data.logo || null)
      setBanner(data.banner || null)
    };

    loadStore();

  }, []);

  const uploadImage = async (file: File) => {

    const formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", "krevoid")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method:"POST",
        body:formData
      }
    )

    const data = await res.json()

    return {
      url: data.secure_url,
      public_id: data.public_id
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      setUploading(true);

      let finalLogo = logo
      let finalBanner = banner

      if (logoFile) {
        finalLogo = await uploadImage(logoFile)
      }

      if (bannerFile) {
        finalBanner = await uploadImage(bannerFile)
      }

      const res = await fetch("/api/store/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          logo: finalLogo,
          banner: finalBanner
        })
      });

      if (!res.ok) {
        alert("Update failed");
        setUploading(false);
        return;
      }

      alert("Store updated successfully");

      const updated = await res.json();
      setStore(updated);

      setUploading(false);

    } catch (error) {

      console.log(error);
      alert("Error updating store");
      setUploading(false);

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

              const file = e.target.files?.[0];

              if (!file) return;

              setLogoFile(file);

              setLogo({
                url: URL.createObjectURL(file),
                public_id: ""
              })

            }}
          />

          {logo && (
            <div>
              <p>Logo Preview</p>
              <img src={logo.url} width={120} />
            </div>
          )}

        </div>

        <div>

          <label>Banner</label>

          <input
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

              const file = e.target.files?.[0];

              if (!file) return;

              setBannerFile(file);

              setBanner({
                url: URL.createObjectURL(file),
                public_id: ""
              })

            }}
          />

          {banner && (
            <div>
              <p>Banner Preview</p>
              <img src={banner.url} width={400} />
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