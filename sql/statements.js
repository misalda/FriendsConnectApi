module.exports.getLounges =
  "SELECT lounge_code,airport_code,name FROM airport_lounges";
module.exports.getLoungeById =
  "SELECT lounge_code,airport_code,name FROM airport_lounges WHERE lounge_code = :lounge_code ";
module.exports.getGuestCountByLounge =
  "SELECT lounge_code,COUNT(*) as guest_count FROM lounge_guests WHERE lounge_code = :lounge_code AND estimated_exit_time_utc > now() at time zone 'utc' group by lounge_code";
module.exports.createLounge = `INSERT INTO public.airport_lounges(name, airport_code, lounge_code) 
                               VALUES (:name,:airport_code,:lounge_code);`;
module.exports.createGuest = `INSERT INTO lounge_guests(guest_id,salutation,first_name,last_name,phone,email,estimated_exit_time_utc,lounge_code) 
                              VALUES (:guest_id,:salutation,:first_name,:last_name,:phone,:email,:estimated_exit_time_utc,:lounge_code)
                              RETURNING guest_id,salutation,first_name,last_name,phone,email,estimated_exit_time_utc,lounge_code,created_at_utc`;
