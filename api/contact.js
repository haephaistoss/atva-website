export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // ignore parse error
      }
    }
    const { name, email, phone, company, tax_id, service, message, _honey } = body || {};

    // Spam honeypot detection
    if (_honey) {
      return res.status(200).json({ success: true, message: 'Message received' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Hiányzó kötelező mezők' });
    }

    const payload = {
      "Név / Full Name": String(name).trim(),
      "E-mail": String(email).trim(),
      "Telefonszám / Phone": phone ? String(phone).trim() : 'Nem adott meg',
      "Cégnév / Company": company ? String(company).trim() : 'Nem adott meg',
      "Adószám / Tax ID": tax_id ? String(tax_id).trim() : 'Nem adott meg',
      "Érdeklődési terület / Area": service ? String(service).trim() : 'Egyéb',
      "Üzenet / Message": String(message).trim(),
      "_subject": `Új Cégdoktor megkeresés: ${String(name).trim()} (${company ? String(company).trim() : 'Magánszemély'})`,
      "_replyto": String(email).trim(),
      "_template": "table",
      "_captcha": "false"
    };

    const response = await fetch('https://formsubmit.co/ajax/info@cegdoktor.hu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://cegdoktor.hu',
        'Referer': 'https://cegdoktor.hu/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(payload)
    });

    const rawText = await response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      if (response.ok) {
        data = { success: true, message: 'Message forwarded' };
      } else {
        data = { success: false, message: 'Upstream gateway error' };
      }
    }

    return res.status(response.ok ? 200 : response.status).json(data);
  } catch (err) {
    console.error('Contact form submission error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Hiba történt a küldés során' });
  }
}
