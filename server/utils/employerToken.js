// create token and saving that in cookies
const sendEmployerToken = (user, statusCode, res) => {
  const employer_token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res
    .status(statusCode)
    .cookie("employer_token", employer_token, options)
    .json({
      success: true,
      user,
      employer_token,
    });
};

module.exports = sendEmployerToken;
