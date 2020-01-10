import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ButtonMeeting = ({ room, details }) => {
  console.log(room);
  console.log(details);
  const buttonTitle = room.Busy ? "Encerrar reunião" : "Nova reunião";

  const onActionMeeting = async e => {
    try {
      const start = new Date();
      start.setHours(start.getHours() + 2);
      const end = new Date();
      end.setHours(end.getHours() + 3);
      const location = room.Name;
      const atendees = [room.Email, "maykon.capellari@db1.com.br"];
      const subject = "Reunião de Teste";
      const appointment = { subject, start, end, location, atendees };
      console.log(appointment);

      const rawResp = await axios.post("/api/rooms", appointment);
      const resp = rawResp.data;
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={onActionMeeting}>{buttonTitle}</button>
    </div>
  );
};

const Details = ({ room, details }) => (
  <div id="single-room__details">
    {details.appointmentExists && (
      <div id="single-room__meeting-title">
        <span id="single-room__next-up">{details.nextUp}</span>
        <span id="single-room__meeting-subject">
          {room.Appointments[0].Subject}
        </span>
      </div>
    )}
  </div>
);

const Time = ({ room, details }) => (
  <div id="single-room__meeting-time">
    {details.appointmentExists &&
      new Date(parseInt(room.Appointments[0].Start, 10)).toLocaleTimeString(
        [],
        { weekday: "short", hour: "2-digit", minute: "2-digit" }
      ) +
        " - " +
        new Date(parseInt(room.Appointments[0].End, 10)).toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        )}
  </div>
);

const Organizer = ({ room, details }) => {
  return (
    <div id="single-room__meeting-organizer">
      {details.appointmentExists && room.Appointments[0].Organizer}
    </div>
  );
};

const RoomStatusBlock = ({ config, details, room }) => (
  <div
    className={
      room.Busy
        ? "columns small-8 left-col busy"
        : "columns small-8 left-col open"
    }
  >
    <div id="single-room__room-name">{room.Name}</div>
    <div id="single-room__room-status">
      {room.Busy ? config.statusBusy : config.statusAvailable}
    </div>

    <ButtonMeeting room={room} details={details} />
    <Details room={room} details={details} />
    <Time room={room} details={details} />
    <Organizer room={room} details={details} />
  </div>
);

RoomStatusBlock.propTypes = {
  room: PropTypes.object.isRequired,
  details: PropTypes.object,
  config: PropTypes.object
};

export default RoomStatusBlock;
