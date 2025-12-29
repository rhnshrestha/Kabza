const cron = require('node-cron');
const { Op } = require('sequelize');
const { User, Booking, SpecialEvent, Notification } = require('../database/connect.js'); 
const {transporter} = require('../config/mailer.js')
// Schedule to run every day at midnight (00:00)
cron.schedule('0 0 * * * *', async () => {
    console.log("Starting Special Occasion Notification Algorithm...");

    try {
        // 1. Get events in the next 7 days
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const upcomingEvents = await SpecialEvent.findAll({
            where: {
                event_date: {
                    [Op.between]: [today, nextWeek]
                }
            }
        });

        if (upcomingEvents.length === 0) {
            console.log("No upcoming events found.");
            return;
        }

        // 2. Get unique users who have made bookings in the past
        const pastCustomers = await User.findAll({
    include: [{
        model: Booking,
        required: true, 
        attributes: []  
    }],
    group: ['user.id'] 
});

        // 3. Loop through events and users to generate notifications
        for (const event of upcomingEvents) {

            const currentEventId = event.id || event.event_id;
            for (const user of pastCustomers) {

                const alreadyNotified = await Notification.findOne({
                    where: {
                        user_id: user.id,
                        event_id: currentEventId
                    }
                });

                if(alreadyNotified){
                    continue ;
                }
                
                const alertMessage = `Hi ${user.username}! ${event.event_name} is coming up on ${event.event_date}. Book your table now at our restaurant to celebrate!`;

                // 4. Save to Notifications table
                await Notification.create({
                    user_id: user.id,
                    event_id: currentEventId,
                    message: alertMessage,
                    sent_at: new Date()
                });

                const mailOptions = {
                    from: '"The Tasty Chicken" <rockyrestaurant25@gmail.com>',
                    to: user.email,
                    subject: `Special Event Alert: ${event.event_name}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                            <h2 style="color: #e67e22;">Upcoming Special Event!</h2>
                            <p>Hi <strong>${user.username}</strong>,</p>
                            <p>${alertMessage}</p>
                            <p>We look forward to seeing you!</p>
                            <br>
                            <p>Best regards,<br><strong>Rocky Restaurant Team</strong></p>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log(`Notification and email sent to ${user.email} regarding ${event.event_name}`)

            }
        }
    } catch (error) {
        console.error("Error running notification algorithm:", error);
    }
});