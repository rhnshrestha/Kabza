const cron = require('node-cron');
const { Op } = require('sequelize');
const { User, Booking, SpecialEvent, Notification } = require('../database/connect.js'); 
const transporter = require('../config/mailer.js'); 


cron.schedule('0 9 * * *', async () => {
    console.log("--- Starting Notification Algorithm ---");

    try {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const upcomingEvents = await SpecialEvent.findAll({
            where: {
                event_date: { [Op.between]: [today, nextWeek] }
            }
        });

        if (upcomingEvents.length === 0) {
            console.log("No events in the next 7 days. System idle.");
            return;
        }

        const pastCustomers = await User.findAll({
            include: [{ model: Booking, required: true, attributes: [] }],
            group: ['user.id']
        });

        for (const event of upcomingEvents) {
            const currentEventId = event.id || event.event_id;

            for (const user of pastCustomers) {
                // Check if already notified
                const alreadyNotified = await Notification.findOne({
                    where: {
                        user_id: user.id,
                        event_id: currentEventId
                    }
                });

                if (alreadyNotified) {
                    // This log for demo
                    console.log(`User ${user.email} already notified for ${event.event_name}. Skipping...`);
                    continue;
                }
                
                const alertMessage = `Hi ${user.username}! ${event.event_name} is coming up on ${event.event_date}. Book your table now!`;

                // 1. Create Notification Record
                await Notification.create({
                    user_id: user.id,
                    event_id: currentEventId,
                    message: alertMessage,
                    sent_at: new Date()
                });

                // 2. Prepare Email
                const mailOptions = {
                    from: '"The Tasty Chicken" <rockyrestaurant25@gmail.com>',
                    to: user.email,
                    subject: `Special Event Alert: ${event.event_name}`,
                    html: `<p>${alertMessage}</p>`
                };

                // 3. Send Email
                await transporter.sendMail(mailOptions);
                console.log(`✅ SUCCESS: Email sent to ${user.email} for ${event.event_name}`);
            }
        }
    } catch (error) {
        console.error("❌ Algorithm Error:", error);
    }
});