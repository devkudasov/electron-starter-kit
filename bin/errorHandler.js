exports.exitIfError = err => {
  if (err) {
    console.error(err);
    process.exit();
  }
}