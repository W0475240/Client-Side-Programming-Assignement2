const url = 'https://dog-api.kinduff.com/api/facts';

// sending request
fetch(url).then(async (response) => 
{
  const data = await response.json();
  console.log(data);
  success_status = data.success ? "successful" : "unsuccessful";
  document.write("<h2> Did you know that " + data.facts[0] + " (api call was " + success_status + ") </h2>");
});