exports.buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}

exports.buildTimestamps = () => {
  const date = new Date()
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '|' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
