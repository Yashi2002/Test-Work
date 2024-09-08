const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/verify-code', (req, res) => {
    const { code } = req.body;

    if (code.length !== 6 || code[code.length - 1] === '7') {
        return res.status(400).json({ message: 'Verification Error' });
    }

    return res.json({ message: 'Code verified successfully.', redirectTo: '/success' });
});

module.exports = app;


// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post('/verify-code', (req, res) => {
//     const { code } = req.body;

//     // Check if code is not exactly 6 digits long
//     if (code.length !== 6) {
//         return res.status(400).json({ message: 'Verification Error' });
//     }

//     // Check if the last digit is 7
//     if (code[code.length - 1] === '7') {
//         return res.status(400).json({ message: 'Verification Error' });
//     }

    
//     return res.json({ message: 'Code verified successfully.', redirectTo: '/success' });
// });


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server is running on port ${PORT}`);
// });

