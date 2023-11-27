const CheckToken = async ({ username, token }) => {
  try {
    const response = await fetch(
      "https://9bbdznsjw8.execute-api.us-east-1.amazonaws.com/dev/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({ username, token }),
      }
    );

    if (!response.ok) {
      throw new Error("Echec de la connexion");
    }

    const data = await response.json();
    return data.verified || false;

  } catch (error) {
    console.error("Erreur lors de la validation du token :", error);
    return false;
  }
};

export default CheckToken;
