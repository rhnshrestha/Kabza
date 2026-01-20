const { SpecialEvent } = require("../database/connect");

class EventController {
  static async createEvent(req, res) {
    const { event_id, event_name, event_date, event_description } = req.body;
    if (!event_name || !event_date || !event_description) {
      return res.status(400).json({
        message: "All field are required",
      });
    }
    const newEvent = await SpecialEvent.create({
      event_id,
      event_name,
      event_date,
      event_description,
    });

    return res.status(200).json({
      message: "New event created successdully",
      newEvent,
    });
  }

  static async getEvents(req, res){
    const data = await SpecialEvent.findAll();
    res.status(200).json({
        message: "events fectched successfully",
        events : data
    })
  }

  static async deleteEvent(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          message: "Event ID is required",
        });
      }

      const deleted = await SpecialEvent.destroy({
        where: { event_id: id }, 
      });

      if (deleted) {
        return res.status(200).json({
          message: "Event deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "Event not found",
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      return res.status(500).json({
        message: "An error occurred while deleting the event",
        error: error.message,
      });
    }
  }

  static async editEvent(req, res) {
    try {
      const id = req.params.id;
      const { event_name, event_date, event_description } = req.body;

      if (!id) {
        return res.status(400).json({
          message: "Event ID is required",
        });
      }

      const event = await SpecialEvent.findOne({ where: { event_id: id } });

      if (!event) {
        return res.status(404).json({
          message: "Event not found",
        });
      }

      await event.update({
        event_name: event_name || event.event_name,
        event_date: event_date || event.event_date,
        event_description: event_description || event.event_description,
      });

      return res.status(200).json({
        message: "Event updated successfully",
        event,
      });
    } catch (error) {
      console.error("Error updating event:", error);
      return res.status(500).json({
        message: "An error occurred while updating the event",
        error: error.message,
      });
    }
  }
}

module.exports = EventController;
