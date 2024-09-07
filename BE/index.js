const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/verify-code', (req, res) => {
    const { code } = req.body;

    // Check if code is not exactly 6 digits long
    if (code.length !== 6) {
        return res.status(400).json({ message: 'Verification Error' });
    }

    // Check if the last digit is 7
    if (code[code.length - 1] === '7') {
        return res.status(400).json({ message: 'Verification Error' });
    }

    // If code passes the checks, consider it verified
    return res.json({ message: 'Code verified successfully.', redirectTo: '/success' });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

