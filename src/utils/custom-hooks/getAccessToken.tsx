import { useEffect, useState } from "react";

const Client_Id = import.meta.env.VITE_REACT_APP_CLIENT_ID;
const Client_Secret = import.meta.env.VITE_REACT_APP_CLIENT_SECRET;

export const useGetAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  useEffect(() => {
    //this is used to get the access token, which you can then use to search through spotify's API
    const AuthorisationParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        Client_Id +
        "&client_secret=" +
        Client_Secret,
    };
    fetch("https://accounts.spotify.com/api/token", AuthorisationParams)
      .then((result) => result.json())
      .then((jsonDataForAT) => setAccessToken(jsonDataForAT.access_token)); // AT = Access Token
  }, []);
  return accessToken;
};
