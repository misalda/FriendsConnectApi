module.exports.getUserProfile =
  "SELECT * FROM userProfiles";
module.exports.getUserProfileById =
  "SELECT * FROM userProfiles WHERE id = :id ";
module.exports.createUserProfile =
  `INSERT INTO userProfile(firstName,lastName,email,phone,maxContactsPerMeeting;
  VALUES (:firstName,:lastName,:email,:phone,:maxContactsPerMeeting);
  RETURNING id,`;
module.exports.getGuestCountByLounge =
  "SELECT lounge_code,COUNT(*) as guest_count FROM lounge_guests WHERE lounge_code = :lounge_code AND estimated_exit_time_utc > now() at time zone 'utc' group by lounge_code";
module.exports.createLounge = `INSERT INTO public.airport_lounges(name, airport_code, lounge_code) 
                               VALUES (:name,:airport_code,:lounge_code);`;
module.exports.createGuest = `INSERT INTO lounge_guests(guest_id,salutation,first_name,last_name,phone,email,estimated_exit_time_utc,lounge_code) 
                              VALUES (:guest_id,:salutation,:first_name,:last_name,:phone,:email,:estimated_exit_time_utc,:lounge_code)
                              RETURNING guest_id,salutation,first_name,last_name,phone,email,estimated_exit_time_utc,lounge_code,created_at_utc`;
