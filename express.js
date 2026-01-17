app.use(express.json());

app.post('/api/transaction', async (req, res) => {
    const { amount, recipient } = req.body;
    try {
        // Begin transaction
        await pool.query('BEGIN');
        // Lock the row
        const result = await pool.query('SELECT * FROM accounts WHERE id = $1 FOR UPDATE', [recipient]);
        if (result.rows.length === 0) {
            throw new Error('Recipient account not found');
        }
        // Perform updates
        await pool.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, recipient]);
        // Commit transaction
        await pool.query('COMMIT');
        res.json({ message: 'Transaction successful' });
    } catch (error) {
        // Rollback transaction
        await pool.query('ROLLBACK');
        res.status(500).json({ message: 'Transaction failed' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
