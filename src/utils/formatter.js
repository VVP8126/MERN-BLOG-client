export const formatDate = (dt) => {
  let date;
  try {
    date = new Date(Date.parse(dt)).toDateString();
    return date;
  } catch (err) {
    console.log(err);
    return dt;
  }
};
