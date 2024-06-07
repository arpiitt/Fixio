export const isSignedIn = async () => {
  const tokenExists =
    typeof window != "undefined" &&
    localStorage["token"] != null &&
    localStorage["token"] != "";
  if (!tokenExists) return false;
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage['token']}`
  );
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(process.env.baseIp + "/auth/check-auth", requestOptions);
  console.log(response);
  return response.ok;
};
