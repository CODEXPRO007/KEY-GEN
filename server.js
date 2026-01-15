import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔑 PUT YOUR REAL MODKEY API KEY HERE
const API_KEY = "lv17Vh4sKP263BtEbrLdFbnwe3p/TlMvR/5/YwdX5a4=_MDKOAqozNNai1RzoTyAybUCXTBDIVKSXjIe6zvdNSaQ0I4OR02dCfkV6sRXj6Xlhiv1";

app.use(express.json());
app.use(express.static("public"));

app.post("/generate", async (req, res) => {
  try {
    const { type } = req.body || {};

    // 🔁 Key logic based on selection
    let days = "1";
    if (type && type.includes("7DAY")) days = "7";

    const body = new URLSearchParams();
    body.append("api_key", API_KEY);
    body.append("method", "create-key");
    body.append("days", days);
    body.append("devices", "1");
    body.append("type", "APK");
    body.append("count", "1");

    const response = await fetch("https://modkey.host/api/v1/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "SERVER_FAILED" });
  }
});

app.listen(PORT, () => {
  console.log("✅ SPEEDxLIVE running on port " + PORT);
});
