// Import
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import qr from 'qrcode';
// APP
const app = express();
// Body Parser
app.use(express.json());
// STATIC PUBLIC FOLDER
//***************** */ DIRECTORY
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/public'));

// API POST
app.post("/api/qrcode", (req, res) => {
    // console.log(req.body);
    const { url } = req.body;
    // Generate CODE
    qr.toDataURL(url, (err, src) => {
        if (err) {
            console.log(err);
            res.status(404).json({ message: err })
        } else {
            res.status(200).json(src);
        }
    });
});
// PORT
let PORT = process.env.PORT | 3311;
app.listen(PORT, () => console.log(`Server beating on port ${PORT}`));