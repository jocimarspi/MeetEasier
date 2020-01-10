module.exports = meeting => {
  var ews = require("ews-javascript-api");
  var auth = require("../../config/auth.js");

  var exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2016);
  exch.Credentials = new ews.ExchangeCredentials(
    auth.exchange.username,
    auth.exchange.password
  );
  exch.Url = new ews.Uri(auth.exchange.uri);

  let promise = new Promise(function(resolve, reject) {
    let appointment = new ews.Appointment(exch);
    const { subject, location, atendees } = meeting;
    const start = new Date(Date.parse(meeting.start));
    const end = new Date(Date.parse(meeting.end));
    appointment.Start = new ews.DateTime(
      new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
        start.getSeconds()
      )
    );
    appointment.End = new ews.DateTime(
      new Date(
        end.getFullYear(),
        end.getMonth(),
        end.getDate(),
        end.getHours(),
        end.getMinutes(),
        end.getSeconds()
      )
    );
    appointment.Location = location;
    appointment.Subject = subject;
    atendees.forEach(attendee => appointment.RequiredAttendees.Add(attendee));

    appointment.Save(ews.SendInvitationsMode.SendToAllAndSaveCopy).then(
      _ => {
        console.log(appointment);
        resolve(appointment);
      },
      error => {
        console.log(ei.stack, ei.stack.split("\n"));
        console.log("error");
        reject(error);
      }
    );
  });
  return promise;
};
