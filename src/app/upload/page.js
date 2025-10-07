"use client";
import { useEffect, useState } from "react";

export default function UploadToDrive() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load GAPI
    const gapiScript = document.createElement("script");
    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.onload = () => {
      console.log("✅ GAPI script loaded");
      window.gapi.load("client:picker", initGapiClient);
    };
    document.body.appendChild(gapiScript);

    // Load Google Identity Services
    const gisScript = document.createElement("script");
    gisScript.src = "https://accounts.google.com/gsi/client";
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = () => console.log("✅ GIS script loaded");
    document.body.appendChild(gisScript);
  }, []);

  const initGapiClient = () => {
    window.gapi.client
      .init({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/drive.file",
      })
      .then(() => {
        console.log("✅ GAPI Initialized");
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("❌ GAPI Init Error:", err);
      });
  };

  const handleUpload = () => {
    if (!window.google || !window.google.accounts) {
      alert("Please wait... Google scripts still loading!");
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/drive.file",
      callback: (tokenResponse) => {
        console.log("🔑 Access Token:", tokenResponse.access_token);

        const picker = new window.google.picker.PickerBuilder()
          .addView(new window.google.picker.DocsUploadView())
          .setOAuthToken(tokenResponse.access_token)
          .setDeveloperKey(process.env.NEXT_PUBLIC_API_KEY)
          .setCallback((data) => {
            if (data.action === window.google.picker.Action.PICKED) {
              const file = data.docs[0];
              alert(`✅ Uploaded: ${file.name}`);
              console.log("📁 File info:", file);
            }
          })
          .build();

        picker.setVisible(true);
      },
    });

    tokenClient.requestAccessToken();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-purple-700">
        Upload File to Google Drive
      </h1>

      <button
        onClick={handleUpload}
        disabled={!isLoaded}
        className={`px-6 py-3 rounded-xl text-white font-semibold transition-transform ${
          isLoaded
            ? "bg-purple-600 hover:scale-105"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Upload File
      </button>
    </div>
  );
}
